import { debounce } from 'lodash-es'
import { useCallback, useState } from 'react'
import type { ChangeEvent, HTMLProps } from 'react'
import type {
  UseInfiniteComboBoxArgs,
  UseInfiniteComboBoxReturn,
} from '../types'
import { useInfiniteSelect } from './useInfiniteSelect'

const DEFAULT_ARIA_ROLE = 'combobox'

/**
 * Custom hook for managing an infinite combo box state.
 *
 * @param {UseInfiniteComboBoxArgs<T, U>} args - The arguments for the hook.
 * @return {UseInfiniteComboBoxReturn<V, U>} The return object containing various functions and states.
 */
export const useInfiniteComboBox = <T, U, V extends HTMLElement>(
  args: UseInfiniteComboBoxArgs<T, U>
): UseInfiniteComboBoxReturn<V, U> => {
  const {
    getInfiniteQueryOptions,
    virtualizerOptions,
    initialSelectedOption,
    onClose,
    onSelectedOptionChange,
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

  const infiniteSelect = useInfiniteSelect<T, U, V>({
    infiniteQueryOptions: getInfiniteQueryOptions({ searchTerm }),
    virtualizerOptions,
    initialSelectedOption,
    ariaRole: DEFAULT_ARIA_ROLE,
    onClose: () => {
      clearSearch()
      onClose?.()
    },
    onSelectedOptionChange: (selected: U | undefined) => {
      clearSearch()
      onSelectedOptionChange?.(selected)
    },
  })

  return {
    ...infiniteSelect,
    searchTerm,
    setSearchTerm,
    clearSearch,
    searchInputValue,
    setSearchInputValue,
    setSearchTermDebounced,
    getSerchInputProps,
  }
}
