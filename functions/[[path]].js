export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // normaliza: remove barra final (mas preserve a raiz "/")
  let path = url.pathname;
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);

  const map = {
    "/yuo": "/presell/presell.html",

    "/klm": "/front/lead1/vsl-27.html",
    "/nop": "/front/lead1/vsl-37.html",
    "/ntg": "/front/lead1/vsl-47.html",

    "/efg": "/front/lead2/vsl-27.html",
    "/hij": "/front/lead2/vsl-37.html",
    "/bvc": "/front/lead2/vsl-47.html",

    "/yza": "/front/lead3/vsl-27.html",
    "/bcd": "/front/lead3/vsl-37.html",
    "/fas": "/front/lead3/vsl-47.html",

    "/hgx": "/front/lead4/vsl-27.html",
    "/jjg": "/front/lead4/vsl-37.html",
    "/ewq": "/front/lead4/vsl-47.html",

    "/eer": "/upsells/up1.html",
    "/rto": "/upsells/up2.html",
    "/rrt": "/upsells/up3.html",
    "/hfa": "/upsells/up4.html",
    "/gracias": "/upsells/gracias.html",

    "/bru/1/a": "/backredirect/lead1/var-27.html",
    "/bru/1/b": "/backredirect/lead1/var-37.html",
    "/bru/1/c": "/backredirect/lead1/var-47.html",
    "/bru/2/a": "/backredirect/lead2/var-27.html",
    "/bru/2/b": "/backredirect/lead2/var-37.html",
    "/bru/2/c": "/backredirect/lead2/var-47.html",
    "/bru/3/a": "/backredirect/lead3/var-27.html",
    "/bru/3/b": "/backredirect/lead3/var-37.html",
    "/bru/3/c": "/backredirect/lead3/var-47.html",
    "/bru/4/a": "/backredirect/lead4/var-27.html",
    "/bru/4/b": "/backredirect/lead4/var-37.html",
    "/bru/4/c": "/backredirect/lead4/var-47.html",
  };

  const target = map[path];
  if (target) {
    // Serve o asset estático do Pages mantendo a URL externa
    return fetch(new URL(target, env.ASSETS));
  }

  // Sem match: NÃO volte pra presell; apenas continue o pipeline normal.
  return next();
}
