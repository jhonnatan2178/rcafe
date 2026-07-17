// ============================================================================
// NEW TUTORIAL ENTRY — paste this object inside the TUTORIALS array in
// constants.tsx (e.g. right after the last entry, before the closing `];`).
// It needs no new import — Language is already imported at the top of that file.
//
// New category introduced: "Risk & Decision Analysis" — the TutorialsPage
// derives categories automatically from `TUTORIALS.map(t => t.category)`,
// so this will render as its own section with no other code changes.
//
// Optional: add an image at public/images/tutorials/risk-analysis.jpg
// (same aspect ratio as your other hero images) or delete the `image` line
// to fall back to the plain-header layout used when no image is set.
// ============================================================================

{
  id: 'systems-risk-analysis',
  title: '01 - The Art and Science of Systems & Risk Analysis',
  description: 'The classical risk triplet, systems thinking, and how Bayesian networks, calibrated ML, and digital twins modernize it.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Intermediate",
  createdAt: "2026-07-16",
  image: "/images/tutorials/risk-analysis.jpg",
  content: `
<p>
Every monitoring pipeline on this site — a flood extent map, a burn severity index,
a coastal contamination flag — is, underneath, a risk model. This tutorial opens a
new track: instead of a sensor or algorithm, we look at the discipline that decides
<em>which</em> risks matter, how to quantify them, and how to act on them. Systems
engineering calls this risk analysis, and its modern form is a direct descendant of
a framework formalized in the 1980s that is still the backbone of how risk is
defined today.
</p>

<hr>

<h2>What actually is a "system"?</h2>

<p>
A system is a purposeful set of interrelated components — physical, human,
institutional — whose collective behavior cannot be predicted by studying each
part in isolation. Systems engineering is the discipline of designing and managing
that whole across its entire life cycle, not just optimizing its components.
</p>

<p>
A coastal water-quality monitoring program is a good example. It is not just a
satellite and an algorithm. It is satellites, in-situ sampling, a predictive model,
a health agency's decision process, and beach-goers' behavior, all coupled
together. Missing any one of those parts means missing part of the actual risk.
</p>

<hr>

<h2>The risk triplet: how risk got a rigorous definition</h2>

<p>
In 1981, Kaplan and Garrick proposed that quantitative risk could be reduced to
the answers to three questions, later adopted as the foundation of the entire
field of risk analysis:
</p>

<ol>
  <li><strong>What can happen?</strong> — the scenario.</li>
  <li><strong>How likely is it?</strong> — the probability.</li>
  <li><strong>If it does happen, what are the consequences?</strong></li>
</ol>

<p>
That's <em>risk assessment</em>. Haimes' framework adds a second triplet on top of
it, turning assessment into <em>management</em>:
</p>

<ol>
  <li><strong>What can be done about it?</strong> — the available options.</li>
  <li><strong>What are the trade-offs</strong> among cost, benefit, and risk across
  those options?</li>
  <li><strong>What does today's decision cost in future options?</strong></li>
</ol>

<p>
Six questions, in two groups. Almost every risk methodology you'll meet — HHM,
decision trees, Bayesian networks, ISO 31000 — is a way of answering one of these
six more rigorously.
</p>

<hr>

<h2>From the Farmer's Dilemma to the Coastal Manager's Dilemma</h2>

<p>
Haimes' book teaches this framework through a running example: a farmer choosing
a crop mix under uncertain rainfall, trading expected yield against the risk of a
bad season. The tension between maximizing what you expect on average and
minimizing your exposure to the worst case is the seed of multiobjective trade-off
analysis — later formalized as noninferior (Pareto-optimal) solutions.
</p>

<p>
The environmental-monitoring analog is a coastal manager deciding whether to close
a beach, delay dredging, or authorize an outfall discharge, weighing expected
recreational or economic value against the probability and severity of a
contamination event. Same six questions, different scenario — and the same
underlying tension between the expected outcome and the tail risk.
</p>

<hr>

<h2>How this is done today</h2>

<p>
The classical triplet assumed scenarios and probabilities came largely from expert
judgment — which is exactly what Hierarchical Holographic Modeling (HHM, covered
in the book's next chapter) was built for: systematically decomposing a system
into topics and sub-topics so no source of risk is overlooked. HHM is a direct
ancestor of the structured risk registers and multi-hazard frameworks used in
disaster-risk reduction today.
</p>

<p>
Three things have changed since 1998:
</p>

<ul>
  <li>
    <strong>Bayesian networks</strong> encode the same what-can-happen /
    how-likely structure, but let evidence — sensor readings, remote-sensing
    indices — update probabilities as it arrives, propagating uncertainty across
    dependent risk factors instead of relying on one static number.
  </li>
  <li>
    <strong>Calibrated ML classifiers</strong> (random forests, gradient boosting,
    increasingly transformer-based models on satellite time series) estimate
    P(hazard) directly from covariates instead of hand-built probability tables —
    this is the machinery behind most modern contamination and hazard prediction
    work, including on this site.
  </li>
  <li>
    <strong>Digital twins</strong> — a continuously updated virtual replica of the
    monitored system, fed by IoT and remote sensing — run the risk triplet
    operationally, and let managers simulate a treatment option before committing
    to it, turning question 4 (what can be done) into a live simulation instead of
    a static table.
  </li>
</ul>

<p>
At the management-standard level, ISO 31000 generalized this same triplet
structure (establish context → identify → analyze → evaluate → treat → monitor)
into a process used across industries — playing today the role Haimes' framework
originally played specifically for engineering systems.
</p>

<hr>

<h2>A minimal, quantitative version of the triplet</h2>

<p>
The snippet below turns the qualitative triplet into a small geospatial pipeline:
a probability layer (question 2, e.g. the output of a calibrated classifier
estimating P(contamination) per pixel) multiplied by a consequence layer
(question 3, e.g. beach usage or population exposure), classified into a
three-tier risk matrix. It's the same <code>risk = P(hazard) × consequence</code>
definition Kaplan and Garrick proposed in 1981, implemented as an actual raster
workflow.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>Cascading risk</strong> — the static triplet treats scenarios as
  independent. A flood that knocks out a treatment plant and <em>then</em> causes
  a contamination event is a chain, not a single scenario. This is precisely what
  HHM and "systems of systems" thinking exist to catch.</li>
  <li><strong>Calibration</strong> — a raw classifier score is not automatically a
  probability. Before treating a model's output as "how likely," calibrate it
  (Platt scaling, isotonic regression) or the second question in the triplet goes
  unanswered even though a number is displayed.</li>
  <li><strong>The consequence layer is usually the weakest link</strong> — teams
  invest heavily in the hazard model and treat exposure/consequence as an
  afterthought, when it deserves the same rigor.</li>
</ul>

<hr>

<h2>Where this track is headed</h2>

<ul>
  <li>Hierarchical Holographic Modeling — structured scenario identification for
  complex, interdependent systems.</li>
  <li>Decision trees and multiobjective trade-off analysis — formalizing the
  Coastal Manager's Dilemma quantitatively, option by option.</li>
</ul>

<p>
<strong>Key principle:</strong> before reaching for a bigger model, make sure you
can answer the three original questions for your system — what can happen, how
likely, and what if it does. Everything else in this track is refinement.
</p>
`,
  codeSnippet: `
import numpy as np
import rasterio

def load_raster(path):
    with rasterio.open(path) as src:
        return src.read(1).astype(float), src.profile

# "How likely" — probability layer from a CALIBRATED classifier
# e.g. output of a Random Forest / logistic regression estimating
# P(fecal contamination) per pixel from Sentinel-2 + in-situ training data
prob_hazard, profile = load_raster("p_contamination.tif")

# "What if it does happen" — consequence layer
# e.g. normalized beach-usage, population density, or economic-value index
consequence, _ = load_raster("consequence_index.tif")

# Kaplan & Garrick's triplet, quantified:
# risk(x) = P(hazard at x) * consequence(x)
risk = prob_hazard * consequence

# Classify into a 3-tier risk matrix (Low / Medium / High)
risk_class = np.select(
    [risk < 0.15, risk < 0.4],
    [1, 2],
    default=3
)

profile.update(dtype=rasterio.uint8, count=1, nodata=0)
with rasterio.open("risk_map.tif", "w", **profile) as dst:
    dst.write(risk_class.astype(np.uint8), 1)

print("Risk map exported — pixel values: 1=Low, 2=Medium, 3=High")
`
},
