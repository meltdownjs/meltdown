import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useRef, useState } from 'react'
import { DEFAULT_ESTIMATE_SIZE, DEFAULT_OVERSCAN } from '../constants'
import type { UseMultiSelectArgs, UseMultiSelectReturn } from '../types'
import { useDropDownList } from './useDropdownList'
import useMultiOptionSelectorCallback from './useMultiOptionSelectorCallback'
import usePropsGetter from './usePropsGetter'

const DEFAULT_ARIA_ROLE = 'select'

/**
 * Custom hook for managing the state of multiple selected options.
 *
 * @param {UseMultiSelectArgs<TOption>} args - Object containing initialSelectedOptions, options, virtualizerOptions, onClose, and onSelectedOptionsChange
 * @return {UseMultiSelectReturn<TScrollElement, TOption>} Object containing virtualizer, dropdownList, selectedOptions, setSelectedOptions, getReferenceProps, getFloatingProps, and getItemProps
 */
export const useMultiSelect = <TScrollElement extends HTMLElement, TOption>(
  args: UseMultiSelectArgs<TOption>
): UseMultiSelectReturn<TScrollElement, TOption> => {
  const {
    initialSelectedOptions,
    options,
    virtualizerOptions: { overscan, estimateSize } = {},
    onClose,
    onSelectedOptionsChange,
  } = args

  const [selectedOptions, setSelectedOptions] = useState<TOption[]>(
    initialSelectedOptions || []
  )

  useEffect(() => {
    onSelectedOptionsChange?.(selectedOptions)
  }, [selectedOptions, onSelectedOptionsChange])
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

  const selectOptionByIndex = useMultiOptionSelectorCallback({
    options,
    selectedOptions,
    setSelectedOptions,
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
    selectedOptions,
    setSelectedOptions,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
  }
}
