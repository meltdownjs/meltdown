import { useEffect, useRef } from 'react'
import type {
  UseIntersectionObserverArgs,
  UseIntersectionObserverReturn,
} from './types'

const useIntersectionObserver = <
  TRoot extends HTMLElement,
  TTarget extends HTMLElement,
>(
  args: UseIntersectionObserverArgs
): UseIntersectionObserverReturn<TRoot, TTarget> => {
  const {
    onIntersect,
    threshold = 1.0,
    rootMargin = '1px',
    enabled = true,
  } = args
  const rootRef = useRef<TRoot>(null)
  const targetRef = useRef<TTarget>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: onIntersect, threshold & rootMargin are to be neglected. Do not tend to change at runtime.
  useEffect(() => {
    if (!enabled) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: rootRef && rootRef.current,
        rootMargin,
        threshold,
      }
    )

    const el = targetRef && targetRef.current

    if (!el) {
      return
    }

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  }, [rootRef.current, targetRef.current, enabled])

  return { rootRef, targetRef }
}

export default useIntersectionObserver
