// ============================================================================
// NEW TUTORIAL ENTRY — paste this object inside the TUTORIALS array in
// constants.tsx, alongside the other four "Risk & Decision Analysis"
// entries. Same category, so it joins that section automatically.
//
// Optional: add an image at public/images/tutorials/uncertainty-sensitivity.jpg,
// or delete the `image` line to use the plain-header layout.
// ============================================================================

{
  id: 'uncertainty-sensitivity-analysis',
  title: '05 - Defining Uncertainty and Sensitivity Analysis',
  description: 'Sensitivity, stability, and irreversibility as distinct properties of a model — and the Uncertainty Sensitivity Index Method for deciding which assumptions actually matter.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Advanced",
  createdAt: "2026-07-20",
  image: "/images/tutorials/uncertainty-sensitivity.jpg",
  content: `
<p>
Every tutorial in this series so far has rested on a model: a hazard
probability, a payoff table, a cost-vs-risk curve. None of that machinery is
worth much if you don't know how much the model's output actually depends on
its shakiest assumptions — or whether getting one of those assumptions wrong is
something you can still walk back from. That's the question this chapter is
built around.
</p>

<hr>

<h2>Four properties worth telling apart</h2>

<p>
Haimes and Hall's 1977 paper on civil systems named four distinct properties of
how a system responds to change, and it's worth keeping them separate rather
than lumping them all under "sensitivity":
</p>

<ul>
  <li><strong>Sensitivity</strong> — how much the output moves for a given
  change in an input or parameter.</li>
  <li><strong>Responsivity</strong> — how quickly that movement actually
  happens; a system can be highly sensitive but slow to respond, or mildly
  sensitive but react almost instantly.</li>
  <li><strong>Stability</strong> — whether the system settles back to
  equilibrium after a perturbation, or drifts away from it.</li>
  <li><strong>Irreversibility</strong> — whether a change, once it happens, can
  be undone at all, even if the original cause is removed.</li>
</ul>

<p>
The last one is the one classical sensitivity analysis is least equipped to
catch. A coastal lagoon can absorb nutrient loading for years, staying visibly
stable — until a threshold is crossed and it flips to a persistently turbid,
low-oxygen state that doesn't reverse just because the loading stops. Ecologists
call this a regime shift; economists studying similar problems call the
corresponding caution a preference for keeping options open. Sensitivity
analysis alone will not warn you about it — you need a model capable of
representing a threshold in the first place.
</p>

<hr>

<h2>Where modeling error actually comes from</h2>

<p>
Every model in this series carries error from more than one source, and they
don't respond to the same fix:
</p>

<ul>
  <li><strong>Structural error</strong> — the functional form itself is wrong or
  incomplete (a missing interaction term, an assumed linear relationship that
  isn't). No amount of better data fixes this; only a better model does.</li>
  <li><strong>Parameter error</strong> — the structure is right, but the values
  plugged into it aren't well known. More data, or better estimation, narrows
  this.</li>
  <li><strong>Data error</strong> — measurement noise, sampling gaps, sensor
  drift — the raw inputs feeding both the structure and the parameters.</li>
</ul>

<hr>

<h2>A taxonomy that survives contact with practice</h2>

<p>
The distinction that has proven most durable, in this book and in the field
since, is between <strong>aleatory</strong> and <strong>epistemic</strong>
uncertainty. Aleatory uncertainty is irreducible natural variability — this
year's rainfall being wetter or drier than average isn't a knowledge gap, it's
the system being genuinely stochastic. Epistemic uncertainty is a knowledge
gap — the true decay rate of a pollutant, the correct model structure — and
unlike aleatory uncertainty, it shrinks as better data or better models become
available. Confusing the two leads to the wrong response every time: no amount
of additional monitoring will narrow uncertainty that is genuinely aleatory, and
no amount of statistical averaging fixes uncertainty that is really about not
yet knowing the right model.
</p>

<hr>

<h2>The Uncertainty Sensitivity Index Method (USIM)</h2>

<p>
Not every uncertain parameter deserves equal attention. USIM's proposal: rank
parameters by how much their own plausible range of uncertainty propagates into
output uncertainty, then spend data-collection and model-refinement effort on
the parameters that actually move the answer — not the ones that happen to be
easiest to study. Haimes and colleagues then folded this directly into design:
once you know which parameters a design is most sensitive to, that ranking
becomes part of the optimization problem itself, so the resulting design stays
acceptable across the plausible parameter range rather than being optimal for
one nominal guess and fragile everywhere else.
</p>

<hr>

<h2>How this is done today</h2>

<ul>
  <li>
    <strong>Global sensitivity analysis (GSA)</strong> — variance-based methods
    (Sobol indices, the Morris screening method, FAST) are the direct,
    computationally rigorous descendant of USIM-style ranking: instead of
    varying one parameter at a time, they vary all of them jointly and
    decompose the output variance into each parameter's contribution, including
    interaction effects a one-at-a-time sweep can miss entirely.
  </li>
  <li>
    <strong>Surrogate models</strong> — a full Sobol analysis can need tens of
    thousands of model evaluations, which is a problem when the model is an
    expensive hydrodynamic simulation or a large ML model. Fitting a cheap
    surrogate (commonly a Gaussian process emulator) to a modest sample of
    real runs, then running the sensitivity analysis on the surrogate, is now
    standard practice for exactly this reason.
  </li>
  <li>
    <strong>Robust optimization and info-gap decision theory</strong> — modern,
    more formal versions of USIM's integration with design: rather than
    optimizing for one nominal parameter set, these frameworks explicitly
    optimize for acceptable performance across an entire uncertainty envelope,
    which is precisely what sections 6.7–6.9 were reaching for with the tools
    available in the 1990s.
  </li>
  <li>
    <strong>Irreversibility</strong> gets handled separately, and still mostly
    outside sensitivity analysis proper — regime-shift and tipping-point theory
    in ecology, and real-options theory in economics (which puts a quantifiable
    value on the option to wait before taking an action you can't undo), are
    today's formal treatments of a property Haimes flagged as distinct back in
    1977.
  </li>
</ul>

<hr>

<h2>A worked comparison: one-at-a-time vs. variance-based</h2>

<p>
The snippet below runs both approaches on the same small model — a proxy for
contamination risk as a function of discharge rate, flushing time, and decay
rate. USIM-style, it first sweeps each parameter across its own range with the
others held at nominal, ranking parameters by output swing. Then it samples all
three jointly and estimates each parameter's share of output variance via its
correlation with the output — a simplified stand-in for a proper Sobol index,
useful for seeing how the two rankings can disagree once interactions are
allowed to show up.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>One-at-a-time misses interactions</strong> — if two parameters
  only matter in combination, holding one at nominal while varying the other
  hides that entirely. That's the main reason variance-based GSA replaced it.</li>
  <li><strong>The correlation-based proxy below is a simplification</strong> —
  it's useful for building intuition, not a substitute for a properly computed
  Sobol index (via a library such as SALib) in real work.</li>
  <li><strong>No sensitivity analysis detects irreversibility on its own</strong>
  — it tells you how much output moves, not whether the system can move back.
  That needs an explicit dynamical or threshold model.</li>
</ul>

<p>
<strong>Key principle:</strong> a precise-looking model output is worth nothing
if you can't say which assumptions it actually depends on, and whether being
wrong about one of them is a mistake you could still undo.
</p>
`,
  codeSnippet: `
import numpy as np

# Toy model: a proxy for contamination risk as a function of three
# uncertain parameters (illustrative, not calibrated to real data)
def contamination_risk(discharge, flushing_days, decay_rate):
    return discharge * flushing_days * np.exp(-decay_rate * flushing_days)

# Nominal values and plausible ranges for each parameter
params = {
    "discharge":     {"nominal": 50,  "range": (20, 80)},    # kg/day
    "flushing_days": {"nominal": 5,   "range": (2, 12)},     # days
    "decay_rate":    {"nominal": 0.3, "range": (0.1, 0.6)},  # 1/day
}

# --- One-at-a-time (USIM-style) sensitivity ---
print("One-at-a-time sensitivity (output range when only this parameter varies):")
oat_ranges = {}
for name, spec in params.items():
    outputs = []
    for val in np.linspace(*spec["range"], 50):
        kwargs = {k: v["nominal"] for k, v in params.items()}
        kwargs[name] = val
        outputs.append(contamination_risk(**kwargs))
    oat_ranges[name] = max(outputs) - min(outputs)
    print(f"  {name:15s} output range = {oat_ranges[name]:8.1f}")

print(f"\\nOAT priority for uncertainty reduction (highest impact first): "
      f"{sorted(oat_ranges, key=oat_ranges.get, reverse=True)}")

# --- Modern complement: Monte Carlo variance-based sensitivity ---
# Samples all parameters jointly; each parameter's correlation with the
# output is used here as a simplified proxy for a first-order Sobol index.
n = 20_000
samples = {name: np.random.uniform(*spec["range"], n) for name, spec in params.items()}
outputs = contamination_risk(**samples)

print("\\nMonte Carlo variance-based sensitivity (approx. first-order share):")
for name in params:
    corr = np.corrcoef(samples[name], outputs)[0, 1]
    print(f"  {name:15s} approx. variance share = {corr**2:.1%}")
`
},
