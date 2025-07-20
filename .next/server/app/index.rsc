2:I[9107,[],"ClientPageRoot"]
3:I[7275,["464","static/chunks/464-125c33ec78aba9ef.js","52","static/chunks/52-0e052b116cc15d46.js","931","static/chunks/app/page-acfa1f16f03bb76c.js"],"default",1]
4:I[8003,["464","static/chunks/464-125c33ec78aba9ef.js","185","static/chunks/app/layout-b100856c664477e4.js"],""]
6:I[346,["464","static/chunks/464-125c33ec78aba9ef.js","185","static/chunks/app/layout-b100856c664477e4.js"],"ThemeProvider"]
7:I[5380,["464","static/chunks/464-125c33ec78aba9ef.js","185","static/chunks/app/layout-b100856c664477e4.js"],"TrackingProvider"]
8:I[4707,[],""]
9:I[6423,[],""]
5:T709,
              document.addEventListener('DOMContentLoaded', function () {
                const observer = new MutationObserver((mutationsList, observer) => {
                  for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                      const buttonIds = ["upload-button", "cta-button", "register-button", "deposit-button", "create-user-button"];
                      buttonIds.forEach(id => {
                        const button = document.getElementById(id);
                        if (button && !button.hasAttribute('data-fbq-attached')) { // Verifica si el evento ya está adjunto
                          console.log(`Botón ${id} encontrado`);
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
            0:["MI89I2ULWzg59VCnPYMGy",[[["",{"children":["__PAGE__",{}]},"$undefined","$undefined",true],["",{"children":["__PAGE__",{},[["$L1",["$","$L2",null,{"props":{"params":{},"searchParams":{}},"Component":"$3"}],null],null],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/50532deac0d3084b.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"es","className":"__variable_c05830 __variable_2d00a0","children":[" ",["$","head",null,{"children":[["$","link",null,{"rel":"preconnect","href":"https://fonts.googleapis.com"}],["$","link",null,{"rel":"preconnect","href":"https://fonts.gstatic.com","crossOrigin":"anonymous"}],["$","link",null,{"href":"https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap","rel":"stylesheet"}]]}],["$","body",null,{"className":"__className_2d00a0","children":[["$","$L4",null,{"id":"fb-pixel","strategy":"afterInteractive","dangerouslySetInnerHTML":{"__html":"\n              !(function (f, b, e, v, n, t, s) {\n                if (f.fbq) return;\n                n = f.fbq = function () {\n                  n.callMethod\n                    ? n.callMethod.apply(n, arguments)\n                    : n.queue.push(arguments);\n                };\n                if (!f._fbq) f._fbq = n;\n                n.push = n;\n                n.loaded = !0;\n                n.version = \"2.0\";\n                n.queue = [];\n                t = b.createElement(e);\n                t.async = !0;\n                t.src = v;\n                s = b.getElementsByTagName(e)[0];\n                s.parentNode.insertBefore(t, s);\n              })(\n                window,\n                document,\n                \"script\",\n                \"https://connect.facebook.net/en_US/fbevents.js\"\n              );\n              fbq(\"init\", \"undefined\");\n              fbq(\"track\", \"PageView\");\n            "}}],["$","$L4",null,{"id":"lead-event","strategy":"afterInteractive","dangerouslySetInnerHTML":{"__html":"$5"}}],["$","noscript",null,{"children":["$","img",null,{"height":"1","width":"1","style":{"display":"none"},"src":"https://www.facebook.com/tr?id=undefined&ev=PageView&noscript=1"}]}],["$","$L6",null,{"attribute":"class","defaultTheme":"dark","enableSystem":true,"children":["$","$L7",null,{"children":["$","$L8",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L9",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}]}]}]]}]]}]],null],null],["$La",null]]]]
a:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"Sultan Loco - Juegos y Entretenimiento"}],["$","meta","3",{"name":"description","content":"Descubrí una nueva forma de divertirte con Sultan Loco. Juegos, premios y emoción."}],["$","meta","4",{"name":"robots","content":"index, follow"}],["$","meta","5",{"name":"googlebot","content":"index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"}],["$","meta","6",{"property":"og:title","content":"Sultan Loco - Juegos y Entretenimiento"}],["$","meta","7",{"property":"og:description","content":"Descubrí una nueva forma de divertirte con Sultan Loco. Juegos, premios y emoción."}],["$","meta","8",{"property":"og:url","content":"https://sultanloco.com"}],["$","meta","9",{"property":"og:site_name","content":"Sultan Loco"}],["$","meta","10",{"property":"og:locale","content":"es_AR"}],["$","meta","11",{"property":"og:image","content":"https://sultanloco.com/sult.png"}],["$","meta","12",{"property":"og:image:width","content":"1200"}],["$","meta","13",{"property":"og:image:height","content":"630"}],["$","meta","14",{"property":"og:image:alt","content":"Sultan Loco"}],["$","meta","15",{"property":"og:type","content":"website"}],["$","meta","16",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","17",{"name":"twitter:title","content":"Sultan Loco - Juegos y Entretenimiento"}],["$","meta","18",{"name":"twitter:description","content":"Descubrí una nueva forma de divertirte con Sultan Loco. Juegos, premios y emoción."}],["$","meta","19",{"name":"twitter:image","content":"https://sultanloco.com/sult.png"}],["$","link","20",{"rel":"shortcut icon","href":"/sult.png"}],["$","link","21",{"rel":"icon","href":"/sult.png"}],["$","link","22",{"rel":"apple-touch-icon","href":"/sult.png"}],["$","meta","23",{"name":"next-size-adjust"}]]
1:null
