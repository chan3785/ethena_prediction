'use client';
import { GameItem } from './game-item';
import { useFilteredGames } from '@/utils/useFilteredGames';

export const GameList = () => {
  const { filteredGames } = useFilteredGames();

  if (!filteredGames) {
    return <></>;
  }


  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-3">
      {filteredGames &&
        filteredGames.map((game: any) => {
          return <GameItem key={game?.gameId} game={game} />;
        })}
    </div>
  );
};
