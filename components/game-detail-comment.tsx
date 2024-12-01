'use client';

import { Label } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Link from 'next/link';
import { useReadContract } from 'wagmi';
import FACTORY_ABI from '@/abi/IFACTORY.abi';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
// 랜덤 지갑 주소를 생성하는 함수
const generateRandomWalletAddress = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return address;
};
// 서로 다른 지갑 주소 생성
const walletAddresses = Array.from({ length: 8 }, generateRandomWalletAddress);
// 지갑 주소를 축약하는 함수
const shortenAddress = (address: any) => {
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};
const ETHENA_FACTORY_ADDRESS = '0xFa273F31D51DD752f9893024C0A88a792CB5d093';
  

export const GameDetailComment = () => {
  const searchParams = useSearchParams();
  const key = searchParams.get('key');
  const [address, setTokenAddress] = useState(''); // Input 필드에 입력된 숫자


const { data: game }: any = useReadContract({
  address: ETHENA_FACTORY_ADDRESS,
  abi: FACTORY_ABI,
  functionName: 'getGame',
  args: [key]
});

useEffect(() => {
  if (game) {
    setTokenAddress(game.bettingToken)
  }
}, [game]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Label>Description</Label>
        <Input id="description" placeholder="Please leave a comment." />
        <Button className="w-200 h-110 cursor-pointer bg-[#00A29A] bg-lime-700 object-contain text-white transition-transform duration-75 hover:bg-[#00A29A] active:scale-95 active:bg-[#66C2B8]">
          Up
        </Button>
        <Button className="w-200 h-110 cursor-pointer bg-[#C73535] bg-rose-700 object-contain text-white transition-transform duration-75 hover:bg-[#C73535] active:scale-95 active:bg-[#E57373]">
          Down
        </Button>
      </div>
      <div className="ml-5 mr-5 flex space-x-4">
        <div className="w-1/2 space-y-4">
          <div className="space-y-4">
            <div className="mb-2 flex items-center">
              <span className="mb-2 mr-5 flex items-center rounded-[15px] border border-[#00A29A] px-3 py-1 text-xs font-bold text-[#00A29A]">
                Price Up
              </span>
              <span className="text-[11px] text-[#B6B6B6]">+213 Comment</span>
            </div>
            <div className="grid gap-6">
              {walletAddresses.slice(0, 4).map((address, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between space-x-4"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/avatars/03.png" alt="Image" />
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {shortenAddress(address)}
                      </p>
                      <p className="text-sm font-medium leading-none">
                        Hey its real
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/2 space-y-4">
          <div className="space-y-4">
            <div className="mb-2 flex items-center">
              <span className="mb-2 mr-5 flex items-center rounded-[15px] border border-[#C73535] px-3 py-1 text-xs font-bold text-[#C73535]">
                Price Down
              </span>
              <span className="text-[11px] text-[#B6B6B6]">+98 Comment</span>
            </div>
            <div className="grid gap-6">
              {walletAddresses.slice(4, 8).map((address, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between space-x-4"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/avatars/03.png" alt="Image" />
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {shortenAddress(address)}
                      </p>
                      <p className="text-sm font-medium leading-none">
                        Hey its not real
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
      <Button className='mt-6'>
      <Link href={"https://testnets.opensea.io/assets/sepolia/" + game.bettingToken + "/1"} >
        Up Vote NFT Link
        </Link>
      </Button>
      <br/>
      <Button className='mt-6'>
      <Link href={"https://testnets.opensea.io/assets/sepolia/" + game.bettingToken + "/2"} >
        Down Vote NFT Link
        </Link>
      </Button>
    </div>
  );
};
