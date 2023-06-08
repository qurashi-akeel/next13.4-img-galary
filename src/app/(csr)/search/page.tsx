import SearchComponent from './SearchComponent';

export const metadata = {
  title: 'Search images',
};

const SearchPage = () => {
  return (
    <div className="flex flex-col items-center p-10">
      <SearchComponent />
    </div>
  );
};
export default SearchPage;
