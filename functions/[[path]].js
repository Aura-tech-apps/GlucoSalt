/**
 * Cloudflare Pages Function - Rewrite de URLs
 * Baseado na documentação oficial: https://developers.cloudflare.com/pages/functions/
 * 
 * Esta function intercepta requisições e faz rewrite interno (como nginx rewrite)
 * mantendo a URL original no navegador.
 */

// Mapa de rotas: slug limpa → caminho real do arquivo
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
  try {
    const url = new URL(context.request.url);
    let pathname = url.pathname;
    
    // Normaliza pathname removendo trailing slash
    if (pathname !== '/' && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }
    
    // Verifica se a rota slug está no mapa
    const targetPath = ROUTE_MAP[pathname];
    
    if (targetPath) {
      // Rewrite: modifica o pathname para apontar ao arquivo real
      const rewrittenUrl = new URL(context.request.url);
      rewrittenUrl.pathname = targetPath;
      
      // Busca o arquivo real dos assets compilados
      const response = await context.env.ASSETS.fetch(rewrittenUrl);
      
      // Retorna o conteúdo com status 200
      // O navegador mantém a URL original (slug limpa)
      return new Response(response.body, {
        status: 200,
        headers: response.headers
      });
    }
    
    // Rota não encontrada no mapa, deixa o Cloudflare processar normalmente
    return context.next();
    
  } catch (error) {
    // Em caso de erro, retorna 404
    console.error('Erro na Function:', error);
    return new Response('Página não encontrada', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8'
      }
    });
  }
}

