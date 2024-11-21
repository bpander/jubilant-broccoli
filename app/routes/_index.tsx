import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { PropsWithChildren, useEffect, useRef } from "react";
import { Button } from "~/components/Button";
import { ResponsiveLogo } from "~/components/ResponsiveLogo";
import { searchHosts } from "~/lib/censys-api/hosts";
import { SearchPagination } from "./components/SearchPagination";

export const meta: MetaFunction = () => {
  return [
    { title: "Hosts Search - Censys" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const { q = "", cursor } = Object.fromEntries(url.searchParams);
  return searchHosts({ q, cursor });
};

interface DefaultLayoutProps {
  initialQuery?: string,
}

const DefaultLayout = ({ initialQuery, children }: PropsWithChildren<DefaultLayoutProps>) => {
  const qRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // Update search input if user navigates via browser back/forward arrows
    if (qRef.current && initialQuery != null) qRef.current.value = initialQuery;
  }, [initialQuery]);

  return (
    <>
      <nav className="sticky top-0 z-10 py-2 shadow bg-zinc-50">
        <div className="px-4 mx-auto max-w-screen-md flex items-center">
          <Link to="/">
            <ResponsiveLogo />
          </Link>
          <Form className="ml-4 grow flex justify-center items-center">
            <label className="flex items-center max-w-sm grow">
              <span className="mr-2">Hosts</span>
              <input
                ref={qRef}
                type="search"
                placeholder="Search"
                name="q"
                defaultValue={initialQuery}
                className="rounded-l border border-zinc-300 w-full px-2 py-1"
              />
            </label>
            <Button type="submit" className="rounded-l-none">
              Search
            </Button>
          </Form>
        </div>
      </nav>
      <main className="mx-auto max-w-screen-md mt-8">
        {children}
      </main>
    </>
  );
};

export const ErrorBoundary = () => (
  <DefaultLayout>
    <div className="text-center my-12">
      An error occurred.
    </div>
  </DefaultLayout>
);

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const searching = !!navigation.location;

  return (
    <DefaultLayout initialQuery={data.result.query}>
      {!data.result.hits.length ? (
        <div className="text-center my-12">
          No results found.
        </div>
      ) : (
        <>
          <ol className={searching ? "opacity-50" : ""}>
            {data.result.hits.map((hit, i) => (
              <li key={i} className="px-4 py-2 border-b first:border-t even:bg-zinc-50">
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
          <div className="flex justify-center items-center my-8">
            <SearchPagination
              previousToken={data.result.links.prev}
              nextToken={data.result.links.next}
            />
          </div>
        </>
      )}
    </DefaultLayout>
  );
}
