from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_employer_match_endpoint_returns_matches():
    response = client.post(
        "/match/employer",
        json={
            "desiredProfile": {
                "location": "Addis Ababa",
                "workType": "Full-time",
                "salaryOfferMin": 15000,
                "salaryOfferMax": 45000,
                "institutionType": "Public Hospital",
                "languages": ["Amharic", "English"],
                "culture": "Collaborative",
                "healthPriorities": ["Critical Care", "Mental Health"],
            },
            "candidates": [
                {
                    "id": 1,
                    "name": "Alem",
                    "location": "Addis Ababa",
                    "workType": "Full-time",
                    "salaryExpectationMin": 15000,
                    "salaryExpectationMax": 40000,
                    "institutionType": "Public Hospital",
                    "languages": ["Amharic", "English"],
                    "culture": "Collaborative",
                    "healthPriorities": ["Critical Care", "Mental Health"],
                }
            ],
        },
    )

    assert response.status_code == 200
    payload = response.json()
    assert "matches" in payload
    assert len(payload["matches"]) >= 1


def test_employee_match_endpoint_returns_matches():
    response = client.post(
        "/match/employee",
        json={
            "preferences": {
                "location": "Addis Ababa",
                "workType": "Full-time",
                "salaryMin": 15000,
                "salaryMax": 45000,
                "institutionType": "Public Hospital",
                "languages": ["Amharic", "English"],
                "culture": "Collaborative",
                "healthPriorities": ["Critical Care", "Mental Health"],
            },
            "jobs": [
                {
                    "id": 1,
                    "title": "Nurse",
                    "location": "Addis Ababa",
                    "workType": "Full-time",
                    "salaryMin": 15000,
                    "salaryMax": 45000,
                    "institutionType": "Public Hospital",
                    "languages": ["Amharic", "English"],
                    "culture": "Collaborative",
                    "healthPriorities": ["Critical Care", "Mental Health"],
                }
            ],
        },
    )

    assert response.status_code == 200
    payload = response.json()
    assert "matches" in payload
    assert len(payload["matches"]) >= 1
