## Configuração do Monorepo + product-service
---
🎯 Objetivo
Criar a estrutura base do projeto usando npm workspaces, uma funcionalidade nativa do npm que permite gerenciar múltiplos pacotes em um único repositório (monorepo). Além de criar primeiro microserviço product-service.
---
---
🤔 Por que Monorepo?
Em vez de ter repositórios separados para cada serviço, o monorepo oferece:

🔄 Compartilhamento de código 
Tipos, utilitários e interfaces compartilhadas entre serviços
⚡ Uma instalação única 
npm install na raiz instala todas as dependências de todos os serviços
📌 Versionamento unificado 
Todos os serviços evoluem juntos no mesmo histórico Git
🛠️ Manutenção simplificada
Mudanças que afetam vários serviços ocorrem em um único commit
📦 npm Workspaces
---
O campo "workspaces" no package.json raiz instrui o npm a reconhecer pastas dentro de apps/ como pacotes independentes.
---
O que isso significa:

Cada serviço tem seu próprio package.json com dependências isoladas
Ao rodar npm install na raiz, o npm resolve todas as dependências de todos os serviços em uma única árvore
Cada workspace pode ter seus próprios scripts (dev, build, start)
As dependências compartilhadas são instaladas uma única vez na raiz
---
🏗️ TypeScript Base
O tsconfig.json raiz define as regras de compilação que todos os serviços herdarão
---
---
Cada serviço tem seu próprio tsconfig.json que estende essas configurações e adiciona customizações específicas
---
---
Isso permite:

✅ Consistência entre todos os serviços (regras TypeScript iguais)
✅ Flexibilidade local (cada serviço pode customizar outDir, rootDir, etc.)
📋 Scripts Disponíveis
---
---
Na raiz do projeto:

npm install           # Instala todas as dependências de todos os serviços
npm run build         # Compila TypeScript em todos os workspaces
npm run dev           # Roda em modo desenvolvimento (watch) em todos os workspaces
npm start             # Inicia todos os serviços
---
---
Dentro de um workspace específico:

cd apps/product-service
npm run dev           # Desenvolvimento com hot-reload
npm run build         # Compila TypeScript
npm start             # Inicia o serviço
---
---
✅ Validação
Após criar os arquivos, você pode validar a estrutura com:

npm install           # Instala as dependências (pode falhar por falta de Node.js, isso é esperado)
npm run build         # Tenta compilar (pode falhar, é ok por enquanto)
---
---

Status: ✅ Estrutura do monorepo configurada com sucesso + product-service !