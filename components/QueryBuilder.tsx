'use client';

import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

const FIELD_MAP: { [key: string]: string[] } = {
  betPlaceds: [
    'block_number',
    'contractId_',
    'id',
    'timestamp_',
    'transactionHash_',
    'amount',
    'betUp',
    'user'
  ],
  claimeds: [
    'block_number',
    'contractId_',
    'id',
    'timestamp_',
    'transactionHash_',
    'reward',
    'user'
  ],
  gameCreateds: [
    'block_number',
    'contractId_',
    'id',
    'timestamp_',
    'transactionHash_',
    'tokenAddress'
  ],
  gameEndeds: [
    'block_number',
    'contractId_',
    'id',
    'timestamp_',
    'transactionHash_',
    'lastPrice',
    'winnerTokenId'
  ],
  prizeAmounts: [
    'block_number',
    'contractId_',
    'id',
    'timestamp_',
    'transactionHash_',
    'prizeAmount'
  ]
};

const DATA_SOURCES = Object.keys(FIELD_MAP);

type QueryBuilderProps = {
  onQueryChange: (query: string) => void;
  onSelectedFieldsChange: (fields: string[]) => void;
};

export default function QueryBuilder({ onQueryChange, onSelectedFieldsChange }: QueryBuilderProps) {
  const [dataSource, setDataSource] = useState(DATA_SOURCES[0]);
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedFields, setSelectedFields] = useState<string[]>(FIELD_MAP[DATA_SOURCES[0]]);

  useEffect(() => {
    setSelectedFields(FIELD_MAP[dataSource]);
  }, [dataSource]);

  useEffect(() => {
    onSelectedFieldsChange(selectedFields); // 선택된 필드 변경
  }, [selectedFields, onSelectedFieldsChange]);

  const handleFieldToggle = (field: string) => {
    setSelectedFields((prevFields) =>
      prevFields.includes(field)
        ? prevFields.filter((f) => f !== field)
        : [...prevFields, field]
    );
  };

  const updateQuery = () => {
    const query = `
      query MyQuery {
        ${dataSource}(orderDirection: ${orderDirection}, orderBy: id) {
          ${selectedFields.join('\n')}
        }
      }
    `;
    onQueryChange(query);
  };

  return (
    <div className="mb-6 space-y-4">
      <div>
        <h2 className="mb-2 text-lg font-semibold">Select Data Source</h2>
        <Select
          onValueChange={(value) => setDataSource(value)}
          defaultValue={dataSource}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Data Source" />
          </SelectTrigger>
          <SelectContent>
            {DATA_SOURCES.map((source) => (
              <SelectItem key={source} value={source}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold">Select Order Direction</h2>
        <RadioGroup
          value={orderDirection}
          onValueChange={(value) => setOrderDirection(value as 'asc' | 'desc')}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="asc" />
            <span>Ascending</span>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="desc" />
            <span>Descending</span>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold">Select Fields</h2>
        <div className="grid grid-cols-2 gap-2">
          {FIELD_MAP[dataSource].map((field) => (
            <div key={field} className="flex items-center">
              <Checkbox
                checked={selectedFields.includes(field)}
                onCheckedChange={() => handleFieldToggle(field)}
              />
              <label className="ml-2">{field}</label>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={updateQuery} className="mt-4">
        Update Query
      </Button>
    </div>
  );
}
