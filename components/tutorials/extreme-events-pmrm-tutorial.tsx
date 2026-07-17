// ============================================================================
// NEW TUTORIAL ENTRY — paste this object inside the TUTORIALS array in
// constants.tsx, alongside the other six "Risk & Decision Analysis"
// entries. Same category, so it joins that section automatically.
//
// Optional: add an image at public/images/tutorials/extreme-events-pmrm.jpg,
// or delete the `image` line to use the plain-header layout.
// ============================================================================

{
  id: 'extreme-events-pmrm',
  title: '07 - Risk of Extreme Events and the Fallacy of Expected Value',
  description: 'Why two policies with nearly identical expected damage can hide wildly different catastrophic-tail risk — and the Partitioned Multiobjective Risk Method (PMRM) built to expose it.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Advanced",
  createdAt: "2026-07-22",
  image: "/images/tutorials/extreme-events-pmrm.jpg",
  content: `
<p>
Tutorial 04's Surrogate Worth Trade-off method quietly assumed each objective
could be summarized by a single number before trading it off against another.
For a damage or loss distribution, the obvious single number is its expected
value — and this chapter's entire argument is that this obvious choice is a
trap. Two designs can share almost identical expected damage while one of them
hides a catastrophic tail the other doesn't have. Averaging is exactly the
operation that erases that difference.
</p>

<hr>

<h2>The fallacy, stated plainly</h2>

<p>
Expected value is a probability-weighted average across an entire outcome
distribution. That's precisely the problem: a design with a small chance of
routine, moderate damage and a design with a much smaller chance of
catastrophic damage can be engineered to produce the <em>same</em> expected
value, because averaging doesn't care how the probability mass is arranged
across the outcome range — only where its center of mass ends up. No
decision-maker actually treats those two designs as equivalent, yet a
comparison based on expected value alone reports them as identical.
</p>

<hr>

<h2>The Partitioned Multiobjective Risk Method (PMRM)</h2>

<p>
Haimes' fix is direct: stop collapsing the whole damage distribution into one
number. Instead, partition the probability axis into regimes and compute a
separate conditional expected value within each one. The standard version uses
three regimes:
</p>

<ul>
  <li><strong>High-exceedance, low-consequence</strong> — the routine,
  everyday range of outcomes.</li>
  <li><strong>Intermediate-exceedance, intermediate-consequence</strong> — the
  middle ground.</li>
  <li><strong>Low-exceedance, high-consequence (LE/HC)</strong> — the extreme
  tail: rare, but severe when it happens.</li>
</ul>

<p>
Each regime gets its own conditional expected-value function, conventionally
labeled:
</p>

<ul>
  <li><code>f2</code> — conditional expected damage in the high-probability,
  low-consequence regime.</li>
  <li><code>f3</code> — conditional expected damage in the intermediate regime.</li>
  <li><code>f4</code> — conditional expected damage in the low-probability,
  high-consequence (extreme-event) regime — the number ordinary expected value
  quietly buries.</li>
  <li><code>f5</code> — the ordinary, unconditional expected value, kept
  explicitly for comparison against <code>f2</code>–<code>f4</code>, not as a
  replacement for them.</li>
</ul>

<p>
Because these are now several distinct numbers instead of one, they become
several distinct objectives — Tutorial 04's trade-off machinery applies
directly. A decision-maker can trade "minimize routine cost" against "minimize
extreme-event exposure" explicitly, instead of trusting a single blended figure
to represent both at once.
</p>

<hr>

<h2>A deliberately unresolved question: where does "extreme" begin?</h2>

<p>
The boundary between the intermediate and extreme regimes is a modeling choice,
not a fact of nature — and <code>f4</code> turns out to be genuinely sensitive
both to where that boundary is drawn and to which distribution is assumed for
the tail. Haimes and later researchers studied this sensitivity directly,
looking for distribution-free bounds on <code>f4</code> so the result wouldn't
depend too heavily on an arbitrary distributional assumption about a region of
the data where, by definition, observations are scarce.
</p>

<hr>

<h2>The dam-failure illustration</h2>

<p>
Haimes' own worked example applies PMRM to dam-failure and extreme-flood risk,
comparing engineering or operating policies not just on expected annual
damage, but explicitly on <code>f4</code> — their conditional exposure to the
extreme-event tail. Two designs with nearly identical expected annual damage
can differ sharply in that tail exposure, which is exactly the distinction an
expected-value-only comparison would have missed entirely.
</p>

<hr>

<h2>How this is done today</h2>

<ul>
  <li>
    <strong>Conditional Value at Risk (CVaR) / Expected Shortfall</strong> —
    today's standard financial risk metric is <code>f4</code>, formalized and
    standardized: the expected loss conditional on being beyond a given
    quantile threshold. It's now embedded directly in banking regulation
    precisely because regulators learned the same lesson Haimes was making
    here — an institution's average expected loss says nothing about how bad
    its worst case actually is.
  </li>
  <li>
    <strong>Extreme Value Theory (EVT)</strong> — rather than assuming one
    distribution shape across the whole outcome range and computing a
    conditional tail expectation from it, EVT (the Generalized Pareto
    Distribution, peaks-over-threshold methods) fits a distribution
    specifically to the tail observations beyond a threshold — a direct answer
    to the "f4 is sensitive to the assumed distribution" problem flagged
    above.
  </li>
  <li>
    <strong>Dam and floodplain engineering</strong> now routinely reports an
    expected annual damage figure <em>and</em> a separate "100-year" or
    "500-year event" tail metric side by side — <code>f5</code> next to
    <code>f4</code>, standard practice today rather than a novel proposal.
  </li>
  <li>
    <strong>PMRM itself has traveled well beyond water resources</strong> —
    it's been applied to portfolio selection in finance, where researchers
    found its <code>f4</code> measure a more informative risk signal than
    ordinary volatility specifically under extreme market conditions. The
    average-versus-tail distinction keeps reappearing outside engineering
    entirely, under different names.
  </li>
</ul>

<hr>

<h2>A worked comparison: two policies, similar average, different tail</h2>

<p>
The snippet below simulates two synthetic flood-protection policies with
nearly identical ordinary expected damage (<code>f5</code>), then partitions
each into a routine regime and a 5%-probability extreme-event tail to compute
<code>f4</code>. Watch how close the two policies' <code>f5</code> values stay
compared to how far apart their <code>f4</code> values end up — that gap is
exactly what expected value alone would have hidden.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>The tail is where you have the least data</strong> — by
  construction, the LE/HC regime is defined by scarcity of observations, which
  is exactly why <code>f4</code> is so sensitive to distributional assumptions
  in the first place.</li>
  <li><strong>Choosing the partition boundary is itself a decision</strong> —
  moving the threshold that defines "extreme" changes <code>f4</code>,
  sometimes substantially. Report the sensitivity, not just the point
  estimate.</li>
  <li><strong>More objectives means SWT-style trade-off work isn't optional</strong>
  — once <code>f2</code>, <code>f3</code>, and <code>f4</code> are separate
  objectives, someone still has to decide how much extreme-event exposure is
  worth trading off against routine cost. PMRM surfaces that decision; it
  doesn't make it for you.</li>
</ul>

<p>
<strong>Key principle:</strong> whenever a single expected value is used to
compare two risky alternatives, ask what it's averaging over — and specifically,
what it's averaging away.
</p>
`,
  codeSnippet: `
import numpy as np

rng = np.random.default_rng(42)

# Two flood-protection design policies, simulated as annual damage
# distributions (illustrative, not calibrated to a real site).
# Built to have nearly identical ORDINARY expected damage (f5)...
n = 200_000
damage_A = rng.lognormal(mean=1.95, sigma=0.6, size=n)
damage_B = np.where(rng.random(n) < 0.995,
                     rng.lognormal(mean=1.85, sigma=0.4, size=n),   # ...but B trades
                     rng.lognormal(mean=5.5, sigma=0.5, size=n))    # a fatter, rarer tail

def pmrm_partition(damage, tail_prob=0.05):
    """Partition into a routine regime and an extreme (LE/HC) tail regime.
    Returns f5 (ordinary expected value) and f4 (conditional expected
    value within the extreme-event tail)."""
    threshold = np.quantile(damage, 1 - tail_prob)
    tail_mask = damage >= threshold
    f5 = damage.mean()                     # ordinary, unconditional expected value
    f4 = damage[tail_mask].mean()          # conditional expectation, extreme regime
    f23 = damage[~tail_mask].mean()        # conditional expectation, everything else
    return f5, f4, f23

for name, damage in [("Policy A", damage_A), ("Policy B", damage_B)]:
    f5, f4, f23 = pmrm_partition(damage, tail_prob=0.05)
    print(f"{name}: f5 (ordinary E) = {f5:6.2f}   "
          f"f4 (extreme-event conditional E) = {f4:7.2f}   "
          f"routine-regime E = {f23:6.2f}")
`
},
