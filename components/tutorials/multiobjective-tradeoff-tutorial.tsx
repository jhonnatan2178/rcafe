// ============================================================================
// NEW TUTORIAL ENTRY — paste this object inside the TUTORIALS array in
// constants.tsx, alongside the other three "Risk & Decision Analysis"
// entries. Same category, so it joins that section automatically.
//
// Optional: add an image at public/images/tutorials/multiobjective-tradeoff.jpg,
// or delete the `image` line to use the plain-header layout.
// ============================================================================

{
  id: 'multiobjective-tradeoff',
  title: '04 - Multiobjective Trade-off Analysis: The Surrogate Worth Method',
  description: 'Why "minimize risk" and "minimize cost" can\'t both be optimized at once, and how the Surrogate Worth Trade-off method finds the best compromise on the Pareto frontier.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Advanced",
  createdAt: "2026-07-19",
  image: "/images/tutorials/multiobjective-tradeoff.jpg",
  content: `
<p>
Tutorial 02 folded a decision tree down to a single expected value — which
quietly assumed cost and risk had already been converted into one comparable
number. In practice they usually can't be. Lower a treatment plant's discharge
limit and you cut contamination risk, but cost rises; relax it and cost falls,
but risk rises. There is no treatment level that is best on both counts at
once. Multiobjective trade-off analysis is what you reach for the moment "best"
stops meaning a single number.
</p>

<hr>

<h2>What multiple environmental objectives actually look like</h2>

<p>
Haimes and Hall developed this method on exactly this kind of problem: river
basin management with objectives like minimizing treatment cost, maximizing
dissolved oxygen, and minimizing regional economic disruption — objectives that
pull in different directions by physical necessity, not by poor planning. Coastal
water-quality management inherits the same structure: minimize public-health
risk, minimize cost, and (often) minimize ecological disruption from whatever
engineering fix reduces the first two.
</p>

<hr>

<h2>The noninferior (Pareto-optimal) set</h2>

<p>
When objectives genuinely conflict, there's no single optimum — there's a set of
<strong>noninferior solutions</strong>: points where you cannot improve one
objective without making at least one other objective worse. Every solution
outside that set is simply dominated and can be discarded outright; every
solution inside it is a legitimate candidate, and choosing among them is a
question of judgment, not arithmetic.
</p>

<hr>

<h2>Properly noninferior: ruling out the pathological cases</h2>

<p>
Not every point on the mathematical frontier is a sensible candidate. A solution
is only <strong>properly</strong> noninferior if the trade-off ratios near it stay
bounded — improving one objective by a tiny amount shouldn't cost an unbounded
amount of another. Points where that ratio blows up are technically noninferior
but practically meaningless, and the method is built to exclude them before a
decision-maker ever sees the frontier.
</p>

<hr>

<h2>The Surrogate Worth Trade-off (SWT) method</h2>

<p>
Eliciting a full multi-attribute utility function from a decision-maker up front
is hard — people are far better at judging a specific trade-off than at
specifying their entire preference structure in advance. SWT works with that
limitation instead of against it:
</p>

<ol>
  <li><strong>Trace the frontier.</strong> Optimize one objective while
  constraining the others to fixed levels (the ε-constraint method), sweeping
  those levels to generate the full noninferior set point by point.</li>
  <li><strong>Compute trade-off ratios.</strong> At each point on the frontier,
  the shadow price of each constraint gives the local exchange rate between
  objectives — how much of objective A you'd gain per unit of objective B given
  up, right at that point.</li>
  <li><strong>Ask for a surrogate worth.</strong> Instead of a full utility
  function, the decision-maker rates each trade-off on a simple scale (e.g. −10
  to +10): is giving up this much of B for that much of A clearly worthwhile,
  clearly not, or somewhere in between?</li>
  <li><strong>Find where worth crosses zero.</strong> The point where the
  surrogate worth function changes sign is where the decision-maker is
  indifferent to the trade-off — neither clearly for nor against it. That point
  is the best compromise solution.</li>
</ol>

<hr>

<h2>How SWT relates to the utility-function approach</h2>

<p>
SWT isn't a rejection of utility theory — it's a practical shortcut through it.
Under reasonable conditions, the surrogate worth function behaves like the
derivative of an implicit utility function that was never fully specified.
Instead of asking a decision-maker to hand over their entire utility function,
SWT only asks for its local slope at a handful of points on the frontier — enough
to locate the zero-crossing without ever writing the function down.
</p>

<hr>

<h2>How this is done today</h2>

<ul>
  <li>
    <strong>Generating the frontier</strong> — sweeping ε-constraints by hand
    works for smooth, convex, low-dimensional problems, which is what SWT was
    built for in the 1970s. Today, evolutionary multiobjective algorithms
    (NSGA-II, NSGA-III, MOEA/D) approximate the whole Pareto front directly, even
    for nonlinear, non-convex, or black-box objectives — including one modeled
    by a machine-learning classifier instead of a closed-form equation.
  </li>
  <li>
    <strong>Selecting the compromise point</strong> — modern interactive
    multiobjective optimization tools often replace scalar surrogate-worth
    ratings with direct visual exploration: parallel-coordinate plots or 3D
    Pareto-surface views the decision-maker can inspect and click on, rather than
    scoring individual trade-off ratios in the abstract.
  </li>
  <li>
    <strong>Proper noninferiority still matters</strong> — raw NSGA-II output
    isn't automatically filtered for pathological, unbounded trade-offs the way
    the analytic SWT derivation was; it's worth checking generated fronts for
    exactly the degenerate points Haimes' "proper" criterion was designed to
    exclude.
  </li>
</ul>

<hr>

<h2>A worked frontier: cost vs. risk in the Coastal Manager's Dilemma</h2>

<p>
The snippet below builds a small two-objective version of the treatment-level
decision: cost rises steeply as treatment approaches its maximum, while residual
risk falls toward an irreducible floor. It sweeps ε (an allowed risk ceiling) to
trace the frontier, computes the local trade-off ratio at each point, and
simulates a surrogate-worth judgment to locate the zero-crossing — the same
mechanics as SWT, without requiring an actual decision-maker interview to follow
along.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>Surrogate worth is still elicited, not measured</strong> — it
  inherits the same aging-badly problem as the fractile method from Tutorial 02.
  Revisit it as preferences or evidence change.</li>
  <li><strong>Two or three objectives is the sweet spot</strong> — the classical
  ε-constraint sweep and surrogate-worth elicitation get unwieldy past three
  objectives; that's exactly the gap evolutionary algorithms were built to
  close.</li>
  <li><strong>A frontier isn't a decision</strong> — it narrows the field from
  infinite alternatives to a handful of legitimate ones. Something (a
  decision-maker, a policy, a vote) still has to pick a point on it.</li>
</ul>

<p>
<strong>Key principle:</strong> when two objectives genuinely conflict, arguing
about which single number is "best" is the wrong debate. The right debate is
about where on the frontier to stand — and SWT exists to make that debate
explicit instead of buried inside someone's unstated utility function.
</p>
`,
  codeSnippet: `
import numpy as np

# Toy treatment-level problem: x in [0, 1], 0 = no treatment, 1 = full treatment
def cost(x):
    return 100 * x**1.5          # treatment cost rises steeply near full treatment

def risk(x):
    return 0.9 * (1 - x)**2 + 0.02   # residual contamination risk floor at 0.02

# --- Trace the noninferior frontier via epsilon-constraint ---
# For this monotone toy problem the risk constraint binds exactly,
# so x*(eps) can be solved for directly rather than via a numeric optimizer.
epsilons = np.linspace(risk(1.0), risk(0.0), 40)
xs = np.clip(1 - np.sqrt(np.maximum(epsilons - 0.02, 0) / 0.9), 0, 1)
costs = cost(xs)
risks = risk(xs)

# --- Trade-off ratio (shadow price): d(cost) / d(risk) along the frontier ---
trade_off = np.gradient(costs, risks)

# --- Simulated surrogate worth: a decision-maker's judgment of each
# trade-off ratio, on a -10..+10 scale (illustrative approximation) ---
surrogate_worth = 5 - 2 * np.log10(np.abs(trade_off) + 1e-6)

# Best compromise: where surrogate worth crosses from positive to negative
sign_change = np.where(np.diff(np.sign(surrogate_worth)))[0]
if len(sign_change):
    i = sign_change[0]
    print(f"Best-compromise treatment level x = {xs[i]:.2f}  "
          f"(cost={costs[i]:.1f}, risk={risks[i]:.3f})")
else:
    print("No zero-crossing in this range — widen the epsilon sweep.")
`
},
