import type { Item } from './types'

/**
 * Checks if two objects are equal by comparing their stringified versions.
 *
 * @param {T} object1 - The first object to compare.
 * @param {T} object2 - The second object to compare.
 * @return {boolean} Returns true if the objects are equal, false otherwise.
 */
export const isEqual = <T>(object1: T, object2: T): boolean => {
  return JSON.stringify(object1) === JSON.stringify(object2)
}

/**
 * Checks if the first object is part of the array of objects by comparing them using isEqual function.
 *
 * @param {T} object1 - The object to check for.
 * @param {T[]} objects - The array of objects to check against.
 * @return {boolean} Returns true if the object is part of the array, false otherwise.
 */
export const isPartOf = <T>(object1: T, objects: T[]): boolean => {
  return objects.findIndex((object2: T) => isEqual(object1, object2)) !== -1
}

/**
 * Transforms a record into an array of items containing keys and values.
 *
 * @param {Record<string, T>} record - The record to transform into items.
 * @return {Item<T>[]} The array of items with keys and values.
 */
export const transformRecordToItems = <T>(
  record: Record<string, T>
): Item<T>[] => {
  const items = []
  const keys = Object.keys(record)

  for (const key of keys) {
    items.push({
      key,
      value: record[key],
    })
  }

  return items
}
