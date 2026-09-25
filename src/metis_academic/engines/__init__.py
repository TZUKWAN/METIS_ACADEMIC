"""三大研究范式执行引擎（Phase N/O/P）。"""

from .qualitative import Code, CodingRecord, Material, QualitativeEngine
from .quantitative import AnalysisResult, ModelSpec, QuantEngine, VariableDict, ols
from .theoretical import ArgumentEdge, Claim, Concept, CounterArgument, Evidence, TheoreticalEngine

__all__ = [
    "QualitativeEngine",
    "Material",
    "Code",
    "CodingRecord",
    "QuantEngine",
    "VariableDict",
    "ModelSpec",
    "AnalysisResult",
    "ols",
    "TheoreticalEngine",
    "Concept",
    "Claim",
    "Evidence",
    "CounterArgument",
    "ArgumentEdge",
]
