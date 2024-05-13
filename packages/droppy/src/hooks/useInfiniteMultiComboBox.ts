import { debounce } from 'lodash-es'
import { useCallback, useState } from 'react'
import type { ChangeEvent, HTMLProps } from 'react'
import type {
  UseInfiniteMultiComboBoxArgs,
  UseInfiniteMutliComboBoxReturn,
} from '../types'
import { useInfiniteMultiSelect } from './useInfiniteMultiSelect'

const DEFAULT_ARIA_ROLE = 'combobox'

/**
 * Custom hook for managing an infinite multi-combobox state.
 *
 * @param {UseInfiniteMultiComboBoxArgs<TResult, TResultItem>} args - The arguments for the hook.
 * @return {UseInfiniteMutliComboBoxReturn<TScrollElement, TResultItem>} The return object containing various functions and states.
 */
export const useInfiniteMultiComboBox = <
  TResult,
  TResultItem,
  TScrollElement extends HTMLElement,
>(
  args: UseInfiniteMultiComboBoxArgs<TResult, TResultItem>
): UseInfiniteMutliComboBoxReturn<TScrollElement, TResultItem> => {
  const {
    getInfiniteQueryOptions,
    virtualizerOptions,
    initialSelectedOptions,
    onClose,
  } = args

  const [searchTerm, setSearchTerm] = useState('')
  const [searchInputValue, setSearchInputValue] = useState('')

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const setSearchTermDebounced = useCallback(debounce(setSearchTerm, 500), [
    setSearchTerm,
  ])

  const getSerchInputProps = (props: HTMLProps<HTMLInputElement>) => ({
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const searchInputValue = e.target.value

      setSearchInputValue(searchInputValue)
      setSearchTermDebounced(searchInputValue)
    },
    value: searchInputValue,
    ...props,
  })

  const clearSearch = useCallback(() => {
    setSearchInputValue('')
    setSearchTerm('')
  }, [])

  const infiniteMultiSelect = useInfiniteMultiSelect<
    TResult,
    TResultItem,
    TScrollElement
  >({
    infiniteQueryOptions: getInfiniteQueryOptions({ searchTerm }),
    virtualizerOptions: virtualizerOptions,
    initialSelectedOptions,
    ariaRole: DEFAULT_ARIA_ROLE,
    onClose: () => {
      clearSearch()
      onClose?.()
    },
  })

  return {
    ...infiniteMultiSelect,
    searchTerm,
    setSearchTerm,
    clearSearch,
    searchInputValue,
    setSearchInputValue,
    setSearchTermDebounced,
    getSerchInputProps,
  }
}
