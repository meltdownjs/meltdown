import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import type {
  UseInfiniteMultiSelectArgs,
  UseInfiniteMultiSelectReturn,
} from '../types'
import { useDropDownList } from './useDropdownList'
import useInifiteQueryResultVirtualizer from './useInfiniteQueryResultVirtualizer'
import useMultiOptionSelectorCallback from './useMultiOptionSelectorCallback'
import usePropsGetter from './usePropsGetter'

const DEFAULT_ARIA_ROLE = 'select'

/**
 * Custom hook for handling infinite multi-select functionality.
 *
 * @param {UseInfiniteMultiSelectArgs<TResult, TResultItem>} args - Arguments for the hook.
 * @return {UseInfiniteMultiSelectReturn<TScrollElement, TResultItem>} Object containing select functionality.
 */
export const useInfiniteMultiSelect = <
  TResult,
  TResultItem,
  TScrollElement extends HTMLElement,
>(
  args: UseInfiniteMultiSelectArgs<TResult, TResultItem>
): UseInfiniteMultiSelectReturn<TScrollElement, TResultItem> => {
  const {
    ariaRole = DEFAULT_ARIA_ROLE,
    initialSelectedOptions,
    infiniteQueryOptions,
    virtualizerOptions,
    onClose,
    onSelectedOptionsChange,
  } = args

  const [selectedOptions, setSelectedOptions] = useState<TResultItem[]>(
    initialSelectedOptions || []
  )
  const infiniteQueryResult = useInfiniteQuery<TResult, Error, TResultItem[]>(
    infiniteQueryOptions
  )

  const options = infiniteQueryResult.data || []

  const virtualizer = useInifiteQueryResultVirtualizer<
    TScrollElement,
    TResultItem
  >({
    infiniteQueryResult,
    virtualizerOptions,
  })

  const dropdownList = useDropDownList({ ariaRole, onClose })

  const selectOptionByIndex = useMultiOptionSelectorCallback({
    options,
    selectedOptions,
    setSelectedOptions,
    onSelectedOptionsChange,
  })

  const { getReferenceProps, getFloatingProps, getItemProps } = usePropsGetter({
    dropdownList,
    selectOptionByIndex,
  })

  return {
    virtualizer,
    dropdownList,
    options,
    selectedOptions,
    setSelectedOptions,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
  }
}
