import { openDB } from 'idb';

const dbPromise = openDB('Articles', 1, {
    upgrade(db) {
        // Create a store of objects
        const store = db.createObjectStore('articles', {
            // The 'id' property of the object will be the key.
            keyPath: 'id',
            // If it isn't explicitly set, create a value by auto incrementing.
            autoIncrement: true,
        });
        // Create an index on the 'date' property of the objects.
        store.createIndex('id', 'id');
    },
});


export async function get<T>(key: IDBKeyRange | IDBValidKey) {
    return (await dbPromise).get('articles', key) as T
}

/**
 * 
 * @param id 
 * @returns 
 */
export async function softDelete(id: string) {
    return (await dbPromise).put('articles', { id, delete: true });
}


/**
 * 
 * @param val 
 * @param hard 
 * @returns 
 */
export async function add<T extends { id: string }>(val: T, hard?: boolean) {
    if (hard) {
        const nextId = await (await dbPromise).count('articles')
        val.id = `${nextId + 1}`;
        return (await dbPromise).add('articles', val);
    }
    const isExist = await (await dbPromise).get('articles', val.id);
    if (!isExist) return (await dbPromise).add('articles', val);
}

/**
 * 
 * @param val 
 * @returns 
 */
export async function update<T>(val: T) {
    return (await dbPromise).put('articles', val);
}

/**
 * 
 * @returns 
 */
export async function getAll<T>(page:number, limit:number) {
    const calcLimit = page * limit
    const calcPage = (page * limit) - limit;
    const data = await (await dbPromise).getAllFromIndex('articles', 'id') as T as any
    const result = data.filter((i: { delete: boolean; }) => !i?.delete).sort((a: { id: string; }, b: { id: string; }) => (parseInt(a.id) > parseFloat(b.id)) ? 1 : -1)
    return result.slice(calcPage, calcLimit)
}
