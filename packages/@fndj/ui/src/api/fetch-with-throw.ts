export async function fetchWithThrow(...args: Parameters<typeof fetch>) {
    const response = await fetch(...args);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
