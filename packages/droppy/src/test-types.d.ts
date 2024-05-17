export type PaginatedList<TItem> = {
  items: TItem[]
  pagination: Pagination
}

type Pagination = {
  offset: number
  limit: number
  totals: number
}
