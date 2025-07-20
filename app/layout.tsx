import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import {
  Montserrat,
  Chango,
  Anton,
  Antic_Didone,
  Archivo_Black,
  Rowdies,
  Alfa_Slab_One,
  Luckiest_Guy,
  Orbitron,
  Audiowide,
} from "next/font/google";
import { TrackingProvider } from "./context/tracking-context";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";



const chango = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-chango",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-anton",
});

const siteConfig = {
  name: "Sultan Loco",
  title: "Sultan Loco - Juegos y Entretenimiento",
  description:
    "Descubrí una nueva forma de divertirte con Sultan Loco. Juegos, premios y emoción.",
  url: "https://sultanloco.com", // Reemplaza con tu URL de producción
  ogImage: "/sult.png", // URL del logo
  favicon: "/sult.png", // URL del logo para favicon
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,

  // Favicons y icons
  icons: {
    icon: siteConfig.favicon,
    shortcut: siteConfig.favicon,
    apple: siteConfig.favicon,
  },

  // Open Graph
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200, // Ancho deseado para la imagen de vista previa (ajusta si es necesario)
        height: 630, // Alto deseado para la imagen de vista previa (ajusta si es necesario)
        alt: siteConfig.name,
      },
    ],
    locale: "es_AR", // Asumiendo español de Argentina
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    // Puedes añadir @creator si tienes un handle de Twitter
  },

  // Otros metadatos útiles
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Alternativa al generator, si no quieres el de v0.dev
  // generator: siteConfig.name,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${anton.variable} ${chango.variable}`}
    >
      {" "}
      {/* Puedes quitar className=\"dark\" si ThemeProvider lo maneja o si prefieres tema claro por defecto */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* Aplicamos la clase de Montserrat al body */}
      <body className={chango.className}>
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !(function (f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function () {
                  n.callMethod
                    ? n.callMethod.apply(n, arguments)
                    : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = "2.0";
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
              })(
                window,
                document,
                "script",
                "https://connect.facebook.net/en_US/fbevents.js"
              );
              fbq("init", "${process.env.NEXT_PUBLIC_META_PIXEL_ID}");
              fbq("track", "PageView");
            `,
          }}
        />
        <Script
          id="lead-event"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function () {
                const observer = new MutationObserver((mutationsList, observer) => {
                  for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                      const buttonIds = ["upload-button", "cta-button", "register-button", "deposit-button", "create-user-button"];
                      buttonIds.forEach(id => {
                        const button = document.getElementById(id);
                        if (button && !button.hasAttribute('data-fbq-attached')) { // Verifica si el evento ya está adjunto
                          console.log(\`Botón \${id} encontrado\`);
                          button.addEventListener("click", function () {
                            if (typeof window.fbq === 'function') {
                              window.fbq("track", "StartTrial", {
                                content_name: button.textContent || "Botón no encontrado",
                                value: 10,
                                currency: "USD",
                              });
                            }
                          });
                          button.setAttribute('data-fbq-attached', 'true'); // Marca como adjunto
                        }
                      });
                      if (buttonIds.every(id => document.getElementById(id))) {
                        observer.disconnect(); // Deja de observar una vez que todos los botones han sido encontrados
                      }
                    }
                  }
                });

                // Comienza a observar el documento
                observer.observe(document.body, { childList: true, subtree: true });
              });
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TrackingProvider>{children}</TrackingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
