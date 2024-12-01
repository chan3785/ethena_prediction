'use client';

import { useState, useEffect } from 'react';
import { GameDetail } from '@/components/game-detail';
import { GameDetailComment } from '@/components/game-detail-comment';
import { GameDetailVote } from '@/components/game-detail-vote';
import { Badge } from '@/components/ui/badge';
import { useReadContract } from 'wagmi';
import { Breadcrumbs } from "@/components/breadcrumbs";
import FACTORY_ABI from '@/abi/IFACTORY.abi';
import { useSearchParams } from 'next/navigation';
import { tokenInfos } from '@/constants';
import { Card, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function Page() {
  const [gameTitle, setGameTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [duration, setDuration] = useState('');
  const ETHENA_FACTORY_ADDRESS = '0xFa273F31D51DD752f9893024C0A88a792CB5d093';
  const searchParams = useSearchParams();
  const key = searchParams.get('key');


  const { data: game }: any = useReadContract({
    address: ETHENA_FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getGame',
    args: [key]
  });


  useEffect(() => {
    if (game) {

      const milliseconds = Number(game.startTime);
      const date = new Date(milliseconds);
      const year = date.getFullYear() + 50;
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}.${month}.${day}`;
      setEventDate(formattedDate);
      const tokenInfo = tokenInfos.find((item) => item.address === String(game.priceFeed));

      setTokenName(tokenInfo?.name ?? 'Token Name');
      setDuration(game.duration);
      const updateTimer = () => {
        const endDate = Number(eventDate);
        const now = Date.now();
        const timeDiff = endDate - now;

        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

          const timeString =
            days > 0
              ? `${days}D ${hours.toString().padStart(2, '0')}:${minutes
                  .toString()
                  .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
              : `${hours.toString().padStart(2, '0')}:${minutes
                  .toString()
                  .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

          setTimeLeft("Ends in " + timeString);
        } else {
          setTimeLeft('Betting Ended');
        }
      };

      const timerInterval = setInterval(updateTimer, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [game]);

  
  return (
    <div className="mt-10 max-h-screen space-y-6 overflow-y-auto p-4 md:p-8">
      <Breadcrumbs
        className="mb-4"
        linkHref="/"
        linkTitle="Games"
        pageName={tokenName + " / USD"}
      />
      <div className="flex w-4/6 justify-between">
        <h1 className="mb-5 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
        Will {tokenName ?? 'Token Name'} / USD go UP or DOWN
        in {Number(duration) / 60} mins?
        </h1>
      </div>

      <div className="flex space-x-6">
        <Badge className="text-F7F8F8 rounded-3xl bg-[#575757] p-1.5 px-5 text-xs">
          {tokenName} / USD
        </Badge>
        <Badge className="text-F7F8F8 rounded-3xl bg-[#575757] p-1.5 px-5 text-xs">
          {!game?.isEnded ? `${timeLeft}` : 'End'}
        </Badge>
        <Badge className="text-F7F8F8 rounded-3xl bg-[#575757] p-1.5 px-5 text-xs">
          {game?.category || 'Loading...'}
        </Badge>
      </div>

      <div className="flex h-full space-x-8">
        <div className="h-full w-2/3 space-y-20 overflow-y-auto pr-2">
          <GameDetail />
          <GameDetailComment />
        </div>

        <div className="h-full w-1/3 space-y-4 overflow-y-auto pl-2">
          <GameDetailVote />
        </div>
      </div>
    </div>
  );
}
