import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Button from './Button';
import { formatDistanceToNow } from 'date-fns';
import { builder } from '@builder.io/react';
import Link from 'next/link';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function BlogCategoryCarousel({ category, count }: { category: 'string'; count: number }) {
  const [blogs, setBlogs] = React.useState<any>([])
  const [stories, setStories] = React.useState<any>([])
  const categoryTarget : string = category;

  React.useEffect(() => {
    builder.getAll('blog-articles', {
      query: {
        data: {
          primaryCategory: category,
        }
      }
    }).then((data) => {
      // console.log(data)
      setBlogs(data)
    })

    builder.getAll('blog-articles', {
      query: {
        data: {
          type: 'story',
        }
      }
    }).then((data) => {
      console.log(data)
      setStories(data)
    })
  }, []);

  return (
    <div>
    {
      categoryTarget !== "Stories" ? (

        <Carousel
          opts={{
            align: "start",
            dragFree: true,
          }}
          className="w-full pb-20"
        >
          <div className="flex justify-between items-center mb-10">
            <h3 className='capitalize'>{category}</h3>
            <div className="flex items-center space-x-4">
              {
                blogs?.length > 3 && (
                  <div>
                    <CarouselPrevious className='hidden md:inline bg-transparent border-0 p-0 mr-4' />
                    <CarouselNext className='hidden md:inline bg-transparent border-0 p-0'/>
                  </div>
                )
              }
              <Button
                text="View All"
                href={`/category/${category}`}
                type="link"
                icon="arrow-right"
              />
            </div>
          </div>
          <CarouselContent className='items-stretch'>
            {blogs.length > 0 && blogs.map((_: any, index: number) => (
              <CarouselItem key={index} className="basis-4/5 md:basis-1/3">
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
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ):(
        <div>
          <h3 className='capitalize mb-10'>{category}</h3>
          <div className='grid grid-col-1 md:grid-col-2 gap-10'>
            {(stories.length > 0) && stories.map((_: any, index: number) => (
              index >= 3 ? (
                null
              ): (
              <div key={index} className={index == 0 ? "col-span-2" : "col-span-1"}>
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
              )
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              text="View All"
              href={`/category/Stories`}
              type="secondary"
              icon="arrow-right"
            />
          </div>
        </div>
      )
    }
    </div>
  );
};
