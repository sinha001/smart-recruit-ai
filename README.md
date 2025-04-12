
# 🧠 Smart Recruit AI

Smart Recruit AI is an AI-driven recruitment assistant designed to automate resume screening and candidate-job compatibility matching. Built with a multi-agent architecture and powered by local LLMs (phi via Ollama), it provides fast, bias-free, and intelligent hiring support.

---

## ⚙️ Backend Setup

### 🔧 Prerequisites
- Python 3.10+
- pip

### 🛠️ Steps

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

> Your FastAPI server will run at `http://localhost:8000`

---

## 💻 Frontend Setup

### 🔧 Prerequisites
- Node.js 18+
- npm or yarn

### 🛠️ Steps

```bash
cd frontend
npm install
npm run dev
```

> Your Next.js frontend will be live at `http://localhost:3000`

---

## 🛠️ How It Works

1. **Ollama Setup**  
   Install Ollama from [https://ollama.com](https://ollama.com) and run:
   ```bash
   ollama run phi
   ```
   Keep this running — this is your local LLM server.

2. **PDF Upload**  
   Upload a **Job Description** and a **Resume** through the frontend.

3. **Parsing**  
   The backend parses both files into structured JSON format.

4. **Evaluation**  
   The LLM (`phi` model) evaluates the resume against the job and returns:
   - Compatibility score
   - Summary
   - Interview recommendation

5. **Frontend Display**  
   Parsed data and AI decisions are shown on a clean and intuitive UI.

---

## 📁 Project Structure

```
sinha001-smart-recruit-ai/
├── backend/
│   ├── main.py
│   ├── routes/process.py
│   ├── utils/
│   │   ├── pdf_parser.py
│   │   └── ollama_handler.py
│   └── models/schemas.py
├── frontend/
│   ├── app/ (Next.js App)
│   ├── components/ui/ (ShadCN UI)
│   └── api/process/route.ts
```

---

## 🧰 Tech Stack

### Frontend:
- **Next.js**, **TypeScript**
- **TailwindCSS**, **ShadCN UI**
- **clsx**, **tailwind-merge**
- **lucide-react**, **@radix-ui/react-toast**

### Backend:
- **Python 3**, **FastAPI**
- **Ollama** (phi model)
- **PyPDF2**, **uuid**, **shutil**, **os**

---

## 🎥 Demo

Watch the full demo here: [📺 Demo Video](/video/smart-recruit-ai-demo-video.mp4)

> Note: This project needs **ollama with phi model** running locally to work.
>If you have OpenAI or Gemini APIs, you can tweak the code to use those for broader accessibility.
---

## 🤝 Contributions

Contributions are welcome!  
Feel free to fork the project, open issues, or create pull requests.

---

## 📜 License

Licensed under the **MIT License**.  
Feel free to use, modify, and share this project with proper attribution.

---


---

## ⚠️ Important Note

> The demo link that may be shared **will not work as a live hosted demo**.  [🌐	Smart-Recurit-AI](https://smart-recruit-ai.vercel.app/)
> This project requires **Ollama** running **locally** with the `phi` model installed.  

To use this project:
- Make sure you have [Ollama](https://ollama.com) installed and running with `ollama run phi`
- This is necessary for the LLM evaluation to function.

> ⚙️ Optional: If you want to make this publicly usable, you can **replace Ollama with OpenAI or Gemini APIs** by tweaking the backend LLM handler in `ollama_handler.py`.
