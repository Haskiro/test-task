const TreeStor = require("./task.ts");

const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];


const ts = new TreeStor(items);

describe("getAll function:", () => {
    test("should return original list", () => {
        expect(ts.getAll()).toBe(items);
    });
})

describe("getItem function:", () => {
    test("should return item by id if exists", () => {
        expect(ts.getItem(2)).toEqual({ id: 2, parent: 1, type: 'test' });
        expect(ts.getItem(3)).toEqual({ id: 3, parent: 1, type: 'test' });
    });

    test("should return undefined if item not exists", () => {
        expect(ts.getItem(9)).toBeUndefined();
    })
})

describe("getChildren function:", () => {
    test("should return array of childrens by parent id", () => {
        expect(ts.getChildren(4)).toEqual([
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null }
        ]);
        expect(ts.getChildren(2)).toEqual([
            { id: 4, "parent": 2, type: "test" },
            { id: 5, "parent": 2, type: "test" },
            { id: 6, "parent": 2, type: "test" }
        ]);
    });
    test("should return [] if there are no children", () => {
        expect(ts.getChildren(5)).toEqual([]);
    });
})

describe("getAllChildren function:", () => {
    test("should return array of childrens and their childrens by id", () => {
        expect(ts.getAllChildren(2)).toEqual([
            { id: 4, parent: 2, type: 'test' },
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null },
            { id: 5, parent: 2, type: 'test' },
            { id: 6, parent: 2, type: 'test' }
        ]);
        expect(ts.getAllChildren(4)).toEqual([
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null }
        ]);
    });
    test("should return [] if there are no children", () => {
        expect(ts.getChildren(5)).toEqual([]);
    });
})

describe("getAllParents function:", () => {
    test("should return a chain of parent and child elements from the given element to the root", () => {
        expect(ts.getAllParents(7)).toEqual([
            { id: 7, parent: 4, type: null },
            { id: 4, parent: 2, type: 'test' },
            { id: 2, parent: 1, type: 'test' },
            { id: 1, parent: 'root' }
        ]);
        expect(ts.getAllParents(2)).toEqual([
            { id: 2, parent: 1, type: 'test' },
            { id: 1, parent: 'root' }
        ]);
    });
    test("should return only root element if given id is of it", () => {
        expect(ts.getAllParents(1)).toEqual([{ id: 1, parent: 'root' }]);
    });
    test("should return [] if item is not exists", () => {
        expect(ts.getAllParents(10)).toEqual([]);
    });
})