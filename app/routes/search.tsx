import React, { useState } from 'react';
import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { fetchNews } from '../fetchNews.server';

export async function action({ request }: ActionFunctionArgs) {
  const params = await request.formData()
  const searchTerm = params.get('searchTerm') || '';
  console.log(`searchTerm: ${searchTerm}`);
  const articles = (await fetchNews(searchTerm as string)).map((article) => ({
    title: article.title,
    url: article.url,
    description: article.description,
  }))

  return json({ articles });
}


const SearchBox = () => {
  const data = useActionData<typeof action>()

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
        <h1 className="text-center text-xl font-extrabold tracking-tight sm:text-md lg:text-md">
          <span className="block uppercase text-grey-700 outline-gray-900-xl drop-shadow-xl">
            Financial News Aggregator
          </span>
        </h1>
      </div>
      <Form action="/logout" method="post">
        <button
          className="absolute top-0 right-0 m-4 text-blue-500 hover:underline"
        >
          Logout
        </button>
      </Form>
      <div className="flex flex-col items-center justify-center">
        <Form method="post">
          <div className="mb-4">
            <input
              type="text"
              name='searchTerm'
              className="px-4 py-2 border rounded"
              placeholder="Search..."
            />
          </div>
          <button
            className="px-4 py-2 flex items-center justify-center bg-indigo-500 text-white rounded hover:bg-indigo-700"
          >
            Search
          </button>
        </Form>
        <div className="mt-4 flex flex-col gap-2">
          {data?.articles.map(({ title, url, description }) => (
            <a href={url} target='_blank' rel='noreferer' className="mb-2 px-4 py-2 border rounded flex flex-col justify-center max-w-xl ">
              <span>{title}</span>
              <span className='text-xs text-blue-500'>{url}</span>
              <span className="text-gray-700 text-sm line-clamp-2">{description}</span>
            </a>

          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchBox;