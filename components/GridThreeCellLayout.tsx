import { formatDistanceToNow } from 'date-fns';
import React, { useState } from 'react';
import useWindowWidth from '@/hooks/useWindowWidth';
import Button from './Button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { builder } from '@builder.io/react';
import styled from 'styled-components';
import { withChildren } from "@builder.io/react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

type Props = {
    children: any
}
const GridThreeCellLayoutComponent = ({ children }: Props) => {
// const GridThreeCellLayoutComponent({ info, children }: Props) {
// const GridThreeCellLayout: React.FC = ({ blogs }: any) => {
  const width = useWindowWidth()

  React.useEffect(() => {
    console.log(children);

  }, []);

  return (
    <div>
    
    {
      width < 768 ? (

        <div className='grid grid-cols-3 gap-24'>
            <div>
                <div>
                    {children[0]}
                </div>
            </div>
        </div>
      ):(
        <div className='grid grid-cols-3 gap-24'>
            <div>
                <div>
                    {children[0]}
                </div>
            </div>
        </div>
      )
    }


    </div>
  );
};

const GridThreeCellLayout = withChildren(GridThreeCellLayoutComponent);
export default GridThreeCellLayout

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