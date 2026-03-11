"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

// Configurações de tracking por domínio
const TRACKING_CONFIG = {
  shr: {
    gtmId: "GTM-M4LJXG68",
    ga4Id: "G-Z2EQWFFMQC",
    metaPixelId: "1609509633385345",
  },
  maletti: {
    gtmId: "GTM-NHTPW27K",
    ga4Id: "G-SCQRQ9F9LD",
    metaPixelId: null as string | null,
    siteVerification: "SkrI3t5Q5vQ_OvnnTNksc-gx1nKisw0Gq0oANsuLvM0",
  },
};

// Detectar domínio de forma que funcione no client
function getTrackingConfig() {
  if (typeof window === "undefined") {
    // SSR: retorna config padrão (SHR) - será atualizado no client
    return { config: TRACKING_CONFIG.shr, isMaletti: false };
  }
  const hostname = window.location.hostname;
  const isMalettiDomain = hostname.includes("maletti");
  return {
    config: isMalettiDomain ? TRACKING_CONFIG.maletti : TRACKING_CONFIG.shr,
    isMaletti: isMalettiDomain,
  };
}

export function TrackingScripts() {
  const [mounted, setMounted] = useState(false);
  const [trackingState, setTrackingState] = useState(() => getTrackingConfig());

  useEffect(() => {
    setMounted(true);
    // Atualiza config no client para o domínio correto
    setTrackingState(getTrackingConfig());
  }, []);

  // Renderiza os scripts imediatamente com config padrão
  // O script vai detectar o domínio correto no client
  const { config, isMaletti } = trackingState;

  return (
    <>
      {/* Google Tag Manager - detecta domínio dinamicamente */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var isMaletti = window.location.hostname.includes('maletti');
              var gtmId = isMaletti ? 'GTM-NHTPW27K' : 'GTM-M4LJXG68';
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer',gtmId);
            })();
          `,
        }}
      />

      {/* Google Analytics 4 - detecta domínio dinamicamente */}
      <Script
        id="ga4-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var isMaletti = window.location.hostname.includes('maletti');
              var ga4Id = isMaletti ? 'G-SCQRQ9F9LD' : 'G-Z2EQWFFMQC';
              var script = document.createElement('script');
              script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ga4Id;
              script.async = true;
              document.head.appendChild(script);
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', ga4Id);
            })();
          `,
        }}
      />

      {/* Meta Pixel - apenas para SHR */}
      <Script
        id="meta-pixel"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var isMaletti = window.location.hostname.includes('maletti');
              if (isMaletti) return; // Maletti não tem Meta Pixel
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1609509633385345');
              fbq('track', 'PageView');
            })();
          `,
        }}
      />
    </>
  );
}

export function TrackingNoscript() {
  // Renderiza ambos os noscripts - o browser vai ignorar o que não for do domínio
  // O noscript do GTM é necessário para validação do Search Console
  return (
    <>
      {/* GTM noscript - SHR */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-M4LJXG68"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="GTM SHR"
        />
      </noscript>

      {/* GTM noscript - Maletti */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-NHTPW27K"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="GTM Maletti"
        />
      </noscript>

      {/* Meta Pixel noscript - apenas SHR */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1609509633385345&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  );
}
