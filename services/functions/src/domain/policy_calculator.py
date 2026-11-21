from typing import List, Dict, Any
from schemas.gap_analysis import CoverageGapResponse, CoverageSummaryItem

# Standard Singapore LIA (Life Insurance Association) baseline benchmark heuristics:
# Death / Total Permanent Disability: ~9-10x annual income
# Critical Illness: ~4-5x annual income
INCOME_MULTIPLIER_LIFE = 9.0
INCOME_MULTIPLIER_CI = 4.0

def calculate_coverage_gap(
    profile_id: str,
    policies: List[Dict[str, Any]],
    monthly_income: float = 5000.0,
) -> CoverageGapResponse:
    """
    Calculates coverage gap analysis for a given profile based on active policies.
    Hermetic pure calculation function for easy unit testing.
    """
    annual_income = monthly_income * 12.0
    
    # Calculate current coverage by category
    coverage_totals: Dict[str, float] = {
        'LIFE': 0.0,
        'CRITICAL_ILLNESS': 0.0,
        'HEALTH': 0.0,
        'DISABILITY': 0.0,
        'PERSONAL_ACCIDENT': 0.0,
    }
    
    total_annual_premium = 0.0
    
    for p in policies:
        if p.get('status') != 'ACTIVE':
            continue
            
        category = p.get('category')
        sum_assured = float(p.get('sum_assured', 0.0))
        premium = float(p.get('premium_amount', 0.0))
        freq = p.get('premium_frequency', 'ANNUALLY')
        
        # Normalize annual premium
        if freq == 'MONTHLY':
            total_annual_premium += premium * 12.0
        elif freq == 'QUARTERLY':
            total_annual_premium += premium * 4.0
        elif freq == 'SEMI_ANNUALLY':
            total_annual_premium += premium * 2.0
        elif freq == 'ANNUALLY':
            total_annual_premium += premium
            
        if category in coverage_totals:
            coverage_totals[category] += sum_assured

    # LIA Benchmark recommendations
    recommended_life = annual_income * INCOME_MULTIPLIER_LIFE
    recommended_ci = annual_income * INCOME_MULTIPLIER_CI
    recommended_health = 1000000.0 # Hospital shield plan standard annual claim limit
    recommended_disability = annual_income * 0.75 # 75% income replacement
    recommended_pa = 200000.0 # Baseline personal accident coverage

    items = [
        CoverageSummaryItem(
            category='LIFE',
            current_coverage=coverage_totals['LIFE'],
            recommended_coverage=recommended_life,
            gap_amount=max(0.0, recommended_life - coverage_totals['LIFE']),
            is_adequate=coverage_totals['LIFE'] >= recommended_life,
        ),
        CoverageSummaryItem(
            category='CRITICAL_ILLNESS',
            current_coverage=coverage_totals['CRITICAL_ILLNESS'],
            recommended_coverage=recommended_ci,
            gap_amount=max(0.0, recommended_ci - coverage_totals['CRITICAL_ILLNESS']),
            is_adequate=coverage_totals['CRITICAL_ILLNESS'] >= recommended_ci,
        ),
        CoverageSummaryItem(
            category='HEALTH',
            current_coverage=coverage_totals['HEALTH'],
            recommended_coverage=recommended_health,
            gap_amount=max(0.0, recommended_health - coverage_totals['HEALTH']),
            is_adequate=coverage_totals['HEALTH'] >= recommended_health,
        ),
        CoverageSummaryItem(
            category='DISABILITY',
            current_coverage=coverage_totals['DISABILITY'],
            recommended_coverage=recommended_disability,
            gap_amount=max(0.0, recommended_disability - coverage_totals['DISABILITY']),
            is_adequate=coverage_totals['DISABILITY'] >= recommended_disability,
        ),
        CoverageSummaryItem(
            category='PERSONAL_ACCIDENT',
            current_coverage=coverage_totals['PERSONAL_ACCIDENT'],
            recommended_coverage=recommended_pa,
            gap_amount=max(0.0, recommended_pa - coverage_totals['PERSONAL_ACCIDENT']),
            is_adequate=coverage_totals['PERSONAL_ACCIDENT'] >= recommended_pa,
        ),
    ]

    return CoverageGapResponse(
        profile_id=profile_id,
        currency="SGD",
        total_annual_premium=total_annual_premium,
        items=items,
    )
