import { User } from '@ngneat/falso'
import { VirtualItem } from '@tanstack/react-virtual'
import { act, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Option } from '../components/Option'
import { randomUsers } from '../test-utils'
import { useSelect } from './useSelect'

const UserSelect = () => {
  const options = randomUsers
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
  } = useSelect<HTMLDivElement, User>({
    options,
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

describe('useSelect', () => {
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

  it('should render an select component with users as options', async () => {
    const user = userEvent.setup()

    render(<UserSelect />)

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

  it('should create a select component', () => {
    const { result } = renderHook(() =>
      useSelect({
        options: [{ value: 'foo' }, { value: 'bar' }],
      })
    )

    expect(result.current.virtualizer).toBeDefined()
    expect(result.current.dropdownList.isOpen).toBe(false)
    expect(result.current.selectedOption).toBe(undefined)
  })

  it('should allow a custom initial selected option', () => {
    const { result } = renderHook(() =>
      useSelect({
        options: [{ value: 'foo' }, { value: 'bar' }],
        initialSelectedOption: { value: 'bar' },
      })
    )

    expect(result.current.selectedOption).toEqual({ value: 'bar' })
  })

  it('should allow a custom onClose callback', () => {
    const onCloseMock = vi.fn()
    const { result } = renderHook(() =>
      useSelect({
        options: [{ value: 'foo' }, { value: 'bar' }],
        onClose: onCloseMock,
      })
    )

    expect(result.current.dropdownList.isOpen).toBe(false)

    act(() => {
      result.current.dropdownList.setIsOpen(true)
    })
    expect(result.current.dropdownList.isOpen).toBe(true)
    expect(onCloseMock).toHaveBeenCalledOnce()

    act(() => {
      result.current.dropdownList.setIsOpen(false)
    })
    expect(result.current.dropdownList.isOpen).toBe(false)

    expect(onCloseMock).toHaveBeenCalledTimes(2)
  })

  it('should allow a custom onSelectedOptionChange callback', () => {
    const onSelectedOptionChangeMock = vi.fn()
    const options = [{ value: 'foo' }, { value: 'bar' }]
    const { result } = renderHook(() =>
      useSelect({
        options,
        onSelectedOptionChange: onSelectedOptionChangeMock,
      })
    )

    act(() => {
      result.current.setSelectedOption(options[0])
    })
    expect(onSelectedOptionChangeMock).toHaveBeenCalled()
    expect(result.current.selectedOption).toMatchObject(options[0])
  })
})
