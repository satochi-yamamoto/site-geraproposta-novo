# 🚀 Guia de Deploy - Geradocumentos Unified App

## Resumo da Conversão

✅ **Concluído**: Conversão completa da homepage HTML para React
- Homepage HTML → React HomePage component
- CSS estático → Tailwind CSS com design tokens
- JavaScript vanilla → React com hooks modernos
- Build system → Vite com otimizações

## 📋 Checklist de Deploy

### 1. Preparação
- [x] Build de produção testado e funcionando
- [x] Todas as imagens copiadas para public/images/
- [x] SEO meta tags implementadas
- [x] Sitemap e robots.txt criados
- [x] Vercel.json configurado

### 2. Estrutura Final
```
unified-app/               # Nova aplicação React
├── dist/                 # Build de produção (gerado)
├── public/              
│   ├── images/          # Todas as imagens do site
│   ├── robots.txt       # SEO
│   ├── sitemap.xml      # SEO
│   └── site.webmanifest # PWA
├── src/
│   ├── components/      # Header, Footer, Layout, UI
│   ├── pages/          # HomePage, PrivacyPolicy, TermsOfService
│   ├── lib/            # Utilitários
│   └── App.jsx         # Router principal
└── vercel.json         # Configuração de deploy
```

### 3. Deploy no Vercel

#### Opção A: Deploy Direto (Recomendado)
```bash
# No diretório unified-app/
npx vercel --prod
```

#### Opção B: Integração GitHub
1. Fazer push do código para o repositório
2. Conectar no painel Vercel
3. Configurar:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Root Directory**: `unified-app`

### 4. Configurações de Domínio

#### DNS Configuration
Apontar `geradocumentos.com.br` para o deployment Vercel:
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

#### Redirects Automáticos
O vercel.json já inclui redirects:
- `/curriculo-ia.html` → `/curriculo-ia`
- `/gera-proposta.html` → `/gera-proposta`
- `/politica-privacidade.html` → `/politica-privacidade`
- `/termos-uso.html` → `/termos-uso`

## 🔄 Próximos Passos

### 1. Integração das Aplicações Existentes

#### microsaas-curriculo/
```bash
# Opção 1: Subdeploy
vercel --prod --scope curriculo
# Configurar CNAME: curriculo.geradocumentos.com.br

# Opção 2: Integração no unified-app
# Copiar src/ para unified-app/src/apps/curriculo/
# Configurar roteamento aninhado
```

#### gerador-propostas-meis/
```bash
# Opção 1: Subdeploy  
vercel --prod --scope propostas
# Configurar CNAME: propostas.geradocumentos.com.br

# Opção 2: Integração no unified-app
# Copiar src/ para unified-app/src/apps/propostas/
# Configurar roteamento aninhado
```

### 2. Estrutura de Deploy Unificada (Recomendada)

```
geradocumentos.com.br/
├── /                    # Homepage (unified-app)
├── /curriculo-ia        # App currículo
├── /gera-proposta       # App propostas
├── /politica-privacidade # Página legal
└── /termos-uso          # Página legal
```

### 3. Script de Deploy Automatizado

```bash
#!/bin/bash
# deploy.sh

echo "🚀 Deploy Geradocumentos Unified"

cd unified-app/

echo "📦 Instalando dependências..."
npm install

echo "🔨 Fazendo build..."
npm run build

echo "✅ Testando build..."
npm run preview &
PREVIEW_PID=$!
sleep 3
kill $PREVIEW_PID

echo "🌐 Deploy no Vercel..."
npx vercel --prod

echo "✅ Deploy concluído!"
echo "🔗 Site: https://geradocumentos.com.br"
```

## 📊 Monitoramento Pós-Deploy

### 1. Verificações Essenciais
- [ ] Homepage carregando corretamente
- [ ] Todas as imagens visíveis
- [ ] Navegação funcionando
- [ ] Páginas legais acessíveis
- [ ] SEO meta tags presentes
- [ ] Performance satisfatória

### 2. Ferramentas de Monitoramento
- **Vercel Analytics**: Métricas automáticas
- **Google Search Console**: Indexação e SEO
- **PageSpeed Insights**: Performance
- **GTmetrix**: Análise de velocidade

### 3. Métricas Importantes
- **Core Web Vitals**: LCP, FID, CLS
- **Time to First Byte** < 200ms
- **First Contentful Paint** < 1.5s
- **Speed Index** < 3s

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. Imagens não carregam
```bash
# Verificar se as imagens estão em public/images/
ls -la unified-app/public/images/

# Verificar paths nos componentes (devem começar com /)
grep -r "images/" src/
```

#### 2. Rotas 404
```bash
# Verificar vercel.json
cat unified-app/vercel.json

# Verificar React Router
grep -r "Route path" src/
```

#### 3. Build falha
```bash
# Limpar cache
rm -rf node_modules/ dist/
npm install
npm run build
```

## 📞 Suporte

Em caso de problemas no deploy:

1. **Verificar logs do Vercel**
2. **Checar configurações do domínio**
3. **Validar build local**
4. **Revisar este guia**

---

## ✅ Status Atual

- [x] **Aplicação React criada e funcionando**
- [x] **Build de produção OK**
- [x] **SEO implementado**
- [x] **Pronto para deploy**
- [ ] **Deploy em produção** (próximo passo)
- [ ] **Integração das outras apps** (futuro)

🎉 **A aplicação está pronta para substituir a homepage HTML!**
