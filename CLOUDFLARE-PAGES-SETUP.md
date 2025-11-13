# 🚀 Configuração Cloudflare Pages - GlucoSalt

## 📚 Documentação Base
Este setup é baseado na [Documentação Oficial do Cloudflare Pages](https://developers.cloudflare.com/pages/)

---

## 🎯 Objetivo
Servir páginas HTML com **URLs limpas** usando **rewrite interno** (não redirect), mantendo a slug simples no navegador enquanto serve conteúdo de caminhos internos complexos.

**Exemplo:**
- **URL no navegador:** `videosalquilar.com/klm-b`
- **Arquivo servido:** `/backredirect/lead1/var-27.html`

---

## ⚙️ Como Funciona

### **1. Arquitetura Implementada**

```
Requisição → Cloudflare Pages Function → Rewrite Interno → Resposta
              (functions/[[path]].js)      (slug → arquivo)    (200 OK)
```

### **2. Arquivos de Configuração**

#### **A. `functions/[[path]].js`** ✅
- **Função:** Catch-all route que intercepta TODAS as requisições
- **Comportamento:** Faz rewrite interno (como nginx)
- **Resultado:** URL permanece limpa no navegador

**Por que funciona:**
> Segundo a [documentação de Functions](https://developers.cloudflare.com/pages/functions/routing/), Functions são executadas **antes** de servir assets estáticos, permitindo interceptar e reescrever requisições.

#### **B. `_routes.json`** ✅
- **Função:** Define quais rotas são processadas por Functions
- **Configuração atual:**
  ```json
  {
    "include": ["/*"],
    "exclude": ["/assets/*", "/backredirect/assets/*", ...]
  }
  ```

**Por que é necessário:**
> A [documentação de routing](https://developers.cloudflare.com/pages/functions/routing/#create-a-_routesjson-file) explica que `_routes.json` controla a prioridade entre Functions e assets estáticos.

#### **C. ~~`_redirects`~~ ❌ REMOVIDO**
- **Por que foi removido:**

> A [documentação de redirects](https://developers.cloudflare.com/pages/configuration/redirects/) é clara:
> 
> **"Redirects defined in the `_redirects` file are NOT applied to requests served by Pages Functions"**

**Conflito identificado:**
- Tínhamos `_redirects` com código 200 (proxying)
- E Functions tentando fazer rewrite
- **Resultado:** Comportamento imprevisível e URL exposta

**Solução:** Usar **APENAS** Functions para rewrite.

---

## 🔧 Limitações Resolvidas

### **❌ Problema 1: Proxying com código 200 no `_redirects`**

**Documentação alerta:**
> "Proxying will **only support relative URLs** on your site."
> "**Only the first redirect** in your will apply."

**Nosso caso:**
- Tínhamos 25+ redirects com código 200
- Cloudflare aplicava apenas alguns ou nenhum
- **Solução:** Removido completamente

### **❌ Problema 2: Múltiplas Functions Catch-All**

**Antes:**
```
/functions/[[path]].js         ← Rewrite principal
/functions/front/[[path]].js   ← Bloqueio
/functions/backredirect/[[path]].js ← Bloqueio
```

**Problema:** Ordem de execução conflitante

**Solução:** Apenas 1 Function catch-all na raiz

---

## 🎬 Fluxo de Requisição

### **Exemplo: Acessando `/klm-b`**

```
1. Usuário acessa: videosalquilar.com/klm-b
   ↓
2. Cloudflare Pages recebe requisição
   ↓
3. Verifica _routes.json
   └─ "/klm-b" NÃO está em exclude → vai para Functions
   ↓
4. Functions/[[path]].js intercepta
   └─ Encontra "/klm-b" no ROUTE_MAP
   └─ Reescreve para: "/backredirect/lead1/var-27.html"
   ↓
5. Busca o arquivo: context.env.ASSETS.fetch()
   ↓
6. Retorna Response com status 200
   └─ Navegador recebe conteúdo
   └─ URL permanece: videosalquilar.com/klm-b ✅
```

---

## 📋 Estrutura de Rotas

### **Mapa Completo:**

| Slug | Tipo | Arquivo Servido |
|------|------|-----------------|
| `/yuo` | Presell | `/presell/presell.html` |
| `/klm` | VSL Lead 1 (27) | `/front/lead1/vsl-27.html` |
| `/klm-b` | Backredirect | `/backredirect/lead1/var-27.html` |
| `/nop` | VSL Lead 1 (37) | `/front/lead1/vsl-37.html` |
| `/nop-b` | Backredirect | `/backredirect/lead1/var-37.html` |
| ... | ... | ... |

**Total:** 25 rotas configuradas

---

## ✅ Checklist de Deploy

### **Antes de fazer deploy:**

1. ✅ Removido `_redirects`
2. ✅ Removido Functions de bloqueio conflitantes
3. ✅ Apenas 1 Function catch-all: `functions/[[path]].js`
4. ✅ `_routes.json` configurado corretamente
5. ✅ Todos os HTMLs com caminhos absolutos

### **Após deploy:**

1. 🧪 Teste em janela anônima
2. 🧪 Acesse: `seudominio.com/klm-b`
3. ✅ Verifique que URL permanece `/klm-b`
4. ✅ Verifique que página carrega corretamente

---

## 🐛 Troubleshooting

### **URL ainda mostra caminho completo?**

**Causa provável:** Cache do Cloudflare ou navegador

**Solução:**
```bash
1. Limpe cache no dashboard Cloudflare Pages
2. Navegador: Ctrl+Shift+R (força reload)
3. Teste em janela anônima
```

### **Erro 404?**

**Causa provável:** Arquivo HTML não existe ou caminho incorreto

**Solução:**
```bash
1. Verifique que os arquivos existem:
   /front/leadX/vsl-XX.html
   /backredirect/leadX/var-XX.html
   
2. Verifique ROUTE_MAP em functions/[[path]].js
```

### **Assets (CSS/JS/imagens) não carregam?**

**Causa provável:** Caminhos relativos nos HTMLs

**Solução:**
```bash
✅ Todos os caminhos já foram convertidos para absolutos:
   src="/backredirect/assets/file.webp"
   href="/front/src/backredirect.js"
```

---

## 📖 Referências

- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [Routing with Functions](https://developers.cloudflare.com/pages/functions/routing/)
- [Redirects Configuration](https://developers.cloudflare.com/pages/configuration/redirects/)
- [Advanced Routing](https://developers.cloudflare.com/pages/functions/advanced-mode/)

---

## ✨ Status

✅ **Configuração completa e otimizada**
✅ **Seguindo 100% as best practices do Cloudflare Pages**
✅ **Pronto para produção**

**Última atualização:** 2025-11-13

