import React, { useState } from 'react';
import styled from 'styled-components';
import { builder } from '@builder.io/react';
import ReactPaginate from 'react-paginate';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { format } from 'date-fns';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

type Props = {
  name: string;
  searchAlign?: "left" | "center";
  hasFilter: boolean;
  pdfs?: {
    title: string;
    file: any;
    date?: string;
    description?: string;
  }[];
};

function PDFList({ name, searchAlign = "left", hasFilter }: Props) {
  const [data, setData] = React.useState<any>(null);
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const itemsPerPage = 10; // Number of items to display per page
  const years = Array.from({ length: new Date().getFullYear() - 2018 }, (_, index) => (new Date().getFullYear() - index).toString());

  React.useEffect(() => {
    builder
      .get('pdf-list', {
        query: {
          data: {
            listName: name,
          },
        },
      })
      .promise()
      .then((data: any) => {
        if (data.data) setData(data.data);
      });
  }, []);

  const handlePageChange = (selectedPage: { selected: number }) => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setCurrentPage(selectedPage.selected);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (value: string) => {
    setYearFilter(value); 
  }

  const resetData = () => {
    builder
    .get('pdf-list', {
      query: {
        data: {
          listName: name,
        },
      },
    })
    .promise()
    .then((data: any) => {
      if (data.data) setData(data.data);
    });
  }

  React.useEffect(() => {
    if (yearFilter) {
      builder
      .get('pdf-list', {
        query: {
          data: {
            listName: name,
          },
        },
      })
      .promise()
      .then((data: any) => {
        if (data.data) {
          const filteredData = data?.data?.pdfs?.filter((pdf: any) => {
            const pdfYear = new Date(pdf.date).getFullYear().toString();
            console.log('pdfYear', pdfYear)
            console.log('yearFilter', yearFilter)
            return pdf.date && pdfYear === yearFilter;
          })
          setData({...data, pdfs: filteredData});
        };
      });
    } else {
      setYearFilter('')
      resetData()
    }
  }, [yearFilter])

  const filteredData = data?.pdfs?.filter((pdf: any) =>
    pdf.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil((filteredData?.length || 0) / itemsPerPage);
  const paginatedData = filteredData?.slice(offset, offset + itemsPerPage);

  return (
    <div ref={containerRef} className='py-10'>
      <div className="flex items-center justify-between mb-12 gap-3 flex-col md:flex-row">
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className={clsx(
            'max-w-lg bg-white rounded-full p-6',
            searchAlign === "center" && "mx-auto",
          )}
        />
        {hasFilter && (
          <div>
            <Select value={yearFilter} onValueChange={(value) => handleFilterChange(value)}>
              <SelectTrigger className="max-w-lg p-0 border-0 shadow-none">
                <SelectValue placeholder="Select a year" />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                {
                  years.map((year, index) => (
                    <SelectItem key={index} value={year}>{year}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {
        paginatedData?.length > 0 ? (
          paginatedData?.map((pdf: any, index: number) => (
            <a href={pdf.file} target="_blank" rel="noopener noreferrer" key={`pdf-${index}`}>
              <PDFCard className="sm relative mb-6">
                <p>{pdf.title}</p>
                {pdf.description && (
                  <div className="text-gray-500 text-sm mt-4">{pdf.description}</div>
                )}
                {pdf.date && (
                  <div className="text-gray-500 text-sm mt-4">- {format(pdf.date, 'LLLL	do, yyyy')}</div>
                )}
                <div className="icon absolute top-1/2 right-8">
                  <Download />
                </div>
              </PDFCard>
            </a>
          ))
        ) : (
          <div className="text-center my-16 text-gray-400">No results found.</div>
        )
      }

      {
        pageCount > 1 &&
        <ReactPaginate
          previousLabel={<ChevronLeft className='-mr-1'/>}
          nextLabel={<ChevronRight className='-ml-1' />}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={4}
          onPageChange={handlePageChange}
          containerClassName={'flex space-x-2 justify-end mt-12'}
          activeClassName={'active'}
        />
      }
    </div>
  );
}

export default PDFList;

const PDFCard = styled.div`
  padding: 24px;
  padding-right: 80px;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 16px;
  transition: all 0.3s ease;

  & h6 {
    font-size: 16px;
    font-weight: 500;
  }

  &:hover {
    background: white;
  }

  & .icon {
    opacity: 0;
    translate: 40% -50%;
    transition: all 0.3s ease;
  }

  &:hover .icon {
    opacity: 1;
    translate: 0 -50%;
    transition: all 0.3s ease;
  }
`;