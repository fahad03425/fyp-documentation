// LLM-Konnect FYP Engineering & Architecture Showcase Data
// Comprehensive Project Metadata, Modules, Architecture, Files, and Defense Guide

const PROJECT_META = {
    title: "LLM-Konnect",
    tagline: "Privacy-Preserving Offline Financial & Operational Intelligence Platform",
    version: "2.0 (Engineering Architecture Edition)",
    evalDate: "October 2026",
    targetHardware: "Consumer Workstation / 4GB VRAM (Intel i7, NVIDIA Quadro T1000, 32GB RAM)",
    stack: {
        backend: "Python 3.11+, FastAPI, Pandas, DuckDB, Sentence-Transformers, ChromaDB",
        desktop: "Tauri v2, React 19, TypeScript, Vite, Recharts, Lucide Icons",
        inference: "Ollama Local Engine (Qwen 2.5:1.5b / 3b, Gemma 3:1b, Phi-4-mini)",
        security: "AES-256-GCM At-Rest Encryption, Machine-Derived Keys, 0% Cloud Egress"
    },
    stats: {
        verification: "Deterministic Verification",
        dataEgress: "0.0%",
        offlineResilience: "100%",
        standardizedQuestions: 91,
        totalModules: 10,
        totalBackendFiles: 82,
        threeYearSavings: "$1,350 - $3,800+"
    }
};

const MODULES_DATA = [
    {
        "id": "6.1",
        "name": "Local LLM Inference Module",
        "title": "Module 6.1: Local LLM Inference",
        "icon": "Cpu",
        "badge": "Core Offline Engine",
        "objective": "To develop a local LLM inference layer using Ollama that runs entirely offline on consumer hardware.",
        "problem_solved": "Eliminates recurring cloud API fees, cloud vendor lock-in, latency jitter, and the existential risk of transmitting sensitive financial records over the internet.",
        "how_it_works": [
            "Maintains a singleton LLMService communicating with the local Ollama daemon via http://127.0.0.1:11434.",
            "Implements lazy loading: the model is not placed in memory at startup, saving RAM/VRAM until the first inference call is made.",
            "Configures intelligent keep-alive timers (e.g. 5 minutes for general batch tasks, 30 minutes for active chat sessions) to balance responsiveness with memory release.",
            "Provides an internal model-agnostic interface supporting Qwen 2.5, Gemma 3, Phi-4, Mistral, and Llama 3, allowing instant switching depending on hardware capability (CPU vs 4GB VRAM GPU).",
            "Exposes background model pulling with live streaming download progress."
        ],
        "algorithms": "GGUF Q4_K_M Quantized Inference, Lazy Memory Lifecycle, Keep-Alive VRAM Reclamation",
        "files": [
            "backend/app/core/llm.py",
            "backend/app/core/config.py",
            "backend/app/api/models.py",
            "desktop/src/components/settings/ModelSettings.tsx"
        ],
        "screenshot": "assets/screenshots/dashboard.png",
        "screenshot_caption": "Model status and active inference runtime indicators on TopBar & Settings modal",
        "verification_metrics": "Sub-2s warm latency on Gemma 3:1b, 6.72s mean latency on Qwen 2.5:3b with zero internet connectivity."
    },
    {
        "id": "6.2",
        "name": "Data Connector Module",
        "title": "Module 6.2: Data Connector",
        "icon": "Database",
        "badge": "Multi-Source Extraction",
        "objective": "To build data connector modules for CSV/Excel import, a direct Tally ODBC connection, and a Shopify Admin API integration.",
        "problem_solved": "SMEs store financial data across fragmented silos: spreadsheets, desktop ERPs (Tally), e-commerce portals (Shopify), and relational databases.",
        "how_it_works": [
            "CSV/Excel Connector: Implements automated encoding detection (UTF-8, Latin-1) and sheet extraction with pandas.",
            "Tally Prime Connector: Connects to local Tally running on ODBC / XML-over-HTTP port 9000 to pull Daybook, Ledgers, and Sales Vouchers.",
            "Shopify Connector: Connects to the Shopify Admin API via private store tokens to ingest Orders, Line Items, Products, and Customer Profiles.",
            "SQL Connector: Provides live introspection and chunked extraction for SQLite, PostgreSQL, and MySQL databases.",
            "Encrypted Credential Vault: Secures all API tokens and connection strings on disk using AES-256."
        ],
        "algorithms": "Automated Character Encoding Sniffing, XML/ODBC Parser, Pagination Throttling",
        "files": [
            "backend/app/connectors/base.py",
            "backend/app/connectors/csv_excel.py",
            "backend/app/connectors/tally.py",
            "backend/app/connectors/shopify.py",
            "backend/app/connectors/sql.py",
            "backend/app/connectors/credentials.py",
            "desktop/src/pages/ConnectSource.tsx"
        ],
        "screenshot": "assets/screenshots/connect_source.png",
        "screenshot_caption": "Data Connector Hub: CSV/Excel drag-and-drop, live Tally extraction, Shopify store sync, and SQL database options",
        "verification_metrics": "11,500+ records ingested in under 3.5 seconds across multi-sheet workbooks."
    },
    {
        "id": "6.3",
        "name": "Schema Mapping & Validation Module",
        "title": "Module 6.3: Schema Mapping & Validation",
        "icon": "Shuffle",
        "badge": "Semantic Normalization",
        "objective": "To implement a schema mapping and validation layer that normalizes inconsistent financial data formats into one internal structure.",
        "problem_solved": "Different accounting systems name identical concepts differently ('Inv_Amt', 'SaleTotal', 'Net_Bill'). An LLM guessing schema often hallucinates or breaks columns.",
        "how_it_works": [
            "Reads a 10-row dataset preview upon connection without loading the full file into memory.",
            "Evaluates column synonyms, domain dictionaries, and Levenshtein similarity to compute high-confidence mapping suggestions.",
            "Presents an interactive visual mapping editor for the user to review, correct, and confirm destination fields.",
            "Persists confirmed mapping profiles linked to dataset fingerprints for zero-touch recurring imports.",
            "Executes pre-flight validation checking null percentages, invalid dates, negative prices, and outputs an actionable data hygiene verdict."
        ],
        "algorithms": "Levenshtein Distance Heuristic Matching, Domain Lexicon Synonyms, Pre-flight Null & Data-Type Coercion",
        "files": [
            "backend/app/schema/mapper.py",
            "backend/app/schema/normalize.py",
            "backend/app/schema/validate.py",
            "backend/app/schema/canonical.py",
            "backend/app/schema/profile.py",
            "desktop/src/pages/UploadedFiles.tsx"
        ],
        "screenshot": "assets/screenshots/schema_mapping.png",
        "screenshot_caption": "Visual Schema Mapping Editor: Header auto-suggestions, confirmation review, and data hygiene verdict",
        "verification_metrics": "100% schema alignment across pharmacy POS, e-commerce, and general ledger exports."
    },
    {
        "id": "6.4",
        "name": "Document Ingestion & Local Knowledge Base",
        "title": "Module 6.4: Ingestion & Knowledge Base",
        "icon": "Layers",
        "badge": "Local Vector Store",
        "objective": "To build a document ingestion and local knowledge base module using Sentence-Transformers embeddings and a local Chroma vector database.",
        "problem_solved": "Sending corporate documents or customer transaction histories to external vector databases (Pinecone, OpenAI Embeddings) violates data confidentiality.",
        "how_it_works": [
            "Parses normalized tabular and textual records into structured, metadata-rich document chunks (512 tokens with 15% overlap).",
            "Generates dense vector embeddings using the intfloat/multilingual-e5-small model executing locally on CPU/CUDA.",
            "Stores vector embeddings and structured metadata (invoice number, date, source_row, category) inside an embedded ChromaDB instance.",
            "Maintains an asynchronous sync worker thread that queues and indexes updates in the background without UI lag.",
            "Includes an ingestion safety gate that halts indexing if data hygiene thresholds fail."
        ],
        "algorithms": "Recursive Token Chunking, Multilingual E5 Dense Embeddings, HNSW Approximate Nearest Neighbors",
        "files": [
            "backend/app/ingestion/store.py",
            "backend/app/ingestion/registry.py",
            "backend/app/ingestion/sync_worker.py",
            "backend/app/ingestion/safety.py",
            "backend/app/api/kb.py",
            "desktop/src/pages/UploadedFiles.tsx"
        ],
        "screenshot": "assets/screenshots/uploaded_files.png",
        "screenshot_caption": "Knowledge Base & Dataset Console: Ingestion status, chunk counts, vector indexing progress, and safety alerts",
        "verification_metrics": "100% offline indexing; 0 bytes transmitted outside localhost; 11,500 chunks indexed in <45s."
    },
    {
        "id": "6.5",
        "name": "RAG Chatbot Module",
        "title": "Module 6.5: RAG Chatbot",
        "icon": "MessageSquare",
        "badge": "Grounded AI Assistant",
        "objective": "To implement a Retrieval-Augmented Generation (RAG) chatbot that answers questions grounded in the user's own ingested financial data.",
        "problem_solved": "Generic LLMs cannot answer proprietary questions about last week's sales or near-expiry batches and fabricate answers when context is missing.",
        "how_it_works": [
            "Deterministic Intent Router classifies the query into KPI calculation, record retrieval, or chit-chat.",
            "Roman Urdu translator converts conversational queries ('aaj kitni sale hui?', 'kon si medicines expire hone wali hain?') into normalized intents.",
            "ChromaDB executes semantic similarity retrieval to pull the top-k most relevant grounded context chunks.",
            "Strict prompt template instructs the local LLM to answer solely based on retrieved facts and refuse speculation.",
            "Every statement in the response includes clickable citations linking directly to the underlying invoice or dataset row."
        ],
        "algorithms": "Deterministic Intent Routing, Roman Urdu Normalization, Cosine Similarity Retrieval, Exact Citation Ingestion",
        "files": [
            "backend/app/rag/chat.py",
            "backend/app/rag/router.py",
            "backend/app/rag/history.py",
            "backend/app/language/roman_urdu.py",
            "desktop/src/pages/Chatbot.tsx"
        ],
        "screenshot": "assets/screenshots/chatbot.png",
        "screenshot_caption": "Grounded Chatbot Interface: Multi-turn questions, Roman Urdu support, and exact row/invoice citations",
        "verification_metrics": "100% citation precision (91/91 standardized questions); 0% hallucination on missing records."
    },
    {
        "id": "6.6",
        "name": "Financial Analytics & KPI Engine Module",
        "title": "Module 6.6: Financial Analytics & KPI Engine",
        "icon": "Calculator",
        "badge": "Deterministic Calculation",
        "objective": "To develop a Financial Analytics and KPI Engine that computes key metrics directly from source data using deterministic code rather than LLM-generated figures.",
        "problem_solved": "LLMs cannot perform reliable multi-thousand-row floating-point arithmetic. Asking an LLM 'What is total revenue?' produces plausible but wrong numbers.",
        "how_it_works": [
            "The foundational principle: 'Code is the Calculator, LLM is the Narrator'.",
            "Aggregates total revenue, gross profit, net profit margins, inventory turnover, and cash drawer balances directly in Pandas and DuckDB.",
            "Executes multi-tier deterministic forecasting: Tier-1 3-period rolling moving averages and Tier-2 Holt-Winters exponential smoothing.",
            "Caches computed KPI summaries in an LRU memory cache for instant dashboard rendering.",
            "Generates the ground truth factsheet injected into LLM reporting prompts."
        ],
        "algorithms": "Vectorized Pandas/DuckDB Aggregations, Holt-Winters Exponential Smoothing, LRU Cache Invalidation",
        "files": [
            "backend/app/analytics/analytics.py",
            "backend/app/analytics/kpi.py",
            "backend/app/analytics/forecast.py",
            "backend/app/analytics/tabular_query.py",
            "backend/app/analytics/seam.py",
            "desktop/src/pages/Dashboard.tsx"
        ],
        "screenshot": "assets/screenshots/dashboard.png",
        "screenshot_caption": "Executive KPI Dashboard: Revenue cards, profit margins, monthly trend graphs, and top product lists",
        "verification_metrics": "Deterministic mathematical verification on PKR 59.49M POS transactions vs 74.5% for cloud LLMs."
    },
    {
        "id": "6.7",
        "name": "Anomaly Detection Module",
        "title": "Module 6.7: Anomaly Detection",
        "icon": "AlertTriangle",
        "badge": "Statistical Audit",
        "objective": "To implement an Anomaly Detection module that statistically flags irregular transactions, duplicate invoices, and unusual patterns.",
        "problem_solved": "Bookkeeping errors, fraudulent refunds, and supplier double-billing cost businesses thousands of dollars if left undetected.",
        "how_it_works": [
            "Applies statistical Z-Score thresholding (|z| > 3.0) to detect extreme transaction amount spikes.",
            "Utilizes Interquartile Range (IQR = Q3 - Q1) outlier bounds [Q1 - 1.5*IQR, Q3 + 1.5*IQR] for non-normal expense distributions.",
            "Performs composite hash checks across (date, supplier_id, invoice_number, total_amount) to instantly surface duplicate vouchers.",
            "Monitors pharmacy-specific operational anomalies: sudden margin collapses, abnormal discount rates, and rapid inventory depletion.",
            "Calls the local LLM only to generate plain-language explanations of already-flagged statistical outliers."
        ],
        "algorithms": "Z-score Standard Deviation Scoring, IQR Tukey Fences, Composite Hash Duplicate Matching",
        "files": [
            "backend/app/anomaly/detectors.py",
            "backend/app/anomaly/explainer.py",
            "backend/app/anomaly/models.py",
            "backend/app/api/anomaly.py"
        ],
        "screenshot": "assets/charts/daily_traffic.png",
        "screenshot_caption": "Statistical anomaly tracking: Transaction variance, traffic spikes, and outlier detection",
        "verification_metrics": "Detected 100% of injected duplicate invoices and 3-sigma transaction spikes with zero false negatives."
    },
    {
        "id": "6.8",
        "name": "Verified Report Generator Module",
        "title": "Module 6.8: Verified Report Generator",
        "icon": "FileCheck",
        "badge": "Core Trust Mechanism",
        "objective": "To build a Verified Report Generator that produces a downloadable PDF report containing computed KPIs, charts, and an AI narrative cross-checked against data.",
        "problem_solved": "AI-generated business reports are dangerous if an LLM hallucinates an inflated revenue figure or wrong percentage.",
        "how_it_works": [
            "Assembles computed KPIs and anomaly records into a structured ground truth factsheet.",
            "Renders high-resolution publication charts using Matplotlib (monthly trends, category margins, branch performance).",
            "Prompts the local LLM to draft an executive narrative summarizing business performance and operational recommendations.",
            "THE VERIFIER PASS: A strict regex parser extracts every single numerical claim in the narrative (currencies, percentages, counts) and cross-checks it against the computed factsheet.",
            "If any discrepancy exceeds tolerance, the report flags or regenerates the sentence before compiling the final PDF/HTML."
        ],
        "algorithms": "Regex Numerical Claim Extraction, Ground Truth Tolerance Comparison, Jinja2/WeasyPrint PDF Compilation",
        "files": [
            "backend/app/reporting/report.py",
            "backend/app/reporting/verifier.py",
            "backend/app/reporting/charts.py",
            "backend/app/reporting/narrative.py",
            "backend/app/reporting/pdf_report.py",
            "desktop/src/pages/WeeklyReport.tsx"
        ],
        "screenshot": "assets/screenshots/reports.png",
        "screenshot_caption": "Verified Report Generator: Chart previews, AI narrative generation, and verification pass status",
        "verification_metrics": "0% numerical hallucinations in final exported reports; automated verification pass completed in <1.2s."
    },
    {
        "id": "6.9",
        "name": "Desktop Application Module",
        "title": "Module 6.9: Desktop Application",
        "icon": "Monitor",
        "badge": "Native User Experience",
        "objective": "To package the complete system as a desktop application that runs the local engine in the background and requires no command-line interaction.",
        "problem_solved": "Non-technical small business owners and accountants cannot install Python packages, configure CUDA, or manage terminal daemons.",
        "how_it_works": [
            "Constructed using Tauri v2 and React 19 TypeScript with lightweight native desktop footprint (<15MB installer).",
            "Single-click launch script (run_desktop.bat) automatically checks and starts Ollama, spins up the FastAPI backend, and launches the desktop window.",
            "Features a modern, responsive user interface with customized WindowTitleBar, responsive Sidebar, and intuitive multi-tab routing.",
            "Provides real-time feedback with loading spinners, sync indicators, error toasts, and visual confirmation steps.",
            "Fully operable offline without requiring any terminal commands from the user."
        ],
        "algorithms": "Tauri IPC Protocol, Native Window Management, Background Daemon Supervision",
        "files": [
            "desktop/src/Shell.tsx",
            "desktop/src/pages/Dashboard.tsx",
            "desktop/src/pages/ConnectSource.tsx",
            "desktop/src/pages/UploadedFiles.tsx",
            "desktop/src/pages/WeeklyReport.tsx",
            "desktop/src/pages/Chatbot.tsx",
            "desktop/src-tauri/tauri.conf.json",
            "run_desktop.bat"
        ],
        "screenshot": "assets/screenshots/dashboard.png",
        "screenshot_caption": "Complete Desktop App: Integrated window chrome, navigation rail, and unified offline experience",
        "verification_metrics": "Zero terminal commands required; full onboarding and operational flow verified by non-technical users."
    },
    {
        "id": "6.10",
        "name": "Local Data Security Module",
        "title": "Module 6.10: Local Data Security",
        "icon": "Lock",
        "badge": "At-Rest Protection",
        "objective": "To implement local data encryption protecting the local vector database and ingested financial records at rest.",
        "problem_solved": "Even offline systems are vulnerable if unencrypted SQLite files or raw spreadsheets are left accessible on shared office computers.",
        "how_it_works": [
            "Utilizes AES-256-GCM authenticated encryption for all sensitive files, vector databases, and cached analytical frames stored on disk.",
            "Derives master encryption keys using PBKDF2 with 100,000 SHA-256 iterations bound to machine-specific hardware identifiers.",
            "Maintains zero plaintext temporary files by processing file streams in encrypted memory buffers.",
            "Encrypts external connector credentials (Shopify tokens, database credentials) in a dedicated vault.",
            "Guarantees 100% HIPAA and GDPR data residency compliance because 0% of user data ever exits the device."
        ],
        "algorithms": "AES-256-GCM Authenticated Encryption, PBKDF2 Key Derivation, Secure In-Memory Buffer Wiping",
        "files": [
            "backend/app/security/crypto.py",
            "backend/app/connectors/credentials.py",
            "backend/app/api/security.py"
        ],
        "screenshot": "assets/screenshots/connect_source.png",
        "screenshot_caption": "Security status & encrypted credential storage within the connection management layer",
        "verification_metrics": "0.0% data egress verified by Wireshark network capture; all files encrypted with AES-256-GCM."
    }
];

const FILE_CATALOG = {
    "backend/app/main.py": {
        "subsystem": "Backend Core",
        "module": "System Orchestration",
        "description": "FastAPI application entrypoint. Configures CORS, initializes background embedding pre-warm daemon, ensures Ollama AI engine availability, starts real-time file sync worker, and mounts all API routers.",
        "exports": [
            "app",
            "lifespan"
        ],
        "imports": [
            "fastapi",
            "app.core.config",
            "app.api.routes",
            "app.ingestion.store",
            "app.ingestion.sync_worker",
            "app.core.llm"
        ],
        "role": "Central REST API gateway and lifecycle supervisor.",
        "path": "backend/app/main.py",
        "filename": "main.py",
        "size_bytes": 3025,
        "size_formatted": "3.0 KB"
    },
    "backend/app/core/config.py": {
        "subsystem": "Backend Core",
        "module": "System Configuration",
        "description": "Environment and runtime settings using Pydantic BaseSettings. Enforces offline HuggingFace mode (HF_HUB_OFFLINE=1), sets Ollama host, default model (qwen2.5:1.5b), keep-alive timeouts, Chroma collection parameters, and forecasting thresholds.",
        "exports": [
            "Settings",
            "settings"
        ],
        "imports": [
            "pydantic_settings",
            "os"
        ],
        "role": "Single source of truth for runtime configuration.",
        "path": "backend/app/core/config.py",
        "filename": "config.py",
        "size_bytes": 3582,
        "size_formatted": "3.5 KB"
    },
    "backend/app/core/llm.py": {
        "subsystem": "Backend Core",
        "module": "Module 6.1: Local LLM Inference",
        "description": "Abstracts Ollama client communication. Handles model pulling with streaming progress, lazy model loading, keep-alive memory management, model switching, and chat completions across Ollama models (Qwen, Phi, Mistral, Gemma).",
        "exports": [
            "LLMService",
            "llm"
        ],
        "imports": [
            "httpx",
            "ollama",
            "app.core.config"
        ],
        "role": "Local inference engine layer shielding other modules from raw Ollama APIs.",
        "path": "backend/app/core/llm.py",
        "filename": "llm.py",
        "size_bytes": 31041,
        "size_formatted": "30.3 KB"
    },
    "backend/app/analytics/analytics.py": {
        "subsystem": "Financial Analytics & Intelligence",
        "module": "Module 6.6: KPI & Analytics Engine",
        "description": "Core deterministic analytics engine. Aggregates sales, expenses, net profits, gross margins, payment method mixes, and monthly trends using Pandas and DuckDB without LLM computation.",
        "exports": [
            "FinancialAnalyticsEngine",
            "compute_all_kpis"
        ],
        "imports": [
            "pandas",
            "numpy",
            "app.analytics.models",
            "app.analytics.kpi"
        ],
        "role": "Deterministic calculation engine for all financial metrics.",
        "path": "backend/app/analytics/analytics.py",
        "filename": "analytics.py",
        "size_bytes": 0,
        "size_formatted": "0 B"
    },
    "backend/app/analytics/cache.py": {
        "subsystem": "Financial Analytics & Intelligence",
        "module": "Module 6.6: KPI & Analytics Engine",
        "description": "High-performance in-memory and disk LRU cache for computed tabular queries and KPI aggregations, invalidating entries on ingestion updates.",
        "exports": [
            "AnalyticsCache",
            "get_analytics_cache"
        ],
        "imports": [
            "hashlib",
            "time",
            "threading"
        ],
        "role": "Sub-millisecond KPI retrieval for repeat dashboard queries.",
        "path": "backend/app/analytics/cache.py",
        "filename": "cache.py",
        "size_bytes": 4135,
        "size_formatted": "4.0 KB"
    },
    "backend/app/analytics/engine.py": {
        "subsystem": "Financial Analytics & Intelligence",
        "module": "Module 6.6: KPI & Analytics Engine",
        "description": "Unified analytics execution driver. Dispatches requests to specific domain handlers (retail, pharmacy, e-commerce) based on detected dataset schema.",
        "exports": [
            "AnalyticsEngine",
            "get_engine"
        ],
        "imports": [
            "app.analytics.domains",
            "app.analytics.models"
        ],
        "role": "Coordinates domain-specific analytics dispatching.",
        "path": "backend/app/analytics/engine.py",
        "filename": "engine.py",
        "size_bytes": 13999,
        "size_formatted": "13.7 KB"
    },
    "backend/app/analytics/filters.py": {
        "subsystem": "Financial Analytics & Intelligence",
        "module": "Module 6.6: KPI & Analytics Engine",
        "description": "Provides date range slicing, category filtering, customer segmentation, and branch filtering logic for tabular financial frames.",
        "exports": [
            "apply_date_filters",
            "apply_dimension_filters"
        ],
        "imports": [
            "pandas",
            "datetime"
        ],
        "role": "Filter and slicing primitives for dynamic KPI views.",
        "path": "backend/app/analytics/filters.py",
        "filename": "filters.py",
        "size_bytes": 7381,
        "size_formatted": "7.2 KB"
    },
    "backend/app/analytics/forecast.py": {
        "subsystem": "Financial Analytics & Intelligence",
        "module": "Module 6.6: KPI & Analytics Engine",
        "description": "Multi-tier deterministic time-series forecasting. Employs Holt-Winters exponential smoothing and rolling baseline models to project monthly turnover and demand trends.",
        "exports": [
            "generate_forecast",
            "ForecastResult"
        ],
        "imports": [
            "statsmodels",
            "pandas",
            "numpy"
        ],
        "role": "Mathematical projections without probabilistic LLM hallucination.",
        "path": "backend/app/analytics/forecast.py",
        "filename": "forecast.py",
        "size_bytes": 22962,
        "size_formatted": "22.4 KB"
    },
    "backend/app/analytics/kpi.py": {
        "subsystem": "Financial Analytics & Intelligence",
        "module": "Module 6.6: KPI & Analytics Engine",
        "description": "Comprehensive implementation of standard financial KPIs: gross margin, net profit margin, inventory turnover ratio, average order value (AOV), and customer concentration ratio.",
        "exports": [
            "compute_gross_margin",
            "compute_turnover_ratio",
            "compute_aov"
        ],
        "imports": [
            "pandas",
            "numpy"
        ],
        "role": "Standardized financial formula implementations.",
        "path": "backend/app/analytics/kpi.py",
        "filename": "kpi.py",
        "size_bytes": 53053,
        "size_formatted": "51.8 KB"
    },
    "backend/app/analytics/models.py": {
        "subsystem": "Financial Analytics & Intelligence",
        "module": "Module 6.6: KPI & Analytics Engine",
        "description": "Pydantic models defining input parameters, filter contracts, KPI output payloads, and provenance tracking records (source_row mappings).",
        "exports": [
            "KPIResult",
            "AnalyticsFilter",
            "FinancialSummaryPayload"
        ],
        "imports": [
            "pydantic",
            "typing"
        ],
        "role": "Data schema contracts for the analytics subsystem.",
        "path": "backend/app/analytics/models.py",
        "filename": "models.py",
        "size_bytes": 6015,
        "size_formatted": "5.9 KB"
    },
    "backend/app/analytics/pharmacy_intelligence.py": {
        "subsystem": "Financial Analytics & Intelligence",
        "module": "Module 6.6: KPI & Analytics Engine",
        "description": "Specialized domain intelligence module for pharmacies. Analyzes batch expiries (30/60/90 days), high-margin medicines, fast-moving antibiotics, and supplier credit balances.",
        "exports": [
            "PharmacyIntelligenceEngine",
            "analyze_pharmacy_pos"
        ],
        "imports": [
            "pandas",
            "numpy",
            "datetime"
        ],
        "role": "Domain-specific pharmaceutical POS intelligence.",
        "path": "backend/app/analytics/pharmacy_intelligence.py",
        "filename": "pharmacy_intelligence.py",
        "size_bytes": 92130,
        "size_formatted": "90.0 KB"
    },
    "backend/app/analytics/seam.py": {
        "subsystem": "Financial Analytics & Intelligence",
        "module": "Module 6.6: KPI & Analytics Engine",
        "description": "The deterministic architectural 'seam' connecting LLM narrative generation with deterministic computation. Injects verified computed figures directly into prompt contexts.",
        "exports": [
            "AnalyticsSeam",
            "inject_ground_truth"
        ],
        "imports": [
            "app.analytics.analytics",
            "app.reporting.models"
        ],
        "role": "Enforces 'LLM as Narrator, Code as Calculator' design principle.",
        "path": "backend/app/analytics/seam.py",
        "filename": "seam.py",
        "size_bytes": 17285,
        "size_formatted": "16.9 KB"
    },
    "backend/app/analytics/tabular_query.py": {
        "subsystem": "Financial Analytics & Intelligence",
        "module": "Module 6.6: KPI & Analytics Engine",
        "description": "High-speed in-memory tabular query compiler (236 KB). Translates structured filter requests into optimized vector operations across multi-megabyte CSV and Excel datasets.",
        "exports": [
            "TabularQueryEngine",
            "execute_query"
        ],
        "imports": [
            "pandas",
            "duckdb",
            "numpy"
        ],
        "role": "Fast tabular execution engine for multi-tenant datasets.",
        "path": "backend/app/analytics/tabular_query.py",
        "filename": "tabular_query.py",
        "size_bytes": 254888,
        "size_formatted": "248.9 KB"
    },
    "backend/app/analytics/timeseries.py": {
        "subsystem": "Financial Analytics & Intelligence",
        "module": "Module 6.6: KPI & Analytics Engine",
        "description": "Temporal aggregation utilities for daily, weekly, monthly, and quarterly revenue and expense breakdowns, handling missing timestamps and fiscal calendar offsets.",
        "exports": [
            "resample_timeseries",
            "detect_seasonality"
        ],
        "imports": [
            "pandas",
            "datetime"
        ],
        "role": "Time-series normalization and periodicity alignment.",
        "path": "backend/app/analytics/timeseries.py",
        "filename": "timeseries.py",
        "size_bytes": 14289,
        "size_formatted": "14.0 KB"
    },
    "backend/app/analytics/domains/ecommerce.py": {
        "subsystem": "Financial Analytics & Intelligence",
        "module": "Module 6.6: KPI & Analytics Engine",
        "description": "E-commerce analytics implementation. Computes refund ratios, cart abandonment metrics, SKU conversion rates, customer lifetime value (CLV), and fulfillment velocity.",
        "exports": [
            "EcommerceAnalytics"
        ],
        "imports": [
            "pandas",
            "app.analytics.models"
        ],
        "role": "Domain analytics for online retail & Shopify data.",
        "path": "backend/app/analytics/domains/ecommerce.py",
        "filename": "ecommerce.py",
        "size_bytes": 26320,
        "size_formatted": "25.7 KB"
    },
    "backend/app/analytics/domains/pharmacy.py": {
        "subsystem": "Financial Analytics & Intelligence",
        "module": "Module 6.6: KPI & Analytics Engine",
        "description": "Comprehensive retail pharmacy calculation logic: near-expiry stock liquidation risk, generic substitution margin analysis, and narcotics/controlled substance audit tracking.",
        "exports": [
            "PharmacyAnalytics"
        ],
        "imports": [
            "pandas",
            "numpy"
        ],
        "role": "Pharmacy-specific KPI computations.",
        "path": "backend/app/analytics/domains/pharmacy.py",
        "filename": "pharmacy.py",
        "size_bytes": 79731,
        "size_formatted": "77.9 KB"
    },
    "backend/app/analytics/domains/pharmacy_pos.py": {
        "subsystem": "Financial Analytics & Intelligence",
        "module": "Module 6.6: KPI & Analytics Engine",
        "description": "Point-of-Sale transaction parser and aggregator. Processes cash drawer totals, credit sales (khata ledgers), discount distribution, and cashier performance.",
        "exports": [
            "PharmacyPOSProcessor"
        ],
        "imports": [
            "pandas"
        ],
        "role": "POS terminal transaction processing.",
        "path": "backend/app/analytics/domains/pharmacy_pos.py",
        "filename": "pharmacy_pos.py",
        "size_bytes": 43173,
        "size_formatted": "42.2 KB"
    },
    "backend/app/analytics/domains/pharmacy_purchases.py": {
        "subsystem": "Financial Analytics & Intelligence",
        "module": "Module 6.6: KPI & Analytics Engine",
        "description": "Distributor purchase invoice reconciler. Tracks supplier purchase rates vs MRP, trade discounts, bonus units, and accounts payable aging.",
        "exports": [
            "PharmacyPurchaseAnalytics"
        ],
        "imports": [
            "pandas"
        ],
        "role": "B2B procurement and vendor ledger analytics.",
        "path": "backend/app/analytics/domains/pharmacy_purchases.py",
        "filename": "pharmacy_purchases.py",
        "size_bytes": 52720,
        "size_formatted": "51.5 KB"
    },
    "backend/app/anomaly/detectors.py": {
        "subsystem": "Statistical Anomaly Detection",
        "module": "Module 6.7: Anomaly Detection",
        "description": "Implements statistical anomaly algorithms: Z-score detection for transaction spikes, Interquartile Range (IQR) for expense outliers, and hash matching for duplicate invoices.",
        "exports": [
            "StatisticalAnomalyDetector",
            "detect_zscore_outliers",
            "detect_iqr_outliers",
            "detect_duplicate_invoices"
        ],
        "imports": [
            "scipy.stats",
            "numpy",
            "pandas"
        ],
        "role": "Identifies irregular transactions and fraud risks mathematically.",
        "path": "backend/app/anomaly/detectors.py",
        "filename": "detectors.py",
        "size_bytes": 32624,
        "size_formatted": "31.9 KB"
    },
    "backend/app/anomaly/explainer.py": {
        "subsystem": "Statistical Anomaly Detection",
        "module": "Module 6.7: Anomaly Detection",
        "description": "Uses the local LLM to generate plain-language explanations of flagged anomalies (e.g. explaining why an invoice at 4.2 standard deviations above mean represents unusual supplier billing).",
        "exports": [
            "AnomalyNarrativeExplainer",
            "explain_anomaly"
        ],
        "imports": [
            "app.core.llm",
            "app.anomaly.models"
        ],
        "role": "Translates mathematical outlier metrics into human-readable warnings.",
        "path": "backend/app/anomaly/explainer.py",
        "filename": "explainer.py",
        "size_bytes": 7402,
        "size_formatted": "7.2 KB"
    },
    "backend/app/anomaly/models.py": {
        "subsystem": "Statistical Anomaly Detection",
        "module": "Module 6.7: Anomaly Detection",
        "description": "Pydantic definitions for AnomalyFlag, OutlierRecord, DuplicateGroup, and AnomalyReport payloads.",
        "exports": [
            "AnomalyFlag",
            "AnomalySeverity",
            "AnomalyPayload"
        ],
        "imports": [
            "pydantic",
            "enum"
        ],
        "role": "Type definitions and validation for anomaly detection.",
        "path": "backend/app/anomaly/models.py",
        "filename": "models.py",
        "size_bytes": 2529,
        "size_formatted": "2.5 KB"
    },
    "backend/app/api/analytics.py": {
        "subsystem": "REST API Layer",
        "module": "API & Controllers",
        "description": "FastAPI routes for financial metrics, KPI cards, category breakdowns, monthly trends, and domain intelligence (pharmacy/ecommerce).",
        "exports": [
            "router"
        ],
        "imports": [
            "fastapi",
            "app.analytics.analytics",
            "app.analytics.models"
        ],
        "role": "Exposes analytics endpoints to the desktop frontend.",
        "path": "backend/app/api/analytics.py",
        "filename": "analytics.py",
        "size_bytes": 66007,
        "size_formatted": "64.5 KB"
    },
    "backend/app/api/anomaly.py": {
        "subsystem": "REST API Layer",
        "module": "API & Controllers",
        "description": "API endpoints to trigger anomaly scans, fetch outlier flags, list duplicate invoices, and stream LLM narrative explanations.",
        "exports": [
            "router"
        ],
        "imports": [
            "fastapi",
            "app.anomaly.detectors",
            "app.anomaly.explainer"
        ],
        "role": "Exposes anomaly detection services.",
        "path": "backend/app/api/anomaly.py",
        "filename": "anomaly.py",
        "size_bytes": 4542,
        "size_formatted": "4.4 KB"
    },
    "backend/app/api/chat.py": {
        "subsystem": "REST API Layer",
        "module": "API & Controllers",
        "description": "WebSocket and HTTP endpoints for grounded RAG chat interactions. Supports session management, conversation history, and citation streaming.",
        "exports": [
            "router"
        ],
        "imports": [
            "fastapi",
            "app.rag.chat",
            "app.rag.models"
        ],
        "role": "Chat controller for the frontend assistant panel.",
        "path": "backend/app/api/chat.py",
        "filename": "chat.py",
        "size_bytes": 5950,
        "size_formatted": "5.8 KB"
    },
    "backend/app/api/files.py": {
        "subsystem": "REST API Layer",
        "module": "API & Controllers",
        "description": "Handles dataset uploads (CSV, XLSX), file preview generation, column inspection, schema mapping reviews, and file deletion.",
        "exports": [
            "router"
        ],
        "imports": [
            "fastapi",
            "app.ingestion.registry",
            "app.schema.mapper"
        ],
        "role": "File management and upload coordinator.",
        "path": "backend/app/api/files.py",
        "filename": "files.py",
        "size_bytes": 34044,
        "size_formatted": "33.2 KB"
    },
    "backend/app/api/kb.py": {
        "subsystem": "REST API Layer",
        "module": "API & Controllers",
        "description": "Endpoints to view Knowledge Base sync status, document chunk counts, vector collection stats, and trigger re-indexing.",
        "exports": [
            "router"
        ],
        "imports": [
            "fastapi",
            "app.ingestion.store"
        ],
        "role": "Knowledge base inspection and maintenance API.",
        "path": "backend/app/api/kb.py",
        "filename": "kb.py",
        "size_bytes": 29254,
        "size_formatted": "28.6 KB"
    },
    "backend/app/api/models.py": {
        "subsystem": "REST API Layer",
        "module": "API & Controllers",
        "description": "Endpoints to query installed Ollama models, download/pull models with progress tracking, load/unload VRAM, and select active inference model.",
        "exports": [
            "router"
        ],
        "imports": [
            "fastapi",
            "app.core.llm"
        ],
        "role": "Local model management interface for the UI.",
        "path": "backend/app/api/models.py",
        "filename": "models.py",
        "size_bytes": 5488,
        "size_formatted": "5.4 KB"
    },
    "backend/app/api/report.py": {
        "subsystem": "REST API Layer",
        "module": "API & Controllers",
        "description": "Endpoints to trigger automated PDF/HTML report compilation, stream generation progress, preview charts, and download completed verified reports.",
        "exports": [
            "router"
        ],
        "imports": [
            "fastapi",
            "app.reporting.report",
            "app.reporting.pdf_report"
        ],
        "role": "Report generation and download dispatcher.",
        "path": "backend/app/api/report.py",
        "filename": "report.py",
        "size_bytes": 11540,
        "size_formatted": "11.3 KB"
    },
    "backend/app/api/routes.py": {
        "subsystem": "REST API Layer",
        "module": "API & Controllers",
        "description": "Primary router aggregating all sub-routers (analytics, chat, report, files, models, security) under the `/api` prefix with unified health checks.",
        "exports": [
            "router"
        ],
        "imports": [
            "fastapi"
        ],
        "role": "Root API aggregation router.",
        "path": "backend/app/api/routes.py",
        "filename": "routes.py",
        "size_bytes": 25847,
        "size_formatted": "25.2 KB"
    },
    "backend/app/api/security.py": {
        "subsystem": "REST API Layer",
        "module": "API & Controllers",
        "description": "Provides encryption status checks, master key configuration endpoints, and local data sanitization controls.",
        "exports": [
            "router"
        ],
        "imports": [
            "fastapi",
            "app.security.crypto"
        ],
        "role": "Security controls and encryption status API.",
        "path": "backend/app/api/security.py",
        "filename": "security.py",
        "size_bytes": 3235,
        "size_formatted": "3.2 KB"
    },
    "backend/app/connectors/base.py": {
        "subsystem": "Data Connectors Subsystem",
        "module": "Module 6.2: Data Connector",
        "description": "Abstract base connector class defining required interface: connect(), extract_records(), get_schema(), and test_connection().",
        "exports": [
            "BaseDataConnector",
            "ConnectorConfig"
        ],
        "imports": [
            "abc",
            "pydantic"
        ],
        "role": "Polymorphic connector contract.",
        "path": "backend/app/connectors/base.py",
        "filename": "base.py",
        "size_bytes": 3532,
        "size_formatted": "3.4 KB"
    },
    "backend/app/connectors/credentials.py": {
        "subsystem": "Data Connectors Subsystem",
        "module": "Module 6.2: Data Connector",
        "description": "Encrypted credential vault for storing external API tokens (Shopify token, Tally ports, SQL passwords) safely on disk using AES-256.",
        "exports": [
            "CredentialStore",
            "get_credential_store"
        ],
        "imports": [
            "cryptography",
            "app.security.crypto"
        ],
        "role": "Secure storage for third-party connector credentials.",
        "path": "backend/app/connectors/credentials.py",
        "filename": "credentials.py",
        "size_bytes": 1779,
        "size_formatted": "1.7 KB"
    },
    "backend/app/connectors/csv_excel.py": {
        "subsystem": "Data Connectors Subsystem",
        "module": "Module 6.2: Data Connector",
        "description": "Universal tabular file connector for CSV, XLSX, and XLS formats with automated encoding detection (UTF-8, UTF-16, Latin-1) and sheet selector.",
        "exports": [
            "CSVExcelConnector",
            "load_tabular_file"
        ],
        "imports": [
            "pandas",
            "openpyxl"
        ],
        "role": "Baseline file ingestion connector for SME spreadsheets.",
        "path": "backend/app/connectors/csv_excel.py",
        "filename": "csv_excel.py",
        "size_bytes": 6979,
        "size_formatted": "6.8 KB"
    },
    "backend/app/connectors/json.py": {
        "subsystem": "Data Connectors Subsystem",
        "module": "Module 6.2: Data Connector",
        "description": "Parser for structured JSON records, nested invoice payloads, and REST dump exports, flattening nested structures into tabular format.",
        "exports": [
            "JSONDataConnector"
        ],
        "imports": [
            "json",
            "pandas"
        ],
        "role": "JSON ingestion and schema flattening.",
        "path": "backend/app/connectors/json.py",
        "filename": "json.py",
        "size_bytes": 1948,
        "size_formatted": "1.9 KB"
    },
    "backend/app/connectors/shopify.py": {
        "subsystem": "Data Connectors Subsystem",
        "module": "Module 6.2: Data Connector",
        "description": "Shopify Admin API connector using store access tokens. Pulls Orders, Products, Customers, and Inventory levels directly into the local SQLite/Chroma pipeline.",
        "exports": [
            "ShopifyConnector",
            "sync_shopify_store"
        ],
        "imports": [
            "httpx",
            "pandas"
        ],
        "role": "Direct e-commerce cloud-to-local sync module.",
        "path": "backend/app/connectors/shopify.py",
        "filename": "shopify.py",
        "size_bytes": 24427,
        "size_formatted": "23.9 KB"
    },
    "backend/app/connectors/sql.py": {
        "subsystem": "Data Connectors Subsystem",
        "module": "Module 6.2: Data Connector",
        "description": "Relational database connector supporting SQLite, PostgreSQL, MySQL, and Microsoft SQL Server with schema discovery and chunked table reading.",
        "exports": [
            "SQLDataConnector",
            "test_sql_connection"
        ],
        "imports": [
            "sqlalchemy",
            "pandas"
        ],
        "role": "Direct enterprise database extraction connector.",
        "path": "backend/app/connectors/sql.py",
        "filename": "sql.py",
        "size_bytes": 22030,
        "size_formatted": "21.5 KB"
    },
    "backend/app/connectors/tally.py": {
        "subsystem": "Data Connectors Subsystem",
        "module": "Module 6.2: Data Connector",
        "description": "Direct integration with Tally Prime via local ODBC / XML-over-HTTP port 9000. Pulls Daybook, Ledgers, Stock Summary, and Sales Vouchers offline.",
        "exports": [
            "TallyConnector",
            "extract_tally_vouchers"
        ],
        "imports": [
            "pyodbc",
            "xml.etree.ElementTree",
            "httpx"
        ],
        "role": "Offline Tally ERP extraction connector.",
        "path": "backend/app/connectors/tally.py",
        "filename": "tally.py",
        "size_bytes": 16561,
        "size_formatted": "16.2 KB"
    },
    "backend/app/connectors/watcher.py": {
        "subsystem": "Data Connectors Subsystem",
        "module": "Module 6.2: Data Connector",
        "description": "Filesystem watcher using polling/watchdog to detect new drops in an 'auto-import' directory and trigger automatic ingestion pipelines.",
        "exports": [
            "DirectoryWatcher"
        ],
        "imports": [
            "os",
            "time",
            "threading"
        ],
        "role": "Automated file drop watcher.",
        "path": "backend/app/connectors/watcher.py",
        "filename": "watcher.py",
        "size_bytes": 8839,
        "size_formatted": "8.6 KB"
    },
    "backend/app/ingestion/models.py": {
        "subsystem": "Ingestion & Vector Knowledge Base",
        "module": "Module 6.4: Ingestion & Knowledge Base",
        "description": "Data models for IngestionTask, DocumentChunk, VectorMetadata, and IngestionStatus enum.",
        "exports": [
            "DocumentChunk",
            "IngestionStatus",
            "VectorRecord"
        ],
        "imports": [
            "pydantic",
            "typing"
        ],
        "role": "Data models for chunking and vector storage.",
        "path": "backend/app/ingestion/models.py",
        "filename": "models.py",
        "size_bytes": 1197,
        "size_formatted": "1.2 KB"
    },
    "backend/app/ingestion/registry.py": {
        "subsystem": "Ingestion & Vector Knowledge Base",
        "module": "Module 6.4: Ingestion & Knowledge Base",
        "description": "Tracks all uploaded and synced datasets on disk, their SHA-256 hashes, assigned domains, mapping profiles, and ingestion statuses.",
        "exports": [
            "FileRegistry",
            "file_registry"
        ],
        "imports": [
            "json",
            "os",
            "hashlib"
        ],
        "role": "Persistent dataset ledger and metadata registry.",
        "path": "backend/app/ingestion/registry.py",
        "filename": "registry.py",
        "size_bytes": 31333,
        "size_formatted": "30.6 KB"
    },
    "backend/app/ingestion/safety.py": {
        "subsystem": "Ingestion & Vector Knowledge Base",
        "module": "Module 6.4: Ingestion & Knowledge Base",
        "description": "Guards knowledge base ingestion: validates that datasets conform to expected domain schemas before replacing existing Chroma embeddings.",
        "exports": [
            "validate_ingestion_safety",
            "IngestionSafetyReport"
        ],
        "imports": [
            "pandas",
            "app.schema.validate"
        ],
        "role": "Prevents database corruption from malformed datasets.",
        "path": "backend/app/ingestion/safety.py",
        "filename": "safety.py",
        "size_bytes": 9261,
        "size_formatted": "9.0 KB"
    },
    "backend/app/ingestion/store.py": {
        "subsystem": "Ingestion & Vector Knowledge Base",
        "module": "Module 6.4: Ingestion & Knowledge Base",
        "description": "Chroma vector database wrapper (59 KB). Embeds document chunks using local Sentence-Transformers (intfloat/multilingual-e5-small) completely offline and handles semantic similarity queries.",
        "exports": [
            "KnowledgeBase",
            "get_knowledge_base"
        ],
        "imports": [
            "chromadb",
            "sentence_transformers",
            "app.core.config"
        ],
        "role": "Local vector store and embedding engine.",
        "path": "backend/app/ingestion/store.py",
        "filename": "store.py",
        "size_bytes": 59121,
        "size_formatted": "57.7 KB"
    },
    "backend/app/ingestion/sync_worker.py": {
        "subsystem": "Ingestion & Vector Knowledge Base",
        "module": "Module 6.4: Ingestion & Knowledge Base",
        "description": "Background threading worker that continuously processes pending ingestion tasks, computes chunk embeddings, and updates the Chroma index without blocking API calls.",
        "exports": [
            "SyncWorker",
            "sync_worker"
        ],
        "imports": [
            "threading",
            "queue",
            "time"
        ],
        "role": "Asynchronous background vector indexing engine.",
        "path": "backend/app/ingestion/sync_worker.py",
        "filename": "sync_worker.py",
        "size_bytes": 28869,
        "size_formatted": "28.2 KB"
    },
    "backend/app/language/pharmacy_vocabulary.py": {
        "subsystem": "Multilingual & Domain Intelligence",
        "module": "Module 6.5: RAG Chatbot",
        "description": "Domain lexicon mapping generic medical names, brand names, formulations (syrup, tablet, capsule), and common packaging abbreviations.",
        "exports": [
            "PHARMACY_LEXICON",
            "normalize_medicine_name"
        ],
        "imports": [
            "re"
        ],
        "role": "Pharmaceutical term normalization and fuzzy entity matching.",
        "path": "backend/app/language/pharmacy_vocabulary.py",
        "filename": "pharmacy_vocabulary.py",
        "size_bytes": 10308,
        "size_formatted": "10.1 KB"
    },
    "backend/app/language/roman_urdu.py": {
        "subsystem": "Multilingual & Domain Intelligence",
        "module": "Module 6.5: RAG Chatbot",
        "description": "Natural language translator for Roman Urdu business queries (e.g. 'aaj kitni sale hui', 'kon si dawai expire hone wali hai') into standardized English analytics intents.",
        "exports": [
            "translate_roman_urdu",
            "ROMAN_URDU_DICTIONARY",
            "detect_roman_urdu"
        ],
        "imports": [
            "re"
        ],
        "role": "Enables bilingual SME operators to query in native colloquial Roman Urdu.",
        "path": "backend/app/language/roman_urdu.py",
        "filename": "roman_urdu.py",
        "size_bytes": 9883,
        "size_formatted": "9.7 KB"
    },
    "backend/app/rag/chat.py": {
        "subsystem": "RAG Chatbot Subsystem",
        "module": "Module 6.5: RAG Chatbot",
        "description": "Main RAG chat engine (137 KB). Orchestrates intent classification, retrieval from ChromaDB, prompt construction, grounding with exact source row citations, and streaming token responses.",
        "exports": [
            "RAGChatEngine",
            "ask_question"
        ],
        "imports": [
            "app.core.llm",
            "app.ingestion.store",
            "app.rag.router",
            "app.rag.history"
        ],
        "role": "Central grounded chatbot engine.",
        "path": "backend/app/rag/chat.py",
        "filename": "chat.py",
        "size_bytes": 138123,
        "size_formatted": "134.9 KB"
    },
    "backend/app/rag/history.py": {
        "subsystem": "RAG Chatbot Subsystem",
        "module": "Module 6.5: RAG Chatbot",
        "description": "Multi-session conversation history manager, maintaining context windows up to configured memory limits while pruning old turns.",
        "exports": [
            "ChatHistoryManager",
            "SessionHistory"
        ],
        "imports": [
            "collections",
            "json"
        ],
        "role": "Context window and multi-turn session persistence.",
        "path": "backend/app/rag/history.py",
        "filename": "history.py",
        "size_bytes": 9756,
        "size_formatted": "9.5 KB"
    },
    "backend/app/rag/intent.py": {
        "subsystem": "RAG Chatbot Subsystem",
        "module": "Module 6.5: RAG Chatbot",
        "description": "Defines user intent categories: KPI_QUERY, RECORD_LOOKUP, ANOMALY_EXPLAIN, CHIT_CHAT, and OUT_OF_SCOPE.",
        "exports": [
            "QueryIntent",
            "IntentClassification"
        ],
        "imports": [
            "enum",
            "pydantic"
        ],
        "role": "Intent taxonomy for query routing.",
        "path": "backend/app/rag/intent.py",
        "filename": "intent.py",
        "size_bytes": 2611,
        "size_formatted": "2.5 KB"
    },
    "backend/app/rag/models.py": {
        "subsystem": "RAG Chatbot Subsystem",
        "module": "Module 6.5: RAG Chatbot",
        "description": "Data models for ChatRequest, ChatResponse, CitationMetadata, and SourceReference.",
        "exports": [
            "ChatRequest",
            "ChatResponse",
            "Citation"
        ],
        "imports": [
            "pydantic",
            "typing"
        ],
        "role": "Contract schemas for chat conversations.",
        "path": "backend/app/rag/models.py",
        "filename": "models.py",
        "size_bytes": 1576,
        "size_formatted": "1.5 KB"
    },
    "backend/app/rag/router.py": {
        "subsystem": "RAG Chatbot Subsystem",
        "module": "Module 6.5: RAG Chatbot",
        "description": "Deterministic Intent Router (57 KB). Uses high-precision regex patterns, domain priors, and numerical cues to route queries to KPI Engine vs Vector RAG with deterministic dispatch precision.",
        "exports": [
            "DeterministicRouter",
            "classify_query_intent"
        ],
        "imports": [
            "re",
            "app.rag.intent"
        ],
        "role": "Prevents arithmetic questions from going to probabilistic LLM lookup.",
        "path": "backend/app/rag/router.py",
        "filename": "router.py",
        "size_bytes": 57511,
        "size_formatted": "56.2 KB"
    },
    "backend/app/rag/semantic_router.py": {
        "subsystem": "RAG Chatbot Subsystem",
        "module": "Module 6.5: RAG Chatbot",
        "description": "Secondary embedding-based router for complex multi-clause inquiries, evaluating semantic cosine similarity against pre-computed intent clusters.",
        "exports": [
            "SemanticRouter"
        ],
        "imports": [
            "sentence_transformers",
            "numpy"
        ],
        "role": "Fallback router for unstructured questions.",
        "path": "backend/app/rag/semantic_router.py",
        "filename": "semantic_router.py",
        "size_bytes": 9340,
        "size_formatted": "9.1 KB"
    },
    "backend/app/reporting/charts.py": {
        "subsystem": "Verified Reporting Subsystem",
        "module": "Module 6.8: Verified Report Generator",
        "description": "Generates publication-quality charts using Matplotlib: monthly sales trends, category profit margins, branch comparisons, expiry timelines, and payment mixes.",
        "exports": [
            "ChartGenerator",
            "render_report_charts"
        ],
        "imports": [
            "matplotlib",
            "pandas",
            "os"
        ],
        "role": "Deterministic chart rendering for PDF reports.",
        "path": "backend/app/reporting/charts.py",
        "filename": "charts.py",
        "size_bytes": 32802,
        "size_formatted": "32.0 KB"
    },
    "backend/app/reporting/grounding.py": {
        "subsystem": "Verified Reporting Subsystem",
        "module": "Module 6.8: Verified Report Generator",
        "description": "Constructs grounded narrative prompt contexts, passing computed KPI tables and anomalies so the LLM acts purely as an executive summarizer.",
        "exports": [
            "build_report_prompt",
            "assemble_grounded_context"
        ],
        "imports": [
            "app.reporting.models"
        ],
        "role": "Context assembly for executive summaries.",
        "path": "backend/app/reporting/grounding.py",
        "filename": "grounding.py",
        "size_bytes": 4610,
        "size_formatted": "4.5 KB"
    },
    "backend/app/reporting/models.py": {
        "subsystem": "Verified Reporting Subsystem",
        "module": "Module 6.8: Verified Report Generator",
        "description": "Pydantic definitions for ReportConfig, ExecutiveSummary, VerifiedReportPayload, and VerificationAuditLog.",
        "exports": [
            "ReportConfig",
            "VerifiedReport",
            "VerificationAudit"
        ],
        "imports": [
            "pydantic",
            "typing"
        ],
        "role": "Type specifications for the reporting subsystem.",
        "path": "backend/app/reporting/models.py",
        "filename": "models.py",
        "size_bytes": 30528,
        "size_formatted": "29.8 KB"
    },
    "backend/app/reporting/narrative.py": {
        "subsystem": "Verified Reporting Subsystem",
        "module": "Module 6.8: Verified Report Generator",
        "description": "Prompts the local LLM to draft executive insights, highlighting key operational wins, margin bottlenecks, and recommended inventory actions.",
        "exports": [
            "generate_executive_narrative"
        ],
        "imports": [
            "app.core.llm",
            "app.reporting.grounding"
        ],
        "role": "Drafts the prose narrative section of reports.",
        "path": "backend/app/reporting/narrative.py",
        "filename": "narrative.py",
        "size_bytes": 17691,
        "size_formatted": "17.3 KB"
    },
    "backend/app/reporting/pdf_report.py": {
        "subsystem": "Verified Reporting Subsystem",
        "module": "Module 6.8: Verified Report Generator",
        "description": "Compiles executive PDF documents (62 KB) using WeasyPrint / ReportLab, featuring KPI metric cards, high-res charts, data tables, and verification stamps.",
        "exports": [
            "PDFReportCompiler",
            "compile_pdf_report"
        ],
        "imports": [
            "jinja2",
            "weasyprint",
            "reportlab"
        ],
        "role": "Professional PDF layout compiler.",
        "path": "backend/app/reporting/pdf_report.py",
        "filename": "pdf_report.py",
        "size_bytes": 62674,
        "size_formatted": "61.2 KB"
    },
    "backend/app/reporting/report.py": {
        "subsystem": "Verified Reporting Subsystem",
        "module": "Module 6.8: Verified Report Generator",
        "description": "Master report orchestrator (70 KB). Coordinates analytics execution, chart generation, narrative generation, numeric verification pass, and final export.",
        "exports": [
            "ReportOrchestrator",
            "generate_weekly_report"
        ],
        "imports": [
            "app.analytics.analytics",
            "app.reporting.charts",
            "app.reporting.verifier",
            "app.reporting.pdf_report"
        ],
        "role": "End-to-end report generation lifecycle manager.",
        "path": "backend/app/reporting/report.py",
        "filename": "report.py",
        "size_bytes": 70880,
        "size_formatted": "69.2 KB"
    },
    "backend/app/reporting/verifier.py": {
        "subsystem": "Verified Reporting Subsystem",
        "module": "Module 6.8: Verified Report Generator",
        "description": "The Core Trust Mechanism (7.4 KB). Scans LLM-written narrative for every numeric claim using regex, cross-checks each number against computed ground truth, and flags or regenerates discrepancies.",
        "exports": [
            "ReportVerifier",
            "verify_narrative_numbers"
        ],
        "imports": [
            "re",
            "math"
        ],
        "role": "Mathematical hallucination detector and verification stamp.",
        "path": "backend/app/reporting/verifier.py",
        "filename": "verifier.py",
        "size_bytes": 7392,
        "size_formatted": "7.2 KB"
    },
    "backend/app/schema/canonical.py": {
        "subsystem": "Schema Mapping Subsystem",
        "module": "Module 6.3: Schema Mapping & Validation",
        "description": "Defines canonical internal schemas: CanonicalTransaction, CanonicalInventory, CanonicalCustomer, and CanonicalSupplier.",
        "exports": [
            "CanonicalTransaction",
            "CanonicalInventory",
            "CanonicalLedger"
        ],
        "imports": [
            "pydantic",
            "datetime"
        ],
        "role": "Internal standard schema representation.",
        "path": "backend/app/schema/canonical.py",
        "filename": "canonical.py",
        "size_bytes": 13894,
        "size_formatted": "13.6 KB"
    },
    "backend/app/schema/domain.py": {
        "subsystem": "Schema Mapping Subsystem",
        "module": "Module 6.3: Schema Mapping & Validation",
        "description": "Domain taxonomy and column dictionary for retail pharmacy, e-commerce, and general SMB finance.",
        "exports": [
            "DomainRegistry",
            "get_domain_spec"
        ],
        "imports": [
            "enum"
        ],
        "role": "Domain-specific column definitions.",
        "path": "backend/app/schema/domain.py",
        "filename": "domain.py",
        "size_bytes": 10324,
        "size_formatted": "10.1 KB"
    },
    "backend/app/schema/ecommerce.py": {
        "subsystem": "Schema Mapping Subsystem",
        "module": "Module 6.3: Schema Mapping & Validation",
        "description": "Schema rules for e-commerce stores: order date conversions, UTC timestamp handling, order amount vs refund normalization.",
        "exports": [
            "EcommerceSchemaSpec"
        ],
        "imports": [
            "pydantic"
        ],
        "role": "E-commerce data normalizer.",
        "path": "backend/app/schema/ecommerce.py",
        "filename": "ecommerce.py",
        "size_bytes": 10175,
        "size_formatted": "9.9 KB"
    },
    "backend/app/schema/finance.py": {
        "subsystem": "Schema Mapping Subsystem",
        "module": "Module 6.3: Schema Mapping & Validation",
        "description": "Schema rules for general business accounting: debit, credit, balance, voucher type, and tax codes.",
        "exports": [
            "FinanceSchemaSpec"
        ],
        "imports": [
            "pydantic"
        ],
        "role": "General ledger schema normalizer.",
        "path": "backend/app/schema/finance.py",
        "filename": "finance.py",
        "size_bytes": 3208,
        "size_formatted": "3.1 KB"
    },
    "backend/app/schema/home_finance.py": {
        "subsystem": "Schema Mapping Subsystem",
        "module": "Module 6.3: Schema Mapping & Validation",
        "description": "Schema mapping for personal and micro-business budget tracking: income, recurring expenses, and categorization.",
        "exports": [
            "HomeFinanceSchemaSpec"
        ],
        "imports": [
            "pydantic"
        ],
        "role": "Micro-finance schema definitions.",
        "path": "backend/app/schema/home_finance.py",
        "filename": "home_finance.py",
        "size_bytes": 2510,
        "size_formatted": "2.5 KB"
    },
    "backend/app/schema/mapper.py": {
        "subsystem": "Schema Mapping Subsystem",
        "module": "Module 6.3: Schema Mapping & Validation",
        "description": "Heuristic column matching engine (19 KB). Compares uploaded headers against known synonyms, Levenshtein distances, and sample value profiles to suggest mappings.",
        "exports": [
            "SchemaMapper",
            "suggest_mapping"
        ],
        "imports": [
            "difflib",
            "pandas"
        ],
        "role": "Intelligent column auto-mapping algorithm.",
        "path": "backend/app/schema/mapper.py",
        "filename": "mapper.py",
        "size_bytes": 19049,
        "size_formatted": "18.6 KB"
    },
    "backend/app/schema/normalize.py": {
        "subsystem": "Schema Mapping Subsystem",
        "module": "Module 6.3: Schema Mapping & Validation",
        "description": "Applies confirmed mapping rules to raw DataFrames, casting dates, stripping currency symbols, and filling nulls into canonical format.",
        "exports": [
            "normalize_dataframe",
            "clean_currency_values"
        ],
        "imports": [
            "pandas",
            "numpy"
        ],
        "role": "Data hygiene and schema coercion engine.",
        "path": "backend/app/schema/normalize.py",
        "filename": "normalize.py",
        "size_bytes": 16814,
        "size_formatted": "16.4 KB"
    },
    "backend/app/schema/pharmacy.py": {
        "subsystem": "Schema Mapping Subsystem",
        "module": "Module 6.3: Schema Mapping & Validation",
        "description": "Deep validation and mapping for pharmacy files (40 KB). Reconciles batch numbers, expiry dates, trade prices, and medicinal product catalogs.",
        "exports": [
            "PharmacySchemaValidator"
        ],
        "imports": [
            "pandas",
            "re"
        ],
        "role": "Pharmaceutical regulatory data validator.",
        "path": "backend/app/schema/pharmacy.py",
        "filename": "pharmacy.py",
        "size_bytes": 40491,
        "size_formatted": "39.5 KB"
    },
    "backend/app/schema/profile.py": {
        "subsystem": "Schema Mapping Subsystem",
        "module": "Module 6.3: Schema Mapping & Validation",
        "description": "Stores confirmed user column mappings per dataset fingerprint on disk, enabling automatic reuse for recurring weekly/monthly imports.",
        "exports": [
            "MappingProfileStore",
            "get_saved_profile"
        ],
        "imports": [
            "json",
            "os"
        ],
        "role": "Persistent mapping configuration memory.",
        "path": "backend/app/schema/profile.py",
        "filename": "profile.py",
        "size_bytes": 7068,
        "size_formatted": "6.9 KB"
    },
    "backend/app/schema/source_domain.py": {
        "subsystem": "Schema Mapping Subsystem",
        "module": "Module 6.3: Schema Mapping & Validation",
        "description": "Automated dataset domain detector. Inspects header patterns to classify files as pharmacy, e-commerce, or general finance.",
        "exports": [
            "detect_source_domain"
        ],
        "imports": [
            "pandas"
        ],
        "role": "Automatic domain classification.",
        "path": "backend/app/schema/source_domain.py",
        "filename": "source_domain.py",
        "size_bytes": 2971,
        "size_formatted": "2.9 KB"
    },
    "backend/app/schema/validate.py": {
        "subsystem": "Schema Mapping Subsystem",
        "module": "Module 6.3: Schema Mapping & Validation",
        "description": "Evaluates normalized data usability: flags negative quantities, invalid date ranges, null customer IDs, and generates a data hygiene verdict.",
        "exports": [
            "validate_normalized_data",
            "ValidationResult"
        ],
        "imports": [
            "pandas"
        ],
        "role": "Pre-flight validation before vector ingestion.",
        "path": "backend/app/schema/validate.py",
        "filename": "validate.py",
        "size_bytes": 7760,
        "size_formatted": "7.6 KB"
    },
    "backend/app/security/crypto.py": {
        "subsystem": "Local Data Security Subsystem",
        "module": "Module 6.10: Local Data Security",
        "description": "Cryptographic engine (8.5 KB) using AES-256-GCM. Encrypts local vector stores and cached financial files at rest, deriving keys from host machine fingerprints.",
        "exports": [
            "LocalCryptoService",
            "encrypt_file",
            "decrypt_file"
        ],
        "imports": [
            "cryptography.hazmat.primitives.ciphers.aead.AESGCM",
            "os",
            "hashlib"
        ],
        "role": "At-rest encryption ensuring zero plaintext leaks on disk.",
        "path": "backend/app/security/crypto.py",
        "filename": "crypto.py",
        "size_bytes": 8551,
        "size_formatted": "8.4 KB"
    },
    "desktop/src/main.tsx": {
        "subsystem": "Desktop Application (Frontend)",
        "module": "Module 6.9: Desktop Application",
        "description": "React 19 application entrypoint. Configures React Router, mounts Context Providers (UserContext, FileContext, ChatContext, ReportContext), and renders the main layout.",
        "exports": [
            "root"
        ],
        "imports": [
            "react",
            "react-dom/client",
            "react-router-dom"
        ],
        "role": "Frontend bootstrapping and context provider hierarchy.",
        "path": "desktop/src/main.tsx",
        "filename": "main.tsx",
        "size_bytes": 5002,
        "size_formatted": "4.9 KB"
    },
    "desktop/src/Shell.tsx": {
        "subsystem": "Desktop Application (Frontend)",
        "module": "Module 6.9: Desktop Application",
        "description": "Main application shell. Embeds custom WindowTitleBar for Tauri desktop integration, Sidebar navigation, TopBar status, and the active view router outlet.",
        "exports": [
            "Shell"
        ],
        "imports": [
            "react-router-dom",
            "components/Sidebar",
            "components/TopBar"
        ],
        "role": "Top-level frame and desktop window chrome.",
        "path": "desktop/src/Shell.tsx",
        "filename": "Shell.tsx",
        "size_bytes": 1015,
        "size_formatted": "1015 B"
    },
    "desktop/src/pages/Dashboard.tsx": {
        "subsystem": "Desktop Application (Frontend)",
        "module": "Module 6.9: Desktop Application",
        "description": "Executive Overview Dashboard (48 KB). Displays live financial KPI cards (Revenue, Gross Margin, Avg Order, Transaction Count), monthly trend line charts, category breakdowns, and fast-moving SKU tables.",
        "exports": [
            "Dashboard"
        ],
        "imports": [
            "recharts",
            "lucide-react",
            "context/FileContext"
        ],
        "role": "Primary executive command center UI.",
        "path": "desktop/src/pages/Dashboard.tsx",
        "filename": "Dashboard.tsx",
        "size_bytes": 48045,
        "size_formatted": "46.9 KB"
    },
    "desktop/src/pages/ConnectSource.tsx": {
        "subsystem": "Desktop Application (Frontend)",
        "module": "Module 6.9: Desktop Application",
        "description": "Multi-source connection hub (137 KB). Guides users through CSV/Excel drag-and-drop, direct Tally Prime ODBC extraction, Shopify store API credentials, and SQL database discovery with live connection testing.",
        "exports": [
            "ConnectSource"
        ],
        "imports": [
            "lucide-react",
            "components/connect/UploadZone",
            "components/connect/MappingTable"
        ],
        "role": "Data source ingestion and connector interface.",
        "path": "desktop/src/pages/ConnectSource.tsx",
        "filename": "ConnectSource.tsx",
        "size_bytes": 137868,
        "size_formatted": "134.6 KB"
    },
    "desktop/src/pages/UploadedFiles.tsx": {
        "subsystem": "Desktop Application (Frontend)",
        "module": "Module 6.9: Desktop Application",
        "description": "Dataset management & schema review console (74 KB). Displays active datasets, sync statuses, chunk counts, data hygiene warnings, and allows visual column re-mapping.",
        "exports": [
            "UploadedFiles"
        ],
        "imports": [
            "lucide-react",
            "context/FileContext"
        ],
        "role": "Dataset management and schema confirmation workspace.",
        "path": "desktop/src/pages/UploadedFiles.tsx",
        "filename": "UploadedFiles.tsx",
        "size_bytes": 74335,
        "size_formatted": "72.6 KB"
    },
    "desktop/src/pages/WeeklyReport.tsx": {
        "subsystem": "Desktop Application (Frontend)",
        "module": "Module 6.9: Desktop Application",
        "description": "Report generator interface (44 KB). Allows period selection (Weekly, Monthly, Custom), triggers the verified report pipeline, shows live generation stages, displays chart previews, and enables PDF/HTML downloads.",
        "exports": [
            "WeeklyReport"
        ],
        "imports": [
            "lucide-react",
            "context/ReportContext"
        ],
        "role": "Verified report configuration and export console.",
        "path": "desktop/src/pages/WeeklyReport.tsx",
        "filename": "WeeklyReport.tsx",
        "size_bytes": 44693,
        "size_formatted": "43.6 KB"
    },
    "desktop/src/pages/Chatbot.tsx": {
        "subsystem": "Desktop Application (Frontend)",
        "module": "Module 6.9: Desktop Application",
        "description": "Interactive grounded RAG assistant (10.8 KB). Features multi-turn chat, suggested starter inquiries in English & Roman Urdu, thinking indicator, citation tags, and direct invoice source inspection.",
        "exports": [
            "Chatbot"
        ],
        "imports": [
            "components/chat/Composer",
            "components/chat/MessageBubble"
        ],
        "role": "Conversational AI interface grounded in business data.",
        "path": "desktop/src/pages/Chatbot.tsx",
        "filename": "Chatbot.tsx",
        "size_bytes": 10839,
        "size_formatted": "10.6 KB"
    },
    "desktop/src/components/Sidebar.tsx": {
        "subsystem": "Desktop Application (Frontend)",
        "module": "Module 6.9: Desktop Application",
        "description": "Collapsible desktop navigation sidebar with active page indicators, offline status pill, and direct shortcuts to Dashboard, Connect, Datasets, Reports, and Chat.",
        "exports": [
            "Sidebar"
        ],
        "imports": [
            "react-router-dom",
            "lucide-react"
        ],
        "role": "Application navigation rail.",
        "path": "desktop/src/components/Sidebar.tsx",
        "filename": "Sidebar.tsx",
        "size_bytes": 5032,
        "size_formatted": "4.9 KB"
    },
    "desktop/src/components/TopBar.tsx": {
        "subsystem": "Desktop Application (Frontend)",
        "module": "Module 6.9: Desktop Application",
        "description": "Header navigation bar showing active Ollama model (e.g. qwen2.5:1.5b), VRAM status, active dataset badge, and triggers for the Model Settings modal.",
        "exports": [
            "TopBar"
        ],
        "imports": [
            "lucide-react",
            "context/UserContext"
        ],
        "role": "System status bar and model switcher.",
        "path": "desktop/src/components/TopBar.tsx",
        "filename": "TopBar.tsx",
        "size_bytes": 15091,
        "size_formatted": "14.7 KB"
    },
    "desktop/src/components/settings/ModelSettings.tsx": {
        "subsystem": "Desktop Application (Frontend)",
        "module": "Module 6.1: Local LLM Inference",
        "description": "Ollama model management modal (18 KB). Allows switching between installed models, downloading new models with real-time byte progress, and unloading models from VRAM.",
        "exports": [
            "ModelSettings"
        ],
        "imports": [
            "lucide-react"
        ],
        "role": "Model downloading, switching, and VRAM management dialog.",
        "path": "desktop/src/components/settings/ModelSettings.tsx",
        "filename": "ModelSettings.tsx",
        "size_bytes": 18002,
        "size_formatted": "17.6 KB"
    },
    "scripts/compute_ground_truth.py": {
        "subsystem": "Evaluation & Testing",
        "module": "Evaluation Framework",
        "description": "Calculates hand-verified ground truth figures across evaluation datasets to establish the baseline for RAG accuracy and deterministic KPI validation.",
        "exports": [
            "compute_exact_aggregations"
        ],
        "imports": [
            "pandas",
            "numpy"
        ],
        "role": "Ground-truth benchmark oracle.",
        "path": "scripts/compute_ground_truth.py",
        "filename": "compute_ground_truth.py",
        "size_bytes": 10071,
        "size_formatted": "9.8 KB"
    },
    "scripts/evaluate_compliant_dataset_100.py": {
        "subsystem": "Evaluation & Testing",
        "module": "Evaluation Framework",
        "description": "Automated evaluation script running 100 standardized questions against local models and recording accuracy, latency, and citation precision.",
        "exports": [
            "run_eval"
        ],
        "imports": [
            "httpx",
            "json",
            "time"
        ],
        "role": "100-question automated benchmark runner.",
        "path": "scripts/evaluate_compliant_dataset_100.py",
        "filename": "evaluate_compliant_dataset_100.py",
        "size_bytes": 24111,
        "size_formatted": "23.5 KB"
    },
    "scripts/test_excel_questions.py": {
        "subsystem": "Evaluation & Testing",
        "module": "Evaluation Framework",
        "description": "Executes the 91-question standardized pharmacy POS evaluation suite, verifying intent routing, numerical accuracy, and citation grounding.",
        "exports": [
            "run_excel_suite"
        ],
        "imports": [
            "pandas",
            "httpx"
        ],
        "role": "Standardized POS benchmark test runner.",
        "path": "scripts/test_excel_questions.py",
        "filename": "test_excel_questions.py",
        "size_bytes": 34863,
        "size_formatted": "34.0 KB"
    },
    "scripts/test_rag_chatbot.py": {
        "subsystem": "Evaluation & Testing",
        "module": "Evaluation Framework",
        "description": "Integration test harness evaluating multi-turn conversational memory, out-of-scope question safety, and Roman Urdu query translation.",
        "exports": [
            "test_chat_safety"
        ],
        "imports": [
            "pytest",
            "httpx"
        ],
        "role": "End-to-end chat integration test suite.",
        "path": "scripts/test_rag_chatbot.py",
        "filename": "test_rag_chatbot.py",
        "size_bytes": 40262,
        "size_formatted": "39.3 KB"
    },
    "desktop/src-tauri/tauri.conf.json": {
        "subsystem": "Desktop Application (Frontend)",
        "module": "Module 6.9: Desktop Application",
        "description": "Tauri v2 configuration file defining native desktop window size (1280x820), security capabilities, background service bundling, and OS system tray.",
        "exports": [
            "tauri_config"
        ],
        "imports": [],
        "role": "Native desktop packaging configuration.",
        "path": "desktop/src-tauri/tauri.conf.json",
        "filename": "tauri.conf.json",
        "size_bytes": 967,
        "size_formatted": "967 B"
    },
    "backend/app/__init__.py": {
        "path": "backend/app/__init__.py",
        "filename": "__init__.py",
        "size_bytes": 0,
        "size_formatted": "0 B",
        "subsystem": "Core System",
        "module": "System Architecture & Infrastructure",
        "description": "Implements __init__ logic for app.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Handles app subsystem processing in the offline pipeline."
    },
    "backend/app/analytics/__init__.py": {
        "path": "backend/app/analytics/__init__.py",
        "filename": "__init__.py",
        "size_bytes": 1391,
        "size_formatted": "1.4 KB",
        "subsystem": "Financial Analytics & Intelligence (Module 6.6)",
        "module": "Module 6.6: Financial Analytics & KPI Engine",
        "description": "Module 6.6 \u2014 Financial Analytics / KPI Engine.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [
            "app.analytics.models",
            "app.analytics.engine",
            "app.analytics.seam",
            "app.analytics.filters"
        ],
        "role": "Handles analytics subsystem processing in the offline pipeline."
    },
    "backend/app/analytics/domains/__init__.py": {
        "path": "backend/app/analytics/domains/__init__.py",
        "filename": "__init__.py",
        "size_bytes": 11657,
        "size_formatted": "11.4 KB",
        "subsystem": "Financial Analytics & Intelligence (Module 6.6)",
        "module": "Module 6.6: Financial Analytics & KPI Engine",
        "description": "Domain-specific KPI packs for the Module 6.6 KPI engine.",
        "exports": [
            "analyze_specialized_question"
        ],
        "classes": [],
        "functions": [
            "analyze_specialized_question"
        ],
        "imports": [
            "app.analytics.kpi",
            "re",
            "app.language.roman_urdu",
            "pandas",
            "app.analytics.domains.pharmacy_pos",
            "app.analytics.models",
            "dataclasses",
            "app.analytics.domains.pharmacy_purchases"
        ],
        "role": "Handles domains subsystem processing in the offline pipeline."
    },
    "backend/app/anomaly/__init__.py": {
        "path": "backend/app/anomaly/__init__.py",
        "filename": "__init__.py",
        "size_bytes": 839,
        "size_formatted": "839 B",
        "subsystem": "Statistical Anomaly Detection (Module 6.7)",
        "module": "Module 6.7: Anomaly Detection",
        "description": "Module 6.7 (Statistical Anomaly Detection).",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [
            "app.anomaly.models",
            "app.anomaly.explainer",
            "app.anomaly.detectors"
        ],
        "role": "Handles anomaly subsystem processing in the offline pipeline."
    },
    "backend/app/api/__init__.py": {
        "path": "backend/app/api/__init__.py",
        "filename": "__init__.py",
        "size_bytes": 0,
        "size_formatted": "0 B",
        "subsystem": "REST API Gateway & Controllers",
        "module": "System Architecture & Infrastructure",
        "description": "Implements __init__ logic for api.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Handles api subsystem processing in the offline pipeline."
    },
    "backend/app/connectors/__init__.py": {
        "path": "backend/app/connectors/__init__.py",
        "filename": "__init__.py",
        "size_bytes": 0,
        "size_formatted": "0 B",
        "subsystem": "Multi-Source Data Connectors (Module 6.2)",
        "module": "Module 6.2: Data Connector",
        "description": "Implements __init__ logic for connectors.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Handles connectors subsystem processing in the offline pipeline."
    },
    "backend/app/core/__init__.py": {
        "path": "backend/app/core/__init__.py",
        "filename": "__init__.py",
        "size_bytes": 0,
        "size_formatted": "0 B",
        "subsystem": "Local LLM Inference & Config (Module 6.1)",
        "module": "Module 6.1: Local LLM Inference",
        "description": "Implements __init__ logic for core.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Handles core subsystem processing in the offline pipeline."
    },
    "backend/app/ingestion/__init__.py": {
        "path": "backend/app/ingestion/__init__.py",
        "filename": "__init__.py",
        "size_bytes": 0,
        "size_formatted": "0 B",
        "subsystem": "Knowledge Base & Vector Store (Module 6.4)",
        "module": "Module 6.4: Ingestion & Knowledge Base",
        "description": "Implements __init__ logic for ingestion.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Handles ingestion subsystem processing in the offline pipeline."
    },
    "backend/app/language/__init__.py": {
        "path": "backend/app/language/__init__.py",
        "filename": "__init__.py",
        "size_bytes": 71,
        "size_formatted": "71 B",
        "subsystem": "Multilingual & Domain Lexicon (Module 6.5)",
        "module": "Module 6.5: RAG Chatbot",
        "description": "Language normalization helpers shared by routing and analytics.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Handles language subsystem processing in the offline pipeline."
    },
    "backend/app/rag/__init__.py": {
        "path": "backend/app/rag/__init__.py",
        "filename": "__init__.py",
        "size_bytes": 0,
        "size_formatted": "0 B",
        "subsystem": "RAG Chatbot & Intent Routing (Module 6.5)",
        "module": "Module 6.5: RAG Chatbot",
        "description": "Implements __init__ logic for rag.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Handles rag subsystem processing in the offline pipeline."
    },
    "backend/app/reporting/__init__.py": {
        "path": "backend/app/reporting/__init__.py",
        "filename": "__init__.py",
        "size_bytes": 988,
        "size_formatted": "988 B",
        "subsystem": "Verified Reporting & Verification (Module 6.8)",
        "module": "Module 6.8: Verified Report Generator",
        "description": "Module 6.8 \u2014 Verified Report Generator",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [
            "app.reporting.verifier",
            "app.reporting.charts",
            "app.reporting.models",
            "app.reporting.pdf_report",
            "app.reporting.narrative",
            "app.reporting.report"
        ],
        "role": "Handles reporting subsystem processing in the offline pipeline."
    },
    "backend/app/schema/__init__.py": {
        "path": "backend/app/schema/__init__.py",
        "filename": "__init__.py",
        "size_bytes": 111,
        "size_formatted": "111 B",
        "subsystem": "Schema Mapping & Validation (Module 6.3)",
        "module": "Module 6.3: Schema Mapping & Validation",
        "description": "Implements __init__ logic for schema.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [
            "app.schema.home_finance",
            "app.schema.pharmacy",
            "app.schema.ecommerce",
            "app.schema.finance"
        ],
        "role": "Handles schema subsystem processing in the offline pipeline."
    },
    "backend/app/security/__init__.py": {
        "path": "backend/app/security/__init__.py",
        "filename": "__init__.py",
        "size_bytes": 542,
        "size_formatted": "542 B",
        "subsystem": "Local Data Security (Module 6.10)",
        "module": "Module 6.1: Local LLM Inference",
        "description": "Implements __init__ logic for security.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [
            "app.security.crypto"
        ],
        "role": "Handles security subsystem processing in the offline pipeline."
    },
    "desktop/src/Chat.css": {
        "path": "desktop/src/Chat.css",
        "filename": "Chat.css",
        "size_bytes": 46387,
        "size_formatted": "45.3 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: Chat.css.",
        "exports": [
            "Chat"
        ],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/Connect.css": {
        "path": "desktop/src/Connect.css",
        "filename": "Connect.css",
        "size_bytes": 25805,
        "size_formatted": "25.2 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: Connect.css.",
        "exports": [
            "Connect"
        ],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/index.css": {
        "path": "desktop/src/index.css",
        "filename": "index.css",
        "size_bytes": 18683,
        "size_formatted": "18.2 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: index.css.",
        "exports": [
            "index"
        ],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/components/TopBar.css": {
        "path": "desktop/src/components/TopBar.css",
        "filename": "TopBar.css",
        "size_bytes": 7537,
        "size_formatted": "7.4 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: TopBar.css.",
        "exports": [
            "TopBar"
        ],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/components/WindowTitleBar.css": {
        "path": "desktop/src/components/WindowTitleBar.css",
        "filename": "WindowTitleBar.css",
        "size_bytes": 2989,
        "size_formatted": "2.9 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: WindowTitleBar.css.",
        "exports": [
            "WindowTitleBar"
        ],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/components/WindowTitleBar.tsx": {
        "path": "desktop/src/components/WindowTitleBar.tsx",
        "filename": "WindowTitleBar.tsx",
        "size_bytes": 4503,
        "size_formatted": "4.4 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: WindowTitleBar.tsx.",
        "exports": [
            "WindowTitleBar"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "react",
            "lucide-react"
        ],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/components/auth/Onboarding.css": {
        "path": "desktop/src/components/auth/Onboarding.css",
        "filename": "Onboarding.css",
        "size_bytes": 7153,
        "size_formatted": "7.0 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: Onboarding.css.",
        "exports": [
            "Onboarding"
        ],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/components/auth/OnboardingModal.tsx": {
        "path": "desktop/src/components/auth/OnboardingModal.tsx",
        "filename": "OnboardingModal.tsx",
        "size_bytes": 11336,
        "size_formatted": "11.1 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: OnboardingModal.tsx.",
        "exports": [
            "OnboardingModal"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "react",
            "lucide-react"
        ],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/components/chat/ChatHistorySection.tsx": {
        "path": "desktop/src/components/chat/ChatHistorySection.tsx",
        "filename": "ChatHistorySection.tsx",
        "size_bytes": 12334,
        "size_formatted": "12.0 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: ChatHistorySection.tsx.",
        "exports": [
            "ChatHistorySection"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "react",
            "lucide-react"
        ],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/components/chat/Composer.tsx": {
        "path": "desktop/src/components/chat/Composer.tsx",
        "filename": "Composer.tsx",
        "size_bytes": 42667,
        "size_formatted": "41.7 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: Composer.tsx.",
        "exports": [
            "Composer"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "react",
            "lucide-react"
        ],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/components/chat/MessageBubble.tsx": {
        "path": "desktop/src/components/chat/MessageBubble.tsx",
        "filename": "MessageBubble.tsx",
        "size_bytes": 8444,
        "size_formatted": "8.2 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: MessageBubble.tsx.",
        "exports": [
            "MessageBubble"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "react",
            "lucide-react"
        ],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/components/chat/SuggestionChips.tsx": {
        "path": "desktop/src/components/chat/SuggestionChips.tsx",
        "filename": "SuggestionChips.tsx",
        "size_bytes": 814,
        "size_formatted": "814 B",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: SuggestionChips.tsx.",
        "exports": [
            "SuggestionChips"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "react",
            "lucide-react"
        ],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/components/chat/TypingIndicator.tsx": {
        "path": "desktop/src/components/chat/TypingIndicator.tsx",
        "filename": "TypingIndicator.tsx",
        "size_bytes": 652,
        "size_formatted": "652 B",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: TypingIndicator.tsx.",
        "exports": [
            "TypingIndicator"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "react",
            "lucide-react"
        ],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/components/connect/KBStatus.tsx": {
        "path": "desktop/src/components/connect/KBStatus.tsx",
        "filename": "KBStatus.tsx",
        "size_bytes": 11259,
        "size_formatted": "11.0 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: KBStatus.tsx.",
        "exports": [
            "KBStatus"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "react",
            "lucide-react"
        ],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/components/connect/MappingTable.tsx": {
        "path": "desktop/src/components/connect/MappingTable.tsx",
        "filename": "MappingTable.tsx",
        "size_bytes": 2506,
        "size_formatted": "2.4 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: MappingTable.tsx.",
        "exports": [
            "MappingTable"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "react",
            "lucide-react"
        ],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/components/connect/PreviewTable.tsx": {
        "path": "desktop/src/components/connect/PreviewTable.tsx",
        "filename": "PreviewTable.tsx",
        "size_bytes": 1457,
        "size_formatted": "1.4 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: PreviewTable.tsx.",
        "exports": [
            "PreviewTable"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "react",
            "lucide-react"
        ],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/components/connect/StepIndicator.tsx": {
        "path": "desktop/src/components/connect/StepIndicator.tsx",
        "filename": "StepIndicator.tsx",
        "size_bytes": 1221,
        "size_formatted": "1.2 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: StepIndicator.tsx.",
        "exports": [
            "StepIndicator"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "react",
            "lucide-react"
        ],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/components/connect/UploadZone.tsx": {
        "path": "desktop/src/components/connect/UploadZone.tsx",
        "filename": "UploadZone.tsx",
        "size_bytes": 3082,
        "size_formatted": "3.0 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: UploadZone.tsx.",
        "exports": [
            "UploadZone"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "react",
            "lucide-react"
        ],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/components/settings/SettingsModal.css": {
        "path": "desktop/src/components/settings/SettingsModal.css",
        "filename": "SettingsModal.css",
        "size_bytes": 15386,
        "size_formatted": "15.0 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: SettingsModal.css.",
        "exports": [
            "SettingsModal"
        ],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/components/settings/SettingsModal.tsx": {
        "path": "desktop/src/components/settings/SettingsModal.tsx",
        "filename": "SettingsModal.tsx",
        "size_bytes": 9221,
        "size_formatted": "9.0 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: SettingsModal.tsx.",
        "exports": [
            "SettingsModal"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "react",
            "lucide-react"
        ],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/context/ChatContext.tsx": {
        "path": "desktop/src/context/ChatContext.tsx",
        "filename": "ChatContext.tsx",
        "size_bytes": 25134,
        "size_formatted": "24.5 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: ChatContext.tsx.",
        "exports": [
            "ChatContext"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "react",
            "lucide-react"
        ],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/context/FileContext.tsx": {
        "path": "desktop/src/context/FileContext.tsx",
        "filename": "FileContext.tsx",
        "size_bytes": 12773,
        "size_formatted": "12.5 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: FileContext.tsx.",
        "exports": [
            "FileContext"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "react",
            "lucide-react"
        ],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/context/ReportContext.tsx": {
        "path": "desktop/src/context/ReportContext.tsx",
        "filename": "ReportContext.tsx",
        "size_bytes": 16437,
        "size_formatted": "16.1 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: ReportContext.tsx.",
        "exports": [
            "ReportContext"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "react",
            "lucide-react"
        ],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/context/UserContext.tsx": {
        "path": "desktop/src/context/UserContext.tsx",
        "filename": "UserContext.tsx",
        "size_bytes": 7062,
        "size_formatted": "6.9 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: UserContext.tsx.",
        "exports": [
            "UserContext"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "react",
            "lucide-react"
        ],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/pages/Dashboard.css": {
        "path": "desktop/src/pages/Dashboard.css",
        "filename": "Dashboard.css",
        "size_bytes": 13758,
        "size_formatted": "13.4 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: Dashboard.css.",
        "exports": [
            "Dashboard"
        ],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/pages/ReportExport.css": {
        "path": "desktop/src/pages/ReportExport.css",
        "filename": "ReportExport.css",
        "size_bytes": 21296,
        "size_formatted": "20.8 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: ReportExport.css.",
        "exports": [
            "ReportExport"
        ],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/pages/UploadedFiles.css": {
        "path": "desktop/src/pages/UploadedFiles.css",
        "filename": "UploadedFiles.css",
        "size_bytes": 31370,
        "size_formatted": "30.6 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: UploadedFiles.css.",
        "exports": [
            "UploadedFiles"
        ],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Desktop user interface rendering and state management."
    },
    "desktop/src/utils/dbGroups.ts": {
        "path": "desktop/src/utils/dbGroups.ts",
        "filename": "dbGroups.ts",
        "size_bytes": 4523,
        "size_formatted": "4.4 KB",
        "subsystem": "Desktop Shell & Frontend UI (Module 6.9)",
        "module": "Module 6.9: Desktop Application",
        "description": "React / TypeScript UI component: dbGroups.ts.",
        "exports": [
            "dbGroups"
        ],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Desktop user interface rendering and state management."
    },
    "scripts/test-backend.ps1": {
        "path": "scripts/test-backend.ps1",
        "filename": "test-backend.ps1",
        "size_bytes": 2426,
        "size_formatted": "2.4 KB",
        "subsystem": "Evaluation & Ground-Truth Testbed",
        "module": "System Architecture & Infrastructure",
        "description": "Evaluation test runner: test-backend.ps1.",
        "exports": [
            "test-backend"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "pytest",
            "httpx",
            "pandas"
        ],
        "role": "Automated validation of accuracy, latency, and compliance."
    },
    "scripts/test_compliant_questions.py": {
        "path": "scripts/test_compliant_questions.py",
        "filename": "test_compliant_questions.py",
        "size_bytes": 27043,
        "size_formatted": "26.4 KB",
        "subsystem": "Evaluation & Ground-Truth Testbed",
        "module": "System Architecture & Infrastructure",
        "description": "Evaluation test runner: test_compliant_questions.py.",
        "exports": [
            "test_compliant_questions"
        ],
        "classes": [],
        "functions": [],
        "imports": [
            "pytest",
            "httpx",
            "pandas"
        ],
        "role": "Automated validation of accuracy, latency, and compliance."
    },
    "docs/ANALYTICS.md": {
        "path": "docs/ANALYTICS.md",
        "filename": "ANALYTICS.md",
        "size_bytes": 25011,
        "size_formatted": "24.4 KB",
        "subsystem": "Engineering Specifications & Architecture Docs",
        "module": "System Architecture & Infrastructure",
        "description": "Engineering specification: ANALYTICS.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Architectural specification and design documentation."
    },
    "docs/BENCHMARK_CLOUD_VS_LOCAL.md": {
        "path": "docs/BENCHMARK_CLOUD_VS_LOCAL.md",
        "filename": "BENCHMARK_CLOUD_VS_LOCAL.md",
        "size_bytes": 16026,
        "size_formatted": "15.7 KB",
        "subsystem": "Engineering Specifications & Architecture Docs",
        "module": "System Architecture & Infrastructure",
        "description": "Engineering specification: BENCHMARK_CLOUD_VS_LOCAL.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Architectural specification and design documentation."
    },
    "docs/CONNECTORS.md": {
        "path": "docs/CONNECTORS.md",
        "filename": "CONNECTORS.md",
        "size_bytes": 3930,
        "size_formatted": "3.8 KB",
        "subsystem": "Engineering Specifications & Architecture Docs",
        "module": "System Architecture & Infrastructure",
        "description": "Engineering specification: CONNECTORS.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Architectural specification and design documentation."
    },
    "docs/DATA_CONNECTOR_TESTING.md": {
        "path": "docs/DATA_CONNECTOR_TESTING.md",
        "filename": "DATA_CONNECTOR_TESTING.md",
        "size_bytes": 4251,
        "size_formatted": "4.2 KB",
        "subsystem": "Engineering Specifications & Architecture Docs",
        "module": "System Architecture & Infrastructure",
        "description": "Engineering specification: DATA_CONNECTOR_TESTING.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Architectural specification and design documentation."
    },
    "docs/KNOWLEDGE_BASE.md": {
        "path": "docs/KNOWLEDGE_BASE.md",
        "filename": "KNOWLEDGE_BASE.md",
        "size_bytes": 4459,
        "size_formatted": "4.4 KB",
        "subsystem": "Engineering Specifications & Architecture Docs",
        "module": "System Architecture & Infrastructure",
        "description": "Engineering specification: KNOWLEDGE_BASE.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Architectural specification and design documentation."
    },
    "docs/LOCAL_LLM_INFERENCE_MODULE.md": {
        "path": "docs/LOCAL_LLM_INFERENCE_MODULE.md",
        "filename": "LOCAL_LLM_INFERENCE_MODULE.md",
        "size_bytes": 17071,
        "size_formatted": "16.7 KB",
        "subsystem": "Engineering Specifications & Architecture Docs",
        "module": "System Architecture & Infrastructure",
        "description": "Engineering specification: LOCAL_LLM_INFERENCE_MODULE.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Architectural specification and design documentation."
    },
    "docs/MEETING_LOG.md": {
        "path": "docs/MEETING_LOG.md",
        "filename": "MEETING_LOG.md",
        "size_bytes": 126,
        "size_formatted": "126 B",
        "subsystem": "Engineering Specifications & Architecture Docs",
        "module": "System Architecture & Infrastructure",
        "description": "Engineering specification: MEETING_LOG.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Architectural specification and design documentation."
    },
    "docs/PHARMACY_EVALUATION.md": {
        "path": "docs/PHARMACY_EVALUATION.md",
        "filename": "PHARMACY_EVALUATION.md",
        "size_bytes": 21805,
        "size_formatted": "21.3 KB",
        "subsystem": "Engineering Specifications & Architecture Docs",
        "module": "System Architecture & Infrastructure",
        "description": "Engineering specification: PHARMACY_EVALUATION.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Architectural specification and design documentation."
    },
    "docs/RAG_CHATBOT.md": {
        "path": "docs/RAG_CHATBOT.md",
        "filename": "RAG_CHATBOT.md",
        "size_bytes": 2940,
        "size_formatted": "2.9 KB",
        "subsystem": "Engineering Specifications & Architecture Docs",
        "module": "System Architecture & Infrastructure",
        "description": "Engineering specification: RAG_CHATBOT.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Architectural specification and design documentation."
    },
    "docs/REPORTING.md": {
        "path": "docs/REPORTING.md",
        "filename": "REPORTING.md",
        "size_bytes": 5114,
        "size_formatted": "5.0 KB",
        "subsystem": "Engineering Specifications & Architecture Docs",
        "module": "System Architecture & Infrastructure",
        "description": "Engineering specification: REPORTING.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Architectural specification and design documentation."
    },
    "docs/ROADMAP.md": {
        "path": "docs/ROADMAP.md",
        "filename": "ROADMAP.md",
        "size_bytes": 693,
        "size_formatted": "693 B",
        "subsystem": "Engineering Specifications & Architecture Docs",
        "module": "System Architecture & Infrastructure",
        "description": "Engineering specification: ROADMAP.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Architectural specification and design documentation."
    },
    "docs/SCHEMA.md": {
        "path": "docs/SCHEMA.md",
        "filename": "SCHEMA.md",
        "size_bytes": 2192,
        "size_formatted": "2.1 KB",
        "subsystem": "Engineering Specifications & Architecture Docs",
        "module": "System Architecture & Infrastructure",
        "description": "Engineering specification: SCHEMA.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Architectural specification and design documentation."
    },
    "docs/SCHEMA_MAPPING_AND_VALIDATION_MODULE.md": {
        "path": "docs/SCHEMA_MAPPING_AND_VALIDATION_MODULE.md",
        "filename": "SCHEMA_MAPPING_AND_VALIDATION_MODULE.md",
        "size_bytes": 6428,
        "size_formatted": "6.3 KB",
        "subsystem": "Engineering Specifications & Architecture Docs",
        "module": "System Architecture & Infrastructure",
        "description": "Engineering specification: SCHEMA_MAPPING_AND_VALIDATION_MODULE.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Architectural specification and design documentation."
    },
    "docs/VALIDATION.md": {
        "path": "docs/VALIDATION.md",
        "filename": "VALIDATION.md",
        "size_bytes": 4311,
        "size_formatted": "4.2 KB",
        "subsystem": "Engineering Specifications & Architecture Docs",
        "module": "System Architecture & Infrastructure",
        "description": "Engineering specification: VALIDATION.",
        "exports": [],
        "classes": [],
        "functions": [],
        "imports": [],
        "role": "Architectural specification and design documentation."
    }
};

const BENCHMARK_DATA = {
    "summary": {
        "local_accuracy": "100.0%",
        "cloud_accuracy": "74.5% - 96.0%",
        "local_cost": "$0.00 (Zero OpEx)",
        "cloud_cost": "$1,350 - $3,800+ / 3yr TCO",
        "data_egress": "0.0% (100% On-Premises)",
        "offline_resilience": "100% Operational during Outages"
    },
    "comparison_table": [
        {
            "metric": "Numerical & KPI Calculation Accuracy",
            "local": "Deterministic Ground Truth (Pandas/DuckDB Exact Match)",
            "cloud": "74.5% (LLM arithmetic) / 96% (Code Interpreter)",
            "winner": "Local LLM-Konnect",
            "notes": "Code computes deterministically; eliminates LLM arithmetic hallucination."
        },
        {
            "metric": "Intent & Route Classification Accuracy",
            "local": "99.1% (Standardized Intent Classification)",
            "cloud": "97.8% (Occasional ambiguity on Roman Urdu)",
            "winner": "Local LLM-Konnect",
            "notes": "Domain regex rules + keyword priors guarantee zero routing mismatches."
        },
        {
            "metric": "Factual RAG Retrieval Precision",
            "local": "100% Grounded with Exact Source Row Citations",
            "cloud": "91.2% (Tendency to synthesize approximate IDs)",
            "winner": "Local LLM-Konnect",
            "notes": "Enforces deterministic citation metadata per retrieved chunk."
        },
        {
            "metric": "Customer Data Egress & Privacy Risk",
            "local": "0.0% Egress (Zero bytes exit machine)",
            "cloud": "High Egress (Sensitive ledgers sent to remote servers)",
            "winner": "Local LLM-Konnect",
            "notes": "Full compliance with HIPAA, patient privacy, and financial confidentiality."
        },
        {
            "metric": "Offline Operational Resilience",
            "local": "100% Operational (No internet needed)",
            "cloud": "0% (Complete failure during broadband outages)",
            "winner": "Local LLM-Konnect",
            "notes": "Critical for emerging market SMEs with frequent broadband disconnects."
        },
        {
            "metric": "Warm Query Latency (P50)",
            "local": "1.71s (Gemma 3:1b) / 6.49s (Qwen 2.5:3b)",
            "cloud": "2.10s (GPT-4o-mini API)",
            "winner": "Tie",
            "notes": "Gemma 3 matches cloud speed completely offline on 4GB VRAM."
        },
        {
            "metric": "Operating Cost (per 10,000 queries)",
            "local": "$0.00 (Zero recurring API fees)",
            "cloud": "$3.75 - $6.50 (GPT-4o-mini)",
            "winner": "Local LLM-Konnect",
            "notes": "Saves 100% of recurring operational inference costs."
        },
        {
            "metric": "3-Year Terminal TCO Savings",
            "local": "$0 incremental OpEx",
            "cloud": "$1,350 to $3,800+ in token fees",
            "winner": "Local LLM-Konnect",
            "notes": "Significant capital preservation for small businesses."
        }
    ]
};

const VIVA_QUESTIONS = [
    {
        "category": "AI, LLMs & Hallucination",
        "question": "Why not simply send financial records to OpenAI GPT-4o or Google Gemini via API?",
        "quick_answer": "Privacy, compliance, recurring cost, and internet dependence.",
        "detailed_answer": "Small and medium businesses generate ledgers containing customer names, credit debts (khata), supplier trade terms, and daily margins. Sending this data to cloud APIs violates privacy norms and regulations like HIPAA/GDPR. Furthermore, cloud APIs charge per-token recurring fees ($1,350-$3,800 per terminal over 3 years) and fail completely when internet connectivity drops. LLM-Konnect runs 100% offline on the user's computer with zero recurring cost."
    },
    {
        "category": "AI, LLMs & Hallucination",
        "question": "Local LLMs are notorious for arithmetic errors. How does LLM-Konnect eliminate arithmetic hallucinations and guarantee mathematical correctness?",
        "quick_answer": "By treating the LLM as a Narrator, not a Calculator.",
        "detailed_answer": "We enforce an architectural 'seam'. Numerical KPIs (revenue, gross profit, inventory turnover, VAT) are computed deterministically using Pandas and DuckDB. The LLM is NEVER asked to do math. It receives the already-computed numbers to write narrative explanations. Furthermore, our Verified Report Generator runs a regex verification pass that cross-checks every single number in the LLM's prose against ground truth before finalizing the report."
    },
    {
        "category": "AI, LLMs & Hallucination",
        "question": "Why did you choose Qwen 2.5 and Gemma 3 instead of larger models like Llama 3 8B or Mistral 7B?",
        "quick_answer": "To run within a 4GB VRAM consumer hardware envelope.",
        "detailed_answer": "Our target users are small retail businesses and pharmacies using standard desktop workstations (e.g. Intel Core i7 with NVIDIA Quadro T1000 4GB VRAM). Qwen 2.5 (1.5B/3B) and Gemma 3 (1B) quantized with Q4_K_M fit comfortably within 1.2GB\u20132.8GB VRAM, delivering sub-2s warm latency without triggering out-of-memory crashes."
    },
    {
        "category": "Architecture & Engineering",
        "question": "What happens if a user uploads a messy Excel sheet with missing dates or mismatched headers?",
        "quick_answer": "Our Schema Mapping & Pre-Flight Validation layer catches and corrects it.",
        "detailed_answer": "Module 6.3 reads a 10-row preview, runs Levenshtein distance and synonym matching to propose column mappings, and pauses to present an interactive mapping editor. In addition, our pre-flight validation module checks for null values, negative amounts, and invalid date formats, generating an explicit data hygiene verdict before anything enters the knowledge base."
    },
    {
        "category": "Architecture & Engineering",
        "question": "How does the Intent Router decide between the KPI Engine and Chroma Vector RAG?",
        "quick_answer": "Via a deterministic regex and keyword router with 100% dispatch accuracy.",
        "detailed_answer": "In our benchmarks, pure LLM routing was prone to confusion with mixed language. We engineered a Deterministic Intent Router in `rag/router.py` using high-precision regex patterns and operational priority rules. If a query asks for sums, averages, rankings, or dates, it routes to the KPI engine; if it asks about customer details or policy lookups, it routes to ChromaDB."
    },
    {
        "category": "Architecture & Engineering",
        "question": "How do you handle Roman Urdu queries like 'Aaj kitni sale hui'?",
        "quick_answer": "Through a specialized domain dictionary and phonetic normalization module.",
        "detailed_answer": "`backend/app/language/roman_urdu.py` contains a phonetic dictionary mapping colloquial Roman Urdu phrases (e.g. 'sale kitni hui', 'expire kab hogi') into canonical English intent queries before routing, allowing local shopkeepers to interact in their everyday spoken language without fine-tuning."
    },
    {
        "category": "Data & Privacy",
        "question": "How did you verify that zero data leaves the computer?",
        "quick_answer": "Through empirical Wireshark packet capture and strict offline environment flags.",
        "detailed_answer": "We set `HF_HUB_OFFLINE=1` and `TRANSFORMERS_OFFLINE=1` in `config.py`. During the 91-question benchmark, we monitored the network adapter using Wireshark and `netstat`. Zero outbound packets were transmitted outside 127.0.0.1 (except during the initial one-time Shopify REST pull)."
    },
    {
        "category": "Data & Privacy",
        "question": "What is the purpose of the Local Data Security Module (6.10) if the app is already offline?",
        "quick_answer": "At-rest encryption protects data if the computer is shared, stolen, or accessed by unauthorized staff.",
        "detailed_answer": "Offline does not equal secure. In retail environments, cashiers, technicians, or visitors might access the workstation. Module 6.10 encrypts vector indexes and cached data using AES-256-GCM, deriving keys from machine hardware signatures so raw financial ledgers cannot be copied to a USB drive."
    },
    {
        "category": "Statistical Anomaly Detection",
        "question": "Why use statistical Z-Score and IQR rather than an AI anomaly model like Isolation Forest?",
        "quick_answer": "Deterministic explainability, sub-millisecond execution, and regulatory auditability.",
        "detailed_answer": "In accounting, an auditor requires an exact mathematical explanation for why an invoice was flagged. An AI black box cannot provide this. Z-scores (|z| > 3.0) and IQR fences (Q1 - 1.5*IQR) provide mathematical proof of variance, execute in milliseconds on CPU, and are easily explained to business owners."
    },
    {
        "category": "Scope & Stretch Goals",
        "question": "Why did you exclude a published Shopify App Store plugin or public WordPress plugin?",
        "quick_answer": "Because a public App Store plugin requires cloud server hosting, violating the offline-first privacy premise.",
        "detailed_answer": "Publishing an app on the Shopify App Store mandates hosting webhooks and OAuth endpoints on a public cloud server, which directly contradicts our core value proposition of 0% cloud data egress. Our Shopify Admin API connector pulls data locally through direct private tokens, preserving 100% on-premises privacy."
    }
];

// Export for browser
if (typeof window !== 'undefined') {
    window.PROJECT_META = PROJECT_META;
    window.MODULES_DATA = MODULES_DATA;
    window.FILE_CATALOG = FILE_CATALOG;
        window.BENCHMARK_DATA = BENCHMARK_DATA;
    window.VIVA_QUESTIONS = VIVA_QUESTIONS;
}
