import { User } from '@ngneat/falso'
import { VirtualItem } from '@tanstack/react-virtual'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Option } from '../components/Option'
import { PaginatedList } from '../test-types'
import {
  getInfiniteQueryOptions,
  randomUsers,
  renderWithQueryClient,
} from '../test-utils'
import { useInfiniteSelect } from './useInfiniteSelect'

const UserInfiniteSelect = () => {
  const {
    dropdownList: { isOpen, activeIndex, listRef },
    virtualizer: {
      scrollElementRef,
      virtualItems,
      getTotalSize,
      measureElement,
    },
    selectedOption,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
    options,
  } = useInfiniteSelect<PaginatedList<User>, User, HTMLDivElement>({
    infiniteQueryOptions: getInfiniteQueryOptions({ searchTerm: '' }),
  })

  return (
    <>
      <div {...getReferenceProps({})}>
        {selectedOption !== undefined ? (
          <div data-testid="trigger">{selectedOption?.username}</div>
        ) : (
          <div data-testid="trigger">Trigger Me</div>
        )}
      </div>
      {isOpen && (
        <div {...getFloatingProps({})}>
          <div
            ref={scrollElementRef}
            style={{ overflowY: 'auto', width: '208px', height: '208px' }}
          >
            <ul
              className="relative"
              style={{ width: '208px', height: `${getTotalSize()}px` }}
            >
              {virtualItems.length > 0 &&
                virtualItems.map((virtualItem: VirtualItem) => {
                  return (
                    <Option
                      {...getItemProps(undefined, virtualItem)}
                      key={virtualItem.index}
                      data-index={virtualItem.index}
                      listRef={listRef}
                      index={virtualItem.index + 1}
                      activeIndex={activeIndex}
                      measureElement={measureElement}
                      style={{
                        height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`,
                      }}
                    >
                      <span>{options[virtualItem.index]?.username}</span>
                    </Option>
                  )
                })}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

describe('useInfiniteSelect', () => {
  // https://github.com/TanStack/virtual/issues/641
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(
    () => ({
      width: 120,
      height: 120,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => null,
    })
  )

  it('should render an infinite select component with users as options', async () => {
    const user = userEvent.setup()

    renderWithQueryClient(<UserInfiniteSelect />)

    expect(screen.getByTestId('trigger').innerHTML).toEqual('Trigger Me')
    await user.click(screen.getByTestId('trigger').parentElement!)
    await screen.findByText(randomUsers[0].username, undefined, {
      timeout: 10000,
    })

    await user.click(screen.getByText(randomUsers[0].username))
    expect(screen.getByTestId('trigger').innerHTML).toEqual(
      randomUsers[0].username
    )
  })
})
