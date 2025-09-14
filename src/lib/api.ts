interface postBodyInterface {
  userId: string;
  title: string;
  body: string;
}

export async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch Posts");
  return res.json();
}
export async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch Users");
  return res.json();
}
export async function fetchPost(num: number) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${num}`);
  if (!res.ok) throw new Error("Failed to fetch Users");
  return res.json();
}
export async function fetchUser(num: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${num}`);
  if (!res.ok) throw new Error("Failed to fetch Users");
  return res.json();
}
export async function createPostApi(post: postBodyInterface) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...post }),
  });
  if (!res.ok) throw new Error("Failed to fetch Users");
  return res.json();
}
