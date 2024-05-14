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
      <PDFCard className="relative sm" bgColor={pathname?.startsWith('/business') ? '#D4D4D4': '#FFFEF9'}>
          <p>{title}</p>
          {description && (
            <div className="text-gray-500 text-sm mt-4">{description}</div>
          )}
          {date && (
            <div className="text-gray-500 text-sm mt-4">- {format(date, 'LLLL	do, yyyy')}</div>
          )}
          <div className="icon absolute top-1/2 right-8">
            { type === "pdf" && <Download /> }
            { type === "link" && <ArrowRight /> }
          </div>
      </PDFCard>
    </a>
  );
};

export default DocumentCard;

const PDFCard = styled.div<{ bgColor: string }>`
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 16px;
  transition: all 0.3s ease;
  background: ${({ bgColor }) => bgColor};

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