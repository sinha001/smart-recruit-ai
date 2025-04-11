import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const jdFile = formData.get("jd_file") as File
    const cvFile = formData.get("cv_file") as File

    if (!jdFile || !cvFile) {
      return NextResponse.json({ error: "Missing files" }, { status: 400 })
    }

    const backendForm = new FormData()
    backendForm.append("jd_file", jdFile)
    backendForm.append("cv_file", cvFile)

    const res = await fetch("http://127.0.0.1:8000/api/process", {
      method: "POST",
      body: backendForm,
    })

    const data = await res.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error forwarding files to backend:", error)
    return NextResponse.json({ error: "Failed to process files" }, { status: 500 })
  }
}
