"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchResponse } from "src/data/search";

export default function useSearch(
  initialQuery?: string,
  initialResponse?: SearchResponse
) {
  const router = useRouter();

  const [query, setQuery] = useState(initialQuery ?? "");
  const [response, setResponse] = useState(initialResponse);

  const formRef = useRef<HTMLFormElement>(null);
  const prevQuery = useRef<string>(query);
  const firstRun = useRef<boolean>(true);

  const runSearch = useCallback(async () => {
    if (query !== prevQuery.current || firstRun.current) {
      if (!query) {
        setResponse({});
      } else {
        try {
          const response: SearchResponse = await (
            await fetch(`/api/search?query=${query}`)
          ).json();
          setResponse(response);
        } catch (e) {
          setResponse({ error: String(e) });
        }
      }
    }
    prevQuery.current = query;
    firstRun.current = false;
  }, [query]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query && query.length > 2) {
        router.push(`?query=${query}`);
      }
    }, 750);
    return () => {
      clearTimeout(timeout);
    };
  }, [query, router]);

  const onSubmit = useCallback(
    async (event?: SubmitEvent) => {
      event?.preventDefault();
      runSearch();
      router.push(`/search?query=${query}`);
    },
    [runSearch, router, query]
  );

  useEffect(() => {
    const form = formRef.current;
    form?.addEventListener("submit", onSubmit);
    const timeout = setTimeout(runSearch, 250);
    return () => {
      form?.removeEventListener("submit", onSubmit);
      clearTimeout(timeout);
    };
  }, [runSearch, onSubmit]);

  return {
    formRef,
    query,
    response,
    prevQuery: prevQuery.current,
    setQuery,
  };
}
