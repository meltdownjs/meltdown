import { describe, expect, it } from "vitest";
import { isEqual, isPartOf, transformRecordToItems } from "./utils";

describe('isEqual', () => {
    it('should return false when objects are not equal', () => {
        const obj1 = { id: 1, name: 'foo' }
        const obj2 = { id: 2, name: 'bar' }

        expect(isEqual(obj1, obj2)).toBe(false)
    })

    it('should return true when objects are equal', () => {
        const obj1 = { id: 1, name: 'foo' }
        const obj2 = { id: 1, name: 'foo' }

        expect(isEqual(obj1, obj2)).toBe(true)
    })
})

describe('isPartOf', () => {
    it('should find object in collection', () => {
        const obj = { id: 1, name: 'foo' }
        const collection = [
            obj,
            { id: 2, name: 'bar' }
        ]


        expect(isPartOf(obj, collection)).toBe(true)
    })

    it('should not find object in collection', () => {
        const obj = { id: 3, name: 'oof' }
        const collection = [
            { id: 1, name: 'foo' },
            { id: 2, name: 'bar' }
        ]


        expect(isPartOf(obj, collection)).toBe(false)
    })
})

describe('transformRecordToItems', () => {
    it('should transform record with to entries into items', () => {
        const record = {
            foo: "Foo",
            bar: "Bar"
        }

        const items = transformRecordToItems<string>(record)

        expect(items).toHaveLength(2)
        expect(items[0].key).toBe("foo")
        expect(items[0].value).toBe("Foo")
        expect(items[1].key).toBe("bar")
        expect(items[1].value).toBe("Bar")
    })
})