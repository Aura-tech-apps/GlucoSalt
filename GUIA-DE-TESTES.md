# 🧪 Guia Completo de Testes - Backredirect

## 📋 Checklist Pré-Teste

Antes de começar os testes, garanta que:

- ✅ Deploy foi concluído com sucesso no Cloudflare Pages
- ✅ Status do deploy: "Success" (verde)
- ✅ Aguardou ~2 minutos após o deploy (propagação CDN)
- ✅ Limpou cache do navegador ou usará janela anônima

---

## 🎯 Teste 1: URL Limpa (Mais Importante)

### **Objetivo:** Verificar se a URL permanece limpa no navegador

### **Como Testar:**

1. **Abra uma janela anônima** (navegador sem cache)
   - Chrome: `Ctrl + Shift + N`
   - Firefox: `Ctrl + Shift + P`
   - Edge: `Ctrl + Shift + N`

2. **Digite a URL do backredirect:**
   ```
   https://videosalquilar.com/klm-b
   ```

3. **Pressione Enter e aguarde carregar**

### **✅ Resultado Esperado:**

```
CORRETO ✅:
- URL na barra de endereço: videosalquilar.com/klm-b
- Página: Mostra o backredirect (timer, oferta especial)
- Status na aba DevTools: 200 OK

INCORRETO ❌:
- URL muda para: videosalquilar.com/backredirect/lead1/var-27
- Ou mostra erro 404/403
```

### **📸 Como Verificar Visualmente:**

1. Olhe a **barra de endereço** do navegador
2. Deve mostrar: `videosalquilar.com/klm-b` (slug limpa)
3. **NÃO deve mostrar:** `/backredirect/lead1/var-27.html`

---

## 🔍 Teste 2: Ferramentas de Desenvolvedor

### **Como Usar DevTools:**

1. **Abra o DevTools:**
   - Pressione `F12` ou `Ctrl + Shift + I`

2. **Vá para a aba "Network" (Rede)**

3. **Recarregue a página** (`Ctrl + R`)

4. **Clique na primeira requisição** (documento HTML)

### **✅ O Que Verificar:**

```
Request URL: https://videosalquilar.com/klm-b
Status Code: 200 OK
Request Method: GET

Headers → Response Headers:
- status: 200
- content-type: text/html

❌ NÃO deve ter:
- Status: 301, 302, 307, 308 (redirects)
- Header "Location:" presente
```

### **📊 Screenshot do que deve aparecer:**

```
Name            Status  Type      Size
klm-b           200     document  45.2 KB   ← CORRETO
```

**Se aparecer isto, está ERRADO:**
```
klm-b           301     document  -         ← REDIRECT (errado)
var-27.html     200     document  45.2 KB
```

---

## 🚀 Teste 3: Todas as Rotas de Backredirect

### **Lista Completa para Testar:**

Teste pelo menos **uma de cada lead** para garantir:

```bash
# LEAD 1
https://videosalquilar.com/klm-b   ← 27 anos
https://videosalquilar.com/nop-b   ← 37 anos
https://videosalquilar.com/ntg-b   ← 47 anos

# LEAD 2
https://videosalquilar.com/efg-b   ← 27 anos
https://videosalquilar.com/hij-b   ← 37 anos
https://videosalquilar.com/bvc-b   ← 47 anos

# LEAD 3
https://videosalquilar.com/yza-b   ← 27 anos
https://videosalquilar.com/bcd-b   ← 37 anos
https://videosalquilar.com/fas-b   ← 47 anos

# LEAD 4
https://videosalquilar.com/hgx-b   ← 27 anos
https://videosalquilar.com/jjg-b   ← 37 anos
https://videosalquilar.com/ewq-b   ← 47 anos
```

### **Para cada URL, verifique:**
- ✅ URL permanece limpa (com `-b` no final)
- ✅ Página carrega completamente
- ✅ Timer aparece funcionando
- ✅ Imagens carregam (assets)
- ✅ CSS aplicado corretamente
- ✅ Botão de compra funciona

---

## 🎬 Teste 4: Fluxo Completo (VSL → Backredirect)

### **Simula o comportamento real do usuário:**

1. **Acesse a VSL:**
   ```
   https://videosalquilar.com/klm
   ```

2. **Tente sair da página:**
   - Clique no botão "voltar" do navegador
   - Ou tente fechar a aba
   - (Se tiver script de backredirect ativo)

3. **Deve aparecer:**
   - Popup/modal de backredirect
   - Ou redirecionar para: `videosalquilar.com/klm-b`

4. **Verifique:**
   - ✅ URL mudou para `/klm-b`
   - ✅ Página de oferta especial carregou
   - ✅ Timer está funcionando

---

## 🔧 Teste 5: Caminhos de Assets (CSS/JS/Imagens)

### **Como Verificar:**

1. **Abra DevTools → Network**

2. **Filtre por tipo:**
   - Images (Img)
   - Stylesheets (CSS)
   - Scripts (JS)

3. **Verifique que TODOS carregam com status 200:**

```
✅ CORRETO:
/backredirect/assets/170d.png          200
/backredirect/assets/13lpa.webp        200
/backredirect/assets/h1.webp           200
/backredirect/src/styles.css           200
/backredirect/src/script.js            200

❌ ERRADO:
../assets/170d.png                     404  ← caminho relativo
../../assets/13lpa.webp                404  ← caminho relativo
```

---

## 🐛 Troubleshooting: Problemas Comuns

### **Problema 1: URL ainda muda para caminho completo**

**Sintoma:**
```
Acesso: videosalquilar.com/klm-b
Muda para: videosalquilar.com/backredirect/lead1/var-27
```

**Soluções:**

1. **Limpe TODOS os caches:**
```bash
# Cloudflare Dashboard:
Caching → Purge Everything

# Navegador:
Ctrl + Shift + Delete → Limpar tudo

# Ou use janela anônima
```

2. **Verifique se o deploy foi bem-sucedido:**
```bash
# No dashboard Cloudflare Pages:
- Status deve ser "Success" (verde)
- Não deve ter erros no log de build
```

3. **Aguarde propagação do CDN:**
```bash
# Pode demorar até 5 minutos
# Teste novamente após aguardar
```

### **Problema 2: Erro 404**

**Sintoma:**
```
Page not found / 404 Error
```

**Causas Prováveis:**

1. **Arquivo HTML não existe no deploy:**
   - Verifique se os arquivos estão na pasta correta
   - Estrutura esperada:
     ```
     /backredirect/lead1/var-27.html
     /backredirect/lead1/var-37.html
     ...
     ```

2. **Slug não está no ROUTE_MAP:**
   - Abra `functions/[[path]].js`
   - Verifique se `/klm-b` está mapeado

### **Problema 3: Assets não carregam (CSS/imagens quebrados)**

**Sintoma:**
```
Página sem estilo, imagens não aparecem
```

**Solução:**
- Todos os caminhos já foram convertidos para absolutos
- Se ainda houver problema, verifique no DevTools:
  - Aba Network → Filter por 404
  - Veja quais arquivos não carregaram
  - Verifique se os arquivos existem na pasta `/backredirect/assets/`

### **Problema 4: Timer não funciona**

**Sintoma:**
```
Timer não aparece ou não conta
```

**Solução:**
```bash
# Verifique se o JavaScript carregou:
DevTools → Console
- Não deve ter erros em vermelho

# Verifique se o arquivo existe:
/backredirect/src/script.js → deve retornar 200
```

---

## 📱 Teste 6: Responsividade (Mobile)

### **Como Testar no Desktop:**

1. **Abra DevTools** (`F12`)

2. **Clique no ícone de dispositivo móvel** (ou `Ctrl + Shift + M`)

3. **Selecione um dispositivo:**
   - iPhone 12/13
   - Samsung Galaxy
   - iPad

4. **Recarregue a página**

5. **Verifique:**
   - ✅ Layout se adapta ao mobile
   - ✅ Timer aparece corretamente
   - ✅ Botões são clicáveis
   - ✅ Texto legível

---

## ✅ Checklist Final de Validação

Após todos os testes, marque:

### **URLs Limpas:**
- [ ] `/klm-b` mantém URL limpa
- [ ] `/nop-b` mantém URL limpa
- [ ] `/efg-b` mantém URL limpa
- [ ] Pelo menos 1 de cada lead testado

### **Conteúdo:**
- [ ] Timer aparece e funciona
- [ ] Imagens carregam (perfis, garantia)
- [ ] CSS aplicado (cores, layout)
- [ ] Botão de compra funciona
- [ ] Link do botão está correto (Hotmart)

### **Performance:**
- [ ] Página carrega em < 3 segundos
- [ ] Todos os assets retornam 200
- [ ] Nenhum erro 404 no console

### **DevTools:**
- [ ] Status 200 OK na primeira requisição
- [ ] Nenhum redirect (301/302)
- [ ] Header "Location" ausente

---

## 🎯 Teste Rápido (30 segundos)

Se tiver pouco tempo, faça este teste mínimo:

```bash
1. Janela anônima
2. Acesse: videosalquilar.com/klm-b
3. Olhe a barra de endereço:
   ✅ Mostra /klm-b? → FUNCIONA!
   ❌ Mostra /backredirect/...? → NÃO FUNCIONA
4. Abra DevTools (F12) → Network
   ✅ Status 200? → FUNCIONA!
   ❌ Status 301/302? → NÃO FUNCIONA
```

---

## 📞 Suporte

Se após todos os testes ainda não funcionar:

### **Informações para Debug:**

Colete estas informações:

1. **URL testada:** (ex: videosalquilar.com/klm-b)
2. **Comportamento observado:** (o que acontece)
3. **Screenshot da barra de endereço**
4. **Screenshot do DevTools → Network → primeira requisição**
5. **Erros no Console** (se houver)

### **Comandos Úteis:**

```bash
# Ver logs do Cloudflare Pages:
Dashboard → Functions → Logs em tempo real

# Testar com cURL (terminal):
curl -I https://videosalquilar.com/klm-b

# Deve retornar:
HTTP/2 200
# (não 301, 302, etc)
```

---

## 🎉 Resultado Esperado Final

Quando tudo estiver funcionando:

```
✅ URL: videosalquilar.com/klm-b (permanece limpa)
✅ Status: 200 OK
✅ Conteúdo: Backredirect carregado
✅ Assets: Todos carregando (CSS, JS, imagens)
✅ Timer: Funcionando e contando
✅ Botão: Link correto para Hotmart
✅ Mobile: Layout responsivo OK
```

**Parabéns! Seu backredirect está funcionando perfeitamente! 🚀**

---

**Última atualização:** 2025-11-13
**Versão:** 1.0

