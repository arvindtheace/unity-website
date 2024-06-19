import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import styled from 'styled-components'
import Button from './Button'
import { builder } from '@builder.io/react';
import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { usePathname } from 'next/navigation';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

type Blogs = {
  blogs: {
    title: string
    slug: string
    image: string
    date: string | Date
    type: "blog" | "story"
    categories: string[]
    excerpt: string
    readTime: number
    featured: boolean
  }[]
}

// const blogsSeed = [
//   {
//     title: 'How to save your money efficiently in your life?',
//     slug: 'how-to-save-your-money-efficiently-in-your-life',
//     image: 'https://picsum.photos/400/300',
//     type: 'blog',
//     date: '2024-01-01',
//     categories: ['Finance', 'Saving'],
//     excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     readTime: 5,
//     featured: true
//   },
//   {
//     title: 'How to save your money efficiently in your life?',
//     slug: 'how-to-save-your-money-efficiently-in-your-life',
//     image: 'https://picsum.photos/400/300',
//     type: 'story',
//     date: '2024-01-01',
//     categories: ['Finance', 'Saving'],
//     excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     readTime: 5,
//     featured: true
//   },
//   {
//     title: 'How to save your money efficiently in your life?',
//     slug: 'how-to-save-your-money-efficiently-in-your-life',
//     image: 'https://picsum.photos/400/300',
//     type: 'blog',
//     date: '2024-01-01',
//     categories: ['Finance', 'Saving'],
//     excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     readTime: 5,
//     featured: true
//   },
//   {
//     title: 'How to save your money efficiently in your life?',
//     slug: 'how-to-save-your-money-efficiently-in-your-life',
//     image: 'https://picsum.photos/400/300',
//     type: 'story',
//     date: '2024-01-01',
//     categories: ['Finance', 'Saving'],
//     excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     readTime: 5,
//     featured: true
//   },
// ]

export default function BlogPreview2({ size = "small", blogs }: any) {
  if (!blogs) {
    return <div></div>
  }
  const pathname = usePathname();
  return (
    <div className='my-20 max-w-full'>
      <h2 className='mb-16'
      // style={{color: (pathname?.startsWith('/business')) ? '#FFF' : '#000'}}
      style={{color: '#000'}}
      >Our blogs and stories</h2>
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full pb-20"
      >
        <CarouselContent className='items-stretch'>
          {blogs.length > 0 && blogs.map((_: any, index: number) => {
            let newDate  = new Date(_.article.value?.data.date);
            //@ts-ignore
            const elapsedTime = isNaN(newDate) ? '' : formatDistanceToNow(newDate, { addSuffix: true });
            return (
            //TODO: wrap with <a>
            <CarouselItem key={index} className={clsx(
                size === "small" && `basis-4/5 ${_.article.value?.data.type === 'story' ? 'md:basis-1/2' : 'md:basis-1/3'}`,
                size === "large" && `basis-full`
              )}>
                <BlogCard className='h-full'>
                  {
                    size === "large" ? (
                      <a href={`${_.article.value?.previewUrl}`} className='card grid grid-cols-1 sm:grid-cols-7'>
                        <div
                          style={{backgroundImage: `url(${_.article.value?.data.image})`}}
                          className="sm:col-span-3 sm:bg-cover sm:bg-center bg-cover bg-no-repeat bg-center h-96 w-full"
                        />
                        <div className='sm:col-span-4 sm:order-first sm:p-10 p-4 my-auto'>
                          <h4 className='font-semibold mb-4'>{_.article.value?.data.title}</h4>
                          <div className="flex items-center gap-4 mb-6">
                            <p className='uppercase text-[#B97A00] font-semibold tracking-wider'>{_.article.value?.data.type}</p>
                            <p className='text-gray-500'>{_.article.value?.data.readTime} min read&nbsp;&nbsp;|&nbsp;&nbsp;{elapsedTime}</p>
                          </div>
                          <div className="sm mb-6">
                            <p>{_.article.value?.data.excerpt}</p>
                          </div>
                          <Button
                            text="Read more"
                            type="link"
                            href={`/blog/${_.slug}`}
                            icon="arrow-right"
                          />
                        </div>
                      </a>
                    ) : (
                      <a href={`${_.article.value?.previewUrl}`}>
                        <div 
                          style={{backgroundImage: `url(${_.article.value?.data.image})`, backgroundSize: 'cover'}}
                          className={`relative bg-cover bg-center w-full h-72 ${_.article.value?.data.type === 'blog' ? 'aspect-square' : 'aspect-video'}`}
                        >
                          <Badge className='absolute top-4 left-4'>{_.article.value?.data.type.toUpperCase()}</Badge>
                        </div>
                        <div className='p-6'>
                          <h6 className='mb-6'>{_.article.value?.data.title}</h6>
                          <div className='text-gray-500 mb-6'>{_.article.value?.data.readTime} min read&nbsp;&nbsp;|&nbsp;&nbsp;{elapsedTime}</div>
                        </div>
                      </a>
                    )
                  }
                </BlogCard>
              </CarouselItem>
          )}
        )
      }
        </CarouselContent>
        <div className="flex items-end justify-between mt-5 sm:mt-20">
          <div>
            <CarouselPrevious className='mr-4' />
            <CarouselNext />
          </div>
          <Button
            text="View All"
            href="/blog"
            type="link"
            icon="arrow-right"
          />
        </div>
      </Carousel>
    </div>
  )
}

const BlogCard = styled.div`
  border-radius: 20px;
  background: #FFF;
  box-shadow: 0px 4px 16px 0px rgba(168, 161, 125, 0.12), 0px 0px 4px 0px rgba(0, 0, 0, 0.10), 0px 0px 1px 0px rgba(0, 0, 0, 0.13);
  overflow: hidden;
  align-items: stretch;
`

const Badge = styled.div`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 4px;
  background: rgba(30, 30, 30, 0.50);
  color: #fff;
  font-family: 'Archivo', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.12px;
`
