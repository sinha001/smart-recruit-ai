from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import process

app = FastAPI(title="Smart Recruit AI")

origins = [
    "http://localhost:3000",  # your frontend origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    print("🚀 Starting up FastAPI...")

app.include_router(process.router, prefix="/api")
print("📦 Router /api included.")
