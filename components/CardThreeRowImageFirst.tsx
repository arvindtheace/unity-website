import React, { useEffect } from "react";
import styled from "styled-components";
import useWindowWidth from '@/hooks/useWindowWidth';
import { withChildren } from "@builder.io/react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  beforeColor: string;
  bgColor: string;
  text: string;
  children: any;
}

const Card3RowImageFirstComponent = ({ beforeColor, bgColor, text, children }: Props) => {
  const containerRef = React.useRef(null);
  const bgRef = React.useRef(null);
  const width = useWindowWidth()

  useEffect(() => {
    console.log('hey');
    
  }, [bgRef.current]);

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
                    <CarouselContent className='items-stretch'>
                        {children}
                    </CarouselContent>
                </Carousel>
            ):(
                <div>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-3 items-center gap-12`}
                    >
                        
                        {children}
                        
                    </div>
                </div>
            )
        }
    </div>
    // <div className="my-0 md:my-20">
    //   <div className="relative" ref={containerRef}>
    //     <Background
    //       className="absolute inset-0 w-full h-full"
    //       style={{backgroundColor: bgColor}}
    //       ref={bgRef}
    //     />
    //     {
    //       text &&
    //       <div className="h-96 grid place-items-center">
    //         <Text
    //           className="absolute inset-0 w-80"
    //           dangerouslySetInnerHTML={{ __html: text }}
    //         />
    //       </div>
    //     }
    //     {children}
    //   </div>
    // </div>
  );
}

const CardThreeRowImageFirst = withChildren(Card3RowImageFirstComponent);
export default CardThreeRowImageFirst

const Background = styled.div`
  z-index: -1;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 100%;
  border-radius: 32px;
  height: 100%;
  scale: 1;
`

const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 94%;
  height: fit-content;
`
