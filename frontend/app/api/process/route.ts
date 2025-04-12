import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const jdFile = formData.get("jd_file") as File
  const cvFile = formData.get("cv_file") as File

  if (!jdFile || !cvFile) {
    return NextResponse.json({ error: "Missing files" }, { status: 400 })
  }

  try {
    const backendForm = new FormData()
    backendForm.append("jd_file", jdFile)
    backendForm.append("cv_file", cvFile)

    const res = await fetch("https://smart-recruit-ai-backend.onrender.com/api/process", {
      method: "POST",
      body: backendForm,
    })

    // 🧠 If backend fails, fall back to sample demo data
    if (!res.ok) throw new Error("Backend failed")

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.warn("Backend failed. Returning mock demo data.", error)
    return NextResponse.json({
      demoMode: true,
      jd_summary: {
        skills: ["Python", "Flask", "SQL", "REST APIs"],
        experience: "3+ years",
        education: "B.Tech in CS",
        responsibilities: [
          "Build REST APIs",
          "Write SQL queries",
          "Work with frontend team",
        ],
      },
      cv_summary: {
        name: "Jane Doe",
        skills: ["Python", "SQL", "Django"],
        experience: "4 years",
        education: "Bachelor's in Computer Science",
      },
      match_score: 85,
      shortlisted: true,
      interview_email: `Dear Jane Doe,\n\nWe are pleased to invite you for an interview. Please reply with a suitable time.\n\nThanks,\nHR Team`,
    })
  }
}
