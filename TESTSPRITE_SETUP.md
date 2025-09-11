# TestSprite - Configuração e Uso

## Sobre o TestSprite

O TestSprite é uma ferramenta de IA para testes automatizados que pode:
- Gerar automaticamente casos de teste
- Executar testes funcionais, de segurança e de performance
- Analisar código e identificar vulnerabilidades
- Criar relatórios detalhados de cobertura de testes
- Sugerir correções para problemas encontrados

## Configuração Inicial

### 1. Obter API Key

1. Acesse [TestSprite API Key Page](https://testsprite.com/api-key)
2. Crie uma conta gratuita ou faça login
3. Copie sua API key
4. Adicione no arquivo `.env`:
   ```
   TESTSPRITE_API_KEY=sua-api-key-aqui
   ```

### 2. Instalação (já realizada)

```bash
npm install -g @testsprite/testsprite-mcp@latest
```

## Como Usar

### Método 1: Via Comando Direto

```bash
# Executar análise completa do projeto
npx @testsprite/testsprite-mcp@latest generateCodeAndExecute
```

### Método 2: Via IDE com MCP (Recomendado)

Se você estiver usando Cursor ou VSCode com suporte MCP:

1. Configure o MCP server no seu IDE:
```json
{
  "mcpServers": {
    "TestSprite": {
      "command": "npx",
      "args": ["@testsprite/testsprite-mcp@latest"],
      "env": {
        "API_KEY": "sua-api-key-aqui"
      }
    }
  }
}
```

2. No chat do IDE, digite:
```
Ajude a testar este projeto com TestSprite
```

## O que o TestSprite Testará

### Frontend (HTML/CSS/JS)
- ✅ Funcionalidade dos formulários
- ✅ Navegação entre páginas
- ✅ Responsividade
- ✅ Performance de carregamento
- ✅ Acessibilidade
- ✅ Validação de campos

### React Apps (microsaas-curriculo, gerador-propostas-meis, unified-app)
- ✅ Componentes React
- ✅ Estados e props
- ✅ Hooks customizados
- ✅ Integração com APIs
- ✅ Roteamento
- ✅ Autenticação (Supabase)

### APIs e Backend
- ✅ Endpoints de API
- ✅ Validação de dados
- ✅ Tratamento de erros
- ✅ Segurança e autenticação
- ✅ Performance de consultas

## Tipos de Teste Gerados

1. **Testes Funcionais**: Validam se as funcionalidades principais funcionam
2. **Testes de Segurança**: Identificam vulnerabilidades
3. **Testes de Performance**: Medem velocidade e otimização
4. **Testes de UI/UX**: Verificam experiência do usuário
5. **Testes de Integração**: Validam comunicação entre componentes
6. **Testes de Borda**: Cenários extremos e casos especiais

## Exemplo de Saída Esperada

```
TestSprite Analysis Complete

Generated:
├── Standardized Product Requirements Document (PRD)
├── 16 Frontend Test Cases  
├── 12 Backend Test Cases
├── Tests Execution Reports
└── Comprehensive Test Plan

Coverage: 90%+ Designed Features Delivered
```

## Próximos Passos

1. **Configure sua API key** no arquivo `.env`
2. **Execute o TestSprite** usando um dos métodos acima
3. **Revise os relatórios** gerados
4. **Implemente as correções** sugeridas
5. **Execute novamente** para validar as correções

## Suporte

- 📖 [Documentação Oficial](https://docs.testsprite.com/)
- 💬 [Suporte ao Vivo](https://testsprite.com/support)
- 📧 Email: contact@testsprite.com

## Notas Importantes

- ⚠️ **Nunca commite** o arquivo `.env` com suas API keys
- 🔄 **Execute regularmente** os testes durante o desenvolvimento
- 📊 **Monitore a cobertura** de testes para manter qualidade
- 🚀 **Use em CI/CD** para testes automatizados em produção

---

*TestSprite foi reconhecido como uma das Top 10 ferramentas de IA de 2025 no Product Hunt.*