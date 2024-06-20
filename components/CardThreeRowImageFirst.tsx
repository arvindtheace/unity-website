import React, { useState } from 'react';
import useWindowWidth from '@/hooks/useWindowWidth';
import Button from './Button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { builder } from '@builder.io/react';
import styled from 'styled-components';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

type Props = {
    info: any
}

export default function CardThreeRowImageFirst({ info }: Props) {
// const CardThreeRowImageFirst: React.FC = ({ blogs }: any) => {
  const [articleInfo, setBlogsContent] = React.useState<any>([])
  const width = useWindowWidth()

  React.useEffect(() => {
    setBlogsContent([])
    info.forEach((element:any) => {
      
      setBlogsContent((articleInfo:any) => [...articleInfo,element.article.value])
    });

  }, []);
  if (!info) {
    return <div></div>
  }
  return (
    <div>
    
    {
      width < 768 ? (
          <Carousel
          opts={{
            align: "start",
            dragFree: true,
            slidesToScroll: "auto",
            startIndex: 0,
        }}
            
          className="w-full pb-20 showIndicators"
          >
          
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center space-x-4">
              {
                articleInfo?.length > 3 && (
                  <div>
                    <CarouselPrevious className='hidden md:inline bg-transparent border-0 p-0 mr-4' />
                    <CarouselNext className='hidden md:inline bg-transparent border-0 p-0'/>
                  </div>
                )
              }
            </div>
          </div>
          <CarouselContent className='items-stretch'>
            {articleInfo.length > 0 && articleInfo.map((_: any, index: number) => (
              <CarouselItem key={index} className="px-6">
                  <div className='w-64 mb-8'>
                    <img src={`${_.data.image}`} alt="" className='mx-auto'/>
                  </div>
                  <div>
                    <h5 className='mb-8 text-center'>{_.data.header}</h5>
                    <div className='text-[18px] mb-6 text-center'>{_.data.description}</div>
                    <div className="mx-auto w-fit">
                        <Button
                            text={`${_.data.buttonText}`}
                            action={_.data.buttonAction}
                            type={_.data.buttonType}
                            href={_.data.href}
                            icon="arrow-right"
                            linkType={_.data.linkType}
                        />
                    </div>
                  </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ):(
        <div className='grid grid-cols-3 md:gap-[120px]' style={{gridAutoRows: "1fr"}}>
            {articleInfo.length > 0 && articleInfo.map((_: any, index: number) => (
                <div>
                    <div className='w-64 mb-8'>
                        <img src={`${_.data.image}`} alt="" />
                    </div>
                    <div className='flex flex-col' style={{minHeight: "228px"}}>
                        <h5 className='mb-8'>{_.data.header}</h5>
                        <div className='text-[18px] mb-6'>{_.data.description}</div>
                        <div className="mt-auto">
                            <Button
                                text={`${_.data.buttonText}`}
                                action={_.data.buttonAction}
                                type={_.data.buttonType}
                                href={_.data.href}
                                icon="arrow-right"
                                linkType={_.data.linkType}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )
    }


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