# ms-boleto

## 🗒️ Introdução

Esta API de boleto (`ms-boleto`) expõe serviços para gerenciamento e processamento de pagamentos de boletos, com rotas organizadas por contexto de negócio para Pessoa Jurídica (PJ) e Pessoa Física (PF). Ela suporta API Key (`x-api-key`) para controle de acesso.

---

## 🛠️ Requisitos de Instalação

Para executar o projeto, você precisará dos seguintes requisitos:

* **Sistema Operacional**: Linux Ubuntu / Mint / MacOs.
* **Docker**: Certifique-se de que o Docker está instalado em sua máquina.
* **Docker Compose**: Instale o Docker Compose para orquestrar os containers.
* **Makefile**: Certifique-se de ter o Makefile instalado para simplificar a execução de comandos.
* **Node.js**: versão `24.x` do `Node.js` rodando em um container Docker.

---

## 🚀 Como Executar o Código Manualmente em Ambiente Local

- 🛠️ Copie o arquivo `.env.dist` para `.env` usando o comando:
    ```bash
    cp .env.dist .env
    ```

- 🛠️ Copie o arquivo `docker-compose.override.yml.dist` para `docker-compose.override.yml` usando o comando:
    ```bash
    cp docker-compose.override.yml.dist docker-compose.override.yml
    ```

- 🛠️ Recomendamos criar um alias `dcli` para rodar o comando: `docker compose -f docker-compose.cli.yml run --rm`
    ```bash
    chmod +x ./add_alias_cli.sh && ./add_alias_cli.sh
    ```

- 🛠️ Construir a imagem docker
    ```bash
    make build
    ```

- 🛠️ Instalar as dependências do projeto
    ```bash
    make install
    ```

- 🛠️ Verifica as dependências do projeto que estão desatualizadas
  ```bash
  dcli yarn check:pkg
  ```

- 🛠️ Atualize todas as dependências do projeto com a **última versão suportada**

  ```bash
  dcli yarn check:pkg:update
  ```

- ▶️ Executando o projeto em modo **desenvolvimento**
    ```bash
    make dev
    ```

- ▶️ Executando para aplicar `checklist` de padronização do projeto.
    ```bash
    make checklist
    ```

---

## 🚀 Como criar a estrutura de um novo módulo baseado no arquivo schema.

- ▶️ Executando para criar nova estrutura de módulo.
    ```bash
    dcli gen --m `ModuleName` --s `SchemName`
    ```
  
  **Onde:**
  - `--m`: Nome do módulo que será criado (ex.: pj-bill-payments, pf-bill-payments, etc).
  - `--s`: Nome do schema que será usado como base para criar o módulo (ex.: CreateNewBillPaymentsSchema, etc).
  - `--force`: (opcional) Se informado, sobrescreve arquivos existentes sem perguntar.
  
  Exemplo:
  ```bash
   dcli gen --m billPayments --s CreateNewBillPaymentsSchema
  ```
  
- Exemplo com `force` (sobrescreve arquivos existentes):
  ```bash
   dcli gen --m billPayments --s FindBillPaymentsByIdSchema --force
  ```

🚨 **OBSERVAÇÃO:** 

* Os schemas deve obedecer ao padrão de nomenclatura `PascalCase` e iniciar com verbo de ação, como `Create`, `Update`, `Delete`, etc.
* O sufixo de **types** de request do `Schema` deve seguir o padrão (`Body`, `Params`, `Query`), por exemplo:
    - Quando ter **body**: `CreateUserBodyRequest`, `UpdateUserBodyRequest`, etc.
    - Quando ter **params**: `FindAccountByIdParamsRequest`, `FindUserByIdParamsRequest`, etc.
    - Quando ter **query**: `FindAccountRequest`, `FindUserQueryRequest`, etc.

**Se não seguir o padrão de nomes, o comando não vai criar toda estrutura base e você precisará fazer trabalho manual.**

---

## 🚀 Como executar migrate com o knex

- ▶️️ Execute o comando para criar uma nova migração.
    ```bash
    dcli knex migrate:make initial_database
    ```

- ▶️️ Execute a última migração
    ```bash
    dcli knex migrate:latest
    ```

- ▶️️ Reverter a última migração
    ```bash
    dcli knex migrate:rollback
    ```

- ▶️️ Execute para criar uma nova semente
    ```bash
    dcli knex seed:make seed_boleto
    ```

- ▶️️ Execute o comando seed para preencher o banco de dados.
    ```bash
    dcli knex seed:run
    ```  
---

## 🚨 Recomendações de Performance para Produção

Para obter melhor desempenho de uma aplicação Node.js em ambiente de produção, que utiliza `1 vCPU` e `2 GB de RAM`,  
**recomendamos** configurar as seguintes variáveis de ambiente:

| VARIÁVEL DE AMBIENTE                  | DESCRIÇÃO                                                                                                                                                       |
|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| UV_THREADPOOL_SIZE                    | Controla quantas threads nativas o Node utiliza para tarefas assíncronas pesadas (ex.: criptografia, compressão, chamadas de arquivos, etc.). Valor padrão = 4. |
| NODE_OPTIONS="--max-old-space-size=X" | Define a quantidade máxima de memória (em MB) que o GC (Garbage Collector) do Node pode usar antes de dar OOM. Se não definido, o Node estima.                  |

### 📏 Como pensar na configuração

- 🚨 **NOTA**: A tabela abaixo serve como ponto de partida para definir a configuração de **vCPU** e **memória**.  
  A parametrização final deve ser ajustada com base em testes práticos, **de acordo com as necessidades específicas de
  cada aplicação**.

| RECURSO DISPONÍVEL | UV_THREADPOOL_SIZE | NODE_OPTIONS    |
|--------------------|--------------------|-----------------|
| 1 vCPU, 2 GB RAM   | 2 ou 3 threads     | 1024 a 1536 MB  |
| 2 vCPU, 4 GB RAM   | 4 threads          | 2048 a 3072 MB  |
| 4 vCPU, 8 GB RAM   | 6 a 8 threads      | 4096 a 6144 MB  |
| 8 vCPU, 16 GB RAM  | 8 threads (limite) | 8192 a 12288 MB |

### 🧠 Regras de Ouro para Escolha

- ✅ UV_THREADPOOL_SIZE:
    - Use vCPU x 2 como base.
    - Nunca ultrapasse 8.
    - Leia mais em:
        - [DEV Community](https://dev.to/bleedingcode/increase-node-js-performance-with-libuv-thread-pool-5h10?utm_source=chatgpt.com).
        - [Node.js](https://nodejs.org/api/cli.html?utm_source=chatgpt.com#uv_threadpool_sizesize).

- ✅ NODE_OPTIONS:
    - Utilize ~70% da memória disponível para o heap.
    - Não use 100% da memória do container, deixe ~30% livre (SO, bindings C++, buffers).
    - Leia mais em:
        - [DEV Community](https://dev.to/manojspace/nodejs-javascript-heap-out-of-memory-resolving-pm2-memory-issues-45d3?utm_source=chatgpt.com).
        - [Node.js](https://nodejs.org/api/cli.html?utm_source=chatgpt.com#node_optionsoptions).

### 🚨 Imagem Docker para Produção

A imagem `gcr.io/distroless/nodejs22-debian12` é **oficial e recomendada para produção**.  
O **Distroless** é um projeto oficial do Google, usado internamente no GKE (Google Kubernetes Engine), Cloud Run, etc.

- A ideia por trás do Distroless é minimizar ao máximo o que existe na imagem: **não possui**:
    - shell (sh, bash)
    - gerenciador de pacotes (apt, apk)
    - binários genéricos
    - ferramentas que um invasor poderia usar
- Ele possui apenas:
    - runtime + bibliotecas essenciais + sua aplicação.

#### 🔒 Vantagens para Produção

- Imagens pequenas: reduz tempo de deploy, pull/push e inicialização.
- Mais seguro: apenas o necessário.
- Melhor prática recomendada: **Google Cloud** e empresas como **Spotify** usam **Distroless** em produção.
- Superfície CVE (possíveis vulnerabilidades) extremamente baixa (não há bash para explorar, por exemplo).

| Recurso                  | Avaliação       |
|--------------------------|-----------------|
| Segurança                | Muito alta ✅    |
| Performance              | Excelente ✅     |
| Tamanho da Imagem        | Muito pequeno ✅ |
| Recomendado para EKS/ECS | Sim ✅           |
| Possui shell para debug? | Não ⚠️          |

---

## 🗒️ Documentação Swagger

* [Swagger Doc](http://localhost:3009/docs)
* [Swagger Json](http://localhost:3009/docs/json)

🚨 **OBSERVAÇÃO:** Em ambiente de **produção recomendamos** que o swagger fique desligado, para isso basta configurar a
variável a seguir:

```text
ENABLED_SWAGGER=false
```

---

## 🗒️ Health check

* [localhost](http://localhost:3009/ms-boleto/health)
* [homologação](https://ms-boleto.piudev.com.br/ms-boleto/health)
* [produção](https://ms-boleto.bepay.tech/ms-boleto/health)

---
