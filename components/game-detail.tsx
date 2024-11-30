'use client';
import { useReadContract } from 'wagmi';
import FACTORY_ABI from '@/abi/IFACTORY.abi';
import { Card, CardContent } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import Link from 'next/link';

const WNW_PRECOMPILE_ADDRESS = '0x8b6eC36dB2Cc17D3b16D52DdA334238F24EE7Ed6';

interface GameInfoProps {
  // availableMarket: AvailableMarket<MarketType>;
  // initialMarketData?: MarketData;
  children?: React.ReactNode;
}

export const GameDetail: React.FC<GameInfoProps> = ({
  children,
}) =>  {
  const params = useParams();
  const { id } = params as { id: string };

  // 게임의 description을 저장할 상태를 선언합니다.
  const [description, setDescription] = useState<string>('');

  // getGame 함수로부터 gameId를 이용해 game의 상세 정보를 불러옵니다.
  const {
    data: game,
    isLoading,
    isError
  } = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getGame',
    args: [BigInt(id)] // id를 BigInt로 변환하여 전달
  });

  useEffect(() => {
    if (game && (game as any).description) {
      setDescription((game as any).description);
    }
  }, [game]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  
  const getExplorerObjectLink = (
    objectId: string,
    isTestnet = false
  ): string => {
    return `https://explorer.aptoslabs.com/object/${objectId}${
      isTestnet ? "?network=testnet" : ""
    }`;
  };

  return (
    <div className="grid grid-cols-4 grid-rows-8 gap-4 text-xs sm:text-base">
      <div className="col-span-4 sm:col-span-2 row-span-2">
        <Card className="h-full">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <dt className="font-medium text-muted-foreground">Address</dt>
              <p className="mt-1 text-ellipsis overflow-hidden">
                {game ? ( //game.address 값
                  <Link
                    className="underline"
                    target="_blank"
                    href={"getExplorerObjectLink(/marketData?.address, true)"}
                  >
                    {/* {marketData?.address} */}
                  </Link>
                ) : (
                  "n/a"
                )}
              </p>
            </div>

            <div>
              <dt className="font-medium text-muted-foreground">Creator</dt>
              <p className="mt-1 text-ellipsis overflow-hidden">
                {game ? ( //marketData.creator 값
                  <Link
                    className="underline"
                    target="_blank"
                    href={"getExplorerObjectLink(marketData?.creator, true)"}
                  >
                    {/* {marketData?.creator} */}
                  </Link>
                ) : (
                  "n/a"
                )}
              </p>
            </div>
            <InfoItem
              label="Minimum Bet"
              value={`USDe {(marketData?.minBet).toFixed(2)}`}
            />
          </div>
        </Card>
      </div>

      <div className="col-span-4 sm:col-span-2 row-span-2">
        <Card className="h-full">
          <div className="grid grid-cols-2 gap-4">
            <InfoItem
              label="Up Votes Sum"
              value={"marketData?.upVotesSum ?? 0"}
            />
            <InfoItem
              label="Down Votes Sum"
              value={"marketData?.downVotesSum ?? 0"}
            />
            <InfoItem
              label="Start Time"
              value={""
                // isMounted && marketData?.startTime
                //   ? DateTime.fromSeconds(marketData.startTime).toLocaleString(DateTime.DATETIME_MED)
                //   : "n/a"
              }
            />
            <InfoItem
              label="End Time"
              value={""
                // isMounted && marketData?.endTime
                //   ? DateTime.fromSeconds(marketData.endTime).toLocaleString(DateTime.DATETIME_MED)
                //   : "n/a"
              }
            />
          </div>
        </Card>
      </div>

      <div className="col-span-4 sm:col-span-3 row-span-5">{children}</div>

      <div className="col-span-4 sm:col-span-1 row-span-1 sm:row-span-5">
        <Card className="h-full">
          <div className="grid grid-cols-2 gap-4">
            <InfoItem
              label="Start Price"
              value={`$ {marketData?.startPrice
                ? formatAptPrice(marketData?.startPrice)
                : "n/a"
                }`}
            />
            <InfoItem
              label="End Price"
              value={`$ {marketData?.endPrice
                ? formatAptPrice(marketData?.endPrice)
                : "n/a"
                }`}
            />
          </div>
        </Card>
      </div>

      <div className="col-span-4 row-span-1">
        <Card className="h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem
              label="Up Bets Sum"
              value={`USDe {marketData?.upBetsSum
                ? formatAptPrice(marketData?.upBetsSum)
                : "n/a"
                }`}
            />
            <InfoItem
              label="Down Bets Sum"
              value={`USDe {marketData?.downBetsSum
                ? formatAptPrice(marketData?.downBetsSum)
                : "n/a"
                }`}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <dt className="font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}
