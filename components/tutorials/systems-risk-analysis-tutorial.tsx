// ============================================================================
// REPLACEMENT for the 'systems-risk-analysis' object in constants.tsx.
// Find that object (starts with id: 'systems-risk-analysis') and replace the
// WHOLE object with this one — everything else in constants.tsx stays the same.
//
// What changed vs. the plain-text version:
//   1. A diagram after "What actually is a system?" — the coastal monitoring
//      loop (satellites -> model -> agency -> public -> feedback).
//   2. A diagram after the six questions — the risk/management triplet as a
//      numbered flow instead of two separate bullet lists.
//   3. "Key principle" is now a styled callout box instead of a plain <p>.
// All three are inline SVG / styled <div>s — no image files needed, and
// nothing here depends on Tailwind config, so it renders identically
// regardless of theme.
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

<div style="margin: 2.5rem 0;">
<svg viewBox="0 0 725 260" xmlns="http://www.w3.org/2000/svg" style="width:100%; max-width:680px; margin:0 auto; display:block;">
  <defs>
    <marker id="arrowhead-sys" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="#D97706"/>
    </marker>
    <marker id="arrowhead-sys-grey" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="#94A3B8"/>
    </marker>
  </defs>

  <rect x="10"  y="30" width="150" height="60" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
  <rect x="195" y="30" width="150" height="60" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
  <rect x="380" y="30" width="150" height="60" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
  <rect x="565" y="30" width="150" height="60" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>

  <text x="85"  y="54" text-anchor="middle" font-size="12.5" font-family="sans-serif" fill="#334155">Satellites &amp;</text>
  <text x="85"  y="70" text-anchor="middle" font-size="12.5" font-family="sans-serif" fill="#334155">sensors</text>
  <text x="270" y="64" text-anchor="middle" font-size="12.5" font-family="sans-serif" fill="#334155">Predictive model</text>
  <text x="455" y="64" text-anchor="middle" font-size="12.5" font-family="sans-serif" fill="#334155">Agency decision</text>
  <text x="640" y="64" text-anchor="middle" font-size="12.5" font-family="sans-serif" fill="#334155">Public behavior</text>

  <line x1="162" y1="60" x2="193" y2="60" stroke="#D97706" stroke-width="2.5" marker-end="url(#arrowhead-sys)"/>
  <line x1="347" y1="60" x2="378" y2="60" stroke="#D97706" stroke-width="2.5" marker-end="url(#arrowhead-sys)"/>
  <line x1="532" y1="60" x2="563" y2="60" stroke="#D97706" stroke-width="2.5" marker-end="url(#arrowhead-sys)"/>

  <path d="M 640 90 C 640 210, 85 210, 85 90" fill="none" stroke="#94A3B8" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#arrowhead-sys-grey)"/>
  <text x="362" y="235" text-anchor="middle" font-size="12" font-family="monospace" fill="#94A3B8">feedback loop — this is what makes it a "system," not a pipeline</text>
</svg>
</div>

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
Six questions, in two groups:
</p>

<div style="margin: 2rem 0;">
<svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg" style="width:100%; max-width:680px; margin:0 auto; display:block;">
  <defs>
    <marker id="arrowhead-triplet" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto">
      <path d="M0,0 L8,0 L4,8 Z" fill="#D97706"/>
    </marker>
  </defs>

  <rect x="10"  y="15" width="220" height="60" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
  <rect x="250" y="15" width="220" height="60" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
  <rect x="490" y="15" width="220" height="60" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>

  <circle cx="26" cy="31" r="12" fill="#D97706"/>
  <text x="26" y="35" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#ffffff" font-weight="bold">1</text>
  <circle cx="266" cy="31" r="12" fill="#D97706"/>
  <text x="266" y="35" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#ffffff" font-weight="bold">2</text>
  <circle cx="506" cy="31" r="12" fill="#D97706"/>
  <text x="506" y="35" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#ffffff" font-weight="bold">3</text>

  <text x="120" y="52" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#334155">What can happen?</text>
  <text x="360" y="52" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#334155">How likely is it?</text>
  <text x="600" y="46" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#334155">
    <tspan x="600" dy="0">What are the</tspan>
    <tspan x="600" dy="16">consequences?</tspan>
  </text>

  <line x1="360" y1="78" x2="360" y2="106" stroke="#D97706" stroke-width="2.5" marker-end="url(#arrowhead-triplet)"/>
  <text x="360" y="124" text-anchor="middle" font-size="15" font-family="sans-serif" fill="#B45309" font-weight="bold">RISK</text>
  <line x1="360" y1="132" x2="360" y2="156" stroke="#D97706" stroke-width="2.5" marker-end="url(#arrowhead-triplet)"/>

  <rect x="10"  y="160" width="220" height="60" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
  <rect x="250" y="160" width="220" height="60" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
  <rect x="490" y="160" width="220" height="60" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>

  <circle cx="26" cy="176" r="12" fill="#475569"/>
  <text x="26" y="180" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#ffffff" font-weight="bold">4</text>
  <circle cx="266" cy="176" r="12" fill="#475569"/>
  <text x="266" y="180" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#ffffff" font-weight="bold">5</text>
  <circle cx="506" cy="176" r="12" fill="#475569"/>
  <text x="506" y="180" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#ffffff" font-weight="bold">6</text>

  <text x="120" y="197" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#334155">What can be done?</text>
  <text x="360" y="191" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#334155">
    <tspan x="360" dy="0">What are the</tspan>
    <tspan x="360" dy="16">trade-offs?</tspan>
  </text>
  <text x="600" y="191" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#334155">
    <tspan x="600" dy="0">Future cost of</tspan>
    <tspan x="600" dy="16">today's choice?</tspan>
  </text>

  <line x1="360" y1="222" x2="360" y2="248" stroke="#475569" stroke-width="2.5" marker-end="url(#arrowhead-triplet)"/>
  <text x="360" y="266" text-anchor="middle" font-size="15" font-family="sans-serif" fill="#1E293B" font-weight="bold">ACTION</text>
</svg>
</div>

<p>
Almost every risk methodology you'll meet — HHM, decision trees, Bayesian
networks, ISO 31000 — is a way of answering one of these six more rigorously.
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

<div style="background:#FFFBEB; border-left:4px solid #D97706; padding:1rem 1.25rem; border-radius:0 8px 8px 0; margin:2rem 0;">
  <p style="margin:0; color:#334155;"><strong style="color:#B45309;">Key principle:</strong> before reaching for a bigger model, make sure you can answer the three original questions for your system — what can happen, how likely, and what if it does. Everything else in this track is refinement.</p>
</div>
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