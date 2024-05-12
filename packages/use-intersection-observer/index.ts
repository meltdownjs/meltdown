import { useEffect } from "react";

type useIntersectionObserverProps = {
  root: any;
  target: any;
  onIntersect: () => void;
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
};

const useIntersectionObserver = ({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = "1px",
  enabled = true,
}: useIntersectionObserverProps) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
    // eslint-disable-next-line
  }, [target.current, enabled]);
};

export default useIntersectionObserver;
