import React, { forwardRef, LegacyRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { builder } from '@builder.io/react';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export const PersonalMenu = forwardRef<HTMLElement>((props, ref) => {
  const [personalSelectedIndex, setPersonalSelectedIndex] = React.useState(0);
  const [save, setSave] = React.useState<any>([]);
  const [borrow, setBorrow] = React.useState<any>([]);
  const [insure, setInsure] = React.useState<any>([]);
  
  // fetch save borrow and insure data from builder.get("navigation") in useEffect
  React.useEffect(() => {
    builder
      .get('navigation', {
        query: {
          name: 'Save'
        },
      })
      .promise()
      .then((data: any) => {
        if (data) setSave(data.data.items);
        builder
          .get('navigation', {
            query: {
              name: 'Borrow'
            },
          })
          .promise()
          .then((data: any) => {
            if (data) setBorrow(data.data.items);
            builder
              .get('navigation', {
                query: {
                  name: 'Grow'
                },
              })
              .promise()
              .then((data: any) => {
                if (data) setInsure(data.data.items);
              });
          });
      });
  }, [])
  
  return (
    <div className="w-[900px] p-8" ref={ref as LegacyRef<HTMLDivElement>}>
      <a href="/">
        <h6 className="mb-8 flex items-center">
          Personal banking
          <ArrowRight className='ml-2' />
        </h6>
      </a>
      <div className="grid grid-cols-[250px,1fr] items-start gap-8">
        <div>
          <div className={`sm rounded-xl mb-4 p-4 ${personalSelectedIndex === 0 ? 'bg-[#F5F4F1]' : ''}`} onMouseEnter={() => setPersonalSelectedIndex(0)}>
            <h6 className="">Save</h6>
            <div className='text-sm'>Grow your savings securely with unity accounts and deposits</div>
          </div>
          <div className={`sm rounded-xl mb-4 p-4 ${personalSelectedIndex === 1 ? 'bg-[#F5F4F1]' : ''}`} onMouseEnter={() => setPersonalSelectedIndex(1)}>
            <h6 className="">Borrow</h6>
            <div className='text-sm'>Get instant loans with interest rates in your interest</div>
          </div>
          <div className={`sm rounded-xl mb-4 p-4 ${personalSelectedIndex === 2 ? 'bg-[#F5F4F1]' : ''}`} onMouseEnter={() => setPersonalSelectedIndex(2)}>
            <h6 className="">Insure</h6>
            <div className='text-sm'>Secure your future with health insurance etc</div>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-6">
          {personalSelectedIndex === 0 && save?.map((item: any) => (
            <li key={item.link}>
              <a className="flex items-center space-x-6" href={item.link}>
                <div dangerouslySetInnerHTML={{__html:item.icon}} />
                <p className="text-sm font-medium">{item.title}</p>
              </a>
            </li>
          ))}
          {personalSelectedIndex === 1 && borrow?.map((item: any) => (
            <li key={item.link}>
              <a className="flex items-center space-x-6" href={item.link}>
                <div dangerouslySetInnerHTML={{__html:item.icon}} />
                <p className="text-sm font-medium">{item.title}</p>
              </a>
            </li>
          ))}
          {personalSelectedIndex === 2 && insure?.map((item: any) => (
            <li key={item.link} className="col-span-2">
              <a className="flex items-center space-x-6" href={item.link}>
                <div dangerouslySetInnerHTML={{__html:item.icon}} />
                <p className="text-sm font-medium">{item.title}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
})
