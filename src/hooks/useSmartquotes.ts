import { useEffect } from "react";
import smartquotes from "smartquotes";

function useSmartquotes() {
  useEffect(() => {
    smartquotes();
  });
}

export default useSmartquotes;
