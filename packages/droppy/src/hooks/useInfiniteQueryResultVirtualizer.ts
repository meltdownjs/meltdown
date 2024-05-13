import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useRef } from 'react'
import { DEFAULT_ESTIMATE_SIZE, DEFAULT_OVERSCAN } from '../constants'
import type {
  UseInifiteQueryResultVirtualizerArgs,
  UseInifiteQueryResultVirtualizerReturn,
} from '../types'

/**
 * Custom hook for virtualizing infinite query result items.
 *
 * @param {UseInifiteQueryResultVirtualizerArgs<TResultItem>} args - The arguments for virtualizing the query result items.
 * @return {UseInifiteQueryResultVirtualizerReturn<TScrollElement>} Object containing virtualized items and scroll element reference.
 */
const useInifiteQueryResultVirtualizer = <
  TScrollElement extends HTMLElement,
  TResultItem,
>(
  args: UseInifiteQueryResultVirtualizerArgs<TResultItem>
): UseInifiteQueryResultVirtualizerReturn<TScrollElement> => {
  const scrollElementRef = useRef<TScrollElement>(null)
  const { infiniteQueryResult, virtualizerOptions } = args
  const data = infiniteQueryResult.data || []

  const virtualizer = useVirtualizer({
    overscan: virtualizerOptions?.overscan || DEFAULT_OVERSCAN,
    estimateSize: () =>
      virtualizerOptions?.estimateSize || DEFAULT_ESTIMATE_SIZE,
    count: infiniteQueryResult.hasNextPage ? data.length + 1 : data.length,
    getScrollElement: () => scrollElementRef?.current,
  })

  const virtualItems = virtualizer.getVirtualItems()

  useEffect(() => {
    const [lastItem] = [...virtualItems].reverse()

    if (!lastItem) {
      return
    }

    if (data.length <= 0) {
      return
    }

    if (
      lastItem.index >= data.length - 1 &&
      infiniteQueryResult.hasNextPage &&
      !infiniteQueryResult.isFetchingNextPage
    ) {
      infiniteQueryResult.fetchNextPage()
    }
  }, [
    infiniteQueryResult.hasNextPage,
    infiniteQueryResult.fetchNextPage,
    data.length,
    infiniteQueryResult.isFetchingNextPage,
    virtualItems,
  ])

  return {
    virtualItems,
    scrollElementRef,
    getTotalSize: virtualizer.getTotalSize,
    measureElement: virtualizer.measureElement,
  }
}

export default useInifiteQueryResultVirtualizer
