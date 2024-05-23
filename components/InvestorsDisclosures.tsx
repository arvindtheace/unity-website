import React, { useEffect } from 'react'
import PDFList from './PDFList'
import { builder } from '@builder.io/react';
import useWindowWidth from '@/hooks/useWindowWidth';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

const navItems = [
  {
    title: 'Shareholders Information',
  },
  {
    title: 'Credit Rating',
  },
  {
    title: 'Valuation of Market Linked Debentures',
  },
  {
    title: 'Exchange Filings',
  },
  {
    title: 'Registrar and Share Transfer Agent',
  },
  {
    title: 'Investor Grievances',
  },
  {
    title: 'Financials',
  },
]

export default function InvestorsDisclosures() {
  const [page, setPage] = React.useState(0)
  const [data, setData] = React.useState<any>([])
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const width = useWindowWidth()

  React.useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.style.overflowX = 'auto';
    }

    return () => {
      if (htmlElement) {
        htmlElement.style.overflowX = 'hidden';
      }
    }
  }, [])

  useEffect(() => {
    if (page === 4) {
      builder.get('contact-person', {
        query: {
          name: "Registrar and Share Transfer Agent"
        }
      }).promise().then(( data: any ) => {
        if (data) setData(data.data)
      })
    }

    if (page === 5) {
      builder.get('contact-person', {
        query: {
          name: "Investor Grievances"
        }
      }).promise().then(( data: any ) => {
        if (data) setData(data.data)
      })
    }
  }, [page])

  return (
    <div className='md:grid grid-cols-3 gap-8 p-6 md:p-14 items-start' ref={containerRef}>

      {/* Menu */}
      {
        width > 768 ? (
          <div className='flex flex-col gap-6 sticky top-10'>
            {
              navItems.map((_, i) => (
                <a 
                  key={`menu-item-${i}`} 
                  onClick={() => {
                    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setPage(i)
                  }}
                  className={`cursor-pointer w-fit px-5 py-3 rounded-full ${page === i ? 'bg-black text-white' : ''}`}
                >
                  <div>{_.title}</div>
                </a>
              ))
            }
          </div>
        ) : (
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
      <div className="col-span-2">

        {/* Shareholders Information */}
        {
          page === 0 && (
            <>
              <h3 className='mb-12 text-center md:text-left'>Shareholders Information</h3>
              {/* <PDFList
                name="Shareholders - Annual Reports"
                hasFilter={false}
              /> */}
              <PDFList
                name="Shareholders - Quarterly Financial Results"
                hasFilter={true}
              />
            </>
          )
        }

        {/* Credit Rating */}
        {
          page === 1 && (
            <>
              <h3 className='mb-6 text-center md:text-left'>Credit Rating</h3>
              <PDFList
                name="Credit Rating"
                hasFilter={false}
              />
            </>
          )
        }

        {/* Valuation of Market Linked Debentures */}
        {
          page === 2 && (
            <>
              <h3 className='mb-6 text-center md:text-left'>Valuation of Market Linked Debentures</h3>
              <PDFList
                name="Valuation of Market Linked Debentures"
                hasFilter={false}
              />
            </>
          )
        }

        {/* Exchange Filings */}
        {
          page === 3 && (
            <>
              <h3 className='mb-6 text-center md:text-left'>Exchange Filings</h3>
              <PDFList
                name="Exchange Filings"
                hasFilter={false}
              />
            </>
          )
        }

        {/* Registrar and Share Transfer Agent */}
        {
          page === 4 && (
            <>
              <h3 className='mb-6 text-center md:text-left'>Registrar and Share Transfer Agent</h3>
              <div className="transparent-card" dangerouslySetInnerHTML={{__html:data.content}} />
            </>
          )
        }

        {/* Investor Grievances */}
        {
          page === 5 && (
            <>
              <h3 className='mb-6 text-center md:text-left'>Investor Grievances</h3>
              <div className="transparent-card" dangerouslySetInnerHTML={{__html:data.content}} />
            </>
          )
        }

        {/* Financials */}
        {
          page === 6 && (
            <>
              <h3 className='mb-6 text-center md:text-left'>Financials</h3>
              <PDFList
                name="Financials"
                hasFilter={false}
              />
            </>
          )
        }

      </div>
      
    </div>
  )
}