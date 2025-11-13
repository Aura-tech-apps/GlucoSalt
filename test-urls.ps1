# Script PowerShell para testar URLs do backredirect
# Uso: .\test-urls.ps1

Write-Host "🧪 Testando URLs de Backredirect..." -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Domínio base
$domain = "videosalquilar.com"

# Lista de slugs para testar
$slugs = @(
    "klm-b",    # Lead 1 - 27
    "nop-b",    # Lead 1 - 37
    "efg-b",    # Lead 2 - 27
    "hij-b",    # Lead 2 - 37
    "yza-b",    # Lead 3 - 27
    "hgx-b"     # Lead 4 - 27
)

# Testa cada URL
foreach ($slug in $slugs) {
    $url = "https://$domain/$slug"
    Write-Host "Testando: $url" -ForegroundColor Yellow
    
    try {
        # Faz requisição
        $response = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -MaximumRedirection 0 -ErrorAction SilentlyContinue
        
        # Verifica o status
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ Status: $($response.StatusCode) - OK" -ForegroundColor Green
        } else {
            Write-Host "❌ Status: $($response.StatusCode) - ATENÇÃO" -ForegroundColor Red
        }
    } catch {
        # Se der erro de redirect, pega o status code
        if ($_.Exception.Response) {
            $statusCode = [int]$_.Exception.Response.StatusCode
            if ($statusCode -eq 200) {
                Write-Host "✅ Status: 200 - OK" -ForegroundColor Green
            } elseif ($statusCode -ge 300 -and $statusCode -lt 400) {
                Write-Host "⚠️  Status: $statusCode - REDIRECT (pode ser problema)" -ForegroundColor Yellow
            } else {
                Write-Host "❌ Status: $statusCode - ERRO" -ForegroundColor Red
            }
        } else {
            Write-Host "❌ Erro ao acessar: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    
    Write-Host "---" -ForegroundColor Gray
}

Write-Host ""
Write-Host "✨ Teste concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Dica: Teste também no navegador (janela anônima) para verificar se a URL permanece limpa" -ForegroundColor Cyan
Write-Host "   Exemplo: https://$domain/klm-b" -ForegroundColor White

