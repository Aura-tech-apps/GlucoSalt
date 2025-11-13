# 🔄 Mapeamento VSL → Backredirect

## 📍 Como Funciona o Fluxo

```
1. Usuário acessa VSL: videosalquilar.com/klm
2. Tenta sair (botão voltar)
3. Backredirect intercepta
4. Redireciona para: videosalquilar.com/klm-b
```

---

## 🗺️ Mapeamento Completo

### **LEAD 1**

| VSL (Página Inicial) | Backredirect (Exit Popup) | Idade |
|---------------------|---------------------------|-------|
| `/klm` | `/klm-b` | 27 anos |
| `/nop` | `/nop-b` | 37 anos |
| `/ntg` | `/ntg-b` | 47 anos |

### **LEAD 2**

| VSL (Página Inicial) | Backredirect (Exit Popup) | Idade |
|---------------------|---------------------------|-------|
| `/efg` | `/efg-b` | 27 anos |
| `/hij` | `/hij-b` | 37 anos |
| `/bvc` | `/bvc-b` | 47 anos |

### **LEAD 3**

| VSL (Página Inicial) | Backredirect (Exit Popup) | Idade |
|---------------------|---------------------------|-------|
| `/yza` | `/yza-b` | 27 anos |
| `/bcd` | `/bcd-b` | 37 anos |
| `/fas` | `/fas-b` | 47 anos |

### **LEAD 4**

| VSL (Página Inicial) | Backredirect (Exit Popup) | Idade |
|---------------------|---------------------------|-------|
| `/hgx` | `/hgx-b` | 27 anos |
| `/jjg` | `/jjg-b` | 37 anos |
| `/ewq` | `/ewq-b` | 47 anos |

---

## 🎯 Padrão das Slugs

```
VSL:          /xxx
Backredirect: /xxx-b  ← Simplesmente adiciona "-b" no final!
```

**Exemplos:**
- `/klm` → `/klm-b`
- `/efg` → `/efg-b`
- `/yza` → `/yza-b`

---

## ⚙️ Como Está Configurado

### **Nos Arquivos HTML (VSL):**

```html
<!-- Lead 1, idade 27 -->
<script src="/front/src/backredirect.js" data-backredirect="/klm-b"></script>

<!-- Lead 2, idade 37 -->
<script src="/front/src/backredirect.js" data-backredirect="/hij-b"></script>

<!-- Lead 3, idade 47 -->
<script src="/front/src/backredirect.js" data-backredirect="/fas-b"></script>
```

### **No Script backredirect.js:**

O script intercepta quando o usuário tenta sair e redireciona para a URL definida em `data-backredirect`.

**Linha 97 do script:**
```javascript
window.location.replace(redirectUrl);
```

Onde `redirectUrl` é o valor de `data-backredirect` (ex: `/klm-b`).

---

## ✅ Correção Aplicada

### **ANTES (Problema):**

```html
<!-- VSL apontava para caminho completo -->
<script ... data-backredirect="/backredirect/lead1/var-27.html"></script>

Resultado: URL ficava videosalquilar.com/backredirect/lead1/var-27 ❌
```

### **DEPOIS (Corrigido):**

```html
<!-- VSL agora aponta para slug limpa -->
<script ... data-backredirect="/klm-b"></script>

Resultado: URL fica videosalquilar.com/klm-b ✅
```

---

## 🧪 Como Testar

### **Teste Rápido:**

1. **Acesse VSL:**
   ```
   https://videosalquilar.com/klm
   ```

2. **Clique no botão "voltar" do navegador**

3. **Verifique a URL:**
   ```
   ✅ CORRETO: videosalquilar.com/klm-b (slug limpa)
   ❌ ERRADO: videosalquilar.com/backredirect/lead1/var-27
   ```

### **Lista de Testes:**

Teste pelo menos estas combinações:

```bash
# Lead 1
VSL:  videosalquilar.com/klm
Back: videosalquilar.com/klm-b  ← Tente voltar

# Lead 2
VSL:  videosalquilar.com/efg
Back: videosalquilar.com/efg-b  ← Tente voltar

# Lead 3
VSL:  videosalquilar.com/yza
Back: videosalquilar.com/yza-b  ← Tente voltar
```

---

## 📋 Arquivos Modificados

Total: **12 arquivos HTML** atualizados

### **Lead 1:**
- ✅ `front/lead1/vsl-27.html` → `/klm-b`
- ✅ `front/lead1/vsl-37.html` → `/nop-b`
- ✅ `front/lead1/vsl-47.html` → `/ntg-b`

### **Lead 2:**
- ✅ `front/lead2/vsl-27.html` → `/efg-b`
- ✅ `front/lead2/vsl-37.html` → `/hij-b`
- ✅ `front/lead2/vsl-47.html` → `/bvc-b`

### **Lead 3:**
- ✅ `front/lead3/vsl-27.html` → `/yza-b`
- ✅ `front/lead3/vsl-37.html` → `/bcd-b`
- ✅ `front/lead3/vsl-47.html` → `/fas-b`

### **Lead 4:**
- ✅ `front/lead4/vsl-27.html` → `/hgx-b`
- ✅ `front/lead4/vsl-37.html` → `/jjg-b`
- ✅ `front/lead4/vsl-47.html` → `/ewq-b`

---

## 🚀 Próximos Passos

1. **Faça commit e deploy:**
   ```bash
   git add .
   git commit -m "fix: atualizar backredirect para usar slugs limpas"
   git push
   ```

2. **Aguarde deploy** (~2 minutos)

3. **Limpe cache:**
   - Cloudflare: Purge Everything
   - Navegador: Janela anônima

4. **Teste o fluxo:**
   - Acesse `/klm`
   - Clique em "voltar"
   - Verifique que URL fica `/klm-b` ✅

---

## 🎉 Resultado Esperado

### **Fluxo Completo Funcionando:**

```
1. Usuário acessa:
   videosalquilar.com/klm
   ↓
2. Assiste VSL
   ↓
3. Tenta sair (botão voltar)
   ↓
4. Backredirect intercepta
   ↓
5. Redireciona para:
   videosalquilar.com/klm-b  ← URL LIMPA! ✅
   ↓
6. Página de oferta especial carrega
   ↓
7. URL permanece limpa durante toda a navegação
```

**Tudo funcionando perfeitamente! 🚀**

---

**Última atualização:** 2025-11-13

