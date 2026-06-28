from app.engine.normalizer import normalize_string, normalize_list

def score_location(pref, actual):
    """exact match = 25, same region = 10, else 0"""
    p = normalize_string(pref)
    a = normalize_string(actual)
    if not p or not a:
        return 0.0
    if p == a:
        return 25.0
    # Basic same region check: one is substring of another
    if p in a or a in p:
        return 10.0
    return 0.0

def score_work_type(pref, actual):
    """exact match = 20, else 0"""
    p = normalize_string(pref)
    if not p:
        return 0.0
    a_list = normalize_list(actual) if isinstance(actual, list) else [normalize_string(actual)]
    if p in a_list:
        return 20.0
    return 0.0

def score_salary(pref_min, pref_max, actual_min, actual_max):
    """ranges overlap = 20, partial overlap = 10, else 0"""
    if pref_min is None and pref_max is None:
        return 0.0
    try:
        p_min = float(pref_min) if pref_min is not None else 0.0
        p_max = float(pref_max) if pref_max is not None else float('inf')
        a_min = float(actual_min) if actual_min is not None else 0.0
        a_max = float(actual_max) if actual_max is not None else float('inf')
    except (ValueError, TypeError):
        return 0.0
    
    if p_min <= a_max and a_min <= p_max:
        if (p_min >= a_min and p_max <= a_max) or (a_min >= p_min and a_max <= p_max):
            return 20.0
        else:
            return 10.0
    return 0.0

def score_institution_type(pref, actual):
    """exact match = 10, else 0"""
    p = normalize_string(pref)
    if not p:
        return 0.0
    a_list = normalize_list(actual) if isinstance(actual, list) else [normalize_string(actual)]
    if p in a_list:
        return 10.0
    return 0.0

def score_languages(pref, actual):
    """5 pts per shared language, max 10"""
    p_list = normalize_list(pref)
    a_list = normalize_list(actual)
    shared = set(p_list).intersection(set(a_list))
    score = len(shared) * 5.0
    return min(score, 10.0)

def score_culture(pref, actual):
    """exact match = 5, else 0"""
    p = normalize_string(pref)
    a = normalize_string(actual)
    if not p or not a:
        return 0.0
    if p == a:
        return 5.0
    return 0.0

def score_health_priorities(pref, actual):
    """(matched / total_required) * 10"""
    p_list = normalize_list(pref)
    a_list = normalize_list(actual)
    if not p_list:
        return 0.0
    shared = set(p_list).intersection(set(a_list))
    return (len(shared) / len(p_list)) * 10.0

def score_free_text_bonus(pref_text, actual_text, actual_fields):
    """keyword overlap between free_text/bio and other fields/description, scaled 0-5"""
    p = normalize_string(pref_text)
    a_text = normalize_string(actual_text)
    
    combined_actual = a_text + " " + " ".join([normalize_string(v) for v in actual_fields if v])
    combined_actual_words = set(combined_actual.split())
    
    if not p or not combined_actual_words:
        return 0.0
        
    p_words = set(p.split())
    overlap = len(p_words.intersection(combined_actual_words))
    
    score = overlap * 1.0
    return min(score, 5.0)

def score_match(preferences, item, is_employee_matching=True):
    """Calculate the match score and return total score + breakdown."""
    breakdown = {}
    
    breakdown['location'] = score_location(preferences.get('location'), item.get('location'))
    breakdown['work_type'] = score_work_type(preferences.get('work_type'), item.get('work_type'))
    
    if is_employee_matching:
        breakdown['salary'] = score_salary(
            preferences.get('salary_min'), preferences.get('salary_max'),
            item.get('salary_min'), item.get('salary_max')
        )
    else:
        breakdown['salary'] = score_salary(
            item.get('salary_expectation_min'), item.get('salary_expectation_max'),
            preferences.get('salary_offer_min'), preferences.get('salary_offer_max')
        )
        
    breakdown['institution_type'] = score_institution_type(preferences.get('institution_type'), item.get('institution_type'))
    breakdown['languages'] = score_languages(preferences.get('languages'), item.get('languages'))
    breakdown['culture'] = score_culture(preferences.get('culture'), item.get('culture'))
    breakdown['health_priorities'] = score_health_priorities(preferences.get('health_priorities'), item.get('health_priorities'))
    
    if is_employee_matching:
        other_fields = [
            item.get('location'), item.get('work_type'), item.get('institution_type'),
            *item.get('languages', []), item.get('culture'), *item.get('health_priorities', [])
        ]
        breakdown['free_text_bonus'] = score_free_text_bonus(
            preferences.get('free_text'),
            item.get('description'),
            other_fields
        )
    else:
        other_fields = [
            item.get('location'), 
            *(item.get('work_type', []) if isinstance(item.get('work_type'), list) else [item.get('work_type')]), 
            *(item.get('institution_type', []) if isinstance(item.get('institution_type'), list) else [item.get('institution_type')]),
            *item.get('languages', []), item.get('culture'), *item.get('health_priorities', [])
        ]
        breakdown['free_text_bonus'] = score_free_text_bonus(
            preferences.get('free_text'),
            item.get('bio'),
            other_fields
        )
        
    total = sum(breakdown.values())
    total = min(total, 100.0)
    
    return total, breakdown
