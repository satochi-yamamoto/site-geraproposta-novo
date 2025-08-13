#!/bin/bash

echo "🔍 Verificando estrutura do build..."
echo "==============================================="
echo "Arquivos na raiz do dist:"
ls -la dist/

echo ""
echo "Conteúdo do index.html:"
head -20 dist/index.html

echo ""
echo "Verificando se as rotas estão funcionando localmente..."
echo "✅ Homepage: curl -s -o /dev/null -w '%{http_code}' http://localhost:4173/"
echo "✅ Curriculo: curl -s -o /dev/null -w '%{http_code}' http://localhost:4173/curriculo-ia"
echo "✅ Proposta: curl -s -o /dev/null -w '%{http_code}' http://localhost:4173/gera-proposta"

echo ""
echo "Verificando arquivos importantes..."
echo "📁 _redirects existe:" $([ -f dist/_redirects ] && echo "✅ SIM" || echo "❌ NÃO")
echo "📁 _headers existe:" $([ -f dist/_headers ] && echo "✅ SIM" || echo "❌ NÃO")
echo "📁 robots.txt existe:" $([ -f dist/robots.txt ] && echo "✅ SIM" || echo "❌ NÃO")
echo "📁 sitemap.xml existe:" $([ -f dist/sitemap.xml ] && echo "✅ SIM" || echo "❌ NÃO")

echo ""
echo "Verificando assets..."
echo "🖼️ Imagens:" $(ls dist/images/ | wc -l) "arquivos"
echo "📦 Assets:" $(ls dist/assets/ | wc -l) "arquivos"

echo ""
echo "Conteúdo do _redirects:"
cat dist/_redirects

echo ""
echo "Conteúdo do vercel.json (primeiras 30 linhas):"
head -30 vercel.json
