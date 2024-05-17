import { useCallback } from 'react'
import type {
  UseOtpionSelectorCallbackArgs,
  UseOtpionSelectorCallbackReturn,
} from '../types'

/**
 * A custom hook for handling the selection of options.
 *
 * @param {UseOtpionSelectorCallbackArgs<TOption>} args - Object containing options, dropdownList, setSelectedOption, and onSelectedOptionChange
 * @return {UseOtpionSelectorCallbackReturn} A callback function for handling option selection
 */
const useOptionSelectorCallback = <TOption>(
  args: UseOtpionSelectorCallbackArgs<TOption>
): UseOtpionSelectorCallbackReturn => {
  const {
    options,
    dropdownList,
    setSelectedOption: setSelectedOption,
    onSelectedOptionChange,
  } = args

  return useCallback(
    (index: number) => {
      setSelectedOption(options[index])
      dropdownList.setIsOpen(false)
      onSelectedOptionChange?.(options[index])
    },
    [options, dropdownList, onSelectedOptionChange, setSelectedOption]
  )
}

export default useOptionSelectorCallback
