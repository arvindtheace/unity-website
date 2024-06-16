import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import { builder } from '@builder.io/react';
import Link from 'next/link';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function BlogCategoryPageSection({ primaryCategory }: { primaryCategory: 'string' }) {
  const [blogs, setBlogs] = React.useState<any>([])
  const [stories, setStories] = React.useState<any>([])
  const categoryTarget : string = primaryCategory;
    
  React.useEffect(() => {
    
    builder.getAll('blog-articles', {
      query: {
        data: {
          primaryCategory: primaryCategory,
        }
      }
    }).then((data) => {
      setBlogs(data)
    })
    
    builder.getAll('blog-articles', {
      query: {
        data: {
          type: 'story',
        }
      }
    }).then((data) => {
        setStories(data)
    })
  }, []);

  return (
    <>
        {
            categoryTarget !== "Stories" ? (
                <div className="flex justify-between items-center flex-col mb-10">
                    <div className="capitalize text-center w-full text-sm mb-10"><a className='text-[#00000080;]' href="../../blog">Blogs and Stories</a> / {primaryCategory}</div>
                    <h3 className="capitalize text-center w-full">{primaryCategory}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-24">
                        {blogs.length > 0 && blogs.map((_: any, index: number) => (
                            <div>
                                <Link href={`/blog/${_.data.slug}`}>
                                <div 
                                    style={{backgroundImage: `url(${_.data.image})`}}
                                    className={`relative bg-cover bg-center w-full h-72 aspect-square rounded-xl`}
                                />
                                <div className='py-6'>
                                    <h6 className='mb-6'>{_.data.title}</h6>
                                    <div className='text-gray-500 mb-6'>{_.data.readTime} min read | {formatDistanceToNow(_.data.date, { addSuffix: true })}</div>
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ):(
                <div className="flex justify-between items-center flex-col mb-10">
                    <div className="capitalize text-center w-full text-sm mb-10"><a className='text-[#00000080;]' href="../../blog">Blogs and Stories</a> / Stories</div>
                    <h3 className="capitalize text-center w-full">{primaryCategory}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-24">
                        {stories.length > 0 && stories.map((_: any, index: number) => (
                            <div>
                                <Link href={`/blog/${_.data.slug}`}>
                                <div 
                                    style={{backgroundImage: `url(${_.data.image})`}}
                                    className={`relative bg-cover bg-center w-full h-72 aspect-square rounded-xl`}
                                />
                                <div className='py-6'>
                                    <h6 className='mb-6'>{_.data.title}</h6>
                                    <div className='text-gray-500 mb-6'>{_.data.readTime} min read | {formatDistanceToNow(_.data.date, { addSuffix: true })}</div>
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    </>
  )
}
