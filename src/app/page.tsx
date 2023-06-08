// import { UNSPLASH_URL } from '@/constants';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-10">
      <h1 className="font-bold text-2xl md:text-5xl my-20 max-w-2xl bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent text-center">
        Search for any image with your favourite fetching method, and observe
        the difference
      </h1>
    </main>
  );
}
