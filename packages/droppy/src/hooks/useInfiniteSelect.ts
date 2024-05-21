import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import type { UseInfiniteSelectArgs, UseInfiniteSelectReturn } from '../types'
import { useDropDownList } from './useDropdownList'
import useInifiteQueryResultVirtualizer from './useInfiniteQueryResultVirtualizer'
import useOptionSelectorCallback from './useOptionSelectorCallback'
import usePropsGetter from './usePropsGetter'

const DEFAULT_ARIA_ROLE = 'select'

/**
 * Custom hook for handling infinite select functionality.
 *
 * @param {UseInfiniteSelectArgs<TResult, TResultItem>} args - Arguments for the hook.
 * @return {UseInfiniteSelectReturn<TScrollElement, TResultItem>} Object containing select functionality.
 */
export const useInfiniteSelect = <
  TResult,
  TResultItem,
  TScrollElement extends HTMLElement,
>(
  args: UseInfiniteSelectArgs<TResult, TResultItem>
): UseInfiniteSelectReturn<TScrollElement, TResultItem> => {
  const {
    ariaRole = DEFAULT_ARIA_ROLE,
    initialSelectedOption,
    infiniteQueryOptions,
    virtualizerOptions,
    onClose,
    onSelectedOptionChange,
  } = args

  const [selectedOption, setSelectedOption] = useState<TResultItem | undefined>(
    initialSelectedOption
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

  const selectOptionByIndex = useOptionSelectorCallback({
    options,
    dropdownList,
    setSelectedOption,
    onSelectedOptionChange,
  })
  const { getReferenceProps, getFloatingProps, getItemProps } = usePropsGetter({
    dropdownList,
    selectOptionByIndex,
  })

  return {
    virtualizer,
    dropdownList,
    options,
    selectedOption,
    setSelectedOption,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
  }
}
