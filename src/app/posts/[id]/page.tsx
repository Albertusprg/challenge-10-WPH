'use client';

import { CommentPostById, PostById } from '@/app/api/posts/[id]/route';
import { RecommendedPost } from '@/app/api/posts/route';
import PostCard from '@/components/container/postCard/PostCard';
import { BlogPostProps } from '@/interfaces/BlogProps.interface';
import { MessageSquare, ThumbsUp, X } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

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
  const [anotherPost, setAnotherPost] = useState<BlogPostProps | null>(null);
  const [commentText, setCommentText] = useState('');
  const [commentPost, setCommentPost] = useState<Comment[] | null>(null);
  const [PaginatedCommentPost, setPaginatedCommentPost] = useState<
    Comment[] | null
  >(null);
  const [seeAllComments, setSeeAllComments] = useState(false);

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
        setCommentPost(data);
        setPaginatedCommentPost(data.slice(0, 3));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAnotherPost = async () => {
      try {
        const data = await RecommendedPost();
        setAnotherPost(data.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    if (params?.id) {
      fetchPost();
      fetchComment();
    }
    fetchAnotherPost();
  }, [params]);

  const handleSendComment = () => {
    if (!commentText.trim()) return;
    console.log('Comment submitted:', commentText);
    setCommentText('');
  };

  const handleSeeAllComments = () => {
    setSeeAllComments(!seeAllComments);
  };

  if (!post) return <div className='p-16 text-center'>Loading...</div>;

  return (
    <div
      className='flex flex-col gap-12 text-neutral-900 mx-auto'
      style={{
        paddingInline: 'clamp(16px, 11.84vw - 30.55px, 140px)',
        paddingTop: 'clamp(88px, calc(2.69rem + 5.35vw), 128px)',
      }}
    >
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
          {post.createdAt ? formatDateToIndonesian(post.createdAt) : ''}
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
        <h1 className='text-xl font-bold'>
          Comments ({commentPost?.length || 0})
        </h1>

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
          Give your comments
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

        {PaginatedCommentPost?.map((comment) => (
          <div
            key={comment.id}
            className='flex flex-col gap-8 border-t border-neutral-300 pt-6'
          >
            <div className='flex gap-4 items-start'>
              <Image
                src={
                  comment.author.avatarUrl
                    ? `https://blogger-wph-api-production.up.railway.app${comment.author.avatarUrl}`
                    : '/user.svg'
                }
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
              </div>
            </div>
            <p className='text-sm mt-2'>{comment.content}</p>
          </div>
        ))}

        {/* Optional: Link to view all comments */}
        <p
          className='text-sm text-primary-500 mt-4 underline cursor-pointer'
          onClick={handleSeeAllComments}
        >
          See All Comments
        </p>
        <hr style={{ borderColor: '#d5d7da' }} className='my-4' />
        <h1 className='text-xl font-bold my-4'>Another Post</h1>
        {anotherPost && <PostCard post={anotherPost} index={1} />}
      </div>

      {seeAllComments && (
        <div className='fixed inset-0 z-[999] flex items-center justify-center bg-neutral-950/60 px-24 py-80'>
          <div
            className='relative flex flex-col gap-16 bg-white text-neutral-950 rounded-lg shadow-2xl overflow-hidden px-16 py-24'
            style={{
              width: 'clamp(350px, 90vw, 800px)',
              height: 'clamp(500px, 90vh, 700px)',
            }}
          >
            <div className='flex justify-between items-center px-6 py-4 border-b border-neutral-200'>
              <h1 className='text-xl font-bold'>
                Comments ({commentPost?.length || 0})
              </h1>
              <button
                onClick={handleSeeAllComments}
                className='text-neutral-500 hover:text-neutral-900'
              >
                <X size={24} />
              </button>
            </div>
            <div className='flex-1 overflow-y-auto px-6 pb-6'>
              <div className='flex flex-col gap-4 mb-6'>
                <h2 className='text-sm font-semibold text-neutral-950'>
                  Give your comments
                </h2>
                <textarea
                  name='comment'
                  placeholder='Enter your comment'
                  className='w-full min-h-[100px] p-4 border border-neutral-300 rounded-md resize-none text-sm'
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  onClick={handleSendComment}
                  className='bg-primary-300 text-white px-6 rounded-full h-40 w-full text-sm font-semibold'
                >
                  Send
                </button>
              </div>
              <div className='flex flex-col gap-8'>
                {commentPost?.map((comment) => (
                  <div
                    key={comment.id}
                    className='flex flex-col gap-4 border-t border-neutral-300 pt-6'
                  >
                    <div className='flex gap-4 items-start'>
                      <Image
                        src={
                          comment.author.avatarUrl
                            ? `https://blogger-wph-api-production.up.railway.app${comment.author.avatarUrl}`
                            : '/user.svg'
                        }
                        alt={comment.author.name}
                        width={40}
                        height={40}
                        className='rounded-full object-cover w-40 h-40'
                      />
                      <div className='flex flex-col'>
                        <p className='font-semibold text-sm'>
                          {comment.author.name}
                        </p>
                        <p className='text-xs text-neutral-500'>
                          {formatDateToIndonesian(comment.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className='text-sm'>{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
