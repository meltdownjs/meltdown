import { useCallback } from 'react'
import type {
  UseMultiOptionSelectorCallbackArgs,
  UseMultiOptionSelectorCallbackReturn,
} from '../types'

/**
 * Custom hook for handling multi-option selection callback.
 *
 * @param {UseMultiOptionSelectorCallbackArgs<TOption>} args - Object containing options, selectedOptions, setSelectedOptions, and onSelectedOptionsChange
 * @return {UseMultiOptionSelectorCallbackReturn} A callback function for handling multi-option selection
 */
const useMultiOptionSelectorCallback = <TOption>(
  args: UseMultiOptionSelectorCallbackArgs<TOption>
): UseMultiOptionSelectorCallbackReturn => {
  const {
    options,
    selectedOptions,
    setSelectedOptions,
    onSelectedOptionsChange,
  } = args

  return useCallback(
    (index: number) => {
      const toggledOption = options[index]
      const selectedOptionIndex = selectedOptions.findIndex(
        (selectedOption: TOption) =>
          JSON.stringify(selectedOption) === JSON.stringify(toggledOption)
      )

      if (selectedOptionIndex !== -1) {
        const updatedSelectedOptions = [...selectedOptions]

        updatedSelectedOptions.splice(selectedOptionIndex, 1)
        setSelectedOptions(updatedSelectedOptions)
        onSelectedOptionsChange?.(updatedSelectedOptions)

        return
      }

      const updatedSelectedOptions = [...selectedOptions, toggledOption]

      setSelectedOptions(updatedSelectedOptions)
      onSelectedOptionsChange?.(updatedSelectedOptions)
    },
    [options, selectedOptions, setSelectedOptions, onSelectedOptionsChange]
  )
}

export default useMultiOptionSelectorCallback
