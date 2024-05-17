import {
  autoUpdate,
  flip,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react'
import { useEffect, useRef, useState } from 'react'
import type { UseDropDownListArgs, UseDropDownListReturn } from '../types'

const DEFAULT_ARIA_ROLE = 'select'

/**
 * Custom hook for managing the dropdown list functionality.
 *
 * @param {UseDropDownListArgs} args - Arguments for the dropdown list
 * @return {UseDropDownListReturn} Object containing various properties and functions related to the dropdown list
 */
export const useDropDownList = (
  args: UseDropDownListArgs
): UseDropDownListReturn => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef<HTMLElement[]>([])

  const { onClose, ariaRole = DEFAULT_ARIA_ROLE } = args

  useEffect(() => {
    if (isOpen) {
      return
    }

    onClose?.()
  }, [isOpen, onClose])

  const onOpenChange = (open: boolean) => {
    setIsOpen(open)
    setActiveIndex(0)
  }

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: onOpenChange,
    placement: 'bottom-start',
    middleware: [
      flip(),
      size({
        apply({ elements, rects, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            minWidth: `${rects.reference.width}px`,
          })
        },
        padding: 10,
      }),
    ],
    whileElementsMounted: autoUpdate,
  })

  const listNavigation = useListNavigation(context, {
    listRef: listRef,
    activeIndex,
    onNavigate: (index: number | null) => {
      if (index === null) {
        return
      }

      setActiveIndex(index)
    },
    loop: true,
  })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [
      listNavigation,
      useClick(context),
      useDismiss(context),
      useRole(context, {
        enabled: true,
        role: ariaRole,
      }),
    ]
  )

  return {
    isOpen,
    setIsOpen,
    refs,
    listRef,
    activeIndex,
    getFloatingProps,
    getReferenceProps,
    getItemProps,
    floatingStyles,
  }
}
