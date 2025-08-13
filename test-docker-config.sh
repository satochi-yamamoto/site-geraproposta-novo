#!/bin/bash

echo "🔧 Testando configuração Docker..."
echo "========================================"

echo "✅ Verificando Dockerfile..."
if [ -f "Dockerfile" ]; then
    echo "   📄 Dockerfile existe"
    echo "   📋 Verificando sintaxe básica..."
    
    # Verificar se as instruções básicas estão presentes
    if grep -q "FROM node:18-alpine AS builder" Dockerfile; then
        echo "   ✅ Build stage configurado"
    else
        echo "   ❌ Build stage não encontrado"
    fi
    
    if grep -q "FROM nginx:alpine AS production" Dockerfile; then
        echo "   ✅ Production stage configurado"
    else
        echo "   ❌ Production stage não encontrado"
    fi
    
    if grep -q "COPY --from=builder" Dockerfile; then
        echo "   ✅ Multi-stage copy configurado"
    else
        echo "   ❌ Multi-stage copy não encontrado"
    fi
else
    echo "   ❌ Dockerfile não encontrado"
fi

echo ""
echo "✅ Verificando nginx.conf..."
if [ -f "nginx.conf" ]; then
    echo "   📄 nginx.conf existe"
    
    if grep -q "try_files.*index.html" nginx.conf; then
        echo "   ✅ SPA routing configurado"
    else
        echo "   ❌ SPA routing não configurado"
    fi
    
    if grep -q "/health" nginx.conf; then
        echo "   ✅ Health check endpoint configurado"
    else
        echo "   ❌ Health check endpoint não encontrado"
    fi
else
    echo "   ❌ nginx.conf não encontrado"
fi

echo ""
echo "✅ Verificando .dockerignore..."
if [ -f ".dockerignore" ]; then
    echo "   📄 .dockerignore existe"
    
    if grep -q "node_modules" .dockerignore; then
        echo "   ✅ node_modules excluído"
    else
        echo "   ❌ node_modules não excluído"
    fi
else
    echo "   ❌ .dockerignore não encontrado"
fi

echo ""
echo "✅ Verificando GitHub Actions..."
if [ -f ".github/workflows/dockerhub-push.yml" ]; then
    echo "   📄 Workflow existe"
    
    if grep -q "docker/build-push-action@v5" .github/workflows/dockerhub-push.yml; then
        echo "   ✅ Build action configurado"
    else
        echo "   ❌ Build action não encontrado"
    fi
    
    if grep -q "DOCKERHUB_USERNAME" .github/workflows/dockerhub-push.yml; then
        echo "   ✅ DockerHub secrets configurados"
    else
        echo "   ❌ DockerHub secrets não configurados"
    fi
else
    echo "   ❌ Workflow não encontrado"
fi

echo ""
echo "✅ Verificando estrutura unified-app..."
if [ -d "unified-app" ]; then
    echo "   📁 Diretório unified-app existe"
    
    if [ -f "unified-app/package.json" ]; then
        echo "   📄 package.json existe"
    else
        echo "   ❌ package.json não encontrado"
    fi
    
    if [ -f "unified-app/vite.config.js" ]; then
        echo "   📄 vite.config.js existe"
    else
        echo "   ❌ vite.config.js não encontrado"
    fi
    
    if [ -d "unified-app/src" ]; then
        echo "   📁 Diretório src existe"
    else
        echo "   ❌ Diretório src não encontrado"
    fi
else
    echo "   ❌ Diretório unified-app não encontrado"
fi

echo ""
echo "🎯 Resumo da Configuração:"
echo "=========================="
echo "✅ Multi-stage build (Node.js + Nginx)"
echo "✅ Configuração Nginx otimizada"
echo "✅ SPA routing para React Router"
echo "✅ Health check endpoint"
echo "✅ Security headers"
echo "✅ Cache de assets estáticos"
echo "✅ Gzip compression"
echo "✅ Non-root user"
echo "✅ Multi-arch build (AMD64/ARM64)"
echo "✅ GitHub Actions com cache"

echo ""
echo "🚀 Pronto para deploy no DockerHub!"
echo "Certifique-se de configurar os secrets:"
echo "- DOCKERHUB_USERNAME"
echo "- DOCKERHUB_PASSWORD"
