#!/bin/bash

# Script para iniciar todas as aplicações em desenvolvimento

echo "🚀 Iniciando todas as aplicações do Geradocumentos..."

# Verifica se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências da aplicação principal..."
    npm install
fi

if [ ! -d "../microsaas-curriculo/node_modules" ]; then
    echo "📦 Instalando dependências do microsaas-curriculo..."
    cd ../microsaas-curriculo && npm install && cd ../unified-app
fi

if [ ! -d "../gerador-propostas-meis/node_modules" ]; then
    echo "📦 Instalando dependências do gerador-propostas-meis..."
    cd ../gerador-propostas-meis && npm install && cd ../unified-app
fi

echo "🔧 Iniciando servidores de desenvolvimento..."

# Mata processos anteriores se existirem
pkill -f "vite.*3000" 2>/dev/null
pkill -f "vite.*3001" 2>/dev/null  
pkill -f "vite.*3002" 2>/dev/null

# Aguarda um pouco para garantir que os processos foram encerrados
sleep 2

# Inicia as aplicações em paralelo
echo "🌐 Aplicação Principal: http://localhost:3000"
echo "🎓 Currículo IA: http://localhost:3001" 
echo "📝 Gera Proposta: http://localhost:3002"
echo ""
echo "✅ Todas as aplicações serão acessíveis através da aplicação principal"
echo "🔗 Acesse: http://localhost:3000"
echo ""

# Inicia todas as aplicações usando concorrently
npm run dev:all
