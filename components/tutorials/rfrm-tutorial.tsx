// ============================================================================
// NEW TUTORIAL ENTRY — paste this object inside the TUTORIALS array in
// constants.tsx, alongside the other five "Risk & Decision Analysis"
// entries. Same category, so it joins that section automatically.
//
// Optional: add an image at public/images/tutorials/risk-filtering-ranking.jpg,
// or delete the `image` line to use the plain-header layout.
// ============================================================================

{
  id: 'risk-filtering-ranking-management',
  title: '06 - Risk Filtering, Ranking, and Management (RFRM)',
  description: 'An eight-phase funnel — developed by Haimes, Kaplan, and Lambert — for going from hundreds of HHM-identified scenarios to the handful worth full quantitative treatment.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Advanced",
  createdAt: "2026-07-21",
  image: "/images/tutorials/risk-filtering-ranking.jpg",
  content: `
<p>
Tutorial 03's HHM tree does its job well — often too well. Decompose a real
system from several overlapping viewpoints and you don't get a tidy handful of
scenarios, you get hundreds. Running a full quantitative risk assessment (the
kind built in Tutorials 01 and 02) on every single one isn't just impractical,
it's the wrong use of scarce analytical effort. Risk Filtering, Ranking, and
Management (RFRM) — developed by Haimes, Kaplan, and Lambert — is the funnel
that decides which few scenarios actually earn that effort.
</p>

<hr>

<h2>What came before RFRM</h2>

<p>
Comparative risk assessment in the 1990s (the tradition behind the EPA-era
"Comparing Risks" studies) had already established that risks could be ranked
against each other using simplified, often qualitative criteria rather than
full quantification of each one individually. RFRM's contribution was to make
that ranking process itself systematic and repeatable, and to wire it directly
into HHM's scenario tree rather than treating scenario identification and
scenario ranking as separate exercises.
</p>

<hr>

<h2>The eight phases</h2>

<ol>
  <li><strong>Scenario identification.</strong> Build the HHM tree describing
  the system's intended, "as planned" success scenario — this is Tutorial 03,
  reused directly as the starting point.</li>
  <li><strong>Scenario filtering.</strong> Narrow the tree to the scenarios
  that actually fall within the current decision-maker's responsibility and
  authority. A coastal water-quality manager can act on a discharge permit
  violation; they usually can't act on an upstream nation's agricultural
  policy, however real that risk is.</li>
  <li><strong>Bi-criteria filtering and ranking.</strong> Score what's left on
  two criteria at once — typically likelihood and consequence — using a simple
  ordinal scale, and cut anything that doesn't clear a minimum bar on both.</li>
  <li><strong>Multi-criteria evaluation.</strong> Add further criteria beyond
  the first two — detectability, manageability, cost of mitigation, public
  visibility — to refine the surviving list further.</li>
  <li><strong>Quantitative ranking.</strong> Where the scenario justifies it,
  move from ordinal scores toward genuinely quantitative likelihood and
  consequence estimates, incorporating how resilient, robust, and redundant
  the system already is against that scenario.</li>
  <li><strong>Risk management.</strong> For the scenarios that made it this
  far, identify concrete management options and estimate each one's cost,
  performance benefit, and risk reduction — this is exactly the decision-tree
  and trade-off machinery from Tutorials 02 and 04, now pointed at a
  short, prioritized list instead of one scenario picked in advance.</li>
  <li><strong>Safeguarding against missing critical items.</strong> Go back and
  check the options chosen in Phase VI against everything filtered <em>out</em>
  in Phases II–V. Filtering is meant to defer attention, not permanently
  discard it — this phase exists specifically to catch a scenario that was cut
  too early.</li>
  <li><strong>Operational feedback.</strong> Feed real operating experience
  back into the filtering and ranking criteria — and back into the HHM tree
  itself — so the whole funnel improves the next time it's used.</li>
</ol>

<p>
Haimes, Kaplan, and Lambert were explicit that these eight phases describe a
philosophy, not a mechanical algorithm to run once and forget: filtering is a
precursor to considering the full set of risk scenarios, never a substitute for
it. Their own case study applied the framework to operations other than
war — a deliberately different domain from anything earlier in this series, to
show the funnel doesn't care what kind of system it's filtering.
</p>

<hr>

<h2>How this is done today</h2>

<ul>
  <li>
    <strong>Risk matrices</strong> — the 5×5 likelihood-consequence heat map
    used across almost every industry's risk register today is Phase III's
    bi-criteria filtering, essentially unchanged, just given a standard visual
    form.
  </li>
  <li>
    <strong>MCDA software</strong> — Phase IV's multi-criteria evaluation is
    formalized today with the same weighted-scoring and AHP-style tools already
    covered in Tutorial 02's decision-matrix section, replacing ad hoc scoring
    with an auditable weighting scheme.
  </li>
  <li>
    <strong>GRC platforms</strong> — enterprise risk-management software turns
    Phases I–VI into a living database rather than a one-time study, and treats
    Phase VIII's feedback loop as a standing review cycle instead of an
    afterthought.
  </li>
  <li>
    <strong>Automated first-pass triage</strong> — when the candidate list runs
    into the hundreds or thousands (pulled from incident logs, anomaly
    detection on monitoring data, or an LLM-assisted HHM brainstorm per
    Tutorial 03), clustering or anomaly-scoring models increasingly do a first
    filtering pass before a human analyst applies Phase IV's multi-criteria
    judgment — the same funnel, with a faster first stage.
  </li>
  <li>
    <strong>Phase VII has a direct modern analog</strong> in independent review
    or red-teaming processes built specifically to re-examine what an automated
    or preliminary filter discarded, rather than trusting the first pass by
    default.
  </li>
</ul>

<hr>

<h2>A worked filter: from thirteen scenarios to a short list</h2>

<p>
The snippet below runs Phases III–V on the risk register built in Tutorial 03.
It scores every item on likelihood and consequence (Phase III), cuts anything
below a threshold, then layers on manageability and detectability (Phase IV) to
produce a final priority ranking (Phase V) — the short list that would move on
to the full quantitative treatment from Tutorials 01 and 02.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>Ordinal scores hide real disagreement</strong> — two reviewers
  rarely agree on whether something is a "3" or a "4"; without a shared rubric,
  bi-criteria filtering just moves subjectivity earlier in the process instead
  of removing it.</li>
  <li><strong>Filtering can systematically underweight low-likelihood, high
  consequence scenarios</strong> — a naive multiplicative score treats a 1%
  chance of catastrophe the same as a 50% chance of a minor issue whenever the
  product happens to match, which is precisely the failure mode Tutorial 07
  in this series (extreme events and the fallacy of expected value) exists to
  correct.</li>
  <li><strong>Phase VII is easy to skip and expensive to skip</strong> — under
  time pressure, the "go back and check what you filtered out" step is the one
  most likely to be dropped, and the one whose absence is hardest to notice
  until something filtered out early turns out to matter.</li>
</ul>

<p>
<strong>Key principle:</strong> filtering exists to allocate scarce analytical
attention, not to make a risk disappear. Everything cut in Phases II–V is still
real — it's just been deferred, and Phase VII exists to make sure "deferred"
doesn't quietly become "forgotten."
</p>
`,
  codeSnippet: `
# Risk register carried over from Tutorial 03's HHM tree
register = [
    "Wastewater treatment plant bypass", "Industrial discharge",
    "Marina / vessel waste", "Agricultural runoff", "Urban stormwater",
    "Low flushing / tidal exchange", "Heavy rainfall events",
    "Sea-level rise altering circulation", "Sparse in-situ sampling network",
    "Satellite revisit / cloud-cover gaps", "Sensor drift / calibration lag",
    "Delayed inter-agency data sharing", "Enforcement gaps on discharge permits",
]

# --- Phase III: Bi-criteria filtering (likelihood x consequence, 1-5 ordinal) ---
# Illustrative scores a manager might assign during a filtering workshop
likelihood = {
    "Wastewater treatment plant bypass": 3, "Industrial discharge": 2,
    "Marina / vessel waste": 2, "Agricultural runoff": 4, "Urban stormwater": 4,
    "Low flushing / tidal exchange": 3, "Heavy rainfall events": 4,
    "Sea-level rise altering circulation": 2, "Sparse in-situ sampling network": 3,
    "Satellite revisit / cloud-cover gaps": 3, "Sensor drift / calibration lag": 2,
    "Delayed inter-agency data sharing": 3, "Enforcement gaps on discharge permits": 2,
}
consequence = {
    "Wastewater treatment plant bypass": 5, "Industrial discharge": 4,
    "Marina / vessel waste": 2, "Agricultural runoff": 3, "Urban stormwater": 3,
    "Low flushing / tidal exchange": 3, "Heavy rainfall events": 3,
    "Sea-level rise altering circulation": 4, "Sparse in-situ sampling network": 3,
    "Satellite revisit / cloud-cover gaps": 2, "Sensor drift / calibration lag": 2,
    "Delayed inter-agency data sharing": 3, "Enforcement gaps on discharge permits": 3,
}

bi_criteria_score = {item: likelihood[item] * consequence[item] for item in register}

THRESHOLD = 10
survivors = {item: s for item, s in bi_criteria_score.items() if s >= THRESHOLD}

print(f"Phase III filtered {len(register)} scenarios down to {len(survivors)}:")
for item, s in sorted(survivors.items(), key=lambda kv: -kv[1]):
    print(f"  {item:38s} bi-criteria score = {s}")

# --- Phase IV: Multi-criteria evaluation on the survivors ---
# manageability / detectability, 1 (hard) to 5 (easy); default to neutral (3)
manageability = {"Wastewater treatment plant bypass": 4, "Industrial discharge": 3,
                  "Agricultural runoff": 2, "Urban stormwater": 2,
                  "Heavy rainfall events": 1, "Sea-level rise altering circulation": 1}
detectability = {"Wastewater treatment plant bypass": 4, "Industrial discharge": 3,
                  "Agricultural runoff": 2, "Urban stormwater": 3,
                  "Heavy rainfall events": 5, "Sea-level rise altering circulation": 2}

# Phase V priority favors high likelihood x consequence that is ALSO
# hard to manage and hard to detect — those need attention first
priority = {
    item: bi_criteria_score[item]
          * (6 - manageability.get(item, 3))
          * (6 - detectability.get(item, 3))
    for item in survivors
}

print("\\nPhase V priority ranking (candidates for full quantitative treatment):")
for item, p in sorted(priority.items(), key=lambda kv: -kv[1]):
    print(f"  {item:38s} priority = {p}")
`
},
