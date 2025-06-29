import { localApi } from '@/services/api-local';

export async function getRecommendedPosts(page = 1, limit = 5) {
  const response = await localApi.get(
    `/api/posts?type=recommended&page=${page}&limit=${limit}`
  );
  return response.data;
}

export async function getMostLikedPosts() {
  const response = await localApi.get('/api/posts?type=most-liked');
  return response.data;
}

export async function getUserById(id: string) {
  const response = await localApi.get(`/api/users/${id}`);
  return response.data;
}

export async function getPostById(id: string) {
  const response = await localApi.get(`/api/posts/${id}`);
  return response.data;
}

export async function getPostComments(id: string) {
  const response = await localApi.get(`/api/posts/${id}?type=comments`);
  return response.data;
}

export async function searchPosts(query: string) {
  const response = await localApi.get(`/api/posts/search`, {
    params: { query },
  });
  return response.data;
}
