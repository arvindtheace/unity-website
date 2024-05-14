import React, { forwardRef, LegacyRef } from 'react';
import { builder } from '@builder.io/react';
import styled from 'styled-components'

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export const CompanyMenu = forwardRef<HTMLElement>((props, ref) => {
  const [items, setItems] = React.useState<any>([]);
  
  React.useEffect(() => {
    fetch("https://cdn.builder.io/api/v3/content/navigation?apiKey=21b44296fc364461abc19d1d5fa5792d&query.name=Company&limit=1")
      .then(res => res.json())
      .then((data: any) => {
        if (data.results) setItems(data.results[0].data.items);
      })
  }, [])


  return (
    <div ref={ref as LegacyRef<HTMLDivElement>} className='p-8'>
      <ul className="grid grid-cols-2 gap-6">
        {items.map((item: any) => (
          <StyledLink key={item.link}>
            <a className="flex items-center space-x-4" href={item.link}>
              <div dangerouslySetInnerHTML={{__html:item.icon}} />
              <p className="text-sm font-medium">{item.title}</p>
            </a>
          </StyledLink>
        ))}
      </ul>
    </div>
  );
})

const StyledLink = styled.a`
  &:hover {
      a::before {
      background: #FBF8EB;
      width: 30px;
      border-radius: 50%;
      height: 30px;
      positon: relative;
      content: '';
      margin-right: -27px;
      opacity: 0.5;
    }
  }
  &:hover p::after {
    content: url('data:image/svg+xml, %3Csvg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"%3E%3C/path%3E%3C/svg%3E');
    position: relative;
    top: 2px;
    right: -5px;
  }
`