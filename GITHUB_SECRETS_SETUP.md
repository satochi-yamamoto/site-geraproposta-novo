# 🔐 Configuração dos Secrets no GitHub

## 📋 Secrets Necessários

Para o GitHub Actions funcionar corretamente, você precisa configurar os seguintes secrets no repositório:

### 1. DOCKERHUB_USERNAME
- **Valor**: Seu username do DockerHub
- **Exemplo**: `meuusername`

### 2. DOCKERHUB_PASSWORD  
- **Valor**: Access Token do DockerHub (recomendado) ou sua senha
- **Como criar um Access Token**:
  1. Acesse [DockerHub → Account Settings → Security](https://hub.docker.com/settings/security)
  2. Clique em "New Access Token"
  3. Dê um nome para o token (ex: "GitHub Actions")
  4. Copie o token gerado

## 🛠️ Como Configurar os Secrets

### Via Interface Web:
1. Acesse seu repositório no GitHub
2. Vá em **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Adicione os secrets:
   - Name: `DOCKERHUB_USERNAME` | Secret: `seu-username`
   - Name: `DOCKERHUB_PASSWORD` | Secret: `seu-access-token`

### Via GitHub CLI:
```bash
# Instalar GitHub CLI se necessário
# https://cli.github.com/

# Configurar secrets
gh secret set DOCKERHUB_USERNAME --body "seu-username"
gh secret set DOCKERHUB_PASSWORD --body "seu-access-token"

# Verificar secrets configurados
gh secret list
```

## 🏗️ Configuração do Environment (Opcional)

O workflow referencia um environment chamado `Docker_hub`. Para criar:

1. Vá em **Settings** → **Environments**
2. Clique em **New environment**
3. Nome: `Docker_hub`
4. Configure protection rules se necessário

## 🚀 Testando o Deploy

Após configurar os secrets:

1. **Faça um commit e push**:
   ```bash
   git add .
   git commit -m "Add Docker configuration"
   git push origin main
   ```

2. **Verifique o workflow**:
   - Acesse **Actions** no GitHub
   - Verifique se o workflow está rodando
   - Confirme se o build e push foram sucessos

3. **Verifique no DockerHub**:
   - Acesse [DockerHub](https://hub.docker.com)
   - Confirme se a imagem foi criada em seu repositório

## 📦 Resultado Esperado

Após o sucesso do workflow, você terá:

- **Imagem no DockerHub**: `seuurusername/site-geraproposta-novo:latest`
- **Tag adicional**: `seuurusername/site-geraproposta-novo:commit-sha`
- **Multi-arch**: Compatível com AMD64 e ARM64
- **Otimizada**: ~50MB (Alpine + Nginx + App React)

## 🔍 Troubleshooting

### Erro de Autenticação:
- Verifique se os secrets estão configurados corretamente
- Confirme se o Access Token tem permissões de escrita

### Erro de Build:
- Verifique se o `unified-app` tem todas as dependências
- Confirme se o `npm run build` funciona localmente

### Erro de Push:
- Verifique se o repositório existe no DockerHub
- Confirme se você tem permissões de push

## 🌐 Deploy da Imagem

Para usar a imagem gerada:

```bash
# Pull da imagem
docker pull seuurusername/site-geraproposta-novo:latest

# Run da aplicação
docker run -p 8080:80 seuurusername/site-geraproposta-novo:latest

# Acessar aplicação
curl http://localhost:8080/health
```

---

**Nota**: Substitua `seuurusername` pelo seu username real do DockerHub
