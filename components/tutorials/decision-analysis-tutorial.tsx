// ============================================================================
// NEW TUTORIAL ENTRY — paste this object inside the TUTORIALS array in
// constants.tsx, right after the "systems-risk-analysis" entry (or anywhere
// in the array — order inside a category doesn't affect rendering).
// Same category as tutorial 01, so it renders in the same
// "Risk & Decision Analysis" section automatically.
//
// Optional: add an image at public/images/tutorials/decision-analysis.jpg,
// or delete the `image` line to use the plain-header layout.
// ============================================================================

{
  id: 'decision-analysis',
  title: '02 - Decision Analysis: Choosing Under Uncertainty',
  description: 'Decision rules, decision trees, the fractile/triangular methods, and influence diagrams — from expert elicitation to Bayesian decision networks.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Intermediate",
  createdAt: "2026-07-17",
  image: "/images/tutorials/decision-analysis.jpg",
  content: `
<p>
Tutorial 01 gave us a way to <em>score</em> risk: probability times consequence,
mapped as low / medium / high. But a score alone doesn't tell the Coastal Manager
whether to close the beach. Turning a risk score into a choice among real options
is the job of decision analysis — the toolkit built to answer the second half of
Haimes' six questions: what can be done, and what are the trade-offs.
</p>

<hr>

<h2>Deciding when you don't even have probabilities</h2>

<p>
Sometimes you can't honestly assign a probability to a scenario at all — a novel
contaminant, a first-of-its-kind infrastructure failure. Classical decision theory
still gives you rules for choosing an alternative under that kind of uncertainty:
</p>

<ul>
  <li><strong>Maximin (Wald)</strong> — look only at each option's worst-case
  outcome, and pick the option whose worst case is least bad. Risk-averse by
  construction.</li>
  <li><strong>Maximax</strong> — the mirror image: pick the option with the best
  best-case outcome. Risk-seeking.</li>
  <li><strong>Laplace</strong> — with no reason to favor one scenario over
  another, treat them as equally likely and pick the option with the best
  average.</li>
  <li><strong>Minimax regret (Savage)</strong> — for each option, compute how much
  worse it does than the best choice would have done <em>had you known the true
  scenario</em>; pick the option minimizing that worst regret.</li>
  <li><strong>Expected value (Bayes)</strong> — once you do have probabilities
  (from a model, from data, from expert elicitation), weight each outcome by its
  probability. This is the rule decision trees are built on.</li>
</ul>

<p>
None of these is "correct" — they encode different attitudes toward uncertainty.
Which one a manager reaches for often says more about their risk tolerance than
about the data.
</p>

<hr>

<h2>Decision trees: folding uncertainty back into a choice</h2>

<p>
A decision tree alternates decision nodes (choices you control) with chance nodes
(outcomes you don't), ending in a payoff at each leaf. Solving it — the "rollback"
or "fold-back" method — works from the leaves inward: at every chance node,
replace the branch with its expected value (Bayes' rule above); at every decision
node, keep only the branch with the best expected value and discard the rest.
</p>

<p>
For the Coastal Manager's Dilemma: close the beach (a fixed, certain cost) versus
keep it open (a small gain if nothing happens, a large loss if a contamination
event occurs, weighted by the probability from the Tutorial 01 hazard model). Fold
the tree back, and the better decision falls out — an EMV comparison, made
explicit.
</p>

<p>
One caveat carried straight from Haimes: raw expected monetary value treats a 10%
chance of losing 100 the same as a certain loss of 10. Real decision-makers are
rarely that indifferent to variance — which is why expected <em>utility</em>
(a risk-adjusted version of EMV) often replaces raw EMV once the stakes involve
public health rather than just cost.
</p>

<hr>

<h2>Decision matrices and multiple criteria</h2>

<p>
A decision matrix lays out every alternative against every scenario (or every
criterion) in a table, then applies one of the rules above. The moment more than
one criterion matters at once — cost <em>and</em> ecological impact <em>and</em>
public-health risk — this generalizes into multi-criteria decision analysis
(MCDA): weighted-sum scoring, AHP, or TOPSIS, all descendants of the same matrix,
built to handle the multiobjective trade-offs Haimes flagged back in the
Farmer's Dilemma.
</p>

<hr>

<h2>The fractile method and the triangular distribution</h2>

<p>
Both were built for the same problem: putting a number on uncertainty when no
hard dataset exists yet.
</p>

<ul>
  <li>
    <strong>The fractile method</strong> elicits a probability distribution from
    an expert by asking for percentiles directly — "give me the value you're 50%
    sure won't be exceeded, then the value you're 5% sure won't be exceeded" —
    building a CDF point by point instead of asking for a shape up front.
  </li>
  <li>
    <strong>The triangular distribution</strong> is the cheaper cousin: ask only
    for a minimum, most-likely, and maximum value, and interpolate a distribution
    from those three points. It's still the default behind three-point cost and
    schedule estimates (PERT) and countless Monte Carlo risk simulations today.
  </li>
</ul>

<p>
The modern shift: wherever a historical or sensor record exists — a contamination
time series, a satellite archive — fit an empirical or Bayesian-updated
distribution instead of eliciting one from an expert. The triangular distribution
remains the honest default only when the data genuinely isn't there yet, e.g. an
emerging contaminant or a newly deployed sensor with no track record.
</p>

<hr>

<h2>Influence diagrams — the compact alternative to a full tree</h2>

<p>
A decision tree branches out combinatorially as more decisions and events stack
up. An influence diagram compresses the same information into a directed graph:
decision nodes, chance nodes, and a value node, connected by arcs that show what
influences what — without enumerating every path explicitly.
</p>

<p>
This is exactly the structure a Bayesian network gains when you add decision and
utility nodes to it. Today, tools like <code>pgmpy</code> in Python (or dedicated
software like GeNIe and Hugin) build and solve these directly — an influence
diagram isn't a historical curiosity, it's the diagram most modern Bayesian
decision-support systems are drawing under the hood.
</p>

<hr>

<h2>A worked version: the Coastal Manager's Dilemma, quantified</h2>

<p>
The snippet below folds a two-option decision tree (close the beach vs. keep it
open), using the hazard probability from Tutorial 01's risk model, then layers on
a fractile-style Monte Carlo simulation — a triangular distribution on the
outbreak cost, and a Beta distribution capturing uncertainty in the hazard
probability itself — to ask a sharper question than EMV alone: <em>how often
would the EMV-optimal decision actually turn out to be wrong?</em>
</p>

<hr>

<h2>Where the classical framework runs out</h2>

<ul>
  <li><strong>Static payoffs</strong> — real consequences shift with the season,
  with cumulative exposure, with who else is exposed at the same time. A single
  payoff table hides that.</li>
  <li><strong>Independent decisions</strong> — this tutorial treats one decision
  in isolation. Chapter 4's later material on population dynamics and phantom
  system models exists precisely because real infrastructure decisions are
  coupled to each other and to how affected populations respond over time — the
  subject of a future tutorial in this track.</li>
  <li><strong>Elicited numbers age badly</strong> — a triangular distribution from
  an expert interview in year one should be replaced by data as soon as data
  exists. Treat elicitation as a placeholder, not a permanent input.</li>
</ul>

<p>
<strong>Key principle:</strong> a decision rule doesn't remove judgment from a
decision — it makes the judgment explicit and inspectable. Choosing maximin
instead of expected value is itself a decision worth being able to defend.
</p>
`,
  codeSnippet: `
import numpy as np

# --- Decision tree / EMV for the Coastal Manager's Dilemma ---
# Hazard probability carried over from Tutorial 01's risk model
p_event = 0.18
p_no_event = 1 - p_event

# Payoffs in relative cost units (negative = loss)
payoff = {
    "close_beach": {"event": -8,  "no_event": -8},   # lost tourism, either way
    "keep_open":   {"event": -60, "no_event": 2},     # outbreak cost vs. normal revenue
}

def expected_value(option):
    return (payoff[option]["event"] * p_event +
            payoff[option]["no_event"] * p_no_event)

for option in payoff:
    print(f"{option}: EMV = {expected_value(option):.2f}")

best = max(payoff, key=expected_value)
print(f"\\nDecision-rule recommendation (max EMV): {best}")

# --- Fractile/triangular-style uncertainty layered on top ---
# Three-point (min, most-likely, max) elicitation of the outbreak cost
outbreak_cost = np.random.triangular(left=30, mode=60, right=120, size=10_000)

# Uncertainty in the hazard probability itself (Beta, mean ≈ 0.18)
p_event_samples = np.random.beta(a=3, b=14, size=10_000)

emv_keep_open = (-outbreak_cost * p_event_samples
                 + 2 * (1 - p_event_samples))

p_wrong_call = np.mean(emv_keep_open < expected_value("close_beach"))
print(f"P(keep_open turns out to be the wrong call) = {p_wrong_call:.1%}")
`
},
