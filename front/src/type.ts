export enum Category {
  'Doujinshi',
  'Manga',
  'Artist CG',
  'Game CG',
  'Western',
  'Image Set',
  'Non-H',
  'Cosplay',
  'Asian Porn',
  'Misc',
  'Private',
}
// Cast into types easier to work with
export interface Gallery {
  gid: Number
  token: string
  archiver_key: string
  title: string
  title_jpn: string
  category: Category
  thumb: URL
  uploader: string
  posted: Date
  filecount: Number
  filesize: Number
  expunged: Boolean
  rating: Number
  torrentcount: Number
  torrents: Array<Torrent>
  tags: Array<string>
  parsedTags: Map<string, Array<string>>
  href: URL
}

export interface Torrent {
  hash: string
  added: Date
  name: string
  tsize: Number
  fsize: Number
}