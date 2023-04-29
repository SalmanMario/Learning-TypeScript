export async function fetchAndParse(input: string) {
    const response = await fetch(input);
    return response.json();
}