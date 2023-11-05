import { useState } from 'react';
//npm install --save-dev @types/newsapi

const fetchNews = async (term: string) => {
    try {
        const today = new Date(); // Get today's date
        const oneYearAgo = new Date(); // Get another instance of today's date, which we'll then modify
        oneYearAgo.setFullYear(today.getFullYear() - 1); // Subtract 1 year from the current year

        // Convert both dates to YYYY-MM-DD format
        const toDate = today.toISOString().split('T')[0];
        const fromDate = oneYearAgo.toISOString().split('T')[0];

        console.log('Fetching news with search term:', term);
        console.log('From date:', fromDate);
        console.log('To date:', toDate);

        const response = await newsapi.v2.everything({
            q: term,
            from: fromDate,
            to: toDate,
            language: 'en',
            pageSize: 10, // The number of results to return. Max of 100
        });

        console.log('API response:', response);

        if (!response.articles.length) {
            console.log('No articles found for the given search term.');
            return [];
        }

        return response.articles.map((article: any) => article.title); // Return only the titles
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error fetching news: ${error.message}`);
        } else {
            console.error('Unknown error occurred while fetching news');
        }
        return [];
    }
};

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleSearch = async () => {
        console.log('Search button clicked.');
        const titles = await fetchNews(searchTerm);
        setSearchResults(titles);
    };

    return (
        <div className="relative h-screen overflow-y-auto">
            <div className="relative">
                <img
                    className="justify-normal mx-auto h-1/3 w-1/3 object-cover"
                    src="https://wallpaperaccess.com/full/3255898.jpg"
                    alt="Stonks"
                />
            </div>
            <div>
                <h1 className="text-center text-md font-extrabold tracking-tight sm:text-md lg:text-md">
                    <span className="block uppercase text-grey-700 outline-gray-900-xl drop-shadow-xl">
                        Financial News Aggregator
                    </span>
                </h1>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="mb-4">
                    <input
                        type="text"
                        className="px-4 py-2 border rounded"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state
                    />
                </div>
                <button
                    className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700"
                    onClick={handleSearch}
                >
                    Search
                </button>
                <div className="mt-4">
                    {searchResults.map((result: string, index: number) => (
                        <div key={index} className="mb-2 px-4 py-2 border rounded">
                            {result}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchBox;