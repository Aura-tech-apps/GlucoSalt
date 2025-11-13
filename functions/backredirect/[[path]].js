// Bloqueia acesso direto aos arquivos de backredirect
// Força o uso das slugs personalizadas

export async function onRequest(context) {
  // Redireciona para a página inicial se alguém tentar acessar diretamente
  return new Response('Acesso negado. Use as slugs personalizadas.', {
    status: 403,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}

