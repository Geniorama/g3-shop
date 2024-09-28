import { useEffect } from "react";
import { GTM_SCRIPT, GTM_ID } from "@/lib/gtm";

export const useGTM = () => {
  useEffect(() => {
    if (GTM_ID && typeof window !== "undefined") {
      const scriptTag = document.createElement("script");
      scriptTag.innerHTML = GTM_SCRIPT;
      document.head.appendChild(scriptTag);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "gtm.js", 'gtm.start': new Date().getTime() });
    }
  }, []);
};
