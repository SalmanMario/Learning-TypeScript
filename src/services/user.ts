import { fetchAndParse } from "./fetchAndParse";

export type UserInfo = {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  website: string;
  address: {
    city: string;
    street: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
  };
};

type Post = {
  id: number;
  title: string;
  body: string;
};

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function Users(searchQuery: string): Promise<UserInfo[]> {
  const query = searchQuery.toLowerCase().trim();
  if (!query) {
    return fetchAndParse(`${BASE_URL}/users?search=${encodeURIComponent(searchQuery)}`);
  }
  const searchWords = query.split(" ");
  return fetchAndParse(`${BASE_URL}/users`).then((userDetails: UserInfo[]) => {
    return filterUserDetails(userDetails, searchWords);
  });
}

// filter function to search working in
function filterUserDetails(userDetails: UserInfo[], searchWords: string[]): UserInfo[] {
  return userDetails.filter((user) => {
    const {
      name,
      email,
      phone,
      username,
      address: { city, street },
      company: { name: companyName, catchPhrase },
    } = user;
    const lowerCasedFields = [name, email, phone, username, city, street, companyName, catchPhrase].map((field) =>
      field.toLowerCase()
    );
    return searchWords.every((word) => lowerCasedFields.some((field) => field.includes(word)));
  });
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
