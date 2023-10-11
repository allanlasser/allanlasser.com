"use client";

import { redirect, usePathname, useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { search, SearchResponse } from "src/data/search";

export default function useSearch(
  initialQuery?: string,
  initialResponse?: SearchResponse
) {
  const pathname = usePathname();
  const router = useRouter();

  const [query, setQuery] = useState(initialQuery ?? "");
  const [response, setResponse] = useState(initialResponse);

  const formRef = useRef<HTMLFormElement>(null);
  const prevQuery = useRef<string>(query);

  const redirectToSearchPage = useCallback(
    (event: KeyboardEvent) => {
      console.log(event.key, pathname);
      if (event.key === "Enter" && pathname !== "/search") {
        router.push(`/search?query=${query}`);
      }
    },
    [query, pathname, router]
  );

  const runSearch = useCallback(
    async (event?: SubmitEvent) => {
      event?.preventDefault();
      if (query !== prevQuery.current) {
        if (!query) {
          setResponse({});
        } else {
          setResponse(await search(query));
        }
      }
      prevQuery.current = query;
    },
    [query]
  );

  useEffect(() => {
    const form = formRef.current;
    form?.addEventListener("submit", runSearch);
    const timeout = setTimeout(runSearch, 250);
    return () => {
      form?.removeEventListener("submit", runSearch);
      clearTimeout(timeout);
    };
  }, [runSearch]);

  useEffect(() => {
    const form = formRef.current;
    form?.addEventListener("keydown", redirectToSearchPage);
    return () => {
      form?.addEventListener("keydown", redirectToSearchPage);
    };
  }, [redirectToSearchPage]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setQuery(value);
  };

  return {
    formRef,
    query,
    response,
    onInputChange,
    prevQuery: prevQuery.current,
  };
}
