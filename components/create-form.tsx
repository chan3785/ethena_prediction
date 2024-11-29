'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { DateTime, Duration } from "luxon";
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import PRED_ABI from '@/abi/IETHPRE.abi';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from './ui/use-toast';
import React from 'react';
import { useReadContract, useWriteContract } from 'wagmi';
import { tokenInfos } from '@/constants';
import { Lock, PartyPopper, Rocket } from 'lucide-react';

function getEarliestStartDate(): DateTime {
    const now = DateTime.now();
    return now
      .plus({ hours: 1, minutes: 15 - (now.minute % 15) })
      .set({ second: 0, millisecond: 0 });
  }


const formSchema = z.object({
  token: z.string().optional(),
  durationSeconds: z.number().optional(),
  up_token_uri: z.string().default('').optional(),
  down_token_uri: z.string().default('').optional(),
  minBet: z.number().default(0.01).optional(),
  startTime: z.date().refine(
    (date) => {
      return (
        DateTime.fromJSDate(date)
          .diff(getEarliestStartDate())
          .as("seconds") >= 0
      );
    },
  ),
});

type FormValues = z.infer<typeof formSchema>;



const WNW_PRECOMPILE_ADDRESS = '0x8b6eC36dB2Cc17D3b16D52DdA334238F24EE7Ed6';
const PRICE_CONTRACT_ADDRESS = '0x9d0886e169364D704A05a86f5fAdfA49b7495037';

export const CreateForm: React.FC = () => {
  const { writeContract } = useWriteContract();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const title = 'Create Game';

  
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      durationSeconds: undefined,
      minBet: 0.01,
    },
  });

  const durations = useMemo(
    () => [
      Duration.fromObject({ minute: 15 }),
      Duration.fromObject({ minute: 30 }),
      Duration.fromObject({ minute: 45 }),
      Duration.fromObject({ hour: 1 }),
      Duration.fromObject({ hour: 2 }),
      Duration.fromObject({ hour: 4 }),
      Duration.fromObject({ hour: 6 }),
      Duration.fromObject({ hour: 12 }),
      Duration.fromObject({ day: 1 }),
      Duration.fromObject({ day: 3 }),
      Duration.fromObject({ day: 7 }),
      Duration.fromObject({ day: 14 }),
      Duration.fromObject({ month: 1 }),
      Duration.fromObject({ month: 3 }),
      Duration.fromObject({ month: 6 }),
      Duration.fromObject({ year: 1 }),
    ],
    []
  );

  const { data: allPrices }: any = useReadContract({
    address: PRICE_CONTRACT_ADDRESS,
    abi: [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "getLatestPrices",
        "outputs": [
          {
            "internalType": "int256[]",
            "name": "",
            "type": "int256[]"
          },
          {
            "internalType": "string[]",
            "name": "",
            "type": "string[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: 'getLatestPrices'
  });

  
  const assets = useMemo(
    () =>
      allPrices.map((price: any) => ({
        label: price.typeArgument.split("::").pop()!,
        value: price.typeArgument,
      })),
    [allPrices]
  );

  const formatDuration = useCallback((duration: Duration) => {
    // Switch case to format based on the unit
    switch (Object.keys(duration.toObject())[0]) {
      case "minutes":
        return duration.toFormat("m 'min'");
      case "hours":
        return duration.toFormat("h 'h'");
      case "days":
        return duration.toFormat("d 'd'");
      case "months":
        return duration.toFormat("M 'mo'");
      case "years":
        return duration.toFormat("y 'y'");
      default:
        return "Invalid duration unit";
    }
  }, []);

  const handleAssetChange = useCallback(
    (assetValue: string) => {
      form.setValue("token", assetValue);
    },
    [form]
  );



  const onSubmit = async (data: FormValues) => {
    try {
      const address = data.token;

      // 입력받은 address와 일치하는 tokenInfo를 찾음
      const tokenInfo = tokenInfos.find(
        (item) => item.address.toLowerCase() === address?.toLowerCase()
      );

      if (!tokenInfo) {
        throw new Error('Token not found');
      }

      const startPrice = tokenInfo.startPrice;



      setLoading(true);
      writeContract({
        abi: PRED_ABI,
        address: WNW_PRECOMPILE_ADDRESS,
        functionName: 'createGame',
        args: [
          data.up_token_uri, // 게임 카테고리
          startPrice, // 해당 토큰의 시작 가격
          data.down_token_uri, // 이벤트 설명
        ]
      });

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDurationChange = useCallback(
    (durationValue: number) => {
      form.setValue("durationSeconds", durationValue);
      form.trigger("durationSeconds");
    },
    [form]
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description="" />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem className={`flex flex-col`}>
                      <FormLabel>Asset</FormLabel>
                      <div className="max-w-full overflow-auto">
                        <div className="flex gap-5">
                          {assets.map((asset: any) => (
                            <Button
                              type="button"
                              variant="outline"
                              key={asset.value}
                              id={asset.value}
                              className={`${field.value === asset.value
                                ? "bg-primary text-secondary"
                                : ""
                                }`}
                              onClick={() => handleAssetChange(asset.value)}
                            >
                              {asset.label}/USD
                            </Button>
                          ))}
                        </div>
                      </div>
                      {/* <FormDescription>
                                                Bet on the change of this asset pair.
                                            </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
          <div className="space-y-3">
          <FormField
                  control={form.control}
                  name="durationSeconds"
                  render={({ field }) => (
                    <FormItem className={`flex flex-col`}>
                      <FormLabel>Duration</FormLabel>
                      <div className="max-w-full overflow-auto">
                        <div className="grid grid-cols-8 grid-rows-2 min-w-[200%] lg:min-w-full grid-flow-col max-h-[140px] lg:max-h-[400px] gap-2 place-items-center ">
                          {durations.map((i) => (
                            <Button
                              type="button"
                              variant="outline"
                              key={i.as("seconds")}
                              id={`${i.as("seconds")}`}
                              className={`w-full ${field.value === i.as("seconds")
                                ? "bg-primary text-secondary hover:bg-primary hover:text-secondary"
                                : ""
                                }`}
                              onClick={() =>
                                handleDurationChange(i.as("seconds"))
                              }
                            >
                              {formatDuration(i)}
                            </Button>
                          ))}
                        </div>
                      </div>
                      {/* <FormDescription>
                                                No bets can be placed for the given duration.
                                            </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
           <FormField
                  control={form.control}
                  name="minBet"
                  render={({ field }) => (
                    <FormItem className={`flex flex-col`}>
                      <FormLabel>Min Bet</FormLabel>
                      <div className="max-w-full overflow-auto">
                        <Input type="number" step="0.01" {...field} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            <FormField
              control={form.control}
              name="up_token_uri"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UP token URI (NFT)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Please put token URI from NFT"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="down_token_uri"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DOWN token URI (NFT)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Please put token URI from NFT"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-2 lg:grid-cols-3">
                  <div className="items-center hidden lg:flex">
                    <Rocket className="h-4 w-4 mx-4" />
                    <div className="flex flex-col">
                      <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        Start Betting:
                      </span>
                      <span>Now</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <PartyPopper className="h-4 w-4 mx-4" />
                    <div className="flex flex-col">
                      <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        End Betting:
                      </span>
                      <span>
                        {form.getValues("durationSeconds")
                          ? getEarliestStartDate()
                            .plus({
                              second: form.getValues("durationSeconds"),
                            })
                            ?.toLocaleString(DateTime.DATETIME_SHORT)
                          : "tbd."}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 mx-4" />
                    <div className="flex flex-col">
                      <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        Unstake Limit:
                      </span>
                      <span>
                        {form.getValues("durationSeconds")
                          ? getEarliestStartDate()
                            .plus({
                              second: form.getValues("durationSeconds"),
                            })
                            .plus({
                              second: 604800,
                            })
                            ?.toLocaleString(DateTime.DATETIME_SHORT)
                          : "tbd."}
                      </span>
                    </div>
                  </div>
                </div>
                <Button disabled={loading} type="submit" className="w-full ml-auto bg-slate-300 bg-blend-lighten">
                  Create Bet
                </Button>
              </form>
            </Form>
    </>
  );
};
