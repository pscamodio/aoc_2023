export function assert(cond: unknown, message: string) : asserts cond {
    if (!cond) {
        throw new Error(message);
    }
}

export function isKeyOf<O extends Record<string, unknown>>(key: string | number | symbol, object: O) : key is keyof O {
    assert(typeof key === "string", "key myst be a string");
    return Object.keys(object).includes(key);
}