# @meltdownjs/cn

`@meltdownjs/cn` is a utility function for combining multiple CSS class names into a single string while also resolving any conflicting classes. It is a wrapper around two popular packages for working with CSS classes: `clsx` and `tailwind-merge`.

## Installation

You can install `@meltdownjs/cn` via npm or yarn or bun:

```bash
npm install @meltdownjs/cn
```

```bash
yarn add @meltdownjs/cn
```

```bash
bun add @meltdownjs/cn
```

## Usage

`@meltdownjs/cn` works similarly to `clsx`, allowing you to pass in an array of class names as arguments. It then merges these class names into a single string, resolving any conflicts using `tailwind-merge`. If you're using Tailwind CSS without any extra config, you can use `@meltdownjs/cn` right away. Otherwise, add a configuration file `cn.config.json` to your project. For more information jump to the configuration section.

These examples illustrate different ways you can use @meltdownjs/cn to manage CSS classes in your application.

### Example 1: Combining Multiple Classes

This example combines various Tailwind CSS classes to style a button element. The resulting string contains all the classes merged without any conflicts.

```javascript
import cn from '@meltdownjs/cn';

const buttonClasses = cn(
  'bg-blue-500',
  'text-white',
  'font-bold',
  'rounded-md',
  'hover:bg-blue-700',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-blue-500',
  'focus:ring-opacity-50'
);

// Result: 'bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
```

### Example 2: Conditional Class Application

This example demonstrates how to conditionally apply classes based on a variable (isActive). If isActive is true, the 'font-bold' class is applied; otherwise, the 'opacity-50' class is applied.

```javascript
import cn from '@meltdownjs/cn';

const isActive = true;
const buttonClasses = cn(
  'bg-blue-500',
  'text-white',
  {
    'font-bold': isActive,
    'opacity-50': !isActive,
  },
  'rounded-md',
  'hover:bg-blue-700',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-blue-500',
  'focus:ring-opacity-50'
);

// Result (if isActive is true): 'bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'

// Result (if isActive is false): 'bg-blue-500 text-white opacity-50 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
```

### Example 3: Dynamic Class Names

This example showcases how to use dynamic class names by interpolating a variable (buttonSize) into the class string. The resulting class name changes based on the value of buttonSize.

```javascript
import cn from '@meltdownjs/cn';

const buttonSize = 'large';
const buttonClasses = cn(
  'bg-blue-500',
  'text-white',
  `text-${buttonSize}`,
  'rounded-md',
  'hover:bg-blue-700',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-blue-500',
  'focus:ring-opacity-50'
);

// Result (if buttonSize is 'large'): 'bg-blue-500 text-white text-large rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'

// Result (if buttonSize is 'small'): 'bg-blue-500 text-white text-small rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
```

## API
#### `cn(...args: ClassValue[]): string`

Combines multiple CSS class names into a single string.

#### Parameters
- `args: ClassValue[]` - An array of class names to combine.

#### Returns
- `string` - A single string containing all the merged class names.

## Configuration

```json
{
  // ↓ Set how many values should be stored in cache.
  "cacheSize": 500,
  // ↓ Optional prefix from Tailwind config
  "prefix": "tw",
  "theme": {
    // Theme scales are defined here
  },
  "classGroups": {
    // Class groups are defined here
  },
  "conflictingClassGroups": {
    // Conflicts between class groups are defined here
  },
  "conflictingClassGroupModifiers": {
    // Conflicts between postfix modifier of a class group and another class group are defined here
  },
  "orderSensitiveModifiers": [
    // Modifiers whose order among multiple modifiers should be preserved because their order
    // changes which element gets targeted.
  ]
}
```

## How it Works
`@meltdownjs/cn` internally utilizes `clsx` to construct an array of class names and then uses `tailwind-merge` to merge any conflicting classes. This ensures that the resulting string of class names is optimized and does not contain redundant or conflicting styles.

## Links
- [GitHub - clsx](https://github.com/lukeed/clsx): For more information on clsx.
- [GitHub - tailwind-merge](https://github.com/dcastil/tailwind-merge): For more information on tailwind-merge.
- [tailwind-merge Discussion](https://github.com/dcastil/tailwind-merge/discussions/137#discussioncomment-3482513): Creators' suggestions and discussions on tailwind-merge.