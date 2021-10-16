
export function generateRandomId() {
    return `${new Date().getTime()}-${String(Math.random()).substring(2)}`;
}
