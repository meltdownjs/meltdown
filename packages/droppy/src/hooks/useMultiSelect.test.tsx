import { User } from '@ngneat/falso'
import { VirtualItem } from '@tanstack/react-virtual'
import { act, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Option } from '../components/Option'
import { randomUsers } from '../test-utils'
import { useMultiSelect } from './useMultiSelect'

const UserMultiSelect = () => {
  const options = randomUsers
  const {
    dropdownList: { isOpen, activeIndex, listRef },
    virtualizer: {
      scrollElementRef,
      virtualItems,
      getTotalSize,
      measureElement,
    },
    selectedOptions,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
  } = useMultiSelect<HTMLDivElement, User>({
    options,
  })

  return (
    <>
      <div {...getReferenceProps({})}>
        {selectedOptions.length > 0 ? (
          <div data-testid="trigger">
            {selectedOptions.map((selectedOption: User) => (
              <span key={selectedOption.id}>{selectedOption.username}</span>
            ))}
          </div>
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

describe('useMultiSelect', () => {
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

  it('should render an mutli select component with users as options', async () => {
    const user = userEvent.setup()
    render(<UserMultiSelect />)

    expect(screen.getByTestId('trigger').innerHTML).toEqual('Trigger Me')
    await user.click(screen.getByTestId('trigger').parentElement!)
    await screen.findByText(randomUsers[0].username, undefined, {
      timeout: 10000,
    })
    await screen.findByText(randomUsers[1].username, undefined, {
      timeout: 10000,
    })

    await user.click(screen.getByText(randomUsers[0].username))
    expect(screen.getByTestId('trigger').children).toHaveLength(1)
    expect(screen.getByTestId('trigger').children[0].innerHTML).toEqual(
      randomUsers[0].username
    )
    await user.click(screen.getByText(randomUsers[1].username))
    expect(screen.getByTestId('trigger').children).toHaveLength(2)
    expect(screen.getByTestId('trigger').children[1].innerHTML).toEqual(
      randomUsers[1].username
    )
  })

  it('should return an object with the correct shape', () => {
    const { result } = renderHook(() =>
      useMultiSelect<HTMLDivElement, string>({
        initialSelectedOptions: [],
        options: [],
        virtualizerOptions: { overscan: 1, estimateSize: 10 },
      })
    )

    expect(result.current).toBeDefined()
  })

  it('should return the correct initial state', () => {
    const { result } = renderHook(() =>
      useMultiSelect<HTMLDivElement, string>({
        initialSelectedOptions: ['foo', 'bar'],
        options: ['foo', 'bar', 'baz'],
        virtualizerOptions: { overscan: 1, estimateSize: 10 },
      })
    )

    expect(result.current.selectedOptions).toEqual(['foo', 'bar'])
  })

  it('should set the correct selectedOptions', () => {
    const { result } = renderHook(() =>
      useMultiSelect<HTMLDivElement, string>({
        initialSelectedOptions: [],
        options: ['foo', 'bar', 'baz'],
        virtualizerOptions: { overscan: 1, estimateSize: 10 },
      })
    )

    act(() => {
      result.current.setSelectedOptions(['foo', 'bar'])
    })

    expect(result.current.selectedOptions).toEqual(['foo', 'bar'])
  })

  it('should invoke the onSelectedOptionsChange callback', () => {
    const onSelectedOptionsChangeMock = vi.fn()

    const options = ['foo', 'bar', 'baz']

    const { result } = renderHook(() =>
      useMultiSelect<HTMLDivElement, string>({
        initialSelectedOptions: [],
        options,
        virtualizerOptions: { overscan: 1, estimateSize: 10 },
        onSelectedOptionsChange: onSelectedOptionsChangeMock,
      })
    )

    expect(result.current.selectedOptions).toHaveLength(0)

    act(() => {
      result.current.setSelectedOptions([options[1], options[2]])
    })

    expect(onSelectedOptionsChangeMock).toHaveBeenCalled()
    expect(result.current.selectedOptions).toHaveLength(2)
  })

  it('should invoke the onClose callback', () => {
    const onClose = vi.fn()

    const { result } = renderHook(() =>
      useMultiSelect<HTMLDivElement, string>({
        initialSelectedOptions: [],
        options: ['foo', 'bar', 'baz'],
        virtualizerOptions: { overscan: 1, estimateSize: 10 },
        onClose,
      })
    )

    result.current.dropdownList.setIsOpen(false)

    expect(onClose).toHaveBeenCalled()
  })
})
