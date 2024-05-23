import React from 'react'
import { format } from 'date-fns'
import { builder } from '@builder.io/react';
import useWindowWidth from '@/hooks/useWindowWidth';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import Button from './Button';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

const navItems = [
  {
    title: 'Press Release',
  },
  {
    title: 'Latest News',
  },
  {
    title: 'Press Kit',
  },
]

type Article = {
  items: {
    title: string,
    image: string,
    date: string,
    link: string
  }[]
}

type PressKit = {
  data: {
    title: string,
    description: string,
    file: string
  }
}[]

export default function MediaCentres() {
  const [page, setPage] = React.useState(0)
  const [data, setData] = React.useState<Article | null>(null)
  const [pressKit, setPressKit] = React.useState<PressKit | null>([])
  const width = useWindowWidth()

  React.useEffect(() => {
    if (page === 0) {
      builder.get('media-centre',{
        query: {
          name: "Press Releases"
        }
      }).promise().then(( data: any ) => {
        if (data) setData(data.data)
      })
    }

    if (page === 1) {
      builder.get('media-centre',{
        query: {
          name: "Latest News"
        }
      }).promise().then(( data: any ) => {
        if (data) setData(data.data)
      })
    }

    if (page === 2) {
      builder
        .getAll('press-kit')
        .then(( data: any ) => {
          if (data) setPressKit(data)
        })
    }
  }, [page])

  return (
    <div className='md:grid grid-cols-4 p-10'>

      {/* Menu */}
      {
        width > 768 ? (
          <div className='flex flex-col gap-6'>
          {
            navItems.map((_, i) => (
              <a 
                key={`menu-item-${i}`} 
                onClick={() => setPage(i)}
                className={`cursor-pointer w-fit px-5 py-3 rounded-full ${page === i ? 'bg-black text-white' : ''}`}
              >
                <div>{_.title}</div>
              </a>
            ))
          }
        </div>
        ):(
          <DropdownMenu>
            <DropdownMenuTrigger className='bg-black text-white w-full p-3 rounded-full mb-12 relative'>
              {navItems[page].title}
              <ChevronDown className='absolute right-4 top-1/2 transform -translate-y-1/2' size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-white w-full'>
              {
                navItems.map((_, i) => (
                  <DropdownMenuItem 
                    key={`menu-item-${i}`}
                    onClick={() => setPage(i)}
                    className='p-3 w-full text-left hover:bg-gray-100 cursor-pointer'
                  >
                    {_.title}
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
      
      {/* Content */}
      <div className="col-span-3">

        {/* Press Release */}
        {
          page === 0 && (
            <div className='grid md:grid-cols-2 gap-12'>
              {
                data?.items.map((_, i) => (
                  <a key={`article-${i}`} href={_.link} target='_blank'>
                    <div className='flex flex-col gap-4'>
                      <img src={_.image} alt={_.title} className='w-full h-60 object-cover rounded-xl' />
                      <div className='flex flex-col gap-2'>
                        <div className='text-lg font-bold'>{_.title}</div>
                        <div className='text-sm text-gray-500'>{format(_.date, "do MMMM, y")}</div>
                      </div>
                    </div>
                  </a>
                ))
              }
            </div>
          )
        }

        {/* Latest News */}
        {
          page === 1 && (
            <div className='grid md:grid-cols-2 gap-12'>
              {
                data?.items.map((_, i) => (
                  <a key={`article-${i}`} href={_.link} target='_blank'>
                    <div className='flex flex-col gap-4'>
                      <img src={_.image} alt={_.title} className='w-full h-60 object-cover rounded-xl' />
                      <div className='flex flex-col gap-2'>
                        <div className='text-lg font-bold'>{_.title}</div>
                        <div className='text-sm text-gray-500'>{format(_.date, "do MMMM, y")}</div>
                      </div>
                    </div>
                  </a>
                ))
              }
            </div>
          )
        }

        {/* Press Kit */}
        {
          page === 2 && (
            <div>
              {
                pressKit?.map((_, i) => (
                  <div key={`press-kit-${i}`} className='white-card'>
                    <div className="grid grid-cols-4 gap-12 items-center p-6">
                      <div className="col-span-3">
                        <h5 className="mb-4">{_.data.title}</h5>
                        <p className="mb-6">{_.data.description}</p>
                        <Button
                          text="Download"
                          href={_.data.file}
                          type="secondary"
                          icon="arrow-right"
                        />
                      </div>
                      <div className="col-span-1">
                        <div className="white-card grid place-items-center">
                          <img src={_.data.file} alt={_.data.title} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }

      </div>
      
    </div>
  )
}