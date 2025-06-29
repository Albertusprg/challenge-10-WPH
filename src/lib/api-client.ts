// Client-side API functions that make requests to our API routes
export async function getRecommendedPosts(page = 1, limit = 5) {
  const response = await fetch(
    `/api/posts?type=recommended&page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch recommended posts');
  }
  return response.json();
}

export async function getMostLikedPosts() {
  const response = await fetch('/api/posts?type=most-liked');
  if (!response.ok) {
    throw new Error('Failed to fetch most liked posts');
  }
  return response.json();
}

export async function getUserById(id: string) {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

export async function getPostById(id: string) {
  const response = await fetch(`/api/posts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  return response.json();
}

export async function getPostComments(id: string) {
  const response = await fetch(`/api/posts/${id}?type=comments`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
}

export async function searchPosts(query: string) {
  const response = await fetch(
    `/api/posts/search?query=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to search posts');
  }
  return response.json();
}
