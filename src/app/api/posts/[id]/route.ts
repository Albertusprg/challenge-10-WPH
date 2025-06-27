/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/services/api';
import { BlogPost } from '../endpoints';

export async function PostById(id: string) {
  try {
    const response = await api.get(BlogPost.postById + id);
    const results = response.data;
    return results;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      'Terjadi Kesalahan pada Server, Silahkan Hubungi Admin';
    throw new Error(errorMessage);
  }
}

export async function CommentPostById(id: string) {
  try {
    const response = await api.get(`${BlogPost.postById}${id}/comments`);
    const results = response.data;
    return results;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      'Terjadi Kesalahan pada Server, Silahkan Hubungi Admin';
    throw new Error(errorMessage);
  }
}
