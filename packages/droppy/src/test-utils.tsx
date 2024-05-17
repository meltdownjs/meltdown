import { User, randUser } from '@ngneat/falso'
import {
  InfiniteData,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import { PaginatedList } from './test-types'
import { GetInfiniteQueryOptions, GetInfiniteQueryOptionsArgs } from './types'

export const randomUsers: User[] = randUser({ length: 18 })

const getUsersByOffsetAndQuery = async (
  offset: number,
  query: string
): Promise<PaginatedList<User>> => {
  let users = randomUsers

  if (query !== '') {
    users = users.filter((user) => user.username.includes(query))
  }

  const totals = users.length
  const limit = 12
  const end = offset + limit > totals ? totals - offset : limit

  return await Promise.resolve({
    items: users.slice(offset, end),
    pagination: {
      offset,
      limit,
      totals,
    },
  })
}

const mapPagesToUsers = (data: InfiniteData<PaginatedList<User>>): User[] =>
  data.pages.flatMap((page) => page.items)

export const getInfiniteQueryOptions: GetInfiniteQueryOptions<
  PaginatedList<User>,
  User
> = (args: GetInfiniteQueryOptionsArgs) => {
  const { searchTerm } = args

  return {
    queryKey: ['users', searchTerm],
    queryFn: ({ pageParam = 0 }) =>
      getUsersByOffsetAndQuery(pageParam as number, searchTerm),
    getNextPageParam: (lastPage: PaginatedList<User>) => {
      const maxOffset =
        (Math.ceil(lastPage.pagination.totals / lastPage.pagination.limit) -
          1) *
        lastPage.pagination.limit

      const nextOffset = lastPage.pagination.offset + lastPage.pagination.limit

      if (nextOffset > maxOffset) {
        return undefined
      }

      return nextOffset
    },
    select: mapPagesToUsers,
    initialPageParam: 0,
  }
}

export const renderWithQueryClient = (ui: ReactNode) => {
  const queryClient = new QueryClient()
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  render(ui, { wrapper })
}
