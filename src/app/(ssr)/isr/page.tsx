import { IMGS_BASE_URL } from '@/constants';
import Image from 'next/image';

export const metadata = {
  title: 'Incremental static regenration',
};

// export const revalidate = 10; // for all fetches in this page.

const DynamicPage = async () => {
  const jsonImg: ImageType = await (
    await fetch(`${IMGS_BASE_URL}/id/${new Date().getSeconds()}/info`, {
      next: {
        revalidate: 10, // for only this fetch call
      },
    })
  ).json();

  const imgId = jsonImg.id;

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold text-center my-4">ISR</h1>
      <p className="md:mx-10 border p-2 mx-5 lg:w-1/2 text-justify">
        This page uses <strong>Incremental Static Regentration</strong>. A new
        image is fetched every 10 seconds (revalidate: 10) after refreshing the
        page and then served from the cache for that duration.
      </p>
      <div className="flex justify-center m-4 relative">
        <Image
          src={`${IMGS_BASE_URL}/id/${imgId}/800`}
          alt={jsonImg.author}
          width={800}
          height={800}
        />
        <div className="text-center p-2 absolute bg-orange-500 bg-opacity-70 bottom-0 w-full">
          <p>
            <strong>Author</strong>: {jsonImg.author}
          </p>
          <p>
            <strong>View HD</strong>:
            <a href={jsonImg.download_url} download>
              Click here
            </a>
          </p>
          <p className="break-words hidden md:block">
            <strong>Unsplash Url</strong>: {jsonImg.url}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DynamicPage;
