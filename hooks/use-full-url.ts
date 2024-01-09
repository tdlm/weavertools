import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useFullURL = () => {
  const [fullUrl, setFullUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Function to construct the full URL
    const constructFullUrl = () => {
      const protocol = window.location.protocol;
      const host = window.location.host; // host includes hostname and port
      const path = router.asPath;
      return `${protocol}//${host}${path}`;
    };

    if (typeof window !== "undefined") {
      setFullUrl(constructFullUrl());
    }
  }, [router.asPath]);

  return fullUrl;
};

export default useFullURL;
