/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/services/api';
import { BlogPost } from './endpoints';

export async function RecommendedPost(page: number = 1, limit: number = 5) {
  try {
    const response = await api.get(
      `${BlogPost.recomended}?page=${page}&limit=${limit}`
    );
    const results = response.data;
    return results;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      'Terjadi Kesalahan pada Server, Silahkan Hubungi Admin';
    throw new Error(errorMessage);
  }
}

export async function MostLikedPost() {
  try {
    const response = await api.get(BlogPost.mostLiked);
    const results = response.data;
    return results;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      'Terjadi Kesalahan pada Server, Silahkan Hubungi Admin';
    throw new Error(errorMessage);
  }
}

export async function UserById(id: string) {
  try {
    const response = await api.get(BlogPost.userById + id);
    const results = response.data;
    return results;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      'Terjadi Kesalahan pada Server, Silahkan Hubungi Admin';
    throw new Error(errorMessage);
  }
}
