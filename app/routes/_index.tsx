import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { ResponsiveLogo } from "~/components/ResponsiveLogo";
import { searchHosts } from "~/lib/censys-api/hosts.mock";

export const meta: MetaFunction = () => {
  return [
    { title: "Hosts Search - Censys" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  return searchHosts(q);
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

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

      <main className="px-4">
        <ol className="mx-auto max-w-screen-md">
          {data.result.hits.map((hit, i) => (
            <li key={i} className="my-4">
              <dl>
                <div className="flex">
                  <dt className="font-bold">IP Address:</dt>
                  <dd className="ml-2">{hit.ip}</dd>
                </div>
                <div className="flex">
                  <dt className="font-bold">Number of protocols:</dt>
                  <dd className="ml-2">{hit.services.length}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}
