
export async function getAudioStreamBuffer(link: string) {
    const url = new URL(link);
    const id = url.searchParams.get('v');
    const response = await fetch(`http://localhost:5000/${id}/audio`);
    return await response.arrayBuffer();
}
