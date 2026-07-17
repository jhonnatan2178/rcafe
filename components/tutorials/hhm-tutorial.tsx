// ============================================================================
// NEW TUTORIAL ENTRY — paste this object inside the TUTORIALS array in
// constants.tsx, alongside the "systems-risk-analysis" and
// "decision-analysis" entries. Same category, so it joins the same
// "Risk & Decision Analysis" section automatically.
//
// Optional: add an image at public/images/tutorials/hhm.jpg,
// or delete the `image` line to use the plain-header layout.
// ============================================================================

{
  id: 'hierarchical-holographic-modeling',
  title: '03 - Identifying Risk Through Hierarchical Holographic Modeling',
  description: 'How to find the risks nobody thought to list — from Haimes\' HHM method to modern bowtie analysis, STPA, and LLM-assisted hazard elicitation.',
  language: Language.PYTHON,
  category: "Risk & Decision Analysis",
  level: "Intermediate",
  createdAt: "2026-07-18",
  image: "/images/tutorials/hhm.jpg",
  content: `
<p>
Tutorials 01 and 02 assumed the scenario list already existed: a hazard
probability, a set of options, a payoff table. But the very first question in
the risk triplet — <em>what can happen</em> — is the one most likely to be
answered badly, because it's the one where you don't yet know what you're
missing. Hierarchical Holographic Modeling (HHM) is Haimes' method for finding
those blind spots before they become the scenario nobody planned for.
</p>

<hr>

<h2>Why "holographic"?</h2>

<p>
The name is a deliberate metaphor. A hologram encodes the same scene from many
overlapping angles, and — unlike a normal photograph — any fragment of it still
contains information about the whole picture. HHM applies that idea to risk
identification: model the same system from several different, overlapping
viewpoints (technical, organizational, economic, environmental, temporal...)
instead of a single hierarchy, because any one lens will systematically miss an
entire category of risk that a different lens would have caught immediately.
</p>

<hr>

<h2>Hierarchical aspects: build a tree, not a list</h2>

<p>
The first move is structural: break the system down into a tree of topics and
sub-topics, the same way a book's table of contents forces a subject to be
covered exhaustively rather than as a loose bag of items. Each level of the tree
is a checkpoint — "have I covered every branch here?" — that a flat brainstorm
never forces you to ask.
</p>

<hr>

<h2>Hierarchical overlapping coordination: the overlap is the point</h2>

<p>
Because HHM insists on multiple overlapping viewpoints, the same underlying risk
often shows up in more than one branch. A wastewater treatment plant bypass is
simultaneously an infrastructure-failure risk, a public-health risk, and a
regulatory-compliance risk. Haimes treats that repetition as a feature, not
noise: an item that only ever appears once is easy to lose track of, but an item
that keeps resurfacing under different lenses is exactly the kind of
cross-cutting risk worth prioritizing first.
</p>

<hr>

<h2>HHM and the theory of scenario structuring</h2>

<p>
HHM isn't the only way to structure a scenario list, and a later refinement —
by Kaplan, Haimes, and Garrick — makes an important admission: different
structuring methods applied to the same system can produce genuinely different
scenario sets. That means the scenario list in the risk triplet from Tutorial 01
was never a "true," complete enumeration — it's an approximation, shaped by
whichever structuring method produced it. HHM doesn't solve that problem; it
just tends to produce a more complete approximation than an unstructured
brainstorm would.
</p>

<hr>

<h2>The AMP-HHM game: structuring risk as a group, not a solo exercise</h2>

<p>
The Adaptive Multiplayer HHM game turns the hierarchy-building process into a
structured, participatory exercise: multiple stakeholders contribute and revise
branches together, rather than one analyst imposing a structure and hoping it's
complete. The underlying insight — that scenario identification improves when
multiple independent perspectives are elicited and reconciled systematically —
is the same one behind the Delphi method, and it shows up again, in a very
current form, further down this page.
</p>

<hr>

<h2>Domain-agnostic by design</h2>

<p>
Haimes applies the same method across strikingly different systems — a water
resource system, a software acquisition program, hardening a water supply
network, an automated highway system, food-poisoning outbreak scenarios. The
method doesn't care what the system is; it only cares that the system is
decomposed from more than one angle before anyone starts assigning
probabilities to it.
</p>

<hr>

<h2>How this is done today</h2>

<ul>
  <li>
    <strong>Bowtie analysis</strong> and <strong>FMEA</strong> (Failure Modes and
    Effects Analysis) are the industrial-safety descendants of the same
    hierarchical-decomposition instinct — structured templates that force a
    team through every failure pathway before consequences are estimated.
  </li>
  <li>
    <strong>STPA</strong> (Systems-Theoretic Process Analysis) extends this
    further to modern software-heavy systems, treating unsafe control actions
    between components — not just component failures — as first-class risk
    scenarios, closer in spirit to HHM's "system," not "component," framing.
  </li>
  <li>
    <strong>National and enterprise risk registers</strong> (disaster-risk
    catalogs built on frameworks like Sendai, or corporate GRC platforms) are,
    in effect, standing HHM hierarchies — built once, refreshed periodically,
    rather than rebuilt per project.
  </li>
  <li>
    <strong>LLM-assisted hazard elicitation</strong> is the newest addition:
    recent work uses large language models as an additional "viewpoint" in the
    same spirit as AMP-HHM's group exercise — surfacing candidate hazards or
    failure causes for a human analyst to review, or running structured,
    Delphi-style elicitation rounds with an LLM standing in for an additional
    reviewer. Current evidence suggests these tools are a genuinely useful
    complement for surfacing candidates, not yet a substitute for the human
    review step.
  </li>
</ul>

<hr>

<h2>A worked HHM tree: coastal contamination risk</h2>

<p>
The snippet below builds a small HHM-style hierarchy for the running Coastal
Manager's Dilemma, then flattens it into a checklist — exactly the kind of
"risk register" a monitoring program would maintain. Note which items appear
under more than one branch: those are the cross-cutting risks Haimes' overlap
concept is built to surface.
</p>

<hr>

<h2>Limitations to keep in mind</h2>

<ul>
  <li><strong>Coverage isn't provable</strong> — HHM makes omissions less likely,
  it doesn't guarantee completeness. There is no method that certifies a
  scenario list as exhaustive.</li>
  <li><strong>The hierarchy itself is a choice</strong> — per the theory of
  scenario structuring, a different set of viewpoints yields a different tree,
  and therefore a different scenario list. Document which viewpoints you used
  and why.</li>
  <li><strong>Structure without follow-through is just a diagram</strong> — an
  HHM tree only pays off once each leaf gets carried into an actual probability
  and consequence estimate (Tutorial 01) and a real decision (Tutorial 02).</li>
</ul>

<p>
<strong>Key principle:</strong> most risk-analysis failures on record aren't
probability errors — they're scenarios that were never on the list in the
first place. HHM's entire value is spent before a single number gets
calculated.
</p>
`,
  codeSnippet: `
# A minimal HHM tree for coastal contamination risk —
# five overlapping viewpoints on the same system
hhm = {
    "Point-source pollution": [
        "Wastewater treatment plant bypass",
        "Industrial discharge",
        "Marina / vessel waste",
    ],
    "Non-point-source pollution": [
        "Agricultural runoff",
        "Urban stormwater",
        "Wastewater treatment plant bypass",  # <- overlaps with the branch above
    ],
    "Hydrodynamic & climatic": [
        "Low flushing / tidal exchange",
        "Heavy rainfall events",
        "Sea-level rise altering circulation",
    ],
    "Monitoring gaps": [
        "Sparse in-situ sampling network",
        "Satellite revisit / cloud-cover gaps",
        "Sensor drift / calibration lag",
    ],
    "Institutional & regulatory": [
        "Delayed inter-agency data sharing",
        "Enforcement gaps on discharge permits",
        "Industrial discharge",  # <- overlaps with point-source branch
    ],
}

def flatten_hhm(tree):
    """Turn the hierarchy into a flat risk-register checklist, keeping
    track of every branch each item appears under."""
    register = {}
    for branch, items in tree.items():
        for item in items:
            register.setdefault(item, []).append(branch)
    return register

register = flatten_hhm(hhm)

# Items under more than one branch are the "hierarchical overlapping
# coordination" Haimes describes — cross-cutting risks worth prioritizing.
for item, branches in sorted(register.items(), key=lambda kv: -len(kv[1])):
    tag = "  <- cross-cutting" if len(branches) > 1 else ""
    print(f"{item:40s} {branches}{tag}")
`
},
