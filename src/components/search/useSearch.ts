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
import { SearchResponse } from "src/data/search";

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


  const runSearch = useCallback(async () => {
    if (query !== prevQuery.current) {
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
  }, [query]);

  useEffect(() => {
    const form = formRef.current;
    form?.addEventListener("submit", runSearch);
    const timeout = setTimeout(runSearch, 250);
    return () => {
      form?.removeEventListener("submit", runSearch);
      clearTimeout(timeout);
    };
  }, [runSearch]);
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
