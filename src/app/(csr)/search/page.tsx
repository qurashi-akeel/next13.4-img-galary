import SearchComponent from './SearchComponent';

export const metadata = {
  title: 'Search images',
};

const SearchPage = () => {
  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold text-center my-4">ISR</h1>
      <p className="md:mx-10 border p-2 mx-5 lg:w-1/2 text-justify">
        This page fetches data <strong>Client Side</strong>, in order to not
        leak api credentials, the request is sent to{' '}
        <strong>nextjs API route handler</strong> that runs on the server. This
        route handler then fetches the data from the images API and returns it
        to the client.
      </p>
      <SearchComponent />
    </div>
  );
};
export default SearchPage;
