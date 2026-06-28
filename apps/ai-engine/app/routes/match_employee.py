# pyrefly: ignore [missing-import]
from flask import Blueprint, request, jsonify
from app.engine.scorer import score_match
from app.engine.ranker import rank_matches

bp = Blueprint('match_employee', __name__)

@bp.route('/employee', methods=['POST'])
def match_employee():
    """
    Employee -> Jobs match
    Takes preferences and list of jobs, returns top 3 matching jobs.
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Missing JSON request body"}), 400
            
        preferences = data.get('preferences')
        jobs = data.get('jobs')
        
        if not preferences or not isinstance(preferences, dict):
            return jsonify({"error": "Missing or invalid 'preferences' object"}), 400
            
        if jobs is None or not isinstance(jobs, list):
            return jsonify({"error": "Missing or invalid 'jobs' array"}), 400
            
        matches = []
        for job in jobs:
            if not isinstance(job, dict):
                continue
            
            score, breakdown = score_match(preferences, job, is_employee_matching=True)
            
            matches.append({
                "job_id": job.get('id'),
                "title": job.get('title'),
                "score": score,
                "breakdown": breakdown
            })
            
        top_matches = rank_matches(matches, top_n=3)
        
        return jsonify({"matches": top_matches}), 200
        
    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500
