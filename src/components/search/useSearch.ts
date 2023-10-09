import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { experimental_useFormState as useFormState } from "react-dom";
import useClickOutside from "src/hooks/useClickOutside";
import { search as searchAction, type SearchAction } from "./search.actions";

const initialSearchState: SearchAction = {};

export default function useSearch() {
  const formRef = useRef<HTMLFormElement>(null);
  const resultsRef = useRef(null);
  const [showResults, setShowResults] = useState(false);
  const [{ results, error }, formAction] = useFormState(
    searchAction,
    initialSearchState
  );

  const getQuery = useCallback(() => {
    const formData = formRef.current ? new FormData(formRef.current) : null;
    return formData?.get("query");
  }, [formRef]);

  const query = useMemo(getQuery, [getQuery]);

  const isSufficientlyComplexQuery = useCallback(() => {
    const query = getQuery();
    const sufficientlyComplexQuery = query && query.length > 2;
    return Boolean(sufficientlyComplexQuery);
  }, [getQuery]);

  useEffect(() => {
    setShowResults(
      isSufficientlyComplexQuery() && (Boolean(results) || Boolean(error))
    );
  }, [results, error, isSufficientlyComplexQuery]);

  function hideResults() {
    setShowResults(false);
  }

  const onInputFocus = useCallback(() => {
    if (isSufficientlyComplexQuery() && results?.length) {
      setShowResults(true);
    }
  }, [results, isSufficientlyComplexQuery]);

  const onResultClick = useCallback(() => {
    hideResults();
    formRef.current?.reset();
  }, [formRef]);

  useClickOutside(resultsRef, hideResults);

  return {
    formRef,
    resultsRef,
    showResults,
    formAction,
    query,
    results,
    error,
    onInputFocus,
    onResultClick,
  };
}
