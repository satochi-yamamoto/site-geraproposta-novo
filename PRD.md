# Product Requirements Document (PRD)
## Gerador de Documentos com IA

### Versão: 1.0
### Data: 11/09/2025
### Responsável: YD Software

---

## 1. Visão Geral do Produto

### 1.1 Resumo Executivo
O **Gerador de Documentos com IA** (geradocumentos.com.br) é uma plataforma web que oferece ferramentas especializadas para criação automatizada de documentos profissionais utilizando inteligência artificial. O produto foca em profissionais de tecnologia, MEIs e freelancers que precisam criar documentos de alta qualidade de forma rápida e eficiente.

### 1.2 Proposta de Valor
- **Especialização em Tech**: Templates e campos específicos para profissionais de tecnologia
- **IA Otimizada**: Inteligência artificial treinada para linguagem técnica e padrões do setor
- **ATS-Friendly**: Documentos estruturados para sistemas de triagem automatizada
- **Gratuito**: Ferramentas totalmente gratuitas sem limitações
- **Privacidade**: Processamento local de dados, sem armazenamento em nuvem

### 1.3 Objetivos do Produto
- Simplificar a criação de documentos profissionais para área de tecnologia
- Reduzir o tempo de criação de currículos e propostas de horas para minutos
- Aumentar as chances de aprovação em processos seletivos tech
- Oferecer ferramentas gratuitas e acessíveis para freelancers e MEIs

---

## 2. Público-Alvo

### 2.1 Persona Principal: Desenvolvedores e Profissionais de TI
- **Características**: Programadores, desenvolvedores, analistas de sistemas
- **Necessidades**: Currículos otimizados para ATS, destaque de skills técnicas
- **Comportamento**: Valorizam eficiência, ferramentas gratuitas e modernidade

### 2.2 Persona Secundária: Freelancers e MEIs
- **Características**: Prestadores de serviços independentes, consultores
- **Necessidades**: Propostas comerciais profissionais, documentação legal
- **Comportamento**: Buscam profissionalismo com baixo custo

### 2.3 Persona Terciária: Empreendedores Digitais
- **Características**: Donos de startups, criadores de aplicativos
- **Necessidades**: Políticas de privacidade, termos de uso
- **Comportamento**: Compliance legal com agilidade

---

## 3. Arquitetura do Produto

### 3.1 Estrutura Monorepo
```
site-geraproposta-novo/
├── unified-app/              # Aplicação principal React/Vite
├── microsaas-curriculo/      # Gerador de currículos standalone
├── gerador-propostas-meis/   # Gerador de propostas standalone
├── index.html               # Landing page SEO-otimizada
├── docker-compose.yml       # Orquestração de containers
└── testsprite.config.json   # Configuração de testes
```

### 3.2 Stack Tecnológico
- **Frontend**: React 18 + Vite + React Router
- **UI/UX**: TailwindCSS + Radix UI + Framer Motion
- **PDF Generation**: jsPDF
- **Analytics**: Vercel Analytics & Speed Insights
- **Deployment**: Docker + Nginx
- **Testing**: TestSprite

### 3.3 Modo de Operação
- **Integrado**: Apps executam dentro da interface unificada
- **Standalone**: Operação independente em portas diferentes (dev)
- **Production**: Servido via Nginx com otimizações de performance

---

## 4. Funcionalidades Principais

### 4.1 Currículo IA (/curriculo-ia)
**Status**: ✅ Implementado

#### Características:
- Templates específicos para área de tecnologia
- Campos otimizados para skills técnicas
- Estrutura ATS-friendly
- Geração em PDF profissional
- Preview em tempo real

#### Fluxo do Usuário:
1. Preenchimento de dados pessoais
2. Inserção de experiências profissionais
3. Seleção de tecnologias e habilidades
4. Preview do currículo formatado
5. Download em PDF

### 4.2 Gera Proposta (/gera-proposta)
**Status**: ✅ Implementado

#### Características:
- Templates para MEIs e freelancers
- Campos personalizáveis para serviços
- Cálculos automáticos de valores
- Layout profissional
- Export em PDF

#### Fluxo do Usuário:
1. Dados da empresa/freelancer
2. Informações do cliente
3. Descrição de serviços
4. Valores e condições
5. Geração e download da proposta

### 4.3 Landing Page Unificada
**Status**: ✅ Implementado

#### Características:
- SEO otimizado com meta tags completas
- Schema.org markup (JSON-LD)
- Google Analytics e AdSense
- Design responsivo
- Política de cookies (LGPD)

---

## 5. Requisitos Técnicos

### 5.1 Performance
- **Tempo de carregamento**: < 3s
- **Lighthouse Score**: > 90
- **Bundle size**: Otimizado com code splitting
- **Responsividade**: Mobile-first design

### 5.2 SEO
- Meta tags completas (Open Graph, Twitter Cards)
- Hreflang para internacionalização
- Sitemap.xml gerado
- Canonical URLs
- Schema.org markup

### 5.3 Segurança
- Headers de segurança (HTTPS, CSP)
- Proteção XSS
- Sanitização de inputs
- Compliance LGPD

### 5.4 Monitoramento
- Google Analytics 4
- Vercel Speed Insights
- Health check endpoints
- Error tracking

---

## 6. Comandos de Desenvolvimento

### 6.1 Aplicação Principal
```bash
cd unified-app
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run lint         # Linting
npm run preview      # Preview do build
```

### 6.2 Multi-App Development
```bash
npm run dev:all      # Inicia todas as apps
npm run install:all  # Instala deps de todas as apps
```

### 6.3 Docker
```bash
docker-compose --profile dev up  # Dev com hot reload
docker-compose up -d             # Deploy produção
```

---

## 7. Roadmap de Funcionalidades

### 7.1 Fase Atual (Q3 2025)
- ✅ Currículo IA integrado
- ✅ Gera Proposta integrado
- ✅ Landing page otimizada
- ✅ Deploy automatizado

### 7.2 Próximas Releases (Q4 2025)
- 🔄 Gerador de Políticas de Privacidade
- 🔄 Gerador de Termos de Uso
- 🔄 Sistema de templates customizáveis
- 🔄 Integração com APIs de recrutamento

### 7.3 Futuro (2026)
- 📋 Gerador de contratos freelancer
- 📋 Sistema de assinatura digital
- 📋 Analytics de performance dos documentos
- 📋 API para integração externa

---

## 8. Métricas de Sucesso

### 8.1 Métricas de Produto
- **MAU (Monthly Active Users)**: > 5,000
- **Taxa de conversão**: > 15% (visitante → usuário ativo)
- **NPS**: > 70
- **Tempo de geração**: < 2min por documento

### 8.2 Métricas Técnicas
- **Uptime**: > 99.5%
- **Page Load Time**: < 3s
- **Error Rate**: < 1%
- **Lighthouse Performance**: > 90

### 8.3 Métricas de Negócio
- **SEO Ranking**: Top 10 para "gerador currículo grátis"
- **Organic Traffic**: > 10k/mês
- **User Retention**: > 40% em 30 dias

---

## 9. Casos de Uso Detalhados

### 9.1 Caso de Uso: Desenvolvedor Júnior
**Contexto**: João é desenvolvedor júnior procurando emprego
**Objetivo**: Criar currículo profissional otimizado para ATS
**Fluxo**:
1. Acessa /curriculo-ia
2. Preenche dados pessoais e experiências
3. Seleciona tecnologias (React, Node.js, Python)
4. Visualiza preview otimizado
5. Baixa PDF e envia para vagas

### 9.2 Caso de Uso: Freelancer
**Contexto**: Maria é designer freelancer
**Objetivo**: Criar proposta profissional para cliente
**Fluxo**:
1. Acessa /gera-proposta
2. Insere dados da empresa
3. Detalha serviços de design
4. Define valores e prazos
5. Gera proposta em PDF

---

## 10. Requisitos de Qualidade

### 10.1 Usabilidade
- Interface intuitiva sem necessidade de tutorial
- Formulários com validação em tempo real
- Feedback visual claro para ações do usuário
- Acessibilidade (WCAG 2.1 AA)

### 10.2 Confiabilidade
- Sistema deve funcionar offline para funcionalidades básicas
- Backup automático de dados do formulário
- Tratamento gracioso de erros
- Recovery automático de falhas temporárias

### 10.3 Escalabilidade
- Arquitetura preparada para 100k+ usuários
- CDN para assets estáticos
- Lazy loading de componentes
- Otimização de bundle por rota

---

## 11. Conclusão

O **Gerador de Documentos com IA** representa uma solução completa e especializada para profissionais de tecnologia que precisam criar documentos profissionais de alta qualidade. Com foco em usabilidade, performance e resultados práticos, o produto está posicionado para se tornar a referência no mercado brasileiro de ferramentas gratuitas para geração de documentos profissionais.

A arquitetura monorepo permite evolução modular, enquanto a integração com IA garante documentos otimizados para os padrões atuais do mercado de trabalho tech.

---

## Anexos

### A.1 Links Importantes
- **Produção**: https://geradocumentos.com.br
- **Currículo IA**: https://curriculoia.app.br
- **Gera Proposta**: https://geraproposta.com.br

### A.2 Contatos
- **Desenvolvimento**: suporte@ydsoftware.com.br
- **Contato Comercial**: contato@ydsoftware.com.br

### A.3 Documentação Técnica
- **README**: Instruções de setup e desenvolvimento
- **CLAUDE.md**: Guias para assistente de código
- **Docker**: Configurações de container e deploy

---

*Documento criado em 11/09/2025 - YD Software*