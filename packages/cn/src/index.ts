import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import fs from 'node:fs'
import {
  ClassNameValue,
  createTailwindMerge,
  getDefaultConfig,
} from 'tailwind-merge'

let twMerge: ((...classLists: ClassNameValue[]) => string) | undefined =
  undefined

/**
 * Combines multiple className strings together,
 * merging them into a single string.
 *
 * @remarks
 * This function is a wrapper around `clsx` and `twMerge`,
 * which are both popular packages for working with CSS classes.
 * clsx (constructing classes) --> twMerge (merge conflicting classes)
 *
 * `clsx` is used to construct a new array of class names from the arguments provided.
 * `twMerge` is then used to merge any conflicting class names together.
 *
 * For example, passing in the arguments `["bg-red-500", "bg-blue-500"]` would result in the string `"bg-red-500 bg-blue-500"`.
 * However, if both of those classes have the same styles, `twMerge` will merge them into a single class, like so: `"bg-purple-500"`.
 *
 * @param args - The class names to combine.
 * @returns A single string of all the merged class names.
 *
 * @see {@link https://github.com/lukeed/clsx} for more information on `clsx`.
 * @see {@link https://github.com/dcastil/tailwind-merge} for more information on `twMerge`.
 * @see {@link https://github.com/dcastil/tailwind-merge/discussions/137#discussioncomment-3482513} for more information on `twMerge`-Creators suggestion.
 */
const cn = (...args: ClassValue[]) => {
  if (twMerge !== undefined) {
    return twMerge(clsx(args))
  }

  try {
    if (!fs.existsSync(`${process.cwd()}/cn.config.json`)) {
      throw new Error('Config file does not exists')
    }

    const cnJson = fs.readFileSync(`${process.cwd()}/cn.config.json`)
    const cnConfig = JSON.parse(cnJson.toString())

    twMerge = createTailwindMerge(() => {
      const defaultConfig = getDefaultConfig()

      return { ...defaultConfig, ...cnConfig }
    })
  } catch {
    twMerge = createTailwindMerge(getDefaultConfig)
  }

  return twMerge(clsx(args))
}

export default cn
