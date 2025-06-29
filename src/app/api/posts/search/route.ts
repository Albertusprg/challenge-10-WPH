/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/services/api';
import { BlogPost } from '../endpoints';

export async function SearchPost(query: string) {
  try {
    const response = await api.get(BlogPost.searchPost + '?query=' + query);
    const results = response.data;
    return results;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      'Terjadi Kesalahan pada Server, Silahkan Hubungi Admin';
    throw new Error(errorMessage);
  }
}
