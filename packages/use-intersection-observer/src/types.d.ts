import type { GetEffectiveTypeRootsHost } from 'typescript'

export type UseIntersectionObserverArgs = {
  onIntersect: () => void
  threshold?: number
  rootMargin?: string
  enabled?: boolean
}

export type UseIntersectionObserverReturn<
  TRoot extends HTMLElement,
  TTarget extends HTMLElement,
> = {
  rootRef: RefObject<TRoot>
  targetRef: RefObject<TTarget>
}
