import { useSubmit } from "@remix-run/react";
import { Button } from "~/components/Button";

interface SearchPaginationProps {
  previousToken: string,
  nextToken: string,
}

export const SearchPagination = ({ previousToken, nextToken }: SearchPaginationProps) => {
  const submit = useSubmit();
  const getOnClick = (cursor: string) => () => {
    const existingParams = Object.fromEntries(new URLSearchParams(window.location.search));
    submit({ ...existingParams, cursor });
  };
  return (
    <>
      <Button
        disabled={!previousToken}
        onClick={getOnClick(previousToken)}
        className="rounded-r-none"
      >
        &lt; Previous
      </Button>
      <Button
        disabled={!nextToken}
        onClick={getOnClick(nextToken)}
        className="rounded-l-none ml-[1px]"
      >
        Next &gt;
      </Button>
    </>
  );
};
