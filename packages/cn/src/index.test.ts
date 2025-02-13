import fs from 'node:fs'
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'

describe.sequential('suite', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  describe.sequential('use default config', () => {
    describe('combine multiple classes', () => {
      test('cn does not merge unrelated class names', async () => {
        const { default: cn } = await import('./index.ts')
        expect(cn('bg-red-500', 'text-blue-500')).toBe(
          'bg-red-500 text-blue-500'
        )
      })
      test('cn supports multiple arguments', async () => {
        const { default: cn } = await import('./index.ts')
        expect(cn('bg-red-500', 'text-blue-500', 'rounded-md')).toBe(
          'bg-red-500 text-blue-500 rounded-md'
        )
      })
      test('respect priority of the last class and resolve conflict', async () => {
        const { default: cn } = await import('./index.ts')
        expect(cn('bg-red-500 text-white', 'bg-blue-500 text-black')).toBe(
          'bg-blue-500 text-black'
        )
      })
    })

    describe('conditional class application', () => {
      test('should apply classes based on a variable - key/value', async () => {
        const { default: cn } = await import('./index.ts')
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
      test('should apply classes based on a variable - conditional operator `&&`', async () => {
        const { default: cn } = await import('./index.ts')
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
      test('should interpollate a variable', async () => {
        const { default: cn } = await import('./index.ts')
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
    const configFilePath = './cn.config.json'

    beforeEach(() => {
      fs.writeFileSync(configFilePath, '{ "prefix": "tw-" }')
    })

    afterEach(() => {
      fs.unlinkSync(configFilePath)
    })

    describe('combine multiple classes', () => {
      test('cn does not merge unrelated class names', async () => {
        const { default: cn } = await import('./index.ts')
        expect(cn('tw-bg-red-500', 'tw-text-blue-500')).toBe(
          'tw-bg-red-500 tw-text-blue-500'
        )
      })
      test('cn supports multiple arguments', async () => {
        const { default: cn } = await import('./index.ts')
        expect(cn('tw-bg-red-500', 'tw-text-blue-500', 'tw-rounded-md')).toBe(
          'tw-bg-red-500 tw-text-blue-500 tw-rounded-md'
        )
      })
      test('respect priority of the last class and resolve conflict', async () => {
        const { default: cn } = await import('./index.ts')
        expect(
          cn('tw-bg-red-500 tw-text-white', 'tw-bg-blue-500 tw-text-black')
        ).toBe('tw-bg-blue-500 tw-text-black')
      })
    })
  })
})
