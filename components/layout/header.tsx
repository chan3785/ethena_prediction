import Link from 'next/link';
import Image from 'next/image';
import { Account } from '../account';
import { Button } from '../ui/button';

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="ml-20 mr-20 flex h-20 items-center justify-between px-4">
        <div className="flex items-center space-x-1">
          <Link href={'/'}>
            <Button className="w-50 ml-7 h-15 font-bold" variant="ghost">
              Ethena Prediction
            </Button>
          </Link>
          <Link href={'/'}>
            <Button className="w-30 ml-7 h-8 font-semibold" variant="ghost">
              Price Prediction
            </Button>
          </Link>
          <Link href={'/charge'}>
            <Button className="w-30 ml-7 h-8 font-semibold" variant="ghost">
              Charge
            </Button>
          </Link>
          <Link href={'/game-info'}>
            <Button className="w-30 ml-7 h-8 font-semibold" variant="ghost">
              Game info
            </Button>
          </Link>
          <Link href={'/create-bet'}>
            <Button className="w-30 ml-7 h-8 bg-slate-300 font-semibold">
              Create Game
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Account />
        </div>
      </nav>
    </div>
  );
}
