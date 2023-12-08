export function assert(cond: unknown, message: string) : asserts cond {
    if (!cond) {
        throw new Error(message);
    }
}

export function isKeyOf<O extends Record<string, unknown>>(key: string, object: O) : key is keyof O {
    return Object.keys(object).includes(key);
}