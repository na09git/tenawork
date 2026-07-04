from fastapi import FastAPI
from app.engine.ranker import rank_matches
from app.engine.scorer import score_match

app = FastAPI(title="Tenawork AI Engine")


@app.get("/")
def read_root():
    return {"message": "AI Engine is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.post("/match/employee")
def match_employee(payload: dict):
    preferences = payload.get("preferences") or {}
    jobs = payload.get("jobs") or []

    matches = []
    for job in jobs:
        if not isinstance(job, dict):
            continue
        score, breakdown = score_match(preferences, job, is_employee_matching=True)
        matches.append({
            "jobId": job.get("id"),
            "title": job.get("title"),
            "score": score,
            "breakdown": breakdown,
        })

    return {"matches": rank_matches(matches, top_n=3)}


@app.post("/match/employer")
def match_employer(payload: dict):
    desired_profile = payload.get("desiredProfile") or {}
    candidates = payload.get("candidates") or []

    matches = []
    for candidate in candidates:
        if not isinstance(candidate, dict):
            continue
        score, breakdown = score_match(desired_profile, candidate, is_employee_matching=False)
        matches.append({
            "candidateId": candidate.get("id"),
            "name": candidate.get("name"),
            "score": score,
            "breakdown": breakdown,
        })

    return {"matches": rank_matches(matches, top_n=10)}
