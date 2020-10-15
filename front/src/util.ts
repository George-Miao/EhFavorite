import type { Gallery } from './type'

export function APItoGallery(e): Gallery {
  e.thumb = new URL(e.thumb)
  e.posted = new Date(parseInt(e.posted) * 1000)
  e.filecount = parseInt(e.filecount)
  e.rating = parseFloat(e.rating)
  e.torrentcount = parseInt(e.torrentcount)
  e.torrents.map((t) => {
    t.added = new Date(parseInt(t.added) * 1000)
    t.tsize = parseInt(t.tsize)
    t.fsize = parseInt(t.fsize)
  })
  e.href = new URL(`https://e-hentai.org/g/${e.gid}/${e.token}/`)
  e.parsedTags = parseTags(e.tags)
  return e
}

export function parseTags(tags: Array<string>) {
  const ret = {
    defaults: []
  }
  for (let tag of tags) {
    if (!tag.includes(":")) {
      ret.defaults.push(tag)
      continue
    }
    const splittedTag = tag.split(":")
    if (!ret[splittedTag[0]]) ret[splittedTag[0]] = []
    ret[splittedTag[0]].push(splittedTag[1])
  }
  return ret
}