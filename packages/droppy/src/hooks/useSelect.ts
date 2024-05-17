import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useRef, useState } from 'react'
import { DEFAULT_ESTIMATE_SIZE, DEFAULT_OVERSCAN } from '../constants'
import type { UseSelectArgs, UseSelectReturn } from '../types'
import { useDropDownList } from './useDropdownList'
import useOptionSelectorCallback from './useOptionSelectorCallback'
import usePropsGetter from './usePropsGetter'

const DEFAULT_ARIA_ROLE = 'select'

/**
 * Custom hook for managing the state of a select input.
 *
 * @param {UseSelectArgs<TOption>} args - Object containing options, initialSelectedOption, virtualizerOptions, onClose, and onSelectedOptionChange
 * @return {UseSelectReturn<TScrollElement, TOption>} Object containing virtualizer, dropdownList, selectedOption, setSelectedOption, getReferenceProps, getFloatingProps, and getItemProps
 */
export const useSelect = <TScrollElement extends HTMLElement, TOption>(
  args: UseSelectArgs<TOption>
): UseSelectReturn<TScrollElement, TOption> => {
  const {
    options,
    initialSelectedOption: initialSelected,
    virtualizerOptions: { overscan, estimateSize } = {},
    onClose,
    onSelectedOptionChange,
  } = args

  const [selectedOption, setSelectedOption] = useState<TOption | undefined>(
    initialSelected
  )

  useEffect(() => {
    onSelectedOptionChange?.(selectedOption)
  }, [selectedOption, onSelectedOptionChange])

  const scrollElementRef = useRef<TScrollElement>(null)

  const virtualizer = useVirtualizer({
    overscan: overscan || DEFAULT_OVERSCAN,
    estimateSize: () => estimateSize || DEFAULT_ESTIMATE_SIZE,
    count: options.length,
    getScrollElement: () => scrollElementRef?.current,
  })

  const dropdownList = useDropDownList({
    ariaRole: DEFAULT_ARIA_ROLE,
    onClose,
  })

  const selectOptionByIndex = useOptionSelectorCallback({
    options,
    dropdownList,
    setSelectedOption,
  })

  const { getReferenceProps, getFloatingProps, getItemProps } = usePropsGetter({
    dropdownList,
    selectOptionByIndex,
  })

  return {
    virtualizer: {
      virtualItems: virtualizer.getVirtualItems(),
      scrollElementRef,
      getTotalSize: virtualizer.getTotalSize,
      measureElement: virtualizer.measureElement,
    },
    dropdownList,
    selectedOption,
    setSelectedOption,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
  }
}
