# 🐳 Docker Setup - Geradocumentos

## 📋 Arquivos Docker

- **`Dockerfile`**: Build de produção otimizado com Nginx
- **`Dockerfile.dev`**: Build de desenvolvimento com hot reload
- **`docker-compose.yml`**: Orquestração dos containers
- **`.dockerignore`**: Exclusões para otimizar build

## 🚀 Build e Deploy

### Build Local
```bash
# Build da imagem de produção
docker build -t geradocumentos:latest .

# Run container
docker run -p 8080:80 geradocumentos:latest
```

### Docker Compose
```bash
# Produção
docker-compose up -d

# Desenvolvimento (com hot reload)
docker-compose --profile dev up
```

### Verificar Funcionamento
```bash
# Health check
curl http://localhost:8080/health

# Testar aplicação
curl http://localhost:8080/
curl http://localhost:8080/curriculo-ia
curl http://localhost:8080/gera-proposta
```

## 🤖 GitHub Actions

O workflow está configurado para:

1. **Trigger**: Push na branch `main` ou PR merged
2. **Build**: Multi-arch (AMD64/ARM64)
3. **Tags**: `latest` + commit SHA
4. **Cache**: GitHub Actions cache
5. **Push**: DockerHub registry

### Secrets Necessários no GitHub:
- `DOCKERHUB_USERNAME`: Usuário do DockerHub
- `DOCKERHUB_PASSWORD`: Token do DockerHub

## 📊 Otimizações Implementadas

### Multi-stage Build
- **Stage 1**: Build da aplicação React/Vite
- **Stage 2**: Servidor Nginx otimizado

### Nginx Configuration
- ✅ Gzip compression
- ✅ Security headers
- ✅ Cache para assets estáticos
- ✅ SPA routing (React Router)
- ✅ Health check endpoint

### Security
- ✅ Non-root user
- ✅ Security headers
- ✅ Minimal attack surface
- ✅ Health checks

### Performance
- ✅ Cache de assets (1 ano)
- ✅ Gzip compression
- ✅ Multi-arch builds
- ✅ Layer caching

## 🔍 Debugging

### Verificar logs
```bash
docker logs geradocumentos
```

### Executar bash no container
```bash
docker exec -it geradocumentos sh
```

### Verificar arquivos no container
```bash
docker exec geradocumentos ls -la /usr/share/nginx/html
```

## 📝 Estrutura da Imagem

```
/usr/share/nginx/html/     # Aplicação React buildada
├── index.html             # Entry point
├── assets/                # JS/CSS bundles
├── images/                # Assets estáticos
├── robots.txt
├── sitemap.xml
└── site.webmanifest

/etc/nginx/conf.d/         # Configuração Nginx
└── default.conf           # Config otimizada
```

## 🌐 URLs Disponíveis

Após deploy:
- **Homepage**: `http://localhost:8080/`
- **Currículo IA**: `http://localhost:8080/curriculo-ia`
- **Gera Proposta**: `http://localhost:8080/gera-proposta`
- **Health Check**: `http://localhost:8080/health`

---

**Nota**: A imagem final tem ~50MB (Alpine + Nginx + App)
