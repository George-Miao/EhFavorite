const hrefPattern = /href="https:\/\/e-hentai\.org\/g\/(\d+)\/([\da-zA-Z]+)\/?"/g
const showingAllPattern = /Showing (\d+) result/
const favTimePattern = /<div.*id="posted_(\d+)".*>(.*?)<\/div>/
const errorMsg = 'Error while fetching %. Make sure your cookie is correct.'
const JSONInit = {
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}

const error = msg => errorMsg.replace('%', msg)
const packPromise = async prom => {
  try {
    return new Response(await prom, JSONInit)
  } catch (e) {
    return new Response(e, { status: 400 })
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleFetch(event.request))
})

addEventListener('scheduled', event => {
  event.waitUntil(handleCron())
})

const handleCron = async () => {
  const { cookie, mID } = await setupID()
  return packPromise(getNstore(cookie, mID))
}

const handleFetch = async req => {
  const { cookie, mID } = await setupID(req)
  return packPromise(
    (async () =>
      await eh.get(mID)
        ?? JSON.stringify(await getNstore(cookie, mID)))()
  )
}

const setupID = async req => {
  let cookie
  if (!req)
    cookie = await eh.get('cookies')
  else
    cookie = (new URL(req.url)).searchParams.get('cookie') ?? await eh.get('cookies')
  const mID = cookie?.match(/ipb_member_id=(\d+);?/)?.[1]
  if (!cookie || !mID) throw error('Cookie or mID')
  return { cookie, mID }
}

/**
 * Get and store into KV
 * @param {*} cookie cookie string
 * @param {*} mID user identifier
 * @returns list of items
 */
const getNstore = async (cookie, mID) => {
  const favs = await getGalleries(cookie)
  if (!favs) throw error('favorites list')
  const details = await getDetail(Object.entries(favs))
  if (!details) throw error('item details')
  console.log(details)
  const stringified = JSON.stringify(details)
  await eh.put(mID, stringified, { expirationTtl: 40320 })
  return stringified
}

/**
 * Functions fetching info from Ehentai
 * @param {Number} pageNum Number of current page. 50 items per page. Start from 0.
 */
async function getGalleries(cookie, pageNum = 0) {
  const res = await fetch(`https://e-hentai.org/favorites.php?page=${pageNum}`, {
    headers: {
      cookie
    }
  })
  if (res.status != 200) return

  const text = await res.text()

  const resultNum = parseInt(text.match(showingAllPattern)?.[1])
  if (!resultNum) return

  ret = {}
  const href = [...text.matchAll(hrefPattern)]
  href.forEach(e => ret[e[1]] = e[2])
  const time = [...text.matchAll(favTimePattern)]
  time.forEach(e => ret[e[1]]['added'] = +new Date(e[2]))
  if ((pageNum + 1) * 50 >= resultNum) return ret
  else ret = Object.assign(ret, await getGalleries(cookie, pageNum + 1))
  return ret
}

/**
 * @param {Object.prototype.entries} entries Entries of [gallery_id, gallery_token]
 */
async function getDetail(entries) {
  ret = []
  for (let i = 0; i < entries.length; i += 25) {
    const res = await fetch('https://api.e-hentai.org/api.php', {
      method: 'POST',
      body: JSON.stringify({
        'method': 'gdata',
        'gidlist': entries.slice(i, i + 25).map(e => [parseInt(e[0]), e[1]]),
        'namespace': 1
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(r => r.json()).then(r => r.gmetadata)
    ret = ret.concat(await res)
  }
  return ret
}
