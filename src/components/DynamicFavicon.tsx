"use client";

import { useEffect, useState } from "react";

type FaviconType = "shr" | "maletti";

interface DynamicFaviconProps {
  forceFavicon?: FaviconType;
  faviconUrl?: string;
}

export function DynamicFavicon({ forceFavicon, faviconUrl }: DynamicFaviconProps) {
  const [faviconPath, setFaviconPath] = useState<string>(
    faviconUrl || (forceFavicon === "maletti" ? "/malleti-fav.png" : "/shr-favicon.png")
  );

  useEffect(() => {
    if (faviconUrl) {
      setFaviconPath(faviconUrl);
      return;
    }

    if (forceFavicon) {
      setFaviconPath(forceFavicon === "maletti" ? "/malleti-fav.png" : "/shr-favicon.png");
      return;
    }

    const hostname = window.location.hostname;
    if (hostname.includes("maletti.com.br")) {
      setFaviconPath("/malleti-fav.png");
    } else {
      setFaviconPath("/shr-favicon.png");
    }
  }, [forceFavicon, faviconUrl]);

  return (
    <>
      <link rel="icon" href={faviconPath} type="image/png" />
      <link rel="apple-touch-icon" href={faviconPath} />
    </>
  );
}
