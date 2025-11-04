export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;

    // Normaliza: remove barra final (mas preserva a raiz "/")
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

    // Mapa de rewrites (slug => arquivo físico)
    const rewrites = new Map([
      // Presell
      ["/yuo", "/presell/presell.html"],

      // LEAD 1
      ["/klm", "/front/lead1/vsl-27.html"],
      ["/nop", "/front/lead1/vsl-37.html"],
      ["/ntg", "/front/lead1/vsl-47.html"],

      // LEAD 2
      ["/efg", "/front/lead2/vsl-27.html"],
      ["/hij", "/front/lead2/vsl-37.html"],
      ["/bvc", "/front/lead2/vsl-47.html"],

      // LEAD 3
      ["/yza", "/front/lead3/vsl-27.html"],
      ["/bcd", "/front/lead3/vsl-37.html"],
      ["/fas", "/front/lead3/vsl-47.html"],

      // LEAD 4
      ["/hgx", "/front/lead4/vsl-27.html"],
      ["/jjg", "/front/lead4/vsl-37.html"],
      ["/ewq", "/front/lead4/vsl-47.html"],

      // UPSELLS
      ["/eer", "/upsells/up1.html"],
      ["/rto", "/upsells/up2.html"],
      ["/rrt", "/upsells/up3.html"],
      ["/hfa", "/upsells/up4.html"],
      ["/gracias", "/upsells/gracias.html"],

      // BACKREDIRECT (12 slugs)
      ["/bru/1/a", "/backredirect/lead1/var-27.html"],
      ["/bru/1/b", "/backredirect/lead1/var-37.html"],
      ["/bru/1/c", "/backredirect/lead1/var-47.html"],
      ["/bru/2/a", "/backredirect/lead2/var-27.html"],
      ["/bru/2/b", "/backredirect/lead2/var-37.html"],
      ["/bru/2/c", "/backredirect/lead2/var-47.html"],
      ["/bru/3/a", "/backredirect/lead3/var-27.html"],
      ["/bru/3/b", "/backredirect/lead3/var-37.html"],
      ["/bru/3/c", "/backredirect/lead3/var-47.html"],
      ["/bru/4/a", "/backredirect/lead4/var-27.html"],
      ["/bru/4/b", "/backredirect/lead4/var-37.html"],
      ["/bru/4/c", "/backredirect/lead4/var-47.html"],
    ]);

    try {
      // 1) REWRITE por slug canônica (mantém URL, serve outro arquivo)
      const target = rewrites.get(path);
      if (target) {
        const assetUrl = new URL(target, url.origin);
        const assetReq = new Request(assetUrl.toString(), request);
        const resp = await env.ASSETS.fetch(assetReq);
        // adiciona header de debug
        const hdrs = new Headers(resp.headers);
        hdrs.set("X-Rewrite-From", path);
        hdrs.set("X-Rewrite-To", target);
        return new Response(resp.body, { status: resp.status, headers: hdrs });
      }

      // 2) Fallback “extensionless”: /front/lead1/vsl-27 -> /front/lead1/vsl-27.html
      if (!path.endsWith(".html") && !path.endsWith(".htm")) {
        const tryHtml = path + ".html";
        const tryUrl = new URL(tryHtml, url.origin);
        const tryReq = new Request(tryUrl.toString(), request);
        const tryResp = await env.ASSETS.fetch(tryReq);
        if (tryResp.ok) {
          const hdrs = new Headers(tryResp.headers);
          hdrs.set("X-Rewrite-From", path);
          hdrs.set("X-Rewrite-To", tryHtml);
          return new Response(tryResp.body, { status: tryResp.status, headers: hdrs });
        }
      }

      // 3) Serve o asset normalmente (sem rewrite)
      return env.ASSETS.fetch(request);
    } catch (err) {
      // Evita 1019: retorna uma página de erro controlada
      return new Response(
        `Internal rewrite error.\nPath: ${path}\n${(err && err.stack) || err}`,
        { status: 500, headers: { "Content-Type": "text/plain" } }
      );
    }
  },
};
