'use client';
import { useReadContract } from 'wagmi';
import FACTORY_ABI from '@/abi/IETHPRE.abi';
import { GameItem } from './game-item';

const ETHENA_FACTORY_ADDRESS = '0x7655A535E711bA2Ecd0C4708705bE3F049cD98e2';
export const GameList = () => {
  const { data: allGames }: any = useReadContract({
    address: ETHENA_FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getGameList'
  });
  console.log(allGames);

  if (!allGames) {
    return <></>;
  }

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-3">
      {allGames &&
        allGames.map((game: any) => {
          return <GameItem key={game?.gameId} game={game} />;
        })}
    </div>
  );
};
