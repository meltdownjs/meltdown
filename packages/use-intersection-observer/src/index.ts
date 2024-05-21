import { useEffect, useRef } from 'react'
import type {
  UseIntersectionObserverArgs,
  UseIntersectionObserverReturn,
} from './types'

const useIntersectionObserver = <
  TRoot extends HTMLElement,
  TTarget extends HTMLElement,
>({
  onIntersect,
  threshold = 1.0,
  rootMargin = '1px',
  enabled = true,
}: UseIntersectionObserverArgs): UseIntersectionObserverReturn<
  TRoot,
  TTarget
> => {
  const rootRef = useRef<TRoot>(null)
  const targetRef = useRef<TTarget>(null)
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
    // eslint-disable-next-line
  }, [targetRef.current, enabled])

  return { rootRef, targetRef }
}

export default useIntersectionObserver
