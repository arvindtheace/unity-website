import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import styled from 'styled-components';

interface DropdownCardProps {
  title: string;
  content: string;
  headers?: string[];
  rows?: string[][];
}

const DropdownCard: React.FC<any> = ({ title, content, headers, rows }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Dropdown className='p-3 md:p-7'>
      <Trigger className='text-left' onClick={toggleContent}>
        <div className="flex items-center justify-between">
          <div className='text-xl pr-8'>{title}</div>
          <div>
            <Plus size={28} className={`transition-all duration-200 ${isExpanded ? 'rotate-45' : ''}`}/>
          </div>
        </div>
      </Trigger>
      <Content isExpanded={isExpanded}>
        <div className="px-4 py-8">
          <div className="mb-8" dangerouslySetInnerHTML={{ __html: content }}></div>
          {
            headers && rows && headers.length > 0 && rows.length > 0 && (
              <div className="table-border w-fit">
                <table>
                  <thead>
                    <tr>
                      {headers.map((header: any, index: number) => (
                        <th key={index}>{header.header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((item: any, rowIndex: number) => (
                      <tr key={rowIndex}>
                        {item.row?.map((cell: any, cellIndex: number) => (
                          <td key={cellIndex}>{cell.cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        </div>
      </Content>
    </Dropdown>
  );
};


export default DropdownCard;

const Dropdown = styled.div`
  border: 1px solid #00000016;
  border-radius: 16px;
  transition: all 0.3s ease;
  background: white;
`;

const Trigger = styled.div`
  padding: 16px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
`;

const Content = styled.div<{isExpanded: boolean}>`
  max-height: ${({ isExpanded }) => isExpanded ? '1500px' : '0'};
  overflow-x: auto;
  transition: ${({ isExpanded }) => isExpanded ? 'max-height 0.5s ease' : 'max-height 0.3s ease'};

  & ol {
    list-style-type: decimal;
    padding-left: 1rem;

    & li {
      padding-left: 1rem;
      margin-bottom: 16px;
      font-size: 18px;
      line-height: 1.5;
    }
  }
`;