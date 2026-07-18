# ⚙️ Setup — WebViolin

Guia para rodar o projeto localmente.

---

## Pré-requisitos

- Node.js 20 LTS ou superior
- npm 10 ou superior
- Navegador com suporte a Web Audio API e acesso a microfone (Chrome, Edge ou Firefox recomendados)

---

## Instalação

```bash
# clonar o repositório
git clone https://github.com/DKoder57/WebViolin.git
cd WebViolin/apps/web

# instalar dependências
npm install
```

---

## Executando em desenvolvimento

```bash
npm run dev
```

A aplicação sobe por padrão em `http://localhost:5173` (porta padrão do Vite).

Ao abrir pela primeira vez, o navegador vai pedir permissão de acesso ao microfone — sem essa permissão o afinador não funciona.

---

## Build de produção

```bash
npm run build
npm run preview
```

`npm run build` gera os arquivos estáticos em `dist/`. `npm run preview` serve esse build localmente para validação antes do deploy.

---

## Lint

```bash
npm run lint
```

---

## Variáveis de ambiente

Hoje (frontend sem backend) não há variáveis de ambiente obrigatórias para rodar localmente.

Quando o backend (`apps/api`) for implementado, este documento e o `.env.example` correspondente serão atualizados com:
- URL da API (`VITE_API_URL`)
- Demais chaves necessárias para autenticação/persistência

---

## Stack confirmada

- **Frontend:** Vite + React + TypeScript
- **Estilização:** TailwindCSS (em adoção)
- **Backend:** ainda não implementado — ver roadmap no README principal

> Nota: a stack real do projeto é Vite + React, não Next.js. Documentos antigos que mencionam Next.js estão desatualizados e sendo corrigidos (ver issue #28).
