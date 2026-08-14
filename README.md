# 🎻 WebViolin

![TypeScript](https://img.shields.io/badge/TypeScript-72.9%25-3178C6?logo=typescript&logoColor=white)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![License](https://img.shields.io/badge/license-MIT-green)

Plataforma web de afinação e treino técnico para violinistas iniciantes. Detecta a frequência da nota tocada em tempo real, compara com a afinação correta das cordas (G, D, A, E) e acompanha a evolução do usuário através de um sistema de pontuação e ranking global.

**🔗 Demo:** _em breve_

---

## ✨ Destaques técnicos

- Detecção de pitch em tempo real direto no navegador, via **Web Audio API** — sem backend de processamento de áudio
- Referência de A4 customizável (afinação em 440Hz, 442Hz etc.)
- Arquitetura front-end **feature-based**, com estado global via **Zustand**
- Autenticação segura com **JWT** e senhas com **bcrypt**
- UI responsiva para desktop e mobile

## 🚀 Tecnologias utilizadas

### 🖥️ Front-end
- React.js + TypeScript
- Next.js (foco em SEO e estruturação profissional)
- Zustand (state management)
- Web Audio API (captura e análise de frequência)

### 🧠 Back-end
- Node.js + Express.js
- PostgreSQL (banco relacional)
- Prisma (ORM)
- JWT (autenticação) + bcrypt (hash de senha)

---

## 🎯 Funcionalidades

- 🎵 Afinador com detecção de frequência em tempo real
- 🔊 Comparação de áudio das cordas (G, D, A, E)
- 🎚️ Referência de A4 customizável
- 🏆 Sistema de pontuação e ranking global
- 📈 Histórico de progresso *(em desenvolvimento)*

---

## 📦 Estrutura do projeto

webviolin/
├── apps/
│ ├── web/ → FRONT-END (Next.js)
│ └── api/ → BACK-END (Node + Express)
├── docs/
├── .gitignore
├── README.md

---

## ⚙️ Objetivo do projeto

Construir uma aplicação full-stack completa com foco em:

- Arquitetura profissional e código organizado
- Integração real entre front-end e back-end
- Processamento de áudio no navegador (sem libs externas de DSP)
- Sistema de pontuação com banco relacional

---

## 📌 Status

🚧 Em desenvolvimento.
