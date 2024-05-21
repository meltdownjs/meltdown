# @meltdown/use-intersection-observer

To install dependencies:

```bash
bun install @meltdownjs/use-intersection-observer
```

```bash
yarn add @meltdownjs/use-intersection-observer
```

```bash
bun add @meltdownjs/use-intersection-observer
```

## Usage
The useIntersectionObserver hook takes an object with the following properties:



Here's an example of how to use the hook:

### Example

```javascript
import React from 'react';
import useIntersectionObserver from '@meltdownjs/use-intersection-observer';

const MyComponent = () => {
  const targetRef = React.useRef(null);

  useIntersectionObserver({
    target: targetRef,
    onIntersect: () => {
      console.log('Element is intersecting with the viewport');
```

## API
#### `useIntersectionObserver: <TRoot, TTarget>(args: UseIntersectionObserverArgs) => UseIntersectionObserverReturn<TRoot, TTarget>`

The useIntersectionObserver hook takes an object with the following Parameters:

#### Parameter `UseIntersectionObserverArgs`
- `onIntersect`: A callback function that is called when the element intersects with the root.
- `threshold`: The intersection ratio that triggers the onIntersect callback. Defaults to 1.0.
- `rootMargin`: The margin around the root. Defaults to "1px".
- `enabled`: Whether the observer is enabled. Defaults to true.

#### Returns `UseIntersectionObserverReturn`
- `rootRef`: The root element to observe. If not provided, the viewport is used.
- `targetRef`: The element to observe.