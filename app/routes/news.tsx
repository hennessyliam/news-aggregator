import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"


async function newsAggregation(searchTerm: string) {
  const apiData = await fetch(`//news.nytimes.com/${searchTerm}`)
  const apiDataJson = await apiData.json()

  return apiDataJson
}

export async function loader({params}:LoaderFunctionArgs) {
  const searchTerm = params.searchTerm
  const newsData = await newsAggregation(searchTerm)

  return json({
    data: newsData})
}

// my_api_calls
// http.server('/api') -- make python API server
    // localhost:3000/api/news

export default function NewsComponent() {
  const {data} = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>News</h1>
    </div>
  );
}


