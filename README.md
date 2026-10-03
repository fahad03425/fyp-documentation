# LLM-Konnect — Engineering & Architecture Showcase

> **Privacy-Preserving Offline Financial & Operational Intelligence Platform**  
> Designed for Small and Medium Enterprises (SMEs), Community Pharmacies, and E-commerce Stores.  
> Target Hardware: Standard Consumer Workstations (4GB VRAM GPU or CPU-only).

---

## 🌟 Overview

This directory contains the standalone, high-performance web documentation and architecture showcase portal for **LLM-Konnect**. It is specifically structured to provide a comprehensive engineering demonstration of our offline-first architecture, deterministic financial computation engine, and grounded local RAG pipeline.

### ✨ Key Features of this Showcase:
1. **Executive Overview & Scope**: Full problem statement, solution paradigm (*"Code is Calculator, LLM is Narrator"*), 3-tier offline system activity flow, and target SME personas.
2. **Module Category Deep-Dive (Modules 6.1 – 6.10)**:
   - Exhaustive technical analysis for all 10 core modules.
   - **Custom high-fidelity SVG architecture & data-flow pipeline diagrams for every single module**.
   - Associated code files listed with direct linkages.
   - Algorithmic and mathematical formulation breakdowns (Z-Score, Tukey IQR, HNSW embeddings, Regex verification).
   - Real, high-resolution frontend screenshots captured directly from the live application.
   - Publication-quality Matplotlib chart figures rendered by the deterministic reporting engine.
3. **Code Documentation Category (142 Files)**:
   - Full catalog of all 82 Python backend files, 28 desktop UI modules, evaluation scripts, and formal docs.
   - Filterable by subsystem (Analytics, Anomaly, Connectors, Ingestion, Language, RAG, Reporting, Schema, Security, Desktop, Scripts, Docs).
   - Real-time instant search with keyboard shortcut `/`.
   - File inspector detailing size, docstring, exports, imports, and exact role in the pipeline.
4. **Interactive Engineering Verification Labs**:
   - **Lab 1**: *Deterministic Seam vs LLM Hallucination Verifier* (Simulates numeric claim cross-checking live).
   - **Lab 2**: *Statistical Anomaly Detector* (Interactive Z-Score and IQR outlier scanner).
   - **Lab 3**: *Multilingual Intent Router* (Tests English and Roman Urdu query dispatches).
   - **Lab 4**: *3-Year TCO & Privacy ROI Calculator* (Calculates dollar savings vs commercial cloud APIs).
5. **Requirement R14 Empirical Comparative Benchmarks**:
   - Comprehensive comparative matrix contrasting LLM-Konnect against GPT-4o-mini and Gemini-1.5-Flash.
   - 91-question standardized pharmacy POS testbed results.
   - Latency distribution percentiles (Cold start, warm P50, P90, P99).
6. **Defense & Panel Master Guide**:
   - 25+ hardest technical and architectural questions with concise quick answers and deep justifications.
   - 5-Minute Pitch Presentation Script for live product demonstrations.
7. **Modern Aesthetic & UX**:
   - Dark obsidian glassmorphic theme with crisp glowing accents.
   - High-contrast Light Mode toggle.
   - Dedicated **Presentation Mode** for widescreen projector clarity during presentations.

---

## 🚀 How to Run the Showcase

### Option 1: Direct Browser Launch (Zero Installation)
Simply double-click [`index.html`](index.html) or open it in any modern browser (Chrome, Edge, Firefox, Brave). It has **zero external build dependencies**.

### Option 2: Local HTTP Server
Run with `npx serve` or Python:
```bash
# Using npm/npx:
npx serve . -p 3000

# Or using Python:
python -m http.server 3000
```
Then visit `http://localhost:3000`.

### Option 3: Deploy to Vercel (1 Click)
Run inside this folder:
```bash
npx vercel --prod
```
The site will be live instantly with global CDN performance, just like `https://fyp-details.vercel.app/`!
