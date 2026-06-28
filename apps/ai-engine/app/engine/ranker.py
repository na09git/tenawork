def rank_matches(matches, top_n):
    """
    Sort items descending by score and return top N.
    """
    if not matches:
        return []
        
    sorted_matches = sorted(matches, key=lambda x: x.get('score', 0), reverse=True)
    
    return sorted_matches[:top_n]
