// ============================================================================
// NEW TUTORIAL ENTRY — paste this object inside the TUTORIALS array in
// constants.tsx, alongside the other ten "Risk & Decision Analysis" entries.
// Same category, so it joins that section automatically. This one works
// well as the LAST entry in the array, since it closes out the series.
//
// Optional: add an image at public/images/tutorials/guiding-principles.jpg,
// or delete the `image` line to use the plain-header layout.
// ============================================================================

{
  id: 'systems-based-guiding-principles',
  title: '11 - Ten Systems-Based Guiding Principles: Closing the Loop',
  description: 'Haimes\' 2012 distillation of the whole discipline into ten principles, validated against the FAA\'s NextGen system of systems — and, as it turns out, a near-perfect map of everything covered in this series.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Intermediate to Advanced",
  createdAt: "2026-07-26",
  image: "/images/tutorials/guiding-principles.jpg",
  content: `
<p>
In 2012, after three decades of methodology — HHM, PMRM, MMIAM, decision
trees, and everything built on top of them — Haimes distilled the whole
discipline down to ten guiding principles, and stress-tested them against one
of the most complex system-of-systems undertakings around: the FAA's Next
Generation Air Transportation System (NextGen) modernization. It's a fitting
place to close this series, because — almost without planning it — each
principle turns out to map onto one of the tutorials already written here.
</p>

<hr>

<h2>The ten principles, and where they already showed up</h2>

<ol>
  <li>
    <strong>Holism is what risk analysis and systems engineering share.</strong>
    Neither discipline means much applied to a component in isolation — both
    only make sense applied to the whole system. (Tutorial 01)
  </li>
  <li>
    <strong>The process has to be systemic and integrated</strong> — treating
    identification, filtering, modeling, deciding, and communicating as
    separate, disconnected steps defeats the purpose. RFRM's eight phases exist
    specifically to keep that chain from fragmenting. (Tutorial 06)
  </li>
  <li>
    <strong>Models and their state variables are central to any quantitative
    risk claim.</strong> Every number this series produced — a probability, a
    payoff, a frontier — came from a model with explicit assumptions behind it.
    Worth naming honestly: this series skipped the book's own chapter on
    modeling itself (Chapter 2), and this principle is a reminder that
    everything downstream inherits whatever that unexamined choice got right
    or wrong.
  </li>
  <li>
    <strong>Complex systems of systems need more than one model</strong> to
    capture more than one legitimate perspective on the same system. This is
    HHM's entire premise. (Tutorial 03)
  </li>
  <li>
    <strong>Meta-modeling and subsystem integration have to be derived from the
    system's own intrinsic states</strong> — how one subsystem's failure
    becomes part of the next subsystem's actual starting condition. This is
    exactly what the resilience-loss propagation in the two-stage tree was
    modeling. (Tutorial 09)
  </li>
  <li>
    <strong>Multiple conflicting, competing objectives are inherent</strong> to
    risk management, not an edge case to special-case around. (Tutorials 04
    and 08)
  </li>
  <li>
    <strong>Risk analysis must account for both epistemic and aleatory
    uncertainty</strong> — and treat them differently, since only one of them
    shrinks with better data. (Tutorial 05)
  </li>
  <li>
    <strong>Risk analysis must account for low-probability, high-consequence
    events</strong> specifically, not just fold them into an average. (Tutorials
    07 and 10)
  </li>
  <li>
    <strong>The time frame is central to quantitative risk analysis</strong> —
    a risk assessed at a single moment is a photograph of something that keeps
    moving. (Tutorial 09)
  </li>
  <li>
    <strong>Risk analysis must be holistic, adaptive, incremental, and
    sustained</strong> — supported by real data collection, real metrics of
    progress, and real criteria for acting on what's found, not a one-time
    report. This is RFRM's operational feedback phase, generalized into a
    standing discipline rather than a single study. (Tutorial 06, and really
    the throughline of the whole series)
  </li>
</ol>

<hr>

<h2>Why the FAA case study matters</h2>

<p>
Haimes didn't just propose these ten principles in the abstract — he
validated them against NextGen, a real, massive, genuinely complex
modernization of the entire U.S. air traffic system, spanning agencies,
contractors, decades, and interdependent technologies. The point of testing
principles against a system that large is exactly the point of this series'
running example: a coastal water-quality monitoring program is also a system
of systems — satellites, in-situ sensors, predictive models, health agencies,
and the people who act on what all of that reports. The same ten principles
apply to it without needing to be rewritten.
</p>

<hr>

<h2>How this shows up in current practice</h2>

<ul>
  <li>
    <strong>Principle-based governance for complex systems</strong> — modern
    risk frameworks for cyber-physical and AI systems increasingly codify a
    short list of guiding principles rather than a single rigid checklist,
    precisely because a system of systems changes faster than any specific
    checklist can keep up with.
  </li>
  <li>
    <strong>Digital twins</strong> (Tutorial 01) are today's most literal
    embodiment of principles 3 through 5 at once: multiple linked models, each
    representing a different subsystem or perspective, integrated around the
    real system's actual current state, continuously rather than as a one-time
    exercise.
  </li>
  <li>
    <strong>Production ML monitoring practice</strong> — model cards,
    continuous evaluation, drift detection — is principle 10 applied
    specifically to the calibrated classifiers this series leaned on
    throughout: a model deployed once and never revisited violates this
    principle just as surely as a risk assessment filed away and forgotten
    does.
  </li>
</ul>

<hr>

<h2>A closing audit, in code</h2>

<p>
Rather than another numerical simulation, this closing snippet is a literal
audit: the ten principles, mapped back to exactly where each one appeared in
this series — a study guide as much as a piece of code, in keeping with a
chapter that's fundamentally about principles rather than a new quantitative
method.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>Haimes himself didn't claim completeness</strong> — the original
  paper explicitly frames these ten as a starting point for discussion, not a
  finished, closed list.</li>
  <li><strong>Principles aren't a substitute for the methods</strong> — knowing
  that "multiple conflicting objectives are inherent" doesn't trade off two
  objectives for you; Tutorial 04's actual machinery still has to do that
  work.</li>
  <li><strong>A checklist can create false confidence</strong> — ticking off
  ten principles is not the same as having correctly applied any one of them
  well. The principles say what to attend to, not that attending to it was
  done right.</li>
</ul>

<p>
<strong>Key principle</strong> (fittingly, the last one of this series): risk
analysis that stops after a single report is not holistic, adaptive, or
sustained — it's a snapshot mistaken for a discipline. Everything built across
these eleven tutorials is meant to be revisited as the system, the data, and
the stakes keep changing, not filed away as finished.
</p>
`,
  codeSnippet: `
# The ten guiding principles (Haimes, 2012), paraphrased, mapped back to
# where each one showed up earlier in this tutorial series.
principles = [
    ("Holism bridges risk analysis and systems engineering",
     "01 - Systems & Risk Analysis"),
    ("The whole risk process must be systemic and integrated, not disconnected steps",
     "06 - Risk Filtering, Ranking, and Management (RFRM)"),
    ("Models and their state variables are central to any quantitative risk claim",
     "01 - Systems & Risk Analysis (Ch.2 on modeling itself wasn't covered)"),
    ("Complex systems of systems need multiple models for multiple perspectives",
     "03 - Hierarchical Holographic Modeling"),
    ("Meta-modeling and subsystem integration must derive from the system's own intrinsic states",
     "09 - Multiobjective Risk Impact Analysis (MRIAM)"),
    ("Multiple conflicting, competing objectives are inherent to risk management",
     "04 - Multiobjective Trade-off / 08 - Multiobjective Decision Trees"),
    ("Risk analysis must account for both epistemic and aleatory uncertainty",
     "05 - Uncertainty and Sensitivity Analysis"),
    ("Risk analysis must account for low-probability, high-consequence events",
     "07 - Extreme Events & PMRM / 10 - Statistics of Extremes"),
    ("The time frame is central to quantitative risk analysis",
     "09 - Multiobjective Risk Impact Analysis (MRIAM)"),
    ("Risk analysis must be holistic, adaptive, incremental, and sustained",
     "06 - RFRM's operational feedback phase, and this series as a whole"),
]

print(f"{'#':>2}  {'Principle':<66} Covered in")
print("-" * 100)
for i, (statement, tutorial) in enumerate(principles, start=1):
    print(f"{i:2d}  {statement:<66} {tutorial}")
`
},
