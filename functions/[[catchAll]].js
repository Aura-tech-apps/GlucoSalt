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
    "/yuo": "/presell/presell",
    "/yuo/": "/presell/presell",

    // Lead 1
    "/klm": "/front/lead1/vsl-27",
    "/klm/": "/front/lead1/vsl-27",
    "/nop": "/front/lead1/vsl-37",
    "/nop/": "/front/lead1/vsl-37",
    "/ntg": "/front/lead1/vsl-47",
    "/ntg/": "/front/lead1/vsl-47",

    // Lead 2
    "/efg": "/front/lead2/vsl-27",
    "/efg/": "/front/lead2/vsl-27",
    "/hij": "/front/lead2/vsl-37",
    "/hij/": "/front/lead2/vsl-37",
    "/bvc": "/front/lead2/vsl-47",
    "/bvc/": "/front/lead2/vsl-47",

    // Lead 3
    "/yza": "/front/lead3/vsl-27",
    "/yza/": "/front/lead3/vsl-27",
    "/bcd": "/front/lead3/vsl-37",
    "/bcd/": "/front/lead3/vsl-37",
    "/fas": "/front/lead3/vsl-47",
    "/fas/": "/front/lead3/vsl-47",

    // Lead 4
    "/hgx": "/front/lead4/vsl-27",
    "/hgx/": "/front/lead4/vsl-27",
    "/jjg": "/front/lead4/vsl-37",
    "/jjg/": "/front/lead4/vsl-37",
    "/ewq": "/front/lead4/vsl-47",
    "/ewq/": "/front/lead4/vsl-47"
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
