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
