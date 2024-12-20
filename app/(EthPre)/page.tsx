import { GameList } from '@/components/game-list';

export default function page() {
  return (
    <div className="mt-10 space-y-6 p-4 md:p-8 overflow-y-scroll h-full max-h-[calc(100vh-100px)]">
      <h2 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-3xl">
        Ethena Prediction
      </h2>
      <h1 className="mb-20 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Get precise news and predict the price
      </h1>
      <div>
        <GameList/>
      </div>
    </div>
  );
}
