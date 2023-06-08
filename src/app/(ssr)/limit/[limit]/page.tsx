import { IMGS_BASE_URL } from '@/constants';
import { Metadata } from 'next';
import Image from 'next/image';

interface PageProps {
  params: {
    limit: string;
    // searchParams: { [key: string]: string | string[] | undefined };
  };
}

export function generateMetadata({ params: { limit } }: PageProps): Metadata {
  return {
    title: `${limit} beautiful images`,
  };
}

// Generate some common limits in advance at build time:
export async function generateStaticParams() {
  return ['10', '20', '30', '40'].map((limit) => ({ limit }));
}
// return not found if user visits some other page (not mentioned above in generateStaticParams)
// export const dynamicParams = false;

const IdImgPage = async ({ params: { limit } }: PageProps) => {
  const jsonImgs: ImageType[] = await (
    await fetch(
      `${IMGS_BASE_URL}/v2/list?page=${Number(limit) / 2}&limit=${limit}`
    )
  ).json();

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold text-center my-4">
        Here are your {limit} beautiful images:
      </h1>
      <p className="md:mx-10 border p-2 mx-5 lg:w-1/2 text-justify">
        This page uses <strong>Generate Static Params</strong> to render and
        cache static pages at build time, even though the URL has the dynamic
        parameter. Pages that are not included in generateStaticParams will be
        fetched and rendered on the first access and then
        <strong> cached for subsequent requests</strong> (this can be disabled).
        <br />
        And we are using <strong>generateMetadata</strong> to generate dynamic
        title.
      </p>
      <div className="flex flex-wrap justify-center">
        {jsonImgs.map((image, idx) => (
          <div className="flex justify-center m-4 relative" key={image.id}>
            <Image
              src={`${IMGS_BASE_URL}/id/${image.id}/400`}
              alt={image.author}
              width={400}
              height={400}
            />
            <div className="text-center p-2 absolute bg-orange-500 bg-opacity-70 bottom-0 w-full">
              <p>
                <strong>Author</strong>: {image.author}
              </p>
              <p>
                <strong>View HD</strong>:
                <a href={image.download_url} download>
                  Click here
                </a>
              </p>
              <p className="break-words hidden md:block">
                <strong>Unsplash Url</strong>: {image.url}
              </p>
            </div>
            <p className="absolute right-3 top-2 font-bold p-1 text-sm bg-orange-500 text-white">
              {idx < 9 && '0'}
              {idx + 1}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default IdImgPage;
