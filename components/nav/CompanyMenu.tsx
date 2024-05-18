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
              <div className='hover_bg bg_brown p-2' dangerouslySetInnerHTML={{__html:item.icon}} />
              <p className="text-sm font-medium">{item.title}</p>
            </a>
          </StyledLink>
        ))}
      </ul>
    </div>
  );
})

const StyledLink = styled.a`
  &:hover p {
    font-weight: bold;
  }
  &:hover p::after {
    content: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"%3E%3Cpath d="M12.6665 8L8.6665 12M12.6665 8L8.6665 4M12.6665 8L3.33317 8" stroke="black" style="stroke:black;stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E');
    position: relative;
    top: 2px;
    right: -5px;
  }

  .hover_bg {
    border-radius: 50%;
    transition: 0.2s ease;
  }

  &:hover .hover_bg {
    &.bg_brown {
      background: #C99E0514;
    }
  }
`