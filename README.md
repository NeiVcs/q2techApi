# Q2Tech

## 🗒️ Introdução

Esta API de boleto (`Q2Tech`) expõe serviços para gerenciamento e processamento de pagamentos de boletos, com rotas organizadas por contexto de negócio para Pessoa Jurídica (PJ) e Pessoa Física (PF). Ela suporta API Key (`x-api-key`) para controle de acesso.

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
    yarn gen --m `ModuleName` --s `SchemName`
    ```
  
  **Onde:**
  - `--m`: Nome do módulo que será criado (ex.: pj-bill-payments, pf-bill-payments, etc).
  - `--s`: Nome do schema que será usado como base para criar o módulo (ex.: CreateNewSchema, etc).
  - `--force`: (opcional) Se informado, sobrescreve arquivos existentes sem perguntar.
  
  Exemplo:
  ```bash
   yarn gen --m Q2tech --s CreateNewSchema
  ```
  
- Exemplo com `force` (sobrescreve arquivos existentes):
  ```bash
   yarn gen --m Q2tech --s FindNewByIdSchema --force
  ```

🚨 **OBSERVAÇÃO:** 

* Os schemas deve obedecer ao padrão de nomenclatura `PascalCase` e iniciar com verbo de ação, como `Create`, `Update`, `Delete`, etc.
* O sufixo de **types** de request do `Schema` deve seguir o padrão (`Body`, `Params`, `Query`), por exemplo:
    - Quando ter **body**: `CreateUserBodyRequest`, `UpdateUserBodyRequest`, etc.
    - Quando ter **params**: `FindAccountByIdParamsRequest`, `FindUserByIdParamsRequest`, etc.
    - Quando ter **query**: `FindAccountRequest`, `FindUserQueryRequest`, etc.

**Se não seguir o padrão de nomes, o comando não vai criar toda estrutura base e você precisará fazer trabalho manual.**

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

* [localhost](http://localhost:3009/q2tech/health)
* [homologação](https://q2tech.com.br/q2tech/health)
* [produção](https://q2tech/menuDigital/health)

---
