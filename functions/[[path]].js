// Mapa de rotas personalizadas
const ROUTE_MAP = {
  // PRESELL
  '/yuo': '/presell/presell.html',
  
  // LEAD 1 - VSL Pages
  '/klm': '/front/lead1/vsl-27.html',
  '/nop': '/front/lead1/vsl-37.html',
  '/ntg': '/front/lead1/vsl-47.html',
  
  // LEAD 1 - Backredirect Pages
  '/klm-b': '/backredirect/lead1/var-27.html',
  '/nop-b': '/backredirect/lead1/var-37.html',
  '/ntg-b': '/backredirect/lead1/var-47.html',
  
  // LEAD 2 - VSL Pages
  '/efg': '/front/lead2/vsl-27.html',
  '/hij': '/front/lead2/vsl-37.html',
  '/bvc': '/front/lead2/vsl-47.html',
  
  // LEAD 2 - Backredirect Pages
  '/efg-b': '/backredirect/lead2/var-27.html',
  '/hij-b': '/backredirect/lead2/var-37.html',
  '/bvc-b': '/backredirect/lead2/var-47.html',
  
  // LEAD 3 - VSL Pages
  '/yza': '/front/lead3/vsl-27.html',
  '/bcd': '/front/lead3/vsl-37.html',
  '/fas': '/front/lead3/vsl-47.html',
  
  // LEAD 3 - Backredirect Pages
  '/yza-b': '/backredirect/lead3/var-27.html',
  '/bcd-b': '/backredirect/lead3/var-37.html',
  '/fas-b': '/backredirect/lead3/var-47.html',
  
  // LEAD 4 - VSL Pages
  '/hgx': '/front/lead4/vsl-27.html',
  '/jjg': '/front/lead4/vsl-37.html',
  '/ewq': '/front/lead4/vsl-47.html',
  
  // LEAD 4 - Backredirect Pages
  '/hgx-b': '/backredirect/lead4/var-27.html',
  '/jjg-b': '/backredirect/lead4/var-37.html',
  '/ewq-b': '/backredirect/lead4/var-47.html',
};

export async function onRequest(context) {
  const url = new URL(context.request.url);
  let pathname = url.pathname;
  
  // Remove trailing slash para normalizar
  if (pathname.endsWith('/') && pathname.length > 1) {
    pathname = pathname.slice(0, -1);
  }
  
  // Verifica se a rota está no mapa
  const targetPath = ROUTE_MAP[pathname];
  
  if (targetPath) {
    // Cria uma nova URL apontando para o arquivo real
    const targetUrl = new URL(targetPath, url.origin);
    
    // Faz o fetch do conteúdo real usando env.ASSETS
    const assetResponse = await context.env.ASSETS.fetch(targetUrl.toString());
    
    // Cria uma nova Response mantendo o conteúdo mas sem headers de redirect
    const headers = new Headers(assetResponse.headers);
    headers.delete('location');
    headers.delete('content-location');
    
    return new Response(assetResponse.body, {
      status: 200,
      statusText: 'OK',
      headers: headers
    });
  }
  
  // Se não encontrou no mapa, continua normalmente
  return context.next();
}

