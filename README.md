<div align="center">
  <h1>🎮 GameScout AI</h1>
  <p><strong>Next-Gen Video Game Discovery Powered by Groq</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/Groq-F55036?style=for-the-badge&logo=groq&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  </p>
</div>

---

## 📖 Overview

GameScout AI is an intelligent recommendation engine that cuts through the noise of massive game libraries. By leveraging the ultra-fast LPU inference of **Groq**, it analyzes user preferences, genre affinities, and playstyles to deliver instant, hyper-relevant gaming suggestions.

## ✨ Key Features

* **Lightning-Fast Recommendations:** Powered by Llama 3 on Groq, providing near-instant responses compared to traditional LLM providers.
* **Deep Persona Analysis:** Beyond simple genre tags, GameScout understands the "vibe"—matching games based on mood, mechanics, and narrative depth.
* **Semantic Search:** Users can describe what they want in natural language (e.g., *"A cozy farming sim but with a dark cosmic horror twist"*) and get accurate results.
* **Responsive Discovery:** A mobile-first UI designed for quick browsing and exploration.

## 🛠️ Technical Deep Dive

### 1. High-Speed Inference with Groq
The project utilizes the Groq Cloud API to handle complex natural language processing. By using **Llama 3 70B**, GameScout achieves sub-second latency, making the "recommendation" feel as fast as a local database query.

### 2. Prompt Architecture
The system uses a sophisticated few-shot prompting strategy to ensure that the AI doesn't just name games, but explains *why* a specific title fits the user's request, referencing specific game mechanics and community ratings.

### 3. Modern Frontend Stack
- **Framework:** Next.js (App Router) for optimized rendering.
- **Styling:** Framer Motion for smooth transitions and a "gaming" aesthetic.
- **Persistence:** LocalStorage for saving user "Scouts" and preference history.
