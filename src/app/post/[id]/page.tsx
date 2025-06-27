'use client';

import { CommentPostById, PostById } from '@/app/api/posts/[id]/route';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface BlogPostProps {
  id?: string;
  title?: string;
  content?: string;
  tags?: string[];
  imageUrl?: string;
  createdAt: string;
  likes?: number;
  comment?: number;
  author?: {
    id?: number;
    name?: string;
    email?: string;
  };
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
    headline: string;
    avatarUrl: string;
  };
}
const formatDateToIndonesian = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
export default function DetailPost() {
  const params = useParams();
  const [post, setPost] = useState<BlogPostProps | null>(null);
  const [commentText, setCommentText] = useState('');
  const [commentPost, setCommentPost] = useState<Comment[] | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await PostById(params.id as string);
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchComment = async () => {
      try {
        const data = await CommentPostById(params.id as string);
        console.log(data);
        setCommentPost(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (params?.id) {
      fetchPost();
      fetchComment();
    }
  }, [params]);

  const handleSendComment = () => {
    if (!commentText.trim()) return;
    console.log('Comment submitted:', commentText);
    setCommentText('');
  };

  if (!post) return <div className='p-16 text-center'>Loading...</div>;

  return (
    <div className='p-16 flex flex-col gap-12 text-neutral-900'>
      <h1 className='text-2xl font-bold'>{post.title}</h1>

      <div className='flex gap-8'>
        {post.tags?.map((tag, index) => (
          <div
            key={index}
            className='flex px-8 py-2 items-center justify-center text-xs font-regular border border-neutral-300 rounded-md h-28 truncate'
          >
            {tag}
          </div>
        ))}
      </div>

      <div className='flex items-center justify-start gap-8 border-b border-neutral-300 pb-12'>
        <Image
          src={post.imageUrl || '/default.jpg'}
          alt='Author'
          width={30}
          height={30}
          className='rounded-full object-cover w-30 h-30'
        />
        <p className='text-xs font-regular'>{post.author?.name}</p>
        <Image src='/ellipse.svg' alt='dot' width={4} height={4} />
        <p className='text-xs font-regular text-neutral-600'>
          {formatDateToIndonesian(post.createdAt)}
        </p>
      </div>

      <div className='flex items-center justify-start gap-8 border-b border-neutral-300 pb-12'>
        <ThumbsUp size={20} />
        <span>{post.likes}</span>
        <MessageSquare size={20} />
        <span>{post.comment || 0}</span>
      </div>

      <Image
        src={post.imageUrl || '/default.jpg'}
        alt='Post Image'
        width={100}
        height={100}
        className='rounded-sm object-cover w-full'
      />

      <p className='mt-4 text-sm'>{post.content}</p>

      <hr />

      {/* Comment Section */}
      <div className='flex flex-col gap-6'>
        <h1 className='text-xl font-bold'>Comments ({post.comment || 0})</h1>

        <div className='flex items-center gap-4'>
          <Image
            src='/user.svg'
            alt='Guest'
            width={40}
            height={40}
            className='w-40 h-40 rounded-full'
          />
          <div>
            <p className='text-xs font-semibold'>Guest</p>
          </div>
        </div>
        <h2 className='text-sm font-semibold text-neutral-700'>
          Give your comment
        </h2>
        <div className='flex flex-col gap-4'>
          <textarea
            name='comment'
            placeholder='Enter your comment'
            className='w-full min-h-[100px] p-4 border border-neutral-300 rounded-md resize-none'
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            onClick={handleSendComment}
            className='bg-primary-300 text-white px-6 rounded-full h-48'
          >
            Send
          </button>
        </div>

        {commentPost?.map((comment) => (
          <div
            key={comment.id}
            className='flex flex-col gap-4 border-t border-neutral-300 pt-6'
          >
            <div className='flex gap-4 items-start'>
              <Image
                src={comment.author.avatarUrl || '/user.svg'}
                alt={comment.author.name}
                width={40}
                height={40}
                className='rounded-full object-cover w-40 h-40'
              />
              <div className='flex flex-col'>
                <p className='font-semibold text-sm'>{comment.author.name}</p>
                <p className='text-xs text-neutral-500'>
                  {formatDateToIndonesian(comment.createdAt)}
                </p>
                <p className='text-sm mt-2'>{comment.content}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Optional: Link to view all comments */}
        <p className='text-sm text-primary-500 mt-4 underline cursor-pointer'>
          See All Comments
        </p>
      </div>
    </div>
  );
}
