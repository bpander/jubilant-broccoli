import type { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { ResponsiveLogo } from "~/components/ResponsiveLogo";

export const meta: MetaFunction = () => {
  return [
    { title: "Hosts Search - Censys" },
  ];
};

export default function Index() {
  return (
    <>
      <nav className="px-4 py-2 shadow bg-zinc-50">
        <div className="mx-auto max-w-screen-md w-full flex items-center">
          <ResponsiveLogo />
          <Form className="ml-4 grow flex justify-center items-center">
            <label className="flex items-center max-w-sm grow">
              <span className="mr-2">Hosts</span>
              <input
                type="search"
                placeholder="Search"
                className="rounded-l border border-zinc-300 w-full px-2 py-1"
              />
            </label>
            <button type="submit" className="rounded-r bg-zinc-700 border border-zinc-700 px-2 py-1 text-white">
              Search
            </button>
          </Form>
        </div>
      </nav>
    </>
  );
}
