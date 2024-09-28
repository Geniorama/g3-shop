import { useState, useEffect } from "react";

export default function useCommingSoon(commingSoonMode: boolean) {
  const [isCommingSoon, setIsCommingSoon] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      setIsCommingSoon(commingSoonMode);
    } else {
        console.log('Is development mode')
    }
    setIsLoadingPage(false);
  }, [commingSoonMode]);

  return { isCommingSoon, isLoadingPage };
}
