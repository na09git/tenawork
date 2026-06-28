# pyrefly: ignore [missing-import]
from flask import Blueprint, request, jsonify
from app.engine.scorer import score_match
from app.engine.ranker import rank_matches

bp = Blueprint('match_employer', __name__)

@bp.route('/employer', methods=['POST'])
def match_employer():
    """
    Employer -> Employees match
    Takes desired_profile and list of candidates, returns top 10 matching candidates.
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Missing JSON request body"}), 400
            
        desired_profile = data.get('desired_profile')
        candidates = data.get('candidates')
        
        if not desired_profile or not isinstance(desired_profile, dict):
            return jsonify({"error": "Missing or invalid 'desired_profile' object"}), 400
            
        if candidates is None or not isinstance(candidates, list):
            return jsonify({"error": "Missing or invalid 'candidates' array"}), 400
            
        matches = []
        for candidate in candidates:
            if not isinstance(candidate, dict):
                continue
            
            score, breakdown = score_match(desired_profile, candidate, is_employee_matching=False)
            
            matches.append({
                "candidate_id": candidate.get('id'),
                "name": candidate.get('name'),
                "score": score,
                "breakdown": breakdown
            })
            
        top_matches = rank_matches(matches, top_n=10)
        
        return jsonify({"matches": top_matches}), 200
        
    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500
