import NewsAPI from 'newsapi';

const newsapi = new NewsAPI(process.env.NEWS_API_KEY); // Initialize the newsapi object with your API key

type Article = {
    title: string;
    author: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
}

export async function fetchNews(term: string): Promise<Article[]> {
    try {
        const today = new Date(); // Get today's date
        const oneWeekAgo = new Date(); // Get another instance of today's date, which we'll then modify
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);


        // Convert both dates to YYYY-MM-DD format
        const toDate = today.toISOString().split('T')[0];
        const fromDate = oneWeekAgo.toISOString().split('T')[0];

        console.log('Fetching news with search term:', term);
        console.log('From date:', fromDate);
        console.log('To date:', toDate);

        const response = await newsapi.v2.everything({
            q: term,
            from: fromDate,
            to: toDate,
            language: 'en',
            pageSize: 20, // The number of results to return. Max of 100
            //category: 'business', // Specify the category as 'business'
        });

        console.log('API response:', response);

        if (!response.articles.length) {
            console.log('No articles found for the given search term.');
            return [];
        }

        // Sort the articles by the "publishedAt" parameter
        const sortedArticles = response.articles.sort((a, b) => {
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        });

        return sortedArticles;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error fetching news: ${error.message}`);
        } else {
            console.error('Unknown error occurred while fetching news');
        }
        return [];
    }
}