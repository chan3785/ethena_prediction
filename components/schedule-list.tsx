'use client';
import { useReadContract } from 'wagmi';
import FACTORY_ABI from '@/abi/IETHPRE.abi';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScheduleItem } from './schedule-item';

const ETHENA_FACTORY_ADDRESS = '0xFa273F31D51DD752f9893024C0A88a792CB5d093';
export const ScheduleList = () => {
  const { data: allGames }: any = useReadContract({
    address: ETHENA_FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getGameList'
  });
  if (!allGames) {
    return <></>;
  }

  const tbcGames = allGames.filter((game: any) => game.startDate > Date.now());
  const ongoingGames = allGames.filter(
    (game: any) => game.startDate < Date.now() && game.isEnded !== true
  );
  const closedGames = allGames.filter((game: any) => game.isEnded === true);


  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allGames?.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">TBC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tbcGames?.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ongoing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ongoingGames?.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{closedGames?.length}</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 md:col-span-3">
            <CardHeader>
              <CardTitle>Project Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar initialFocus mode="single" numberOfMonths={1} />
            </CardContent>
          </Card>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>News & Predict</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Tabs defaultValue="ongoing" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                  <TabsTrigger value="tbc">TBC</TabsTrigger>
                  <TabsTrigger value="closed">Closed</TabsTrigger>
                </TabsList>
                <TabsContent value="tbc" className="space-y-4">
                  {tbcGames &&
                    tbcGames.map((game: any) => {
                      return <ScheduleItem key={game.id} game={game} />;
                    })}
                </TabsContent>
                <TabsContent value="ongoing" className="space-y-4">
                  {ongoingGames &&
                    ongoingGames.map((game: any) => {
                      return <ScheduleItem key={game.id} game={game} />;
                    })}
                </TabsContent>
                <TabsContent value="closed" className="space-y-4">
                  {closedGames &&
                    closedGames.map((game: any) => {
                      return <ScheduleItem key={game.id} game={game} />;
                    })}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
};
