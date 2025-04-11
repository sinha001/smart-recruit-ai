import ollama
import json

def get_summary_and_score(jd_text, cv_text):
    print("🤖 Sending JD and CV to Ollama for scoring...")

    prompt = f"""
You are a JSON-only generator. Never write explanations. Never write code. Your entire output should be only a JSON object.

Format:
{{
  "jd_summary": {{
    "skills": ["Python", "SQL"],
    "experience": "2+ years",
    "education": "Bachelor's Degree in Computer Science",
    "responsibilities": ["Build APIs", "Manage databases"]
  }},
  "cv_summary": {{
    "name": "John Doe",
    "skills": ["Python", "PostgreSQL"],
    "experience": "3 years as Backend Engineer",
    "education": "B.Tech in Computer Science"
  }},
  "match_score": 80,
  "shortlisted": true,
  "interview_email": "Dear John Doe, we'd like to invite you to an interview on..."
}}

Now analyze the following.

Job Description:
{jd_text}

Candidate CV:
{cv_text}

Respond ONLY with valid JSON. Do not add any explanation or code.
"""


    response = ollama.chat(
        model="phi",
        messages=[{"role": "user", "content": prompt}]
    )

    content = response["message"]["content"]
    print("🧠 Model replied:", content)

    try:
        result = json.loads(content)
        print("✅ Successfully parsed model response.")
        return result
    except json.JSONDecodeError as e:
        print("❌ JSON parsing failed:", e)
        return {"error": "Model returned invalid JSON"}
