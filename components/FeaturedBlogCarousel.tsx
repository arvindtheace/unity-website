import { formatDistanceToNow } from 'date-fns';
import React, { useState } from 'react';
import useWindowWidth from '@/hooks/useWindowWidth';
import Button from './Button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { builder } from '@builder.io/react';
import styled from 'styled-components';

const FeaturedBlogCarousel: React.FC = ({ blogs }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [blogsContent, setBlogsContent] = React.useState<any>([])
  const width = useWindowWidth()

  React.useEffect(() => {
    
    console.log(blogs)
    // setBlogsContent(data)
    blogs.forEach(element => {
      // element.article.value
      console.log(element.article.value);
      
      setBlogsContent(blogsContent => [...blogsContent,element.article.value])
    });

  }, []);
  

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % blogs.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  return (
    <div>
    {
      width < 768 ? (
          <Carousel
          opts={{
            align: "start",
            dragFree: true,
          }}
          className="w-full pb-20"
          >
          
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center space-x-4">
              {
                blogsContent?.length > 3 && (
                  <div>
                    <CarouselPrevious className='hidden md:inline bg-transparent border-0 p-0 mr-4' />
                    <CarouselNext className='hidden md:inline bg-transparent border-0 p-0'/>
                  </div>
                )
              }
            </div>
          </div>
          <CarouselContent className='items-stretch'>
            {blogsContent.length > 0 && blogsContent.map((_: any, index: number) => (
              <CarouselItem key={index} className="basis-4/5 md:basis-1/3">
                  <div 
                    className='relative bg-cover rounded-xl h-96'
                    style={{ backgroundImage: `url(${_.data.image})` }}
                  >
                    <Badge className='absolute top-4 left-4'>Featured</Badge>
                  </div>
                  <div>
                    <h4 className='font-semibold mb-4'>{_.data.title}</h4>
    
                    {/* Removed as per instruction by Ayush
                    <div className="sm mb-6">
                      <p>{_.data.excerpt}</p>
                    </div>
                    Removed as per instruction by Ayush */}
                    
                    <div className='text-sm text-gray-500 mb-6'>{_.data.readTime} min read&nbsp;&nbsp;|&nbsp;&nbsp;{formatDistanceToNow(_.data.date, { addSuffix: true })}</div>
                    <Button
                      text="Read Blog"
                      type="link"
                      href={`/blog/${_.data.slug}`}
                      icon="arrow-right"
                    />
                  </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ):(
        // Older implementation by Vishal, changed to carousel as asked by Ayush
        <div className="featured-blog-carousel">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 items-center gap-12`}
          >
            <div 
              className='relative bg-cover rounded-xl h-96'
              style={{ backgroundImage: `url(${blogs[currentSlide].article.value.data.image})` }}
            >
              <Badge className='absolute top-4 left-4'>Featured</Badge>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>{blogs[currentSlide].article.value.data.title}</h4>
              <div className="sm mb-6">
                <p>{blogs[currentSlide].article.value.data.excerpt}</p>
              </div>
              <div className='text-sm text-gray-500 mb-6'>{blogs[currentSlide].article.value.data.readTime} min read&nbsp;&nbsp;|&nbsp;&nbsp;{formatDistanceToNow(blogs[currentSlide].article.value.data.date, { addSuffix: true })}</div>
              <Button
                text="Read Blog"
                type="link"
                href={`/blog/${blogs[currentSlide].article.value.data.slug}`}
                icon="arrow-right"
              />
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3 mt-8">
            <ChevronLeft size={18} onClick={handlePrev} className='cursor-pointer -ml-4' />
            {blogs?.map((blog: any, index: number) => (
              <button
                key={blog.id}
                className={`w-2 h-2 rounded-full bg-gray-200 transition-all duration-300 ${index === currentSlide ? 'w-5 bg-yellow-500' : ''}`}
                onClick={() => handleSlideChange(index)}
              />
            ))}
            <ChevronRight size={18} onClick={handleNext} className='cursor-pointer -mr-4' />
          </div>
        </div>
      )
    }
    


    </div>
  );
};

export default FeaturedBlogCarousel;

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
  text-transform: uppercase;
`