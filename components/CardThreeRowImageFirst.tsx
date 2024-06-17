import { formatDistanceToNow } from 'date-fns';
import React, { useState } from 'react';
import useWindowWidth from '@/hooks/useWindowWidth';
import Button from './Button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { builder } from '@builder.io/react';
import styled from 'styled-components';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function CardThreeRowImageFirst({ info }: any) {
// const CardThreeRowImageFirst: React.FC = ({ blogs }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [blogsContent, setBlogsContent] = React.useState<any>([])
  const width = useWindowWidth()

  React.useEffect(() => {
    
    info.forEach((element:any) => {
      console.log(element);
      
      setBlogsContent((blogsContent:any) => [...blogsContent,element.article.value])
    });

  }, []);
  

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % info.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + info.length) % info.length);
  };

  return (
    <div>
    
        <h1>.</h1>


    </div>
  );
};

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