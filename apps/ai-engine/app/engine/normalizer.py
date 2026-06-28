def normalize_string(val):
    """Lowercase and strip all string fields."""
    if val is None:
        return ""
    return str(val).lower().strip()

def normalize_list(val):
    """Convert all string lists to lowercase stripped lists."""
    if val is None:
        return []
    if isinstance(val, list):
        return [normalize_string(v) for v in val if v is not None]
    return [normalize_string(val)]
