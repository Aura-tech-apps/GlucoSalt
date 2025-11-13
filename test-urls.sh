#!/bin/bash
# Script para testar URLs do backredirect
# Uso: bash test-urls.sh

echo "🧪 Testando URLs de Backredirect..."
echo "=================================="
echo ""

# Domínio base
DOMAIN="videosalquilar.com"

# Lista de slugs para testar
SLUGS=(
    "klm-b"    # Lead 1 - 27
    "nop-b"    # Lead 1 - 37
    "efg-b"    # Lead 2 - 27
    "hij-b"    # Lead 2 - 37
    "yza-b"    # Lead 3 - 27
    "hgx-b"    # Lead 4 - 27
)

# Testa cada URL
for slug in "${SLUGS[@]}"; do
    echo "Testando: https://$DOMAIN/$slug"
    
    # Faz requisição e captura status code
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" -L "https://$DOMAIN/$slug")
    
    # Verifica o status
    if [ "$STATUS" -eq 200 ]; then
        echo "✅ Status: $STATUS - OK"
    else
        echo "❌ Status: $STATUS - ERRO"
    fi
    
    echo "---"
done

echo ""
echo "✨ Teste concluído!"
echo ""
echo "💡 Dica: Teste também no navegador para verificar se a URL permanece limpa"

