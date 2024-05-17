import type { ExtendedRefs, ReferenceType } from '@floating-ui/react'
import type {
  DefinedInitialDataInfiniteOptions,
  DefinedUseInfiniteQueryResult,
  UndefinedInitialDataInfiniteOptions,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query'
import type { VirtualItem } from '@tanstack/react-virtual'
import { DebouncedFunc } from 'lodash-es'
import type {
  ButtonHTMLAttributes,
  CSSProperties,
  Dispatch,
  HTMLAttributes,
  HTMLProps,
  MutableRefObject,
  ReactNode,
  RefObject,
  SetStateAction,
} from 'react'

export type Item<T> = {
  key: string
  value: T
}

export type GetInfiniteQueryOptionsArgs = {
  searchTerm: string
}

export type GetInfiniteQueryOptions<TResult, TResultItem> = (
  args: GetInfiniteQueryOptionsArgs
) =>
  | DefinedInitialDataInfiniteOptions<TResult, Error, TResultItem[]>
  | UndefinedInitialDataInfiniteOptions<TResult, Error, TResultItem[]>
  | UseInfiniteQueryOptions<TResult, Error, TResultItem[]>

type VirtualizerOptions = {
  overscan?: number
  estimateSize?: number
}

type BaseUseSelectArgs<TOption> = {
  virtualizerOptions?: VirtualizerOptions
  initialSelectedOption?: TOption
  onClose?: () => void
  onSelectedOptionChange?: (selectedOption: TOption | undefined) => void
}

type BaseUseSelectReturn<TScrollElement extends HTMLElement, TOption> = {
  virtualizer: UseInifiteQueryResultVirtualizerReturn<TScrollElement>
  dropdownList: UseDropDownListReturn
  selectedOption: TOption | undefined
  setSelectedOption: Dispatch<SetStateAction<TOption | undefined>>
  getReferenceProps: (props: HTMLProps<Element>) => Record<string, unknown>
  getFloatingProps: (props: HTMLProps<Element>) => Record<string, unknown>
  getItemProps: (
    props?: HTMLProps<HTMLElement>,
    virtualItem?: VirtualItem
  ) => Record<string, unknown>
}

type BaseUseMultiSelectArgs<TOption> = {
  virtualizerOptions?: VirtualizerOptions
  initialSelectedOptions?: TOption[]
  onClose?: () => void
  onSelectedOptionsChange?: (selectedOptions: TOption[]) => void
}

type BaseUseMultiSelectReturn<TScrollElement extends HTMLElement, TOption> = {
  virtualizer: UseInifiteQueryResultVirtualizerReturn<TScrollElement>
  dropdownList: UseDropDownListReturn
  selectedOptions: TOption[]
  setSelectedOptions: Dispatch<SetStateAction<TOption[]>>
  getReferenceProps: (props: HTMLProps<Element>) => Record<string, unknown>
  getFloatingProps: (props: HTMLProps<Element>) => Record<string, unknown>
  getItemProps: (
    props?: HTMLProps<HTMLElement>,
    virtualItem?: VirtualItem
  ) => Record<string, unknown>
}

type BaseComboBox = {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
  clearSearch: () => void
  searchInputValue: string
  setSearchInputValue: Dispatch<SetStateAction<string>>
  setSearchTermDebounced: DebouncedFunc<Dispatch<SetStateAction<string>>>
  getSerchInputProps: (
    props: HTMLProps<HTMLInputElement>
  ) => Record<string, unknown>
}

export type OptionProps = {
  children: ReactNode
  activeIndex: number
  index: number
  asChild?: boolean
  listRef: MutableRefObject<HTMLElement[]>
  measureElement?: (node: Element | null) => void
} & HTMLAttributes<HTMLElement>

export type UseDropDownListArgs = {
  onClose?: () => void
  ariaRole?: 'select' | 'combobox'
}

type UseDropDownListReturn = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  refs: ExtendedRefs<ReferenceType>
  listRef: MutableRefObject<HTMLElement[]>
  activeIndex: number
  getFloatingProps: (
    userProps?: HTMLProps<HTMLElement>
  ) => Record<string, unknown>
  getReferenceProps: (userProps?: HTMLProps<Element>) => Record<string, unknown>
  getItemProps: (
    userProps?: Omit<HTMLProps<HTMLElement>, 'selected' | 'active'> & {
      active?: boolean
      selected?: boolean
    }
  ) => Record<string, unknown>
  floatingStyles: CSSProperties
}

export type UseInifiteQueryResultVirtualizerArgs<TResultItem> = {
  infiniteQueryResult:
    | UseInfiniteQueryResult<TResultItem[]>
    | DefinedUseInfiniteQueryResult<TResultItem[]>
  virtualizerOptions?: VirtualizerOptions
}

type UseInifiteQueryResultVirtualizerReturn<
  TScrollElement extends HTMLElement,
> = {
  virtualItems: VirtualItem[]
  scrollElementRef: RefObject<TScrollElement>
  measureElement: (node: Element | null) => void
  getTotalSize: () => number
}

export type UseInfiniteSelectArgs<TResult, TResultItem> = {
  infiniteQueryOptions:
    | DefinedInitialDataInfiniteOptions<TResult, Error, TResultItem[]>
    | UndefinedInitialDataInfiniteOptions<TResult, Error, TResultItem[]>
    | UseInfiniteQueryOptions<TResult, Error, TResultItem[]>
  ariaRole?: 'combobox'
} & BaseUseSelectArgs<TResultItem>

type UseInfiniteSelectReturn<TScrollElement extends HTMLElement, TOption> = {
  options: TOption[]
} & BaseUseSelectReturn<TScrollElement, TOption>

export type UseInfiniteComboBoxArgs<TResult, TResultItem> = {
  getInfiniteQueryOptions: GetInfiniteQueryOptions<TResult, TResultItem>
} & BaseUseSelectArgs<TResultItem>

export type UseInfiniteComboBoxReturn<
  TScrollElement extends HTMLElement,
  TOption,
> = UseInfiniteSelectReturn<TScrollElement, TOption> & BaseComboBox

export type UseSelectArgs<TOption> = {
  options: TOption[]
} & BaseUseSelectArgs<TOption>

export type UseSelectReturn<
  TScrollElement extends HTMLElement,
  TOption,
> = BaseUseSelectReturn<TScrollElement, TOption>

export type UseInfiniteMultiSelectArgs<TResult, TResultItem> = {
  infiniteQueryOptions:
    | DefinedInitialDataInfiniteOptions<TResult, Error, TResultItem[]>
    | UndefinedInitialDataInfiniteOptions<TResult, Error, TResultItem[]>
    | UseInfiniteQueryOptions<TResult, Error, TResultItem[]>
  ariaRole?: 'combobox'
} & BaseUseMultiSelectArgs<TResultItem>

type UseInfiniteMultiSelectReturn<
  TScrollElement extends HTMLElement,
  TOption,
> = {
  options: TOption[]
} & BaseUseMultiSelectReturn<TScrollElement, TOption>

export type UseInfiniteMultiComboBoxArgs<TResult, TResultItem> = {
  getInfiniteQueryOptions: GetInfiniteQueryOptions<TResult, TResultItem>
} & BaseUseMultiSelectArgs<TResultItem>

export type UseInfiniteMutliComboBoxReturn<
  TScrollElement extends HTMLElement,
  TOption,
> = UseInfiniteMultiSelectReturn<TScrollElement, TOption> & BaseComboBox

export type UseMultiSelectArgs<TOption> = {
  options: TOption[]
} & BaseUseMultiSelectArgs<TOption>

export type UseMultiSelectReturn<
  TScrollElement extends HTMLElement,
  TOption,
> = BaseUseMultiSelectReturn<TScrollElement, TOption>

export type UseOtpionSelectorCallbackArgs<TOption> = {
  options: TOption[]
  dropdownList: UseDropDownListReturn
  setSelectedOption: Dispatch<SetStateAction<TOption | undefined>>
  onSelectedOptionChange?: (selected: TOption) => void
}

export type UseOtpionSelectorCallbackReturn = (index: number) => void

export type UseMultiOptionSelectorCallbackArgs<TOption> = {
  options: TOption[]
  selectedOptions: TOption[]
  setSelectedOptions: Dispatch<SetStateAction<TOption[]>>
  onSelectedOptionsChange?: (selectedOptions: TOption[]) => void
}

export type UseMultiOptionSelectorCallbackReturn = (index: number) => void

export type UsePropsGetterArgs = {
  dropdownList: UseDropDownListReturn
  selectOptionByIndex: (index: number) => void
}

export type UsePropsGetterReturn = {
  getReferenceProps: (props: HTMLProps<Element>) => Record<string, unknown>
  getFloatingProps: (props: HTMLProps<Element>) => Record<string, unknown>
  getItemProps: (
    props?: HTMLProps<HTMLElement>,
    virtualItem?: VirtualItem
  ) => Record<string, unknown>
}
