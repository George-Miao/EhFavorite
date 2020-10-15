const hrefReg = /href="https:\/\/e-hentai\.org\/g\/(\d+)\/([\da-zA-Z]+)\/?"/g
const showingAllReg = /Showing (\d+) result/
const errorMsg = "Error while fetching %. Make sure your cookie is corrent."
const JSONInit = {
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
}

const error = msg => errorMsg.replace("%", msg)
const packPromise = async (prom) => {
  try { return new Response(await prom, JSONInit) }
  catch (e) { return new Response(e, { status: 400 }) }
}

addEventListener('fetch', event => {
  event.respondWith(handleFetch(event.request))
})

addEventListener('scheduled', event => {
  event.waitUntil(handleCron())
})

const handleCron = async () => {
  return packPromise(getNstore(await setupID()))
}

const handleFetch = async (req) => {
  const { cookie, mID } = await setupID(req)
  return packPromise(
    (async () =>
      await eh.get(mID)
      ??
      JSON.stringify(await getNstore(cookie, mID))
    )()
  )
}

const setupID = async (req) => {
  if (!req)
    cookie = await eh.get('cookies')
  else
    cookie = (new URL(req.url)).searchParams.get("cookie") ?? await eh.get('cookies')
  mID = cookie?.match(/ipb_member_id=(\d+);?/)?.[1]
  if (!cookie || !mID) error("Cookie or mID")
  return { cookie, mID }
}

const getNstore = async (cookie, mID) => {
  const favs = await getGalleries(cookie)
  if (!favs) throw error("favorites list")
  const details = await getDetail(Object.entries(favs))
  if (!details) throw error("item details")
  const stringified = JSON.stringify(details)
  await eh.put(mID, stringified)
  return stringified
}


// Functions fetching info from Ehentai
/**
 *
 * @param {Number} pgnum Number of current page. 50 items per page. Start from 0.
 */
async function getGalleries (cookie, pgnum = 0) {
  const res = await fetch(`https://e-hentai.org/favorites.php?page=${pgnum}`, {
    headers: {
      cookie
    }
  })
  if (res.status != 200) return

  let text = await res.text()

  let resultNum = parseInt(text.match(showingAllReg)?.[1])
  if (!resultNum) return

  let matched = [...text.matchAll(hrefReg)]
  ret = {}
  matched.forEach(e => ret[e[1]] = e[2])
  if ((pgnum + 1) * 50 >= resultNum) return ret
  else ret = Object.assign(ret, await getGalleries(cookie, pgnum + 1))
  return ret
}

/**
 * 
 * @param {Object.prototype.entries} entries Entries of [gallery_id, gallery_token]
 */
async function getDetail (entries) {
  ret = []
  for (var i = 0, len = entries.length; i < len; i += 25) {
    const res = await fetch("https://api.e-hentai.org/api.php", {
      method: 'POST',
      body: JSON.stringify({
        "method": "gdata",
        "gidlist": entries.slice(i, i + 25).map(e => [parseInt(e[0]), e[1]]),
        "namespace": 1
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    ret = ret.concat((await res.json()).gmetadata)
  }
  return ret
} 