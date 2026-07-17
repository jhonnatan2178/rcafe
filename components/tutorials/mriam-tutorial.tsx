// ============================================================================
// NEW TUTORIAL ENTRY — paste this object inside the TUTORIALS array in
// constants.tsx, alongside the other eight "Risk & Decision Analysis"
// entries. Same category, so it joins that section automatically.
//
// Optional: add an image at public/images/tutorials/multiobjective-risk-impact.jpg,
// or delete the `image` line to use the plain-header layout.
// ============================================================================

{
  id: 'multiobjective-risk-impact-analysis',
  title: '09 - Multiobjective Risk Impact Analysis: Closing the Loop',
  description: 'How Haimes and Leach combined PMRM with multistage impact analysis into MRIAM — and why every tool in this series turns out to be one stage of a single, larger picture.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Advanced",
  createdAt: "2026-07-24",
  image: "/images/tutorials/multiobjective-risk-impact.jpg",
  content: `
<p>
Every tutorial in this series so far has quietly treated a decision as a
single moment: score the risk (01), fold a tree (02), find a compromise on a
frontier (04), split the extreme-event tail out from the average (07), carry a
noninferior set through a sequence of choices (08). This chapter is where
Haimes, with Leach and Gomide, asks the obvious next question: what happens
across the <em>next several</em> stages, once this decision's consequences
start propagating?
</p>

<hr>

<h2>Impact analysis: the trade-off itself can move</h2>

<p>
Gomide and Haimes' theoretical basis for this chapter introduces a concept
they call a <strong>stage trade-off</strong> — a genuinely dynamic version of
Tutorial 04's static noninferior frontier. Instead of one frontier fixed for
all time, the trade-off between objectives can shift from one stage or time
period to the next as consequences propagate through the system. The
Multiobjective, Multistage Impact Analysis Method (MMIAM) is the framework
built specifically to track that evolving trade-off, rather than freezing it
at a single snapshot the way every earlier tutorial in this series did.
</p>

<hr>

<h2>Combining PMRM and MMIAM: MRIAM</h2>

<p>
Leach and Haimes then did the obvious pairing: carry PMRM's extreme-event
partitioning (Tutorial 07's <code>f2</code>–<code>f5</code>) through every
stage of MMIAM's impact propagation, rather than computing it once. They
called the result the multiobjective risk-impact analysis method (MRIAM), and
were explicit about why it mattered: decision-makers facing genuinely extreme
risk and uncertainty are often less interested in finding the mathematically
optimal strategy than in identifying which strategies they should clearly rule
out. That's a real shift in posture — from optimizing an objective toward
eliminating the unacceptable — and it echoes the minimax-regret rule from
Tutorial 02 more than it echoes expected-value maximization.
</p>

<hr>

<h2>Relating multiobjective decision trees to MRIAM</h2>

<p>
The book's own closing move in this part is to show that MRIAM's multistage
impact propagation can be represented directly as the multiobjective decision
tree from Tutorial 08: each stage becomes another layer of chance and decision
nodes, and PMRM's extreme-event measure gets carried through the tree as one
of the tracked objective components at <em>every</em> stage — not computed
once at the end, after the fact.
</p>

<p>
Zoom out, and this chapter is really the whole series closing its own loop:
HHM (Tutorial 03) finds what can go wrong; RFRM (Tutorial 06) filters which of
those scenarios deserve full attention; PMRM (Tutorial 07) gives each
surviving scenario both an ordinary and an extreme-event risk measure;
multiobjective decision trees (Tutorial 08) structure the choices around them;
and MRIAM is what you get when you stop assuming any of that happens only
once.
</p>

<hr>

<h2>How this is done today</h2>

<ul>
  <li>
    <strong>Dynamic adaptive policy pathways</strong> — long-horizon coastal
    and water-infrastructure planning today explicitly models how risk and the
    menu of available options change stage by stage across a multi-decade
    planning horizon, revisiting the plan at pre-specified trigger points
    rather than committing once. It's a direct, now-standard descendant of
    MMIAM's stage trade-off.
  </li>
  <li>
    <strong>Multi-period CVaR</strong> — Rockafellar and Uryasev's Conditional
    Value-at-Risk portfolio framework, the same modern formalization of
    PMRM's <code>f4</code> mentioned in Tutorial 07, has itself been extended
    into dynamic, multi-period versions for exactly the reason MRIAM extended
    PMRM: a snapshot tail-risk measure isn't enough once exposure plays out
    over many periods.
  </li>
  <li>
    <strong>Robust decision-making and scenario discovery</strong> — long-term
    policy planning today often searches a large space of future scenarios
    specifically for the ones that make a candidate strategy fail badly, rather
    than searching for the single optimal strategy. That's Leach and Haimes'
    "what not to do" framing, made computational.
  </li>
</ul>

<hr>

<h2>A worked two-stage tree: when a first hit lowers resilience</h2>

<p>
The snippet below extends Tutorial 08's single-stage tree to two years. If a
contamination event occurs in year one, the ecosystem's reduced resilience
(Tutorial 05's stability property) is modeled as raising <em>both</em> year
two's hazard probability and its baseline consequences — impact propagating
forward, exactly what MMIAM is built to represent. Compare the actual
worst-case (both years hit) against what you'd have naively predicted by just
doubling year one's extreme-event number: the propagation effect makes the
real worst case meaningfully higher than that naive estimate.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>Every added stage multiplies the path count</strong> — the same
  combinatorial growth flagged in Tutorial 08 applies here, now across time
  periods as well as decisions.</li>
  <li><strong>The propagation model is itself an assumption</strong> — how much
  a first hit degrades second-stage resilience is exactly the kind of
  parameter Tutorial 05's uncertainty and sensitivity analysis should be
  pointed at before it's trusted.</li>
  <li><strong>This is still a model of a model</strong> — MRIAM formalizes
  <em>how</em> to track propagating, multiobjective risk. It doesn't supply the
  actual propagation mechanism for your system; that still has to come from
  domain knowledge.</li>
</ul>

<p>
<strong>Key principle:</strong> a risk assessment done at a single point in
time is a photograph of a process that keeps moving. The moment a first bad
outcome can change the odds or the stakes of the next one, the photograph
stops being enough — you need the film.
</p>
`,
  codeSnippet: `
# Stage 1: same hazard as Tutorial 08's "always open" baseline
p_event_1 = 0.18
leaf_1 = {
    "event":    {"cost": 15.0, "risk": 20.0},
    "no_event": {"cost": -2.0, "risk": 1.0},
}

def stage_2(prior_event):
    """Stage 2's hazard AND consequences both worsen if Stage 1 had an
    event — reduced ecosystem resilience, the impact propagation MMIAM
    is built to track."""
    if prior_event:
        p_event_2 = 0.30
        leaf_2 = {"event": {"cost": 22.0, "risk": 28.0},
                  "no_event": {"cost": 0.0, "risk": 3.0}}
    else:
        p_event_2 = 0.18
        leaf_2 = {"event": {"cost": 15.0, "risk": 20.0},
                  "no_event": {"cost": -2.0, "risk": 1.0}}
    return p_event_2, leaf_2

# Enumerate all four two-stage paths with joint probability and cumulative impact
paths = []
for e1, p1 in [("event", p_event_1), ("no_event", 1 - p_event_1)]:
    p_event_2, leaf_2 = stage_2(prior_event=(e1 == "event"))
    for e2, p2 in [("event", p_event_2), ("no_event", 1 - p_event_2)]:
        joint_p = p1 * p2
        paths.append({
            "path": f"{e1} -> {e2}",
            "p": joint_p,
            "cost": leaf_1[e1]["cost"] + leaf_2[e2]["cost"],
            "risk": leaf_1[e1]["risk"] + leaf_2[e2]["risk"],
        })

ev_cost = sum(p["p"] * p["cost"] for p in paths)
ev_risk = sum(p["p"] * p["risk"] for p in paths)
print(f"Two-stage ordinary expected value: cost={ev_cost:.2f}  risk={ev_risk:.2f}")

# PMRM-style extreme-event regime: the single worst path by cumulative risk
worst = max(paths, key=lambda p: p["risk"])
print(f"Extreme-event path '{worst['path']}' (p={worst['p']:.1%}): "
      f"cost={worst['cost']:.2f}  risk={worst['risk']:.2f}")

naive_worst_risk = leaf_1["event"]["risk"] * 2
print(f"\\nNaive (no-propagation) estimate of worst-case risk: {naive_worst_risk:.2f}")
print(f"Actual worst-case risk with resilience loss propagated: {worst['risk']:.2f}")

print("\\nAll paths:")
for p in paths:
    print(f"  {p['path']:22s} p={p['p']:.3f}  cost={p['cost']:6.2f}  risk={p['risk']:6.2f}")
`
},
