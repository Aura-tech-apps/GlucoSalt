// functions/[[catchAll]].js
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.toLowerCase(); // normaliza

  // -----------------------------
  // MAPA DE SLUGS → PATH REAL
  // -----------------------------
  const map = {
    // Presell
    "/yuo": "/presell/presell.html",
    "/yuo/": "/presell/presell.html",

    // Lead 1
    "/klm": "/front/lead1/vsl-27.html",
    "/klm/": "/front/lead1/vsl-27.html",
    "/nop": "/front/lead1/vsl-37.html",
    "/nop/": "/front/lead1/vsl-37.html",
    "/ntg": "/front/lead1/vsl-47.html",
    "/ntg/": "/front/lead1/vsl-47.html",

    // Lead 2
    "/efg": "/front/lead2/vsl-27.html",
    "/efg/": "/front/lead2/vsl-27.html",
    "/hij": "/front/lead2/vsl-37.html",
    "/hij/": "/front/lead2/vsl-37.html",
    "/bvc": "/front/lead2/vsl-47.html",
    "/bvc/": "/front/lead2/vsl-47.html",

    // Lead 3
    "/yza": "/front/lead3/vsl-27.html",
    "/yza/": "/front/lead3/vsl-27.html",
    "/bcd": "/front/lead3/vsl-37.html",
    "/bcd/": "/front/lead3/vsl-37.html",
    "/fas": "/front/lead3/vsl-47.html",
    "/fas/": "/front/lead3/vsl-47.html",

    // Lead 4
    "/hgx": "/front/lead4/vsl-27.html",
    "/hgx/": "/front/lead4/vsl-27.html",
    "/jjg": "/front/lead4/vsl-37.html",
    "/jjg/": "/front/lead4/vsl-37.html",
    "/ewq": "/front/lead4/vsl-47.html",
    "/ewq/": "/front/lead4/vsl-47.html"
  };

  // -----------------------------
  // SE O SLUG EXISTIR → Redirect
  // -----------------------------
  if (map[path]) {
    return Response.redirect(map[path], 302);
  }

  // -----------------------------
  // Caso NÃO seja slug → entrega normalmente os assets do projeto
  // -----------------------------
  return env.ASSETS.fetch(request);
}
