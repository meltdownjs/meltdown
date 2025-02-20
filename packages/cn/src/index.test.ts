import { describe, test, expect } from 'vitest'
import cn, { createCn } from './index.ts'

describe.sequential('suite', () => {
  describe.sequential('use default config', () => {
    describe('combine multiple classes', () => {
      test('cn does not merge unrelated class names', () => {
        expect(cn('bg-red-500', 'text-blue-500')).toBe(
          'bg-red-500 text-blue-500'
        )
      })
      test('cn supports multiple arguments', () => {
        expect(cn('bg-red-500', 'text-blue-500', 'rounded-md')).toBe(
          'bg-red-500 text-blue-500 rounded-md'
        )
      })
      test('respect priority of the last class and resolve conflict', () => {
        expect(cn('bg-red-500 text-white', 'bg-blue-500 text-black')).toBe(
          'bg-blue-500 text-black'
        )
      })
    })

    describe('conditional class application', () => {
      test('should apply classes based on a variable - key/value', () => {
        let isActive = true
        expect(
          cn('bg-red-500 text-blue-500 rounded-md', {
            'bg-blue-400 text-red-400': isActive,
            'font-bold': !isActive,
          })
        ).toBe('rounded-md bg-blue-400 text-red-400')
        isActive = false
        expect(
          cn('bg-red-500 text-blue-500 rounded-md', {
            'bg-blue-400 text-red-400': isActive,
            'font-bold': !isActive,
          })
        ).toBe('bg-red-500 text-blue-500 rounded-md font-bold')
      })
      test('should apply classes based on a variable - conditional operator `&&`', () => {
        let isActive = true
        expect(
          cn(
            'bg-red-500 text-blue-500 rounded-md',
            isActive && 'bg-blue-400 text-red-400',
            !isActive && 'font-bold'
          )
        ).toBe('rounded-md bg-blue-400 text-red-400')
        isActive = false
        expect(
          cn(
            'bg-red-500 text-blue-500 rounded-md',
            isActive && 'bg-blue-400 text-red-400',
            !isActive && 'font-bold'
          )
        ).toBe('bg-red-500 text-blue-500 rounded-md font-bold')
      })
    })

    describe('dynamic class names', () => {
      test('should interpollate a variable', () => {
        let buttonColor = 'blue'
        expect(cn('text-blue-500 rounded-md', `bg-${buttonColor}-400`)).toBe(
          'text-blue-500 rounded-md bg-blue-400'
        )
        buttonColor = 'red'
        expect(cn('text-blue-500 rounded-md', `bg-${buttonColor}-400`)).toBe(
          'text-blue-500 rounded-md bg-red-400'
        )
      })
    })
  })

  describe.sequential('use custom config', () => {
    const customCn = createCn({ prefix: 'tw-' })

    describe('combine multiple classes', () => {
      test('cn does not merge unrelated class names', () => {
        expect(customCn('tw-bg-red-500', 'tw-text-blue-500')).toBe(
          'tw-bg-red-500 tw-text-blue-500'
        )
      })
      test('cn supports multiple arguments', () => {
        expect(
          customCn('tw-bg-red-500', 'tw-text-blue-500', 'tw-rounded-md')
        ).toBe('tw-bg-red-500 tw-text-blue-500 tw-rounded-md')
      })
      test('respect priority of the last class and resolve conflict', () => {
        expect(
          customCn(
            'tw-bg-red-500 tw-text-white',
            'tw-bg-blue-500 tw-text-black'
          )
        ).toBe('tw-bg-blue-500 tw-text-black')
      })
    })
  })
})
