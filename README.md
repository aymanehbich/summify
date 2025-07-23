# 📄 Summify – AI-Powered Article and Text Summarization

**Summify** is a modern React.js web application that transforms how you consume content by generating intelligent, structured summaries of articles and text. Built with **TypeScript** and **Mantine UI**, it offers a seamless experience for extracting key insights from lengthy content — saving you time and boosting productivity.

---

## 🚀 Purpose

In today’s information-rich environment, **Summify** solves the problem of content overload. It provides **AI-generated summaries** that capture essential insights from any article or piece of text.

Whether you're:

- 📚 A student processing research,
- 💼 A professional staying updated, or
- 🧠 Anyone seeking quick insights,

**Summify** helps you **grasp core ideas** without reading full content.

---

## ✨ Features

- 🔗 **Dual Input**: Summarize via article URL or direct text input
- 🤖 **AI-Powered**: GPT-4o integration for intelligent summarization
- 📝 **Structured Output**: Markdown-formatted summaries with:
  - Bullet points
  - Key takeaways
  - Notable quotes
- 🌗 **Modern UI**: Built with Mantine components and clean UX
- 📱 **Mobile Ready**: Fully responsive design for all devices
- ⚡ **Optimized Performance**: Lazy loading + efficient state handling
- 📋 **Copy to Clipboard**: Quickly share URLs and summaries
- 🔔 **Real-Time UX Feedback**: Loading states & toast notifications

---

## 🛠️ Tech Stack

### 🖥️ Frontend

- **React 19** with **TypeScript**
- **Vite** – lightning-fast build & dev server
- **Mantine UI v7** – modern component library
- **Redux Toolkit** + **RTK Query** – state and API management
- **React Router v7** – seamless routing
- **React Markdown** – render structured summaries

### ⚙️ Backend & APIs

- **Flask API** (deployed on Vercel) – for article extraction
- **Azure AI Inference (OpenAI GPT-4o)** – for summarization
- **Extractus** – for article content parsing

### 🧰 Development Tools

- **TypeScript** – strong typing
- **PostCSS** – with Mantine preset
- **CSS Modules** – scoped component styling
- **Tabler Icons** – UI icons

---

## 🔧 Dependencies

### Core

- React
- Redux Toolkit
- React Router
- Mantine
- React Markdown
- Extractus

### Dev

- TypeScript
- PostCSS
- Vite
- CSS Modules
- Tabler Icons

---

## 🚀 Getting Started

### 🔍 Prerequisites

- **Node.js** `v18+`
- **Yarn** `v4.7.0+` (recommended)
- **Git**

### 🛠️ Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/summify.git
cd summify

# Install dependencies
yarn install

# Create a .env file with your keys (example below)
touch .env
```
