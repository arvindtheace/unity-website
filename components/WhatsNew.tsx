import React from 'react';
import { builder } from '@builder.io/react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Gift } from 'lucide-react';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

const WhatsNew: React.FC<any> = ({ color }: { color: string }) => {
  const [offers, setOffers] = React.useState([]);

  React.useEffect(() => {
    builder
      .getAll('whats-new')
      .then((data: any) => {
        setOffers(data);
      });
  }, []);

  return (
    <Sheet>
      <SheetTrigger id="gift_icon"><Gift style={{color: color === "light" ? "#000" : "#FFF"}} /></SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className='flex'>
            <Gift className='mr-2' />Offers
          </SheetTitle>
          <SheetDescription className='pt-4' asChild>
            <div className="overflow-auto">
              {
                offers?.map((offer: any) => (
                  <div key={offer.id} className='mb-6'>
                    <a href={offer.data.link}>
                      <img src={offer.data.image} alt="" />
                    </a>
                  </div>
                ))
              }
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default WhatsNew;