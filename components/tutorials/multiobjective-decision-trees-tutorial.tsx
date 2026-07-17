// ============================================================================
// NEW TUTORIAL ENTRY — paste this object inside the TUTORIALS array in
// constants.tsx, alongside the other seven "Risk & Decision Analysis"
// entries. Same category, so it joins that section automatically.
//
// Optional: add an image at public/images/tutorials/multiobjective-decision-trees.jpg,
// or delete the `image` line to use the plain-header layout.
// ============================================================================

{
  id: 'multiobjective-decision-trees',
  title: '08 - Multiobjective Decision-Tree Analysis',
  description: 'Why gathering more information before deciding can reshape the entire noninferior set — a phenomenon with no equivalent in an ordinary, single-objective decision tree.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Advanced",
  createdAt: "2026-07-23",
  image: "/images/tutorials/multiobjective-decision-trees.jpg",
  content: `
<p>
This tutorial is where three earlier ones converge. Tutorial 02 built a
decision tree that folds back to a single expected value. Tutorial 04 showed
that when objectives genuinely conflict, there's no single best point — only a
noninferior frontier. Tutorial 07 showed that even one objective, like damage,
often needs two numbers instead of one: an ordinary expected value and a
conditional expectation of its extreme-event tail. Multiobjective
decision-tree analysis — introduced by Haimes, Li, and Tulsiani, extending
Howard Raiffa's classical single-objective tree — is what happens when you
stop pretending any of that collapses to one number at each node.
</p>

<hr>

<h2>Why the rollback itself has to change</h2>

<p>
An ordinary decision tree folds back through simple backward induction: at a
chance node, replace the branch with its expected value; at a decision node,
keep only the branch with the best expected value and discard the rest. That
works because at every node, there's a single scalar to compare.
</p>

<p>
Once a leaf carries a <em>vector</em> of objectives instead of one number, the
chance-node step still works — you take a probability-weighted, component-wise
expectation across each objective separately. But the decision-node step
breaks: you generally can't say which branch's vector "wins" unless one branch
strictly dominates every other branch in every objective simultaneously. Most
of the time, none does.
</p>

<hr>

<h2>The structural difference, stated precisely</h2>

<p>
A single-objective tree collapses to one optimal path, because dominated
branches can be discarded immediately at every node. A multiobjective tree
cannot do that — it has to carry forward the entire set of noninferior vector
outcomes at each node, because discarding a branch too early might throw away
a point that would have been noninferior once combined with what happens
further up the tree. The output of the whole exercise isn't a single decision
path — it's a noninferior frontier of feasible strategies, and picking a point
on it is deferred to the decision-maker, exactly as in Tutorial 04.
</p>

<hr>

<h2>The flood-warning example, and an unexpected finding</h2>

<p>
Haimes, Li, and Tulsiani's original worked example is a flood-warning system,
tracking two noncommensurate objectives — loss of life and loss of property,
including the monitoring system's own cost — with each objective further split
into its ordinary expected value and, per Tutorial 07, its conditional
expected value under extreme and catastrophic flooding.
</p>

<p>
Their most interesting result has no equivalent in the single-objective case:
a decision about whether to gather more information before acting — install
the monitoring system or not — doesn't just refine an existing expected-value
number. It can change the entire shape of the noninferior solution set,
introducing genuinely new noninferior alternatives that weren't reachable
without that information. In a single-objective tree, the classical
value-of-information result says more information can only help, or leave the
expected value unchanged, never hurt. In the multiobjective case, "helping"
isn't a single number moving — it's the frontier itself gaining a new point.
</p>

<hr>

<h2>How this is done today</h2>

<ul>
  <li>
    <strong>Multi-objective decision trees (MODT) paired with MCDA weighting</strong>
    — recent applications (for instance, in climate-driven resettlement
    planning) still build directly on Chankong and Haimes' original
    noninferior-set theory, generating the Pareto frontier through the tree and
    then applying a weighting method such as fuzzy TOPSIS to help a
    decision-maker select a final point — a modern, more systematic version of
    Tutorial 04's surrogate-worth elicitation.
  </li>
  <li>
    <strong>Multi-objective reinforcement learning and vector-valued MDPs</strong>
    — for sequential decisions too large to enumerate as an explicit tree,
    today's computational descendant tracks a Pareto set of value vectors
    through a Markov decision process instead of a hand-drawn tree, but the
    underlying idea — carry the noninferior set forward, don't collapse to one
    number early — is unchanged.
  </li>
</ul>

<hr>

<h2>A worked tree: does monitoring earn its cost?</h2>

<p>
The snippet below builds a small two-stage version of the Coastal Manager's
Dilemma: first, decide whether to invest in an early-warning monitoring system;
then, either commit to a fixed action in advance, or — if monitoring was
installed — respond contingently once it reports whether an event is
occurring. Two objectives are tracked throughout: economic cost and public-health
risk. Notice that all three resulting strategies turn out to be noninferior —
monitoring doesn't just improve an existing option, it adds a genuinely new one
to the frontier.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>The noninferior set can grow combinatorially</strong> — every
  additional decision or chance node multiplies the surviving set of vector
  outcomes, unlike scalar backward induction, which stays a fixed size at every
  node.</li>
  <li><strong>Perfect monitoring is a simplification</strong> — the example
  below assumes the warning is never wrong. A real early-warning system has
  false positives and false negatives, which would need their own probability
  model layered on top before the numbers could be trusted.</li>
  <li><strong>A frontier still isn't a decision</strong> — as in Tutorial 04,
  something still has to choose a point on it once the tree is folded back.</li>
</ul>

<p>
<strong>Key principle:</strong> "should we gather more information before
deciding" is itself a genuinely multiobjective question. Its value doesn't
show up as one number getting better — it can show up as an entirely new,
previously unreachable option appearing on the frontier.
</p>
`,
  codeSnippet: `
# Same hazard probability used throughout this series
p_event = 0.18

# Two noncommensurate objectives per leaf: economic cost, public-health risk
leaf = {
    ("closed",):          {"cost": 8.0,  "risk": 0.5},
    ("open", "event"):    {"cost": 15.0, "risk": 20.0},
    ("open", "no_event"): {"cost": -2.0, "risk": 1.0},
}

def strategy_always(action):
    """A fixed, non-contingent strategy applied regardless of the outcome."""
    if action == "closed":
        return leaf[("closed",)]
    ev_cost = (p_event * leaf[("open", "event")]["cost"]
               + (1 - p_event) * leaf[("open", "no_event")]["cost"])
    ev_risk = (p_event * leaf[("open", "event")]["risk"]
               + (1 - p_event) * leaf[("open", "no_event")]["risk"])
    return {"cost": ev_cost, "risk": ev_risk}

def strategy_monitored(monitor_cost=3.0):
    """An 'experimentation' decision: pay for monitoring, then act
    contingently on the (here, assumed perfect) warning it provides."""
    warned_outcome   = leaf[("closed",)]                 # close when warned
    unwarned_outcome = leaf[("open", "no_event")]        # stay open otherwise
    ev_cost = (monitor_cost + p_event * warned_outcome["cost"]
               + (1 - p_event) * unwarned_outcome["cost"])
    ev_risk = (p_event * warned_outcome["risk"]
               + (1 - p_event) * unwarned_outcome["risk"])
    return {"cost": ev_cost, "risk": ev_risk}

candidates = {
    "Always closed":         strategy_always("closed"),
    "Always open":           strategy_always("open"),
    "Monitor, then respond": strategy_monitored(),
}

def is_dominated(a, b):
    """True if point b dominates point a on both objectives (minimize both)."""
    return (b["cost"] <= a["cost"] and b["risk"] <= a["risk"]
            and (b["cost"] < a["cost"] or b["risk"] < a["risk"]))

print("Noninferior (Pareto) set over {cost, health risk}:")
for name, point in candidates.items():
    dominated = any(is_dominated(point, other)
                     for other_name, other in candidates.items() if other_name != name)
    tag = "  <- dominated, drop it" if dominated else "  <- noninferior"
    print(f"  {name:24s} cost={point['cost']:6.2f}  risk={point['risk']:6.2f}{tag}")
`
},
