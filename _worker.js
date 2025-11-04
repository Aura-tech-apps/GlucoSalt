export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const slug = url.pathname;

    // Mapa de reescritas (mantém a slug original)
    const rewrites = {
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

      // UPSELLS
      "/eer": "/upsells/up1.html",
      "/rto": "/upsells/up2.html",
      "/rrt": "/upsells/up3.html",
      "/hfa": "/upsells/up4.html",
      "/gracias": "/upsells/gracias.html",

      // BACKREDIRECT
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

    // Se a slug estiver mapeada, busca o arquivo original internamente
    const target = rewrites[slug] || null;

    if (target) {
      const newUrl = new URL(target, request.url);
      const response = await fetch(newUrl);
      return new Response(response.body, response);
    }

    // Se não estiver no mapa, serve normalmente
    return fetch(request);
  },
};
