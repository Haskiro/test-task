type Id = number | string;

interface Elem {
    id: Id,
    parent: number | string,
    type?: any
}

class TreeStore {
    items: Elem[]

    constructor(items: Elem[]) {
        this.items = items;
    };

    getAll(): Elem[] {
        return this.items;
    }

    getItem(id: Id): Elem | undefined {
        return this.items.find(item => item.id == id);
    }

    getChildren(id: Id): Elem[] {
        return this.items.filter(item => item.parent == id);
    }

    getAllChildren(id: Id): Elem[] {
        let result: Elem[] = [];
        this.items.forEach((item: Elem) => {
            if (item.parent != id) return;
            result.push(item, ...this.getAllChildren(item.id));
        });

        return result;
    }

    getAllParents(id: Id): Elem[] {
        let result: Elem[] = [];
        const currentItem = this.getItem(id);
        this.items.forEach(item => {
            if (item.id != id || !currentItem) return;
            result.push(item, ...this.getAllParents(currentItem.parent));
        })

        return result;
    }
}

module.exports = TreeStore;