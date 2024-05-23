import React from 'react'
import { builder } from '@builder.io/react';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function GSTINTable() {
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    builder.getAll('gstin').then((data) => {
      setData(data);
    })
  }, []);

  return (
    <div className="table-border overflow-x-auto">
      <table>
        <thead>
          <th>No.</th>
          <th>State</th>
          <th>GSTIN</th>
          <th>Principal of Business</th>
        </thead>
        <tbody>
          {data?.map((item: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.data.state}</td>
              <td>{item.data.gstin}</td>
              <td>{item.data.principalOfBusiness}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
