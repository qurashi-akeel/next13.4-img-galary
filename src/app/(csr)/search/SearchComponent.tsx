'use client';

import { IMGS_BASE_URL } from '@/constants';
import Image from 'next/image';
import { FormEvent, useState } from 'react';

const SearchComponent = () => {
  const [searchRes, setSearchRes] = useState<null | ImageType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const imageid = formData.get('imageid');
    if (imageid) {
      setSearchRes(null);
      setIsLoading(true);
      setIsError(false);

      try {
        const res: ImageType = await (
          await fetch(`api/search?imageid=${imageid}`)
        ).json();
        setSearchRes(res);
      } catch (error) {
        console.error(error);
        setSearchRes(null);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section className="flex justify-center flex-col">
      <div className="flex justify-around mx-4 py-10 bg-white dark:bg-gray-800 rounded-md">
        <div className="px-5">
          <h2 className="text-center text-2xl font-bold leading-tight">
            Search Image here
          </h2>
          <form onSubmit={handleSubmit} className="mt-8">
            <label htmlFor="imageid" className="text-base font-medium">
              Image ID
            </label>
            <div className="mt-2 flex gap-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="number"
                id="imageid"
                name="imageid"
                placeholder="123"
              ></input>
              <button
                type="submit"
                disabled={isLoading}
                className={`inline-flex w-12 items-center justify-center rounded-md font-semibold border md:float-right ${
                  isLoading ? ' cursor-not-allowed' : ' cursor-pointer'
                }`}
              >
                &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
      {isError && (
        <div className="text-red-500 text-center my-10 font-bold">
          Invalid ID entered.!
        </div>
      )}
      {!searchRes ? (
        isLoading && (
          <div className="text-center my-10 font-bold">Loading...</div>
        )
      ) : (
        <div>
          <div className="flex justify-center m-4 relative">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/id/${searchRes?.id}/1000/1000`}
              alt={searchRes?.author as string}
              width={800}
              height={800}
              priority={false}
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/id/${searchRes?.id}/10/10)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />
            <div className="text-center p-2 absolute bg-orange-500 bg-opacity-70 bottom-0 w-full">
              <p>
                <strong>Author</strong>: {searchRes?.author}
              </p>
              <p>
                <strong>View HD</strong>:
                <a href={searchRes?.download_url} download>
                  Click here
                </a>
              </p>
              <p className="break-words hidden md:block">
                <strong>Unsplash Url</strong>: {searchRes?.url}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchComponent;
