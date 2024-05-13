import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useDropDownList } from './useDropdownList'

describe('useDropDownList', () => {
  it('should instanciate the drop down list', () => {
    const { result } = renderHook(() => useDropDownList({}))
    expect(result.current).toBeDefined()
  })

  it('should set isOpen to false by default', () => {
    const { result } = renderHook(() => useDropDownList({}))
    expect(result.current.isOpen).toBeFalsy()
  })

  it('should invoke the onClose callback', () => {
    const onClose = vi.fn()

    const { result } = renderHook(() =>
      useDropDownList({
        onClose,
      })
    )

    expect(result.current.isOpen).toBeFalsy()

    act(() => {
      result.current.setIsOpen(true)
    })

    expect(onClose).toHaveBeenCalledOnce()
    expect(result.current.isOpen).toBeTruthy()

    act(() => {
      result.current.setIsOpen(false)
    })

    expect(onClose).toHaveBeenCalledTimes(2)
    expect(result.current.isOpen).toBeFalsy()
  })
})
