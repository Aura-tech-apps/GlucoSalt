// Mapa de rotas personalizadas
const ROUTE_MAP = {
  // PRESELL
  '/yuo': '/presell/presell.html',
  
  // LEAD 1
  '/klm': '/front/lead1/vsl-27.html',
  '/nop': '/front/lead1/vsl-37.html',
  '/ntg': '/front/lead1/vsl-47.html',
  
  // LEAD 2
  '/efg': '/front/lead2/vsl-27.html',
  '/hij': '/front/lead2/vsl-37.html',
  '/bvc': '/front/lead2/vsl-47.html',
  
  // LEAD 3
  '/yza': '/front/lead3/vsl-27.html',
  '/bcd': '/front/lead3/vsl-37.html',
  '/fas': '/front/lead3/vsl-47.html',
  
  // LEAD 4
  '/hgx': '/front/lead4/vsl-27.html',
  '/jjg': '/front/lead4/vsl-37.html',
  '/ewq': '/front/lead4/vsl-47.html',
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
    try {
      // Cria URL completa para o asset de destino
      const assetUrl = new URL(targetPath, url.origin);
      
      // Faz fetch direto do asset
      const response = await context.env.ASSETS.fetch(assetUrl);
      
      // Retorna a resposta com os headers corretos
      // Isso serve o conteúdo sem mudar a URL no navegador
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
    } catch (error) {
      console.error('Erro ao fazer rewrite:', error);
      return context.next();
    }
  }
  
  // Se não encontrou no mapa, continua normalmente
  return context.next();
}

