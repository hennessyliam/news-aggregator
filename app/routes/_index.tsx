import type { MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { logout } from "~/session.server";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Financial News Aggregator" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="https://wallpapercave.com/wp/wp6539075.jpg"
                alt="Stonks"
                style={{ filter: 'blur(6px)' }}
              />
            </div>
            <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block text-gray-100 outline-gray-900-xl drop-shadow-xl">
                  Financial News Aggregator
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                Please login or create an account to search for financial news.
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <div className="flex space-x-4">
                    <Link
                      to="/search"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-green-500 shadow-sm hover:text-white hover:bg-green-500 sm:px-8"
                    >
                      Search!
                    </Link>
                    <Form action="/logout" method="post">
                      <button
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-3 text-white font-medium shadow-sm hover:text-indigo-500 hover:bg-white sm:px-8"
                      >
                        Logout
                      </button>
                    </Form>
                  </div>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-green-500 shadow-sm hover:text-indigo-500 sm:px-8"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-indigo-500 px-4 py-3 font-medium text-white hover:bg-indigo-600"
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
