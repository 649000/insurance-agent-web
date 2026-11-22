from domain.policy_calculator import calculate_coverage_gap


def test_calculate_coverage_gap_with_empty_policies():
    result = calculate_coverage_gap(
        profile_id="a0000000-0000-0000-0000-000000000001",
        policies=[],
        monthly_income=5000.0,
    )

    assert result.currency == "SGD"
    assert result.total_annual_premium == 0.0
    assert len(result.items) == 5

    life_item = next(item for item in result.items if item.category == "LIFE")
    assert life_item.current_coverage == 0.0
    # Annual income 60,000 * 9 = 540,000
    assert life_item.recommended_coverage == 540000.0
    assert life_item.gap_amount == 540000.0
    assert not life_item.is_adequate


def test_calculate_coverage_gap_with_active_policies():
    policies = [
        {
            "id": "1",
            "category": "LIFE",
            "status": "ACTIVE",
            "sum_assured": 600000.0,
            "premium_amount": 200.0,
            "premium_frequency": "MONTHLY",
        },
        {
            "id": "2",
            "category": "CRITICAL_ILLNESS",
            "status": "ACTIVE",
            "sum_assured": 250000.0,
            "premium_amount": 1000.0,
            "premium_frequency": "ANNUALLY",
        },
        {
            "id": "3",
            "category": "LIFE",
            "status": "LAPSED",  # Should be excluded
            "sum_assured": 500000.0,
            "premium_amount": 1500.0,
            "premium_frequency": "ANNUALLY",
        },
    ]

    result = calculate_coverage_gap(
        profile_id="a0000000-0000-0000-0000-000000000001",
        policies=policies,
        monthly_income=5000.0,
    )

    # 200 * 12 + 1000 = 3400 annual premium
    assert result.total_annual_premium == 3400.0

    life_item = next(item for item in result.items if item.category == "LIFE")
    assert life_item.current_coverage == 600000.0
    assert life_item.recommended_coverage == 540000.0
    assert life_item.gap_amount == 0.0
    assert life_item.is_adequate

    ci_item = next(item for item in result.items if item.category == "CRITICAL_ILLNESS")
    assert ci_item.current_coverage == 250000.0
    assert ci_item.recommended_coverage == 240000.0
    assert ci_item.gap_amount == 0.0
    assert ci_item.is_adequate
