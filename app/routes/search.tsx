import React, { useState } from 'react';
import { Form, Link } from '@remix-run/react';
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

function SearchBox() {
  const [searchResults, setSearchResults] = useState([]);
  const user = useUser(); // Use the useUser hook to get the user object

  const handleSearch = () => {
    // Generate 10 Lorem Ipsum blurbs
    const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const results = Array(10).fill(loremIpsum);
    setSearchResults(results);
  }

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
          <span className="block italic text-grey-700 outline-gray-900-xl drop-shadow-xl">
            Please enter a search term below, {user.email}
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
        <div className="mb-4">
          <input
            type="text"
            className="px-4 py-2 border rounded"
            placeholder="Search..."
          />
        </div>
        <button
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700"
          onClick={handleSearch}
        >
          Search
        </button>
        <div className="mt-4">
          {searchResults.map((result, index) => (
            <div key={index} className="mb-2 px-4 py-2 border rounded">
              {result}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
