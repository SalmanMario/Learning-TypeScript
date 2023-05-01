import { fetchAndParse } from "./fetchAndParse";

export type UserInfo = {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  address: {
    city: string;
    street: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
};

type Post = {
  id: number;
  title: string;
  body: string;
};

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function Users(searchQuery: string): Promise<UserInfo[]> {
  return fetchAndParse(`${BASE_URL}/users?search=${encodeURIComponent(searchQuery)}`).then(
    (userDetails: UserInfo[]) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) {
        return userDetails;
      }
      return userDetails.filter((user) => JSON.stringify(user).toLowerCase().includes(query.toLowerCase()));
    }
  );
}

export function Posts(): Promise<Post[]> {
  return fetchAndParse(`${BASE_URL}/posts`);
}

export function UserById(userId: string) {
  return fetchAndParse(`${BASE_URL}/users/${userId}`);
}

// search with recursive solution complicated

// function searchUserRecursive(user: User, query: string): boolean {
//   for (const key in user) {
//     const value = (user as any)[key];
//     if (typeof value === "object") {
//       if (searchUserRecursive(value, query)) {
//         return true;
//       }
//     } else if (typeof value === "string" && value.toLowerCase().includes(query)) {
//       return true;
//     }
//   }
//   return false;
// }
