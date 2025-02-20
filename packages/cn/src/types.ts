import type { ClassValue } from 'clsx'

export type Cn = (...args: ClassValue[]) => string

export interface CnConfigInterface {
  prefix: string
}

export type CreateCn = (config: CnConfigInterface) => Cn
