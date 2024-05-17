import { cloneElement, isValidElement, useEffect } from 'react'
import type { OptionProps } from '../types'

export const Option = (props: OptionProps) => {
  const {
    children,
    activeIndex,
    asChild,
    listRef,
    index,
    measureElement,
    ...rest
  } = props
  const tabIndex = activeIndex === index ? 0 : -1
  const ref = (instance: HTMLElement | null) => {
    if (instance === null) {
      return
    }

    listRef.current[index] = instance
    measureElement?.(instance)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    return () => {
      delete listRef.current[index]
    }
  }, [])

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...rest,
      ...children.props,
      ref,
      tabIndex,
    })
  }

  return (
    <li {...rest} ref={ref} tabIndex={tabIndex}>
      {children}
    </li>
  )
}
