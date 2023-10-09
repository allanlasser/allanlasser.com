"use client";

import { useMemo } from "react";
import cx from "classnames";
import { Search } from "lucide-react";
import useSearch from "./useSearch";
import styles from "./search.module.css";
import SearchResultItem from "./search-result";

export default function SearchInput(props: { className: string }) {
  const {
    formRef,
    resultsRef,
    showResults,
    formAction,
    query,
    results,
    error,
    onInputFocus,
    onResultClick,
  } = useSearch();

  const resultList = useMemo(() => {
    if (showResults) {
      if (results?.length) {
        return (
          <ul className={styles.results} ref={resultsRef}>
            {results?.map((result) => (
              <li key={result._id}>
                <SearchResultItem result={result} onClick={onResultClick} />
              </li>
            ))}
          </ul>
        );
      } else if (error) {
        return (
          <p
            className={cx(styles.results, styles.message, styles.error)}
            ref={resultsRef}
          >
            {error}
          </p>
        );
      } else {
        return (
          <p
            className={cx(styles.results, styles.message, styles.empty)}
            ref={resultsRef}
          >
            No results found for &ldquo;{String(query)}&rdquo;
          </p>
        );
      }
    } else {
      return null;
    }
  }, [showResults, query, results, error, onResultClick, resultsRef]);

  return (
    <div className={cx(styles.container, props.className)}>
      <form action={formAction} className={cx(styles.search)} ref={formRef}>
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
          placeholder='Search'
          className={cx(styles.searchInput)}
          onClick={onInputFocus}
        />
      </form>
      {resultList}
    </div>
  );
}
