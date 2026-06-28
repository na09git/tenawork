import pytest
from app.engine.scorer import (
    score_location, score_work_type, score_salary, 
    score_institution_type, score_languages, 
    score_culture, score_health_priorities, 
    score_free_text_bonus, score_match
)

def test_perfect_match():
    pref = {
        "location": "Addis Ababa",
        "work_type": "full-time",
        "salary_min": 30000,
        "salary_max": 60000,
        "institution_type": "hospital",
        "languages": ["Amharic", "English"],
        "culture": "collaborative",
        "health_priorities": ["maternal health", "mental health"],
        "free_text": "I prefer morning shifts and a team-based environment"
    }
    job = {
        "location": "Addis Ababa",
        "work_type": "full-time",
        "salary_min": 35000,
        "salary_max": 55000,
        "institution_type": "hospital",
        "languages": ["Amharic", "English"],
        "culture": "collaborative",
        "health_priorities": ["maternal health", "mental health"],
        "description": "morning shifts team-based environment"
    }
    score, breakdown = score_match(pref, job, is_employee_matching=True)
    assert breakdown['location'] == 25.0
    assert breakdown['work_type'] == 20.0
    assert breakdown['salary'] == 20.0
    assert breakdown['institution_type'] == 10.0
    assert breakdown['languages'] == 10.0
    assert breakdown['culture'] == 5.0
    assert breakdown['health_priorities'] == 10.0
    assert breakdown['free_text_bonus'] > 0
    assert score == 100.0

def test_zero_match():
    pref = {
        "location": "Addis Ababa",
        "work_type": "full-time",
        "salary_min": 30000,
        "salary_max": 60000,
        "institution_type": "hospital",
        "languages": ["Amharic", "English"],
        "culture": "collaborative",
        "health_priorities": ["maternal health", "mental health"]
    }
    job = {
        "location": "Dire Dawa",
        "work_type": "part-time",
        "salary_min": 70000,
        "salary_max": 80000,
        "institution_type": "clinic",
        "languages": ["Oromo"],
        "culture": "independent",
        "health_priorities": ["dental care"]
    }
    score, breakdown = score_match(pref, job, is_employee_matching=True)
    assert breakdown['location'] == 0.0
    assert breakdown['work_type'] == 0.0
    assert breakdown['salary'] == 0.0
    assert breakdown['institution_type'] == 0.0
    assert breakdown['languages'] == 0.0
    assert breakdown['culture'] == 0.0
    assert breakdown['health_priorities'] == 0.0
    assert score == 0.0

def test_partial_salary_overlap():
    # p_min=30000, p_max=60000
    # a_min=50000, a_max=70000
    # overlap is from 50000 to 60000 (partial)
    assert score_salary(30000, 60000, 50000, 70000) == 10.0

def test_language_shared():
    # 2 shared languages
    assert score_languages(["Amharic", "English"], ["Amharic", "English", "Oromo"]) == 10.0
    # 1 shared language
    assert score_languages(["Amharic", "English"], ["English", "Oromo"]) == 5.0

def test_health_priorities():
    # 4 total preferences, 2 matched
    assert score_health_priorities(["a", "b", "c", "d"], ["a", "c", "x", "y"]) == 5.0

def test_cap_final_score():
    pref = {
        "location": "Addis Ababa",
        "work_type": "full-time",
        "salary_min": 30000,
        "salary_max": 60000,
        "institution_type": "hospital",
        "languages": ["Amharic", "English"],
        "culture": "collaborative",
        "health_priorities": ["maternal health", "mental health"],
        "free_text": "nurse team morning"
    }
    job = {
        "location": "Addis Ababa",
        "work_type": "full-time",
        "salary_min": 35000,
        "salary_max": 55000,
        "institution_type": "hospital",
        "languages": ["Amharic", "English"],
        "culture": "collaborative",
        "health_priorities": ["maternal health", "mental health"],
        "description": "nurse team morning"
    }
    score, breakdown = score_match(pref, job, is_employee_matching=True)
    # Total base match = 100, free_text adds more
    assert sum(breakdown.values()) > 100
    assert score == 100.0
