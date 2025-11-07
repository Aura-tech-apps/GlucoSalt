// functions/[[path]].js
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, ""); // remove barra final

  // Mapa de rewrites (mantém a slug visível)
  const map = {
    // Presell
    "/yuo": "/presell/presell.html",

    // LEAD 1
    "/klm": "/front/lead1/vsl-27.html",
    "/nop": "/front/lead1/vsl-37.html",
    "/ntg": "/front/lead1/vsl-47.html",

    // LEAD 2
    "/efg": "/front/lead2/vsl-27.html",
    "/hij": "/front/lead2/vsl-37.html",
    "/bvc": "/front/lead2/vsl-47.html",

    // LEAD 3
    "/yza": "/front/lead3/vsl-27.html",
    "/bcd": "/front/lead3/vsl-37.html",
    "/fas": "/front/lead3/vsl-47.html",

    // LEAD 4
    "/hgx": "/front/lead4/vsl-27.html",
    "/jjg": "/front/lead4/vsl-37.html",
    "/ewq": "/front/lead4/vsl-47.html",

    // Upsells (exemplo)
    "/eer": "/upsells/up1.html",
    "/rto": "/upsells/up2.html",
    "/rrt": "/upsells/up3.html",
    "/hfa": "/upsells/up4.html",
    "/gracias": "/upsells/gracias.html",
  };

  // Normaliza com/sem barra final
  const key = map[path] ? path : map[path + "/"] ? path + "/" : null;

  if (key) {
    // Faz fetch do asset de destino, mas mantém a URL original (sem redirect)
    const target = map[key];
    const origin = new URL(target, url.origin).toString();
    // Usa o binding interno do Pages para servir os assets estáticos
    return await env.ASSETS.fetch(new Request(origin, request));
  }

  // Caso padrão: serve normalmente o arquivo solicitado
  return env.ASSETS.fetch(request);
}
