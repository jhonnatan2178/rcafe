// ============================================================================
// NEW FILE — save as components/RiskAnalysisPage.tsx
//
// Dedicated landing page for the "Risk & Decision Analysis" tutorial series.
// Pulls only tutorials with that category from TUTORIALS, so it stays in
// sync automatically as you add more — no manual list to maintain here.
// ============================================================================

import { Link } from "react-router-dom";
import { TUTORIALS } from "../constants";

const RISK_CATEGORY = "Risk & Decision Analysis";

// ── signature graphic: a noninferior (Pareto) frontier ───────────────────────
// The one visual every tutorial in this series eventually points back to
// (Tutorials 04, 08, 09) — the frontier curve, the dominated region behind
// it, and a highlighted "chosen compromise" point.
function ParetoFrontierGraphic() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full max-w-sm mx-auto md:mx-0"
      aria-hidden="true"
    >
      {/* axes */}
      <line x1="40" y1="20" x2="40" y2="260" stroke="#64748B" strokeWidth="1.5" />
      <line x1="40" y1="260" x2="380" y2="260" stroke="#64748B" strokeWidth="1.5" />

      {/* dominated (feasible but worse) region, shaded */}
      <path
        d="M 40 60 C 100 60, 150 110, 190 150 C 230 190, 260 230, 380 245 L 380 260 L 40 260 Z"
        fill="#334155"
        fillOpacity="0.5"
      />

      {/* the noninferior frontier itself */}
      <path
        d="M 40 60 C 100 60, 150 110, 190 150 C 230 190, 260 230, 380 245"
        fill="none"
        stroke="#FBBF24"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* chosen-compromise point (Tutorial 04's SWT best compromise) */}
      <circle cx="190" cy="150" r="6" fill="#FBBF24" stroke="#1E2937" strokeWidth="2" />

      <text x="205" y="284" fill="#94A3B8" fontSize="12" fontFamily="ui-monospace, monospace">
        Cost →
      </text>
      <text
        x="8" y="45" fill="#94A3B8" fontSize="12" fontFamily="ui-monospace, monospace"
        transform="rotate(-90 8 45)"
      >
        Risk →
      </text>
    </svg>
  );
}

export default function RiskAnalysisPage() {
  const riskTutorials = TUTORIALS
    .filter((t) => t.category === RISK_CATEGORY)
    .sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative bg-[#1E2937] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-amber-400 uppercase mb-4">
              Systems Engineering · Risk Analysis
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              Engineering judgment,
              <br />
              <span className="text-amber-400">quantified.</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-md">
              {riskTutorials.length} tutorials working through Haimes' systems-based
              risk framework — from the risk triplet to extreme-event
              statistics — modernized with the tools used in practice today.
            </p>
          </div>
          <ParetoFrontierGraphic />
        </div>
      </section>

      {/* ================= INDEX ================= */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="flex items-baseline justify-between mb-12 border-b border-slate-200 pb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            The series, in order
          </h2>
          <span className="font-mono text-sm text-slate-400">
            {riskTutorials.length} tutorials
          </span>
        </div>

        {riskTutorials.length === 0 ? (
          <p className="text-slate-500">
            No tutorials in this series yet — add entries with category{" "}
            <code className="bg-slate-100 px-1 rounded">"{RISK_CATEGORY}"</code>{" "}
            to <code className="bg-slate-100 px-1 rounded">constants.tsx</code>.
          </p>
        ) : (
          <ol className="divide-y divide-slate-200">
            {riskTutorials.map((tutorial, i) => (
              <li key={tutorial.id} className="py-8 group">
                <Link to={`/tutorial/${tutorial.id}`} className="flex gap-6 items-start">
                  <span className="font-mono text-2xl text-amber-500 font-bold w-10 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                        {tutorial.title.replace(/^\d+\s*-\s*/, "")}
                      </h3>
                      <span className="text-xs font-mono uppercase tracking-wide border border-slate-300 text-slate-500 rounded-full px-2 py-0.5">
                        {tutorial.level}
                      </span>
                    </div>
                    <p className="text-slate-600">{tutorial.description}</p>
                  </div>
                  <span className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity self-center shrink-0">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>
    </>
  );
}
