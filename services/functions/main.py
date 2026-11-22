import os
import sys

from firebase_functions import https_fn, options

# Ensure src directory is in sys.path for both local testing and GCP Cloud Run runtime
SRC_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "src"))
if SRC_DIR not in sys.path:
    sys.path.insert(0, SRC_DIR)

from src.core.config import initialize_firebase  # noqa: E402
from src.domain.policy_calculator import calculate_coverage_gap  # noqa: E402
from src.schemas.gap_analysis import CoverageGapRequest  # noqa: E402

# Initialize Firebase Admin
initialize_firebase()


@https_fn.on_call(
    memory=options.MemoryOption.MB_256,
    timeout_sec=60,
    min_instances=0,
    max_instances=10,
    cors=options.CorsOptions(
        cors_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
        cors_methods=["POST", "OPTIONS"],
    ),
)
def analyze_coverage_gap(req: https_fn.CallableRequest) -> dict:
    """
    Firebase Callable endpoint to calculate Singapore insurance gap analysis.
    Verifies that the requester is authenticated via Firebase Auth.
    """
    if not req.auth or not req.auth.uid:
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.UNAUTHENTICATED,
            message="User must be authenticated with Firebase Auth.",
        )

    # Validate input with Pydantic v2
    try:
        data = CoverageGapRequest.model_validate(req.data)
    except Exception as e:
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.INVALID_ARGUMENT,
            message=f"Invalid request data: {str(e)}",
        ) from e

    # In production, queries Supabase using pooler with req.auth.uid & profile_id
    # Here we invoke the pure calculation domain logic
    response = calculate_coverage_gap(
        profile_id=data.profile_id,
        policies=[],
        monthly_income=data.monthly_income or 5000.0,
    )

    return response.model_dump()
