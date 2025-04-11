"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Briefcase, User, Mail, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"

type JobDescription = {
  skills: string[]
  experience: string
  education: string
  responsibilities: string[]
}

type CandidateProfile = {
  name: string
  skills: string[]
  experience: string
  education: string
}

type ProcessResponse = {
  jd_summary: JobDescription
  cv_summary: CandidateProfile
  match_score: number
  shortlisted: boolean
  interview_email: string
}

export default function SmartRecruitAI() {
  const [jdFile, setJdFile] = useState<File | null>(null)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ProcessResponse | null>(null)

  const handleJdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setJdFile(e.target.files[0])
    }
  }

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0])
    }
  }

  const handleProcess = async () => {
    if (!jdFile || !cvFile) {
      setError("Please upload both Job Description and CV files")
      return
    }

    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("jd_file", jdFile)
    formData.append("cv_file", cvFile)

    try {
      const response = await fetch("https://smart-recruit-ai-u2rw.vercel.app/api/process", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendInvite = () => {
    toast("Interview Invite Sent", {
      description: `Email sent to ${result?.cv_summary.name}`,
    })
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Smart Recruit AI</h1>
        <p className="mt-2 text-gray-600">AI-powered recruitment assistant</p>
      </header>

      <div className="mx-auto max-w-4xl space-y-6">
        {/* Upload Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Upload Job Description & CV</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 hover:bg-gray-100 cursor-pointer"
                  onClick={() => document.getElementById("jd-upload")?.click()}
                >
                  <Upload className="mb-2 h-8 w-8 text-gray-400" />
                  <p className="text-sm font-medium">Upload Job Description (JD)</p>
                  <p className="text-xs text-gray-500">PDF up to 5MB</p>
                  <input id="jd-upload" type="file" className="hidden" accept=".pdf" onChange={handleJdUpload} />
                </div>
                {jdFile && (
                  <div className="flex items-center rounded-md bg-gray-100 p-2">
                    <FileText className="mr-2 h-5 w-5 text-gray-500" />
                    <span className="text-sm truncate">{jdFile.name}</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 hover:bg-gray-100 cursor-pointer"
                  onClick={() => document.getElementById("cv-upload")?.click()}
                >
                  <Upload className="mb-2 h-8 w-8 text-gray-400" />
                  <p className="text-sm font-medium">Upload Candidate CV</p>
                  <p className="text-xs text-gray-500">PDF up to 5MB</p>
                  <input id="cv-upload" type="file" className="hidden" accept=".pdf" onChange={handleCvUpload} />
                </div>
                {cvFile && (
                  <div className="flex items-center rounded-md bg-gray-100 p-2">
                    <FileText className="mr-2 h-5 w-5 text-gray-500" />
                    <span className="text-sm truncate">{cvFile.name}</span>
                  </div>
                )}
              </div>
            </div>

            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}

            <Button onClick={handleProcess} disabled={isLoading || !jdFile || !cvFile} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Process Files"
              )}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <>
            {/* Job Description Summary */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                <CardTitle>Job Description Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.jd_summary.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-700">Experience</h3>
                  <p className="text-sm text-gray-600">{result.jd_summary.experience}</p>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-700">Education</h3>
                  <p className="text-sm text-gray-600">{result.jd_summary.education}</p>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-700">Responsibilities</h3>
                  <ul className="ml-5 list-disc text-sm text-gray-600">
                    {result.jd_summary.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Candidate Profile */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center">
                <User className="mr-2 h-5 w-5" />
                <CardTitle>Candidate Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-700">Name</h3>
                  <p className="text-sm text-gray-600">{result.cv_summary.name}</p>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-700">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.cv_summary.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-700">Experience</h3>
                  <p className="text-sm text-gray-600">{result.cv_summary.experience}</p>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-700">Education</h3>
                  <p className="text-sm text-gray-600">{result.cv_summary.education}</p>
                </div>
              </CardContent>
            </Card>

            {/* Match Score */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Match Score</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center">
                  <div className="mb-2 flex items-center justify-center rounded-full bg-gray-100 p-4 h-24 w-24">
                    <span className="text-2xl font-bold">{result.match_score}%</span>
                  </div>

                  <div className="w-full max-w-md">
                    <Progress value={result.match_score} className="h-2" />
                  </div>

                  <div className="mt-4 flex items-center">
                    {result.shortlisted ? (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="font-medium text-green-600">✅ Shortlisted</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="mr-2 h-5 w-5 text-red-500" />
                        <span className="font-medium text-red-600">❌ Not Shortlisted</span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interview Invite */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center">
                <Mail className="mr-2 h-5 w-5" />
                <CardTitle>Interview Invite</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea className="min-h-[200px] font-mono text-sm" value={result.interview_email} readOnly />
                <Button onClick={handleSendInvite} className="w-full sm:w-auto">
                  Send Interview Invite
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
