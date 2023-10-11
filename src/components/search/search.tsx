"use client";

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cx from "classnames";
import { Search } from "lucide-react";
import useSearch from "./useSearch";
import styles from "./search.module.css";
import SearchResultItem from "./search-result";
import type { SearchResponse } from "src/data/search";
import useClickOutside from "src/hooks/useClickOutside";

export interface SearchInputProps {
  className?: string;
  query?: string;
  searchResponse?: SearchResponse;
  floatResults?: boolean;
}

function useSearchResults(
  query: string,
  response: SearchResponse,
  float?: boolean
) {
  const resultsRef = useRef(null);
  const [showResults, setShowResults] = useState(
    Boolean(response.results || response.error)
  );

  const isSufficientlyComplexQuery = useCallback(() => {
    const sufficientlyComplexQuery = query && query.length > 2;
    return Boolean(sufficientlyComplexQuery);
  }, [query]);

  useEffect(() => {
    const { results, error } = response ?? {};
    setShowResults(
      isSufficientlyComplexQuery() && (Boolean(results) || Boolean(error))
    );
  }, [response, isSufficientlyComplexQuery]);

  useClickOutside(resultsRef, () => {
    if (float) setShowResults(false);
  });

  return {
    resultsRef,
    showResults,
    setShowResults,
  };
}

export default function SearchInput(props: SearchInputProps) {
  const {
    className,
    query: initialQuery,
    searchResponse: initialSearchResponse,
    floatResults,
  } = props;

  const { formRef, query, response, prevQuery, setQuery } = useSearch(
    initialQuery,
    initialSearchResponse
  );

  const { resultsRef, showResults, setShowResults } = useSearchResults(
    query,
    response ?? {},
    floatResults
  );

  const { results, error } = response ?? {};

  const resultList = useMemo(() => {
    if (results?.length) {
      return (
        <ul className={cx(styles.resultList)}>
          {results?.map((result) => (
            <li key={result._id}>
              <SearchResultItem result={result} />
            </li>
          ))}
        </ul>
      );
    } else if (error) {
      return <p className={cx(styles.message, styles.error)}>{error}</p>;
    } else {
      return (
        <p className={cx(styles.message, styles.empty)}>
          No results found for &ldquo;{String(prevQuery)}&rdquo;
        </p>
      );
    }
  }, [prevQuery, results, error]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setQuery(value);
  };

  return (
    <div className={cx(styles.container, className)}>
      <form
        method='GET'
        action='/search'
        className={cx(styles.search)}
        ref={formRef}
      >
        <label
          htmlFor='search'
          className={cx(styles.searchInputLabel)}
          title='Search'
        >
          <Search />
        </label>
        <input
          id='search'
          type='search'
          name='query'
          value={query}
          placeholder='Search'
          className={cx(styles.searchInput)}
          onChange={onInputChange}
          onClick={() => setShowResults(Boolean((query && results) || error))}
        />
      </form>
      {showResults && (
        <div
          ref={resultsRef}
          className={cx({ [styles.float]: floatResults }, styles.results)}
        >
          {resultList}
        </div>
      )}
    </div>
  );
}
