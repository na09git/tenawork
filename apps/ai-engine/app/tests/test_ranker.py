import pytest
from app.engine.ranker import rank_matches

def test_top_3_from_10():
    matches = [{"id": i, "score": i} for i in range(10)]
    ranked = rank_matches(matches, 3)
    assert len(ranked) == 3
    assert ranked[0]['score'] == 9
    assert ranked[1]['score'] == 8
    assert ranked[2]['score'] == 7

def test_top_10_from_20():
    matches = [{"id": i, "score": i} for i in range(20)]
    ranked = rank_matches(matches, 10)
    assert len(ranked) == 10
    assert ranked[0]['score'] == 19
    assert ranked[9]['score'] == 10

def test_sorted_descending():
    matches = [{"score": 10}, {"score": 50}, {"score": 30}]
    ranked = rank_matches(matches, 10)
    assert ranked[0]['score'] == 50
    assert ranked[1]['score'] == 30
    assert ranked[2]['score'] == 10

def test_empty_input():
    ranked = rank_matches([], 5)
    assert isinstance(ranked, list)
    assert len(ranked) == 0
