export function memo<Args extends unknown[], Ret>(f: (...args: Args) => Ret) {
    const cache = new Map<string, Ret>();

    return (...args: Args) : Ret => {
        const key = JSON.stringify(args);
        let value = cache.get(key);
        if (value) {
            return value;
        }
        value = f(...args);

        cache.set(key, value);
        return value;
    }
}