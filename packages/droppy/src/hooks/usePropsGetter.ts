import type { VirtualItem } from '@tanstack/react-virtual'
import type { HTMLProps, KeyboardEvent } from 'react'
import type { UsePropsGetterArgs, UsePropsGetterReturn } from '../types'

/**
 * Custom hook to get props for a dropdown list.
 *
 * @param {UsePropsGetterArgs} args - Object containing dropdownList and selectOptionByIndex
 * @return {UsePropsGetterReturn} Object containing functions to get reference props, floating props, and item props
 */
const usePropsGetter = (args: UsePropsGetterArgs): UsePropsGetterReturn => {
  const { dropdownList, selectOptionByIndex } = args

  const getReferenceProps = (props: HTMLProps<Element>) =>
    dropdownList.getReferenceProps({
      ...props,
      ref: dropdownList.refs.setReference,
    })

  const getFloatingProps = (props: HTMLProps<Element>) =>
    dropdownList.getFloatingProps({
      style: dropdownList.floatingStyles,
      ...props,
      ref: dropdownList.refs.setFloating,
    })

  const getItemProps = (
    props?: HTMLProps<HTMLElement>,
    virtualItem?: VirtualItem
  ): Record<string, unknown> => {
    const eventHandlers =
      virtualItem !== undefined
        ? {
            onClick: () => {
              selectOptionByIndex(virtualItem.index)
            },
            onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
              if (event.key !== 'Enter') {
                return
              }

              selectOptionByIndex(virtualItem.index)
            },
          }
        : {}

    return dropdownList.getItemProps({
      ...props,
      ...eventHandlers,
    })
  }

  return {
    getReferenceProps,
    getFloatingProps,
    getItemProps,
  }
}

export default usePropsGetter
