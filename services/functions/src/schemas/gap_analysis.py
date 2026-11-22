from typing import List, Optional

from pydantic import BaseModel, Field


class CoverageGapRequest(BaseModel):
    profile_id: str = Field(..., description="UUID of the profile (self or child) to analyze")
    monthly_income: Optional[float] = Field(default=None, ge=0, description="Monthly income in SGD")
    dependents_count: Optional[int] = Field(default=0, ge=0, description="Number of dependents")


class CoverageSummaryItem(BaseModel):
    category: str
    current_coverage: float
    recommended_coverage: float
    gap_amount: float
    is_adequate: bool


class CoverageGapResponse(BaseModel):
    profile_id: str
    currency: str = "SGD"
    total_annual_premium: float
    items: List[CoverageSummaryItem]
