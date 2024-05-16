import { format } from 'date-fns';
import { ArrowRight, Download } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';

interface DocumentCardProps {
  file: string;
  type: "pdf" | "link";
  link: string;
  title: string;
  date: Date;
  description: string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ file, type, link, title, date, description }) => {
  const pathname = usePathname()
  return (
    <a href={type === "link" ? link : file} target="_blank" rel="noopener noreferrer" >
      {pathname?.startsWith('/business') ?
        (
          <PDFCardDark className="relative sm">
            <div>{title}</div>
            {description && (
              <div className="text-sm mt-4">{description}</div>
            )}
            {date && (
              <div className="text-sm mt-4">- {format(date, 'LLLL	do, yyyy')}</div>
            )}
            <div className="icon absolute top-1/2 right-8">
              {type === "pdf" && <Download />}
              {type === "link" && <ArrowRight />}
            </div>
          </PDFCardDark>
        ) :
        (<PDFCardLight className="relative sm">
          <p>{title}</p>
          {description && (
            <div className="text-gray-500 text-sm mt-4">{description}</div>
          )}
          {date && (
            <div className="text-gray-500 text-sm mt-4">- {format(date, 'LLLL	do, yyyy')}</div>
          )}
          <div className="icon absolute top-1/2 right-8">
            {type === "pdf" && <Download />}
            {type === "link" && <ArrowRight />}
          </div>
        </PDFCardLight>)}
    </a>
  );
};

export default DocumentCard;

const PDFCardLight = styled.div`
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 16px;
  transition: all 0.3s ease;
  background: #FFFEF9;

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

  & h6 {
    font-size: 16px;
    font-weight: 500;
  }

  &:hover {
    background: white;
  }
`;

const PDFCardDark = styled.div`
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 16px;
  transition: all 0.3s ease;
  background: #171717;
  color: #fff;

  & .icon {
    opacity: 0;
    translate: 40% -50%;
    transition: all 0.3s ease;
  }

  &:hover .icon {
    color: #FFF;
    opacity: 1;
    translate: 0 -50%;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  & h6 {
    font-size: 16px;
    font-weight: 500;
  }

  &:hover {
    background: #2b2b2a;
    color: #FFF;
  }
  &:active {
    background: #353534;
    color: #FFF;
  }
`;