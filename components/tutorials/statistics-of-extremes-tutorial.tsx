// ============================================================================
// NEW TUTORIAL ENTRY — paste this object inside the TUTORIALS array in
// constants.tsx, alongside the other nine "Risk & Decision Analysis"
// entries. Same category, so it joins that section automatically.
//
// Optional: add an image at public/images/tutorials/statistics-of-extremes.jpg,
// or delete the `image` line to use the plain-header layout.
// ============================================================================

{
  id: 'statistics-of-extremes-pmrm',
  title: '10 - Statistics of Extremes: Extending the PMRM',
  description: 'Two answers to f4\'s biggest weakness — a formal extreme-value-theory approximation, and a distribution-free bound — plus what it takes to estimate risk beyond anything you\'ve actually observed.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Advanced",
  createdAt: "2026-07-25",
  image: "/images/tutorials/statistics-of-extremes.jpg",
  content: `
<p>
Tutorial 07 left <code>f4</code> — PMRM's conditional expectation of the
extreme-event tail — with an honest weakness: it's sensitive both to where the
LE/HC boundary is drawn and to which distribution gets assumed for the tail.
This chapter, and the decade of research behind it, is Haimes and colleagues'
direct answer to that weakness, worked out in two genuinely different ways.
</p>

<hr>

<h2>The statistics of extremes, briefly</h2>

<p>
Classical extreme value theory studies what happens to the maximum of a
growing sample as the sample size increases. Regardless of the underlying
distribution (under fairly mild conditions), the properly rescaled maximum
converges to one of three families — historically called Type I (Gumbel),
Type II (Fréchet), and Type III (Weibull), today unified as the single
Generalized Extreme Value (GEV) distribution. Mitsiopoulos, Haimes, and Li
used this to derive an analytic approximation for <code>f4</code> directly
from whichever extreme-value type applies — and confirmed it held up across
normal, Gumbel, Weibull, Pareto, lognormal, and uniform underlying
distributions. You don't need to know the exact parent distribution, only
which of three basins of attraction it falls into — a considerably weaker
requirement.
</p>

<hr>

<h2>Assessing the tail separately from the body</h2>

<p>
A companion line of this research made an explicit methodological case: the
tail of a distribution can, and often should, be assessed separately from its
central values, rather than fitting one global distribution and reading the
tail off the same curve used to describe everyday outcomes. The mechanisms
producing a genuinely extreme event are often different in kind from the
mechanisms producing ordinary variation, and a distribution chosen to fit the
bulk of the data has no particular reason to also be correct out in the tail.
</p>

<hr>

<h2>How sensitive is the approximation itself?</h2>

<p>
Having an analytic form for <code>f4</code> doesn't end the conversation —
Romei, Haimes, and Li's follow-up work turned Tutorial 05's sensitivity
toolkit specifically on <code>f4</code>: how much does the estimate move when
the extreme-regime boundary shifts, or when the fitted tail parameters carry
their own uncertainty? An extreme-event risk number without a sensitivity
analysis attached to it is exactly the kind of false precision Tutorial 05
warned about.
</p>

<hr>

<h2>The distribution-free alternative</h2>

<p>
Mitsiopoulos and Haimes' complementary contribution takes the opposite
philosophy: instead of committing to any parametric family — even one as
weakly specified as "which of three extreme-value types" — derive bounds on
<code>f4</code> that hold across broad classes of distributions. It's a
trade: a looser estimate, in exchange for not needing to get the distributional
family right at all. Where data is genuinely too scarce to justify a specific
tail model, that trade is often the honest one to make.
</p>

<hr>

<h2>How this is done today</h2>

<ul>
  <li>
    <strong>Peaks-over-threshold (POT) with the Generalized Pareto
    Distribution (GPD)</strong> is the standard operational form of "assess the
    tail separately" today, used across hydrology, insurance, and finance:
    declare a high threshold, fit a GPD to what exceeds it, and use that fit —
    not the whole-dataset distribution — for anything concerning the tail.
  </li>
  <li>
    <strong>Nonstationary extreme value analysis</strong> — the book's own
    research lineage explicitly raised the question of extremes under
    nonstationary conditions in the 1990s. Climate science has since made
    that the normal case rather than the exception: GEV and GPD parameters are
    now routinely allowed to vary with covariates like time or global
    temperature, because assuming a fixed, unchanging hazard distribution is
    no longer considered defensible for design purposes.
  </li>
  <li>
    <strong>Bayesian extreme value analysis</strong> is today's usual
    alternative to a purely distribution-free bound: put a genuine prior over
    the tail's shape parameter, and let the posterior widen automatically in
    exactly the data-scarce regime where a single point estimate would be
    overconfident.
  </li>
</ul>

<hr>

<h2>The real payoff: saying something beyond what you've observed</h2>

<p>
The most useful property of a fitted extreme-value model isn't a smaller
error bar at a threshold you already have data for — it's the ability to say
anything at all about a threshold you don't. The snippet below fits a GPD to
a modest sample's moderate tail, then extrapolates the fitted model out to a
threshold more extreme than anything in the sample. The naive empirical
approach has nothing to offer at that point — no observations, no answer — while
the extrapolated GPD estimate lands in the right neighborhood of a reference
value computed from a vastly larger sample.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>Small tail samples make the shape parameter unstable</strong> —
  fitting a two-parameter GPD to a handful of exceedances can add more
  variance than it removes; the parametric approach's advantage shows up in
  its ability to extrapolate, not automatically in a tighter estimate at
  thresholds you already have data for.</li>
  <li><strong>Extrapolation assumes the extreme-value type doesn't change</strong>
  — nothing guarantees the same tail behavior continues past the largest value
  you've actually seen. That assumption is the whole basis for the
  extrapolation, and it deserves to be stated as an assumption, not a fact.</li>
  <li><strong>Nonstationarity breaks a fitted tail model quietly</strong> — a
  GPD fit to last decade's exceedances describes last decade's hazard. If the
  underlying process is genuinely shifting, that fit doesn't automatically
  update itself.</li>
</ul>

<p>
<strong>Key principle:</strong> the whole point of a statistically grounded
tail model is to have something honest to say about events more extreme than
any you've recorded. If a method can only describe the extremes you've already
observed, it isn't adding anything a plain average couldn't already tell you.
</p>
`,
  codeSnippet: `
import numpy as np
from scipy import stats

rng = np.random.default_rng(0)

# The "true" damage-generating process (unknown to the analyst in practice)
true_dist = stats.lognorm(s=0.6, scale=np.exp(1.95))

# Reference f4 at a genuinely extreme threshold, from an enormous sample --
# stands in for "the real answer," not something available in practice
big_sample = true_dist.rvs(20_000_000, random_state=np.random.default_rng(1))
extreme_threshold = np.quantile(big_sample, 0.999)
true_f4_extreme = big_sample[big_sample > extreme_threshold].mean()

# A realistic field sample: enough for a decent tail fit, but its own
# maximum doesn't reach anywhere near the extreme threshold above
n = 2000
sample = true_dist.rvs(n, random_state=rng)
fit_threshold = np.quantile(sample, 0.95)          # a moderate threshold, in-sample
exceed = sample[sample > fit_threshold] - fit_threshold

print(f"Field sample: n={n}, max observed value = {sample.max():.2f}")
print(f"Extreme threshold of interest: {extreme_threshold:.2f} "
      f"(never observed in this sample)")

# Naive empirical approach: can only average what it actually has
beyond_max = sample[sample > extreme_threshold]
naive = "undefined -- no observations that extreme" if len(beyond_max) == 0 else f"{beyond_max.mean():.2f}"
print(f"Naive empirical f4 at the extreme threshold: {naive}")

# GPD/EVT approach: fit once to the moderate, in-sample tail, then
# extrapolate using the GPD's threshold-stability property (scale grows
# linearly with the threshold; shape stays fixed)
xi, loc, sigma = stats.genpareto.fit(exceed, floc=0)
sigma_at_u = sigma + xi * (extreme_threshold - fit_threshold)
gpd_f4_extreme = extreme_threshold + sigma_at_u / (1 - xi) if xi < 1 else np.nan

print(f"GPD-extrapolated f4 at the extreme threshold: {gpd_f4_extreme:.2f}  "
      f"(fitted shape={xi:.3f}, scale={sigma:.2f})")
print(f"Reference 'true' f4 at that threshold: {true_f4_extreme:.2f}")
`
},
