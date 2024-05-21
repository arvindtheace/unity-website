import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Button from './Button';

type Props = {
  items: {
    title: string
    description: string
    illustration: string
    href: string
  }[]
}

export default function CTACarousel({ items }: Props) {
  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
      }}
      className="pb-20"
    >
      <CarouselContent>
        {
            items.map((item: any, i: number) => (
              <CarouselItem key={item.id} className=" md:basis-1/3">
                <div className='white-card relative'>
                  <h5 className="mb-4">{item.title}</h5>
                  <div className='sm mb-4'>
                    <p>{item.description}</p>
                  </div>
                  <div className='mb-32'>
                    <Button
                      text="Know More"
                      href={item.href}
                      type="link"
                      icon="arrow-right"
                    />
                  </div>
                  <div dangerouslySetInnerHTML={{__html: item.illustration}} className='absolute bottom-6 right-6'/>
                </div>
              </CarouselItem>
            )
          )
        }
      </CarouselContent>
    </Carousel>
  )
}
