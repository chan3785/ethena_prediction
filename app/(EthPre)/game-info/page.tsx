'use client';

import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import client from '@/lib/apolloClient';
import QueryBuilder from '@/components/QueryBuilder';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table';
import Image from 'next/image';

const truncateText = (text: string, length: number = 20) => {
  if (!text || typeof text !== 'string') return text;
  return text.length > length
    ? `${text.slice(0, length / 3)}...${text.slice(-length / 3)}`
    : text;
};

export default function GameInfoPage() {
  const [query, setQuery] = useState(`  
    query MyQuery {
      gameCreateds(orderBy: id) {
        block_number
        contractId_
        timestamp_
        tokenAddress
        transactionHash_
        id
      }
    }
  `);
  const [showTable, setShowTable] = useState(false);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const { loading, error, data } = useQuery(gql(query), { client });

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="animate-pulse text-xl font-semibold text-blue-600">
          Fetching data from Goldsky Subgraph, please wait...
        </p>
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  const dataSource = query.match(/(\w+)\(/)?.[1];
  if (!dataSource) {
    console.error('Invalid data source');
    return <p>Invalid data source</p>;
  }

  const tableData = data?.[dataSource] || [];

  return (
    <div className="relative h-screen overflow-y-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Game Info</h1>

      <QueryBuilder
        onQueryChange={(newQuery) => {
          setQuery(newQuery);
          setShowTable(true);
        }}
        onSelectedFieldsChange={setSelectedFields}
      />

      {showTable && (
        <Table className="mb-16 rounded-lg border border-gray-300 shadow-md">
          <TableHeader>
            <TableRow className="bg-gray-100">
              {selectedFields.map((field) => (
                <TableHead
                  key={field}
                  className="px-6 py-4 text-left text-gray-700"
                >
                  {field}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((item: any, index: number) => (
              <TableRow key={index} className="hover:bg-gray-50">
                {selectedFields.map((field) => (
                  <TableCell
                    key={field}
                    className="border-b border-gray-200 px-6 py-4 text-gray-800"
                    title={item[field]}
                  >
                    {field === 'timestamp_' ? (
                      new Date(item[field] * 1000).toLocaleString()
                    ) : field === 'transactionHash_' ? (
                      <a
                        href={`https://sepolia.etherscan.io/tx/${item[field]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {truncateText(item[field]?.toString() || 'N/A', 20)}
                      </a>
                    ) : (
                      truncateText(item[field]?.toString() || 'N/A', 20)
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="absolute right-4 top-4">
        <Image
          src="/goldskylogo.png"
          alt="Goldsky Logo"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
