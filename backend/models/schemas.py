### backend/models/schemas.py

from pydantic import BaseModel
from typing import List

class JobDescription(BaseModel):
    skills: List[str]
    experience: str
    education: str
    responsibilities: List[str]

class CandidateProfile(BaseModel):
    name: str
    skills: List[str]
    experience: str
    education: str

class ProcessResponse(BaseModel):
    jd_summary: JobDescription
    cv_summary: CandidateProfile
    match_score: int
    shortlisted: bool
    interview_email: str
