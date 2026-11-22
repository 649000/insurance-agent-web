from firebase_functions import https_fn, options

from core.config import initialize_firebase
from domain.policy_calculator import calculate_coverage_gap
from schemas.gap_analysis import CoverageGapRequest

# Initialize Firebase Admin
initialize_firebase()

# Standard deployment options according to AGENTS.md cost & resource controls
CALLABLE_OPTIONS = options.CallableOptions(
    memory=options.MemoryOption.MB_256,
    timeout_sec=60,
    min_instances=0,
    max_instances=10,
    cors=options.CorsOptions(
        cors_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
        cors_methods=["POST", "OPTIONS"],
    ),
)


@https_fn.on_call(options=CALLABLE_OPTIONS)
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
