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
  'Private'
}
// Cast into types easier to work with
export interface Gallery {
  gid: number
  token: string
  added: number
  archiver_key: string
  title: string
  title_jpn: string
  category: Category
  thumb: URL
  uploader: string
  posted: string
  filecount: number
  filesize: number
  expunged: Boolean
  rating: number
  torrentcount: number
  torrents: Array<Torrent>
  tags: Array<string>
  parsedTags: Map<string, Array<string>>
  eh_href: URL
  ex_href: URL
}

export interface Torrent {
  hash: string
  added: string
  name: string
  tsize: number
  fsize: number
}

export interface Setting {
  sort_by: keyof typeof SortBy
  reverse: Boolean
}

export enum SortBy {
  // AddDate = 'Add date',
  PubDate = 'Upload date ',
  Rating = 'Rating',
  AddDate = 'Favorited date'
}
