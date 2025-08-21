# TradingAI

A full-stack cryptocurrency platform offering price tracking, AI-driven market signals, news aggregation, and simulated trading—all built with Next.js, Prisma, TypeScript, Clerk, Socket.io, Redux, Zustand, React Query, UploadThing, Shadcn, and the OpenRouter API.

[**Live Demo**](https://tradingaiapp.netlify.app)

---

##  Table of Contents

- [Introduction](#introduction)  
- [Features](#features)  
- [Live Demo & Repository](#live-demo--repository)  
- [Installation](#installation)  
- [Project Overview](#project-overview)  
- [Technologies](#technologies)  
- [Contributing](#contributing)  
- [License](#license)

---

## Introduction

TradingAI is a modern, interactive platform designed to help users explore the world of cryptocurrency through real-time price tracking, simulated trades, AI-based market predictions, educational content, and aggregated news—all within one cohesive interface.

---

## Features

- **Landing Page**: Offers insight into the project’s purpose and capabilities.
- **Blog & News Section**:  
  - Browse and read the latest in crypto through categorized blogs.  
  - Search blog posts by title, view details, like/dislike, comment, share, and write new posts (for authenticated users).
- **Simulated Trading**:  
  - Practice trading with a demo interface featuring chart views, symbol selection, order types, leverage, stop-loss & take-profit.  
  - View active trades and history. Modify orders or close open trades on the fly.
- **Educational Hub**: Explore learning modules on:  
  - **Beginner Trading**  
  - **Markets Overview**  
  - **Web3 Fundamentals**  
  - **Technical Analysis**  
  - **Indicators & Quizzes** to test your knowledge.
- **AI-Powered Signals**: Generate trading signals (entry price, take-profit, stop-loss, confidence score) using AI based on chosen asset, time range, and candle count.
- **Market Price Watch**: View live prices for crypto, forex, and stocks in organized categories (e.g., `crypto/prices`, `forex/all-pairs`, `stock/prices`).
- **About Page**: Learn about the project’s vision and contributors.
- **User Dashboard**:  
  - Displays total profit, number of trades, and success rate.  
  - Shows 6-month performance charts.  
  - Includes subscription details, traded assets sorted by frequency, and transaction history.
- **Additional Utilities**:  
  - Edit profile and privacy settings.  
  - Manage blog creations, edits, likes/dislikes.  
  - Handle subscriptions and comments within a unified user interface.

---

## Live Demo & Repository

- **Live Preview**: [tradingaiapp.netlify.app](https://tradingaiapp.netlify.app)  
- **Source Code**: [GitHub Repository](https://github.com/Navidreza80/TradingAI)

---

| Section         | Route                                                                      |
| --------------- | -------------------------------------------------------------------------- |
| Landing Page    | `/`                                                                        |
| Blog & News     | `/news/blogs`, `/blogs/[id]`                                               |
| Trade Simulator | `/trade`                                                                   |
| Education       | `/education/beginner`, `/markets`, `/web3`, `/technical`, `/indicators`    |
| AI Signals      | `/signal/ai-generator`                                                     |
| Market Prices   | `/market/crypto/prices`, `/market/forex/all-pairs`, `/market/stock/prices` |
| About           | `/about`                                                                   |
| Dashboard       | `/dashboard`, with sub-routes for profile, blogs, subscriptions, comments  |


## Technologies

Framework: Next.js

Backend / ORM: Prisma (with PostgreSQL)

Frontend UI: Tailwind CSS, Shadcn components

State Management: Redux Toolkit, Zustand, React Query

Authentication: Clerk

AI Integration: OpenRouter API

Real-time Communication: Socket.io

Media Uploads: UploadThing

Language: TypeScript

## Contributing

Contributions are always welcome!

Fork the repository

Create a new branch (git checkout -b feature/my-feature)

Make your changes and commit (git commit -m "Add feature")

Push to your branch (git push origin feature/my-feature)

Open a pull request detailing your changes

## Installation

To run TradingAI locally:

```bash
    # Clone the repository
    git clone https://github.com/Navidreza80/TradingAI.git
    cd TradingAI
    
    # Install dependencies
    npm install
    
    # Run in development mode
    npm run dev
    
    # Open in browser
    http://localhost:3000


