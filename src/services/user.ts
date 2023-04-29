import { fetchAndParse } from "./fetchAndParse";

type User = {
    id: number;
    name: string;
    email: string;
    phone: number;
};

type Post = {
    id: number;
    title: string;
    body: string;
};

const BASE_URL = "https://jsonplaceholder.typicode.com";

export function Users(): Promise<User[]> {
    return fetchAndParse(`${BASE_URL}/users`);
}

export function Posts(): Promise<Post[]> {
    return fetchAndParse(`${BASE_URL}/posts`);
}