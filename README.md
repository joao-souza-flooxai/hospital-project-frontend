# Voluntários para Hospitais 🏥

Plataforma para conectar voluntários a hospitais, permitindo cadastro, candidatura a tarefas e acompanhamento de pontuação.

---

## Objetivo 🎯

Criar uma plataforma onde hospitais possam receber voluntários para ajudar em diversas tarefas.

---

## Funcionalidades ✨

### Hospitais / Admins 🏨
- Gerenciar usuários internos (admins);
- Apenas admins podem criar novos usuários com e-mail e senha;
- Login de usuários internos;
- Criar pedidos de voluntários (vagas) com título, descrição e tipo de vaga;
- Aprovar ou rejeitar candidaturas de voluntários.

### Voluntários 🙋‍♂️🙋‍♀️
- Visualizar vagas públicas (sem login);
- Cadastro na plataforma;
- Candidatar-se às vagas disponíveis;
- Acumular pontos após conclusão de tarefas.

### Auditoria & Gamificação 📊
- Registro de todas as candidaturas e ações dos admins;
- Leaderboard com ranking dos voluntários baseado na pontuação acumulada.

---

## Arquitetura do Projeto 🏗️

### Frontend ⚛️
![React](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3.5-brightgreen?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.7-blue?logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript&logoColor=white)

- **Deploy:** [Frontend Online](https://hospital-project-frontend-production.up.railway.app)
- **Estrutura:**
  src/
  ├─ components/ # Componentes reutilizáveis
  ├─ pages/ # Páginas da aplicação
  ├─ redux/ # Actions, reducers e store
  └─ App.jsx # Componente raiz

- **Scripts:**

```bash
npm run dev     # Rodar ambiente de desenvolvimento
npm run build   # Build para produção
npm run preview # Preview da build
npm run lint    # Rodar lint
