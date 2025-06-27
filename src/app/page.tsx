'use client';
import PostCard from '@/components/container/postCard/PostCard';
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ThumbsUp,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { MostLikedPost, RecommendedPost } from './api/posts/route';

export default function Home() {
  interface BlogPostProps {
    id?: string;
    title?: string;
    content?: string;
    tags?: string[];
    imageUrl?: string;
    createdAt?: string;
    likes?: number;
    comment?: number;
    author?: {
      id?: number;
      name?: string;
      email?: string;
    };
  }
  const [recommendedPost, setRecommendedPost] = useState<
    BlogPostProps[] | null
  >(null);
  const [mostLikedPost, setMostLikedPost] = useState<BlogPostProps[] | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const paginatedPosts = recommendedPost?.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );
  const mostLikedPosts = mostLikedPost?.slice(0, 3);

  useEffect(() => {
    const fetchRecommendedPost = async () => {
      const data = await RecommendedPost();
      setRecommendedPost(data.data);
    };

    const fetchMostLikeddPost = async () => {
      const data = await MostLikedPost();
      console.log(data.data);
      setMostLikedPost(data.data);
    };

    fetchRecommendedPost();
    fetchMostLikeddPost();
  }, []);

  return (
    <div className='text-neutral-900 flex flex-col lg:flex-row lg:justify-center pt-24 lg:pt-48'>
      <div className='flex flex-col px-16 max-w-807'>
        <h1 className='text-xl font-bold'>Recommend For You</h1>
        {paginatedPosts?.map((post, index) => (
          <div key={index}>
            <PostCard post={post} index={index} />
          </div>
        ))}

        <div>
          {recommendedPost && (
            <div className='flex justify-center items-center px-24 mt-16 gap-8'>
              <button
                className=' flex gap-6 disabled:opacity-50 text-xs font-regular items-center justify-center cursor-pointer'
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={24} />
                Previous
              </button>

              {Array.from({
                length: Math.ceil(recommendedPost.length / postsPerPage),
              }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-36 h-36 rounded-full cursor-pointer text-sm ${
                    currentPage === idx + 1 ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                className='flex gap-6 disabled:opacity-50 text-xs font-regular items-center justify-center cursor-pointer'
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(recommendedPost.length / postsPerPage)
                    )
                  )
                }
                disabled={
                  currentPage ===
                  Math.ceil(recommendedPost.length / postsPerPage)
                }
              >
                Next
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
      <hr style={{ borderColor: '#d5d7da' }} className='lg:hidden' />
      <aside className='flex flex-col px-16 pt-24 lg:border-l border-neutral-300 max-w-297'>
        <h1 className='text-xl font-bold'>Most Liked Post</h1>
        {mostLikedPosts?.map((post, index) => (
          <div key={index} className='flex flex-col gap-12 mt-16'>
            <div className='flex flex-col gap-8'>
              <div className='text-md font-bold'>{post.title}</div>
              <div className='line-clamp-2 text-xs font-regular'>
                {post.content}
              </div>
            </div>
            <div className='flex items-center justify-start gap-8 mb-16'>
              <ThumbsUp size={20} />
              <span>{post.likes}</span> <MessageSquare size={20} />
              <span>{post.comment || 0}</span>
            </div>
            <hr style={{ borderColor: '#d5d7da' }} />
          </div>
        ))}
      </aside>
    </div>
  );
}
