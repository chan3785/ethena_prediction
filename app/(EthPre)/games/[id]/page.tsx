'use client';

import { useState, useEffect } from 'react';
import { GameDetail } from '@/components/game-detail';
import { GameDetailComment } from '@/components/game-detail-comment';
import { GameDetailVote } from '@/components/game-detail-vote';
import { Badge } from '@/components/ui/badge';
import { useReadContract } from 'wagmi';
import { Breadcrumbs } from "@/components/breadcrumbs";
import WNW_ABI from '@/abi/IFACTORY.abi';
import { useSearchParams } from 'next/navigation';
import { tokenInfos } from '@/constants';
import { Card, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function Page() {
  const [gameTitle, setGameTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [tokenName, setTokenName] = useState('');
  const WNW_PRECOMPILE_ADDRESS = '0x73B19Eb49B8d49c526bA89354aA9B269c5262432';
  const searchParams = useSearchParams();
  const key = searchParams.get('key');


  const { data: game }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGame',
    args: [key]
  });

  useEffect(() => {
    if (game) {
      setGameTitle(game.gameTitle);

      const milliseconds = Number(game.startDate);
      const date = new Date(milliseconds);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}.${month}.${day}`;
      setEventDate(formattedDate);

      const tokenInfo = tokenInfos.find(
        (item) => item.id === Number(game.gameId)
      );
      setTokenName(tokenInfo?.name ?? 'Token Name');

      const updateTimer = () => {
        const endDate = Number(game.endDate);
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

          setTimeLeft(timeString);
        } else {
          setTimeLeft('Game Ended');
        }
      };

      const timerInterval = setInterval(updateTimer, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [game]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        className="mb-4"
        linkHref="/"
        linkTitle="Games"
        pageName={"marketData.name"}
      />

      <GameDetail
        // availableMarket={availableMarket}
        // initialMarketData={marketData}
      >
        <Card className="h-full bg-white dark:bg-[#161a25] backdrop-grayscale-none bg-opacity-100 backdrop-blur-none">
          {/* <TradingViewWidget marketType={marketType} /> */}
        </Card>
      </GameDetail>
    </div>
  );
}
