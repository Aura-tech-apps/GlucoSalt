# 📍 Mapa de Rotas - GlucoSalt

## 🎯 Estrutura de URLs

Todas as URLs mantêm a slug limpa no navegador (código 200 - rewrite interno).

---

## 🔥 PRESELL
- **URL:** `/yuo`
- **Serve:** Página de presell principal

---

## 📺 LEAD 1 (Idade: 27 anos)

### VSL (Video Sales Letter)
- `/klm` → Lead 1, idade 27
- `/nop` → Lead 1, idade 37  
- `/ntg` → Lead 1, idade 47

### Backredirect (Exit Popup)
- `/klm-b` → Backredirect idade 27
- `/nop-b` → Backredirect idade 37
- `/ntg-b` → Backredirect idade 47

---

## 📺 LEAD 2 (Idade: 37 anos)

### VSL
- `/efg` → Lead 2, idade 27
- `/hij` → Lead 2, idade 37
- `/bvc` → Lead 2, idade 47

### Backredirect
- `/efg-b` → Backredirect idade 27
- `/hij-b` → Backredirect idade 37
- `/bvc-b` → Backredirect idade 47

---

## 📺 LEAD 3 (Idade: 47 anos)

### VSL
- `/yza` → Lead 3, idade 27
- `/bcd` → Lead 3, idade 37
- `/fas` → Lead 3, idade 47

### Backredirect
- `/yza-b` → Backredirect idade 27
- `/bcd-b` → Backredirect idade 37
- `/fas-b` → Backredirect idade 47

---

## 📺 LEAD 4 (Idade: 57+ anos)

### VSL
- `/hgx` → Lead 4, idade 27
- `/jjg` → Lead 4, idade 37
- `/ewq` → Lead 4, idade 47

### Backredirect
- `/hgx-b` → Backredirect idade 27
- `/jjg-b` → Backredirect idade 37
- `/ewq-b` → Backredirect idade 47

---

## 💡 Como Usar

### Padrão de Slugs:
```
VSL:          /xxx
Backredirect: /xxx-b  (adiciona "-b" no final)
```

### Exemplos de Fluxo:
```
1. Tráfego → videosalquilar.com/klm (VSL)
2. Usuário tenta sair
3. Trigger backredirect → videosalquilar.com/klm-b
```

### URLs com/sem barra final:
Ambos funcionam igualmente:
- `videosalquilar.com/klm` ✅
- `videosalquilar.com/klm/` ✅

---

## 🎬 Total de Rotas Configuradas
- **Presell:** 1 rota
- **VSL Pages:** 12 rotas (3 por lead × 4 leads)
- **Backredirect Pages:** 12 rotas (3 por lead × 4 leads)
- **TOTAL:** 25 rotas ativas

---

## ⚙️ Arquivos de Configuração
- `functions/[[path]].js` - Lógica de roteamento
- `_redirects` - Fallback para redirects
- `_routes.json` - Exclusões de rotas do Functions

---

## 🚀 Status
✅ Todas as rotas configuradas
✅ Caminhos absolutos implementados
✅ URLs limpas (sem exposição de estrutura interna)
✅ Pronto para deploy no Cloudflare Pages

