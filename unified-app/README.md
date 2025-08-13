# Geradocumentos.com.br - Aplicação Unificada

Aplicação React unificada que substitui a homepage HTML e unifica todas as ferramentas do Geradocumentos.com.br.

## 🚀 Tecnologias

- **React 18** - Framework principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilização
- **Framer Motion** - Animações
- **React Router** - Roteamento
- **Radix UI** - Componentes base
- **Vercel Analytics** - Analytics de performance

## 📁 Estrutura do Projeto

```
unified-app/
├── public/
│   ├── images/         # Imagens estáticas
│   ├── robots.txt      # SEO robots
│   ├── sitemap.xml     # Sitemap para SEO
│   └── site.webmanifest # PWA manifest
├── src/
│   ├── components/     # Componentes reutilizáveis
│   │   ├── ui/        # Componentes base (botões, etc)
│   │   ├── Header.jsx # Cabeçalho
│   │   ├── Footer.jsx # Rodapé
│   │   └── Layout.jsx # Layout base
│   ├── pages/         # Páginas da aplicação
│   │   ├── HomePage.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   └── TermsOfService.jsx
│   ├── lib/           # Utilitários
│   ├── App.jsx        # Componente principal
│   ├── main.jsx       # Entry point
│   └── index.css      # Estilos globais
├── index.html         # HTML base
├── package.json       # Dependências
├── vite.config.js     # Configuração Vite
├── tailwind.config.js # Configuração Tailwind
└── vercel.json        # Configuração Vercel
```

## 🎨 Design System

### Cores
- **Primary**: Blue (#3b82f6)
- **Background**: Slate (#0f172a, #1e293b)
- **Text**: White/Slate variants
- **Accent**: Purple gradients

### Componentes
- **Glass Effect**: Efeito de vidro com blur
- **Gradient Text**: Textos com gradiente
- **Motion Components**: Animações com Framer Motion

## 🛠️ Desenvolvimento

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 📱 Features

### Homepage
- ✅ Hero section com animações
- ✅ Grid de ferramentas
- ✅ Seção de benefícios
- ✅ Depoimentos
- ✅ Call-to-action
- ✅ Design responsivo

### Navegação
- ✅ Header com menu responsivo
- ✅ Footer com links
- ✅ Roteamento SPA
- ✅ Páginas legais

### SEO
- ✅ Meta tags otimizadas
- ✅ Open Graph
- ✅ Twitter Cards
- ✅ Structured Data
- ✅ Sitemap XML
- ✅ Robots.txt

### Performance
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Imagens otimizadas
- ✅ CSS minificado
- ✅ Vercel Analytics

## 🚀 Deploy

A aplicação está configurada para deploy automático no Vercel:

1. **Build Command**: `npm run build`
2. **Output Directory**: `dist`
3. **Framework**: Vite
4. **Node Version**: 18+

### Configurações Vercel
- Redirects automáticos de `.html` para rotas React
- Headers de segurança
- Cache otimizado para assets estáticos

## 🔗 Integrações Futuras

### Aplicações Existentes
- **Currículo IA** (`/curriculo-ia/*`)
- **Gera Proposta** (`/gera-proposta/*`)

### Implementação
As aplicações existentes serão integradas como:
1. Subrotas dentro da aplicação React
2. Micro-frontends independentes
3. Embeddings via iframe (se necessário)

## 📊 Analytics

- **Vercel Analytics**: Métricas de performance
- **Speed Insights**: Core Web Vitals
- **Custom Events**: Tracking de conversões

## 🔧 Configurações

### Environment Variables
```env
VITE_VERCEL_ANALYTICS_ID=your_analytics_id
```

### Aliases
- `@/` → `src/`
- `@/components` → `src/components`
- `@/pages` → `src/pages`
- `@/lib` → `src/lib`

## 📝 Próximos Passos

1. **Integração das Apps Existentes**
   - Configurar subrotas para microsaas-curriculo
   - Configurar subrotas para gerador-propostas-meis
   - Implementar carregamento lazy

2. **Melhorias de Performance**
   - Implementar Service Worker
   - Adicionar caching estratégico
   - Otimizar imagens

3. **Funcionalidades Avançadas**
   - Sistema de autenticação
   - Dashboard unificado
   - API unificada

## 🤝 Contribuição

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature
3. Faça commit das alterações
4. Abra um Pull Request

## 📄 Licença

Propriedade de Geradocumentos.com.br - Todos os direitos reservados.
