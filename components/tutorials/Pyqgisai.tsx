// @ts-nocheck
import { useState } from "react";

function CopyButton({ targetId }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const el = document.getElementById(targetId);
    navigator.clipboard.writeText(el.innerText || el.textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return <button onClick={copy} style={s.copyBtn}>{copied ? "✓ Copied" : "Copy"}</button>;
}

function CodeBlock({ id, lang, children }) {
  return (
    <div style={s.codeWrap}>
      <div style={s.codeHeader}>
        <span style={s.codeLang}>{lang}</span>
        <CopyButton targetId={id} />
      </div>
      <pre style={s.pre}><code id={id}>{children}</code></pre>
    </div>
  );
}

function Callout({ type = "info", children }) {
  const map = {
    info:    { bg: "#EFF6FF", border: "#3B82F6", icon: "ℹ️" },
    tip:     { bg: "#F0FDF4", border: "#22C55E", icon: "💡" },
    warning: { bg: "#FFFBEB", border: "#F59E0B", icon: "⚠️" },
    key:     { bg: "#F5F3FF", border: "#7C3AED", icon: "🔑" },
  };
  const c = map[type];
  return (
    <div style={{ ...s.callout, background: c.bg, borderLeft: `4px solid ${c.border}` }}>
      <span style={{ marginRight: 8 }}>{c.icon}</span>{children}
    </div>
  );
}

// ── PyQGIS basics ─────────────────────────────────────────────────────────────
function BasicsStepper() {
  const [active, setActive] = useState(0);
  const steps = [
    {
      icon: "📂", title: "Loading & inspecting layers",
      desc: "Everything in PyQGIS starts with a layer object — vector or raster. Always check isValid() before doing anything else; a bad file path or driver mismatch fails silently otherwise.",
      code: `from qgis.core import QgsVectorLayer, QgsRasterLayer

# Vector layer
stations = QgsVectorLayer("stations.shp", "stations", "ogr")
print(stations.isValid())          # True if it loaded correctly
print(stations.featureCount())     # number of features
print(stations.crs().authid())     # e.g. 'EPSG:4326'
print(stations.fields().names())   # attribute column names

# Raster layer
dem = QgsRasterLayer("dem.tif", "dem")
print(dem.isValid())
print(dem.width(), dem.height())   # pixel dimensions
print(dem.extent().toString())     # bounding box`
    },
    {
      icon: "🧾", title: "Reading features & attributes",
      desc: "getFeatures() returns a generator, not a list — it streams features one at a time instead of loading them all into memory, which matters once a layer has more than a few thousand rows.",
      code: `# Iterate features and read attributes
for feature in stations.getFeatures():
    name = feature["station_name"]
    value = feature["tss_mgL"]
    geom = feature.geometry()
    print(name, value, geom.asPoint())

# Filter while iterating with a QgsFeatureRequest
from qgis.core import QgsFeatureRequest

request = QgsFeatureRequest().setFilterExpression('"tss_mgL" > 50')
high_tss = [f["station_name"] for f in stations.getFeatures(request)]
print(high_tss)`
    },
    {
      icon: "📐", title: "Basic geometry operations",
      desc: "QgsGeometry objects carry their own methods for area, length, buffering, and distance — you rarely need an external library for simple cases inside QGIS.",
      code: `# Area and length (units follow the layer's CRS)
for feature in parcels.getFeatures():
    geom = feature.geometry()
    print(geom.area(), geom.length())

# Buffer a single geometry
point_geom = feature.geometry()
buffered_geom = point_geom.buffer(distance=500, segments=8)

# Distance between two geometries
d = point_a.geometry().distance(point_b.geometry())
print(f"{d:.1f} metres apart (if CRS is projected in metres)")`
    },
    {
      icon: "⚙️", title: "Running Processing algorithms",
      desc: "The Processing Toolbox — the same one you'd click through in the GUI — is scriptable through processing.run(). Every algorithm has a fixed set of parameter names you can list with processing.algorithmHelp().",
      code: `import processing

# List parameters for an algorithm before using it
processing.algorithmHelp("native:buffer")

# Run it
result = processing.run("native:buffer", {
    "INPUT": stations,
    "DISTANCE": 500,
    "SEGMENTS": 8,
    "OUTPUT": "memory:"   # keep result in memory, or give a file path
})["OUTPUT"]

QgsProject.instance().addMapLayer(result)`
    },
    {
      icon: "🎨", title: "Styling layers programmatically",
      desc: "Symbology can be set from code too — useful when you're generating the same map repeatedly and want consistent styling without re-clicking through the Layer Properties panel each time.",
      code: `from qgis.core import QgsSymbol, QgsSingleSymbolRenderer

symbol = QgsSymbol.defaultSymbol(stations.geometryType())
symbol.setColor(QColor("#1D4ED8"))
symbol.setSize(2.5)

renderer = QgsSingleSymbolRenderer(symbol)
stations.setRenderer(renderer)
stations.triggerRepaint()`
    },
  ];

  return (
    <div style={s.stepperBox}>
      <div style={s.stepperNav}>
        {steps.map((st, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ ...s.stepperBtn, ...(active===i ? s.stepperBtnActive : {}) }}>
            <span>{st.icon}</span>
            <span style={{ fontSize: 11 }}>{i+1}. {st.title}</span>
          </button>
        ))}
      </div>
      <div style={s.stepperContent}>
        <div style={s.stepperNum}>Step {active+1} of {steps.length}</div>
        <div style={s.stepperTitle}>{steps[active].icon} {steps[active].title}</div>
        <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: "0 0 16px" }}>{steps[active].desc}</p>
        <CodeBlock id={`basics-${active}`} lang="python">{steps[active].code}</CodeBlock>
        <div style={s.stepperControls}>
          <button onClick={() => setActive(Math.max(0, active-1))} disabled={active===0} style={s.stepperArrow}>← Previous</button>
          <button onClick={() => setActive(Math.min(steps.length-1, active+1))} disabled={active===steps.length-1} style={s.stepperArrow}>Next →</button>
        </div>
      </div>
    </div>
  );
}

// ── core concepts ─────────────────────────────────────────────────────────────
function CoreConcepts() {
  const [active, setActive] = useState(0);
  const concepts = [
    {
      icon: "🖥️", name: "The console",
      desc: "PyQGIS's built-in Python console (Plugins → Python Console) runs on the same interpreter as QGIS itself, with the current project's layers already in scope. Anything you install there is available immediately — no extra wiring.",
      code: `# Inside the QGIS Python Console — layers are already loaded
layer = QgsProject.instance().mapLayersByName("stations")[0]
print(layer.featureCount(), "features")
print(layer.crs().authid())   # e.g. 'EPSG:4326'`
    },
    {
      icon: "🤖", name: "ask_ai() helper",
      desc: "A thin wrapper around the Anthropic API that turns a plain-language description into PyQGIS code. Keep the API key in an environment variable, never hardcoded.",
      code: `import os, requests

def ask_ai(prompt: str) -> str:
    resp = requests.post(
        "https://api.anthropic.com/v1/messages",
        headers={
            "x-api-key": os.environ["ANTHROPIC_API_KEY"],
            "anthropic-version": "2023-06-01",
        },
        json={
            "model": "claude-sonnet-4-6",
            "max_tokens": 800,
            "messages": [{"role": "user", "content": prompt}],
        },
    )
    return resp.json()["content"][0]["text"]`
    },
    {
      icon: "⏳", name: "QgsTask (async)",
      desc: "The console runs on QGIS's main UI thread — a blocking network call freezes the canvas until it returns. For anything beyond a quick one-off call, move the request to a background task so the app stays responsive.",
      code: `from qgis.core import QgsTask, QgsApplication

def run_ai_task(prompt, on_done):
    task = QgsTask.fromFunction(
        "Ask AI", lambda t: ask_ai(prompt)
    )
    task.taskCompleted.connect(
        lambda: on_done(task.returned_values)
    )
    QgsApplication.taskManager().addTask(task)`
    },
    {
      icon: "⚙️", name: "processing.run()",
      desc: "The entry point AI-generated code almost always reaches for — QGIS's processing framework exposes hundreds of native and provider algorithms under one consistent call signature, which is exactly the pattern an LLM has seen the most of.",
      code: `import processing

result = processing.run("native:buffer", {
    "INPUT": stations,
    "DISTANCE": 500,
    "OUTPUT": "memory:"
})["OUTPUT"]

QgsProject.instance().addMapLayer(result)`
    },
  ];
  return (
    <div style={s.conceptBox}>
      <div style={s.conceptNav}>
        {concepts.map((c, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ ...s.conceptBtn, ...(active===i ? s.conceptBtnActive : {}) }}>
            {c.icon} {c.name}
          </button>
        ))}
      </div>
      <div style={s.conceptContent}>
        <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>{concepts[active].desc}</p>
        <CodeBlock id={`concept-${active}`} lang="python">{concepts[active].code}</CodeBlock>
      </div>
    </div>
  );
}

// ── workflow stepper ──────────────────────────────────────────────────────────
function WorkflowStepper() {
  const [active, setActive] = useState(0);
  const steps = [
    {
      icon: "⚙️", title: "Environment setup",
      desc: "QGIS bundles its own Python interpreter, so a normal system pip install won't reach it. Target QGIS's interpreter directly (or use the OSGeo4W shell on Windows), and read your API key from an environment variable rather than hardcoding it.",
      code: `# macOS/Linux — install requests into QGIS's bundled Python
python3 -m pip install requests --target=/path/to/qgis/python/plugins

# Standalone script (outside the GUI)
from qgis.core import QgsApplication

QgsApplication.setPrefixPath("/usr", True)
qgs = QgsApplication([], False)
qgs.initQgis()
# ... your script, then qgs.exitQgis() when done`
    },
    {
      icon: "💬", title: "Calling the LLM from the console",
      desc: "Start with a simple blocking call for quick, one-off requests. Once you're scripting something longer — batch prompts, a plugin with a UI — switch to the QgsTask version so the canvas doesn't freeze mid-request.",
      code: `# Quick one-off call
response = ask_ai(
    "Write PyQGIS code to reproject the layer 'stations' "
    "to EPSG:32618 and buffer it by 200 metres."
)
print(response)

# Non-blocking version for longer sessions
run_ai_task(prompt, on_done=lambda code: print(code))`
    },
    {
      icon: "🔁", title: "The prompt → geoprocessing loop",
      desc: "Describe intent, get code back, read it, run it in a scratch project — then promote it to your real workflow. This is the loop that actually holds up in practice.",
      code: `import processing

stations = QgsProject.instance().mapLayersByName("stations")[0]

reproj = processing.run("native:reprojectlayer", {
    "INPUT": stations, "TARGET_CRS": "EPSG:32618", "OUTPUT": "memory:"
})["OUTPUT"]

buffered = processing.run("native:buffer", {
    "INPUT": reproj, "DISTANCE": 200, "OUTPUT": "memory:"
})["OUTPUT"]

QgsProject.instance().addMapLayer(buffered)

# Before promoting: confirm EPSG:32618 is the right UTM zone for
# your study area, and that 200 means metres in THIS CRS — not degrees.`
    },
    {
      icon: "🛰️", title: "AI-assisted raster reasoning",
      desc: "An LLM in a text console can't see your imagery. What it can do is reason over statistics you've already extracted — band means, standard deviations — and help you form a hypothesis worth checking formally.",
      code: `stats_summary = f"""
Band 2 (green): mean=0.041, std=0.009
Band 4 (red):   mean=0.038, std=0.011
Band 8 (NIR):   mean=0.21,  std=0.04
Site: coastal lagoon, post-rainfall event.
What does this band relationship suggest about
turbidity or suspended sediment, and what would confirm it?
"""
ask_ai(stats_summary)

# Useful for exploration and for drafting the plain-language
# interpretation in a report. Not a substitute for a calibrated
# retrieval model fit against in-situ samples.`
    },
    {
      icon: "✅", title: "Before you trust the output",
      desc: "A short set of habits worth running through every time AI-generated code touches a real project — cheap insurance against the errors an LLM won't flag on its own.",
      code: `# Never exec() sight-unseen — read it, then run it in a
# scratch project, not your working one.

# Verify CRS and units explicitly — a "200" could mean
# metres, degrees, or feet depending on the layer's CRS.

# Check the PyQGIS API against your installed QGIS version —
# method signatures change between releases.

# Keep the prompt next to the script it produced, for
# reproducibility later.

# Cache or rate-limit calls in batch workflows — looping an
# API call per feature in a large layer gets slow and costly fast.`
    },
  ];

  return (
    <div style={s.stepperBox}>
      <div style={s.stepperNav}>
        {steps.map((st, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ ...s.stepperBtn, ...(active===i ? s.stepperBtnActive : {}) }}>
            <span>{st.icon}</span>
            <span style={{ fontSize: 11 }}>{i+1}. {st.title}</span>
          </button>
        ))}
      </div>
      <div style={s.stepperContent}>
        <div style={s.stepperNum}>Step {active+1} of {steps.length}</div>
        <div style={s.stepperTitle}>{steps[active].icon} {steps[active].title}</div>
        <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: "0 0 16px" }}>{steps[active].desc}</p>
        <CodeBlock id={`step-${active}`} lang="python">{steps[active].code}</CodeBlock>
        <div style={s.stepperControls}>
          <button onClick={() => setActive(Math.max(0, active-1))} disabled={active===0} style={s.stepperArrow}>← Previous</button>
          <button onClick={() => setActive(Math.min(steps.length-1, active+1))} disabled={active===steps.length-1} style={s.stepperArrow}>Next →</button>
        </div>
      </div>
    </div>
  );
}

// ── quiz ──────────────────────────────────────────────────────────────────────
function Quiz() {
  const qs = [
    { q: "Why does stations.getFeatures() return a generator instead of a list?", opts: ["QGIS doesn't support lists", "It streams features one at a time instead of loading the whole layer into memory at once", "Generators run faster on small layers only"], ans: 1, exp: "For a layer with a few features this barely matters, but for one with hundreds of thousands, loading everything into a list up front would be wasteful. A generator yields features one at a time, so you can filter or stop early without ever holding the full layer in memory." },
    { q: "What does processing.run() return?", opts: ["A dictionary of output parameter names to results", "A new QGIS project file", "Nothing — it modifies the input layer directly"], ans: 0, exp: "Every processing algorithm returns a dictionary keyed by its output parameter names (commonly \"OUTPUT\"). You pull the actual result layer out of that dictionary — result[\"OUTPUT\"] — rather than getting a layer back directly." },
    { q: "Why does the QGIS console freeze during a blocking HTTP call to an LLM?", opts: ["The API is too slow for QGIS to handle", "The console runs on QGIS's main UI thread, so a blocking call halts the canvas until it returns", "QGIS blocks all outbound network requests by default"], ans: 1, exp: "PyQGIS's console shares the main UI thread with the rest of the application. Any blocking call — including a synchronous HTTP request — freezes the canvas until it completes. Moving the request into a QgsTask keeps the interface responsive." },
    { q: "You get back AI-generated code with buffer DISTANCE = 200. What must you confirm before running it on your real project?", opts: ["That the API key is valid", "That 200 means metres in the layer's actual CRS, not degrees or another unit", "That the layer has fewer than 200 features"], ans: 1, exp: "A distance argument only means what the CRS says it means. An LLM will happily write DISTANCE: 200 without checking whether the layer is in a geographic CRS (degrees) or a projected one (metres) — that verification is on you." },
    { q: "Why can't the LLM in this workflow directly interpret a satellite image?", opts: ["It can, but only for Sentinel-2 imagery", "It only ever sees the text summaries or statistics you feed it — not the raster itself", "QGIS doesn't allow images to be exported as text"], ans: 1, exp: "In a text console workflow, the model has no access to pixel data. It reasons over whatever numeric summary — band means, standard deviations, histograms — you've already extracted and typed into the prompt." },
    { q: "What's the main risk of looping an API call once per feature across a large layer?", opts: ["QGIS will crash after 100 features", "Cost and rate limits — a few thousand features means a few thousand API calls", "The AI will start giving worse answers over time"], ans: 1, exp: "Batch-calling an LLM per feature scales linearly with layer size. A layer with a few thousand features means a few thousand billed requests, and you'll likely hit rate limits well before it finishes — batch or cache instead." },
  ];
  const [chosen, setChosen] = useState({});
  const [revealed, setRevealed] = useState({});
  const choose = (qi, oi) => { if (!revealed[qi]) setChosen(c => ({ ...c, [qi]: oi })); };
  const reveal = (qi) => { if (chosen[qi] !== undefined) setRevealed(r => ({ ...r, [qi]: true })); };
  return (
    <div>
      {qs.map((q, qi) => (
        <div key={qi} style={s.quizCard}>
          <p style={s.quizQ}><strong>Q{qi+1}.</strong> {q.q}</p>
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            {q.opts.map((opt, oi) => {
              let bg="#fff", border="1.5px solid #E5E7EB";
              if (revealed[qi]) {
                if (oi===q.ans) { bg="#F0FDF4"; border="1.5px solid #22C55E"; }
                else if (chosen[qi]===oi) { bg="#FEF2F2"; border="1.5px solid #EF4444"; }
              } else if (chosen[qi]===oi) { bg="#EFF6FF"; border="1.5px solid #3B82F6"; }
              return <button key={oi} onClick={() => choose(qi,oi)}
                style={{ ...s.quizOpt, background:bg, border, cursor:revealed[qi]?"default":"pointer" }}>
                {opt}{revealed[qi]&&oi===q.ans&&" ✓"}{revealed[qi]&&chosen[qi]===oi&&oi!==q.ans&&" ✗"}
              </button>;
            })}
          </div>
          {!revealed[qi] && <button onClick={()=>reveal(qi)} disabled={chosen[qi]===undefined} style={s.revealBtn}>Check answer</button>}
          {revealed[qi] && <div style={s.explanation}><strong>{chosen[qi]===q.ans?"Correct! ":"Not quite. "}</strong>{q.exp}</div>}
        </div>
      ))}
    </div>
  );
}

// ── main ─────────────────────────────────────────────────────────────────────
export default function PyqgisAI() {
  return (
    <div style={s.page}>
      <div style={s.breadcrumb}>
        <span>GIS Applications</span><span style={s.sep}>›</span>
        <span>Automation</span><span style={s.sep}>›</span>
        <span style={{color:"#111"}}>PyQGIS × AI Integration</span>
      </div>

      <div style={s.tags}>
        {["Beginner → Advanced","~45 min","Python","PyQGIS","QGIS Console","Anthropic API"].map(t => (
          <span key={t} style={s.tag}>{t}</span>
        ))}
      </div>

      <h1 style={s.h1}>PyQGIS: From the Basics to a Natural-Language Front End</h1>
      <p style={s.lead}>
        Part one covers the PyQGIS fundamentals — loading layers, reading attributes,
        geometry operations, and running Processing algorithms from code. Part two
        builds on that foundation to wire an LLM into the QGIS Python console, so a
        description like "buffer the wells by 500 m and clip to the watershed" becomes
        reviewable PyQGIS code instead of a memorized API call.
      </p>

      <Callout type="key">
        <strong>The core idea:</strong> describe intent in plain language, get a PyQGIS
        script back, read it, test it in a scratch project — then promote it. The AI
        writes the first draft; you stay the geoprocessing reviewer.
      </Callout>

      {/* Part 1 */}
      <div style={s.section}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
          <span style={s.partBadge}>Part 1</span>
          <h2 style={{ ...s.h2, border:"none", padding:0, margin:0 }}>PyQGIS fundamentals</h2>
        </div>
        <p style={s.p}>
          Five building blocks that cover most of what you'll actually reach for day to
          day. Skip ahead to Part 2 if these are already familiar.
        </p>
        <BasicsStepper />
        <Callout type="tip">
          <strong>Spatial SQL, briefly:</strong> once a project outgrows shapefiles,
          QGIS's DB Manager connects directly to PostGIS — spatial SQL functions like{" "}
          <code>ST_Intersects</code> and <code>ST_Buffer</code> do the same operations
          shown above, but inside the database and indexed for scale. Worth learning
          alongside PyQGIS rather than instead of it.
        </Callout>
      </div>

      {/* Part 2 intro */}
      <div style={s.section}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
          <span style={s.partBadge}>Part 2</span>
          <h2 style={{ ...s.h2, border:"none", padding:0, margin:0 }}>Adding a natural-language front end</h2>
        </div>
        <p style={s.p}>
          None of this replaces knowledge of the PyQGIS API — it removes the friction of
          recalling exact syntax while you're mid-analysis.
        </p>
        <ul style={s.ul}>
          <li><strong>Natural-language geoprocessing:</strong> turn analysis intent into a first-draft script instead of re-deriving the right <code>processing.run()</code> call from memory</li>
          <li><strong>Faster prototyping:</strong> sketch a workflow in minutes, then harden it once you know it does what you want</li>
          <li><strong>Documentation on the way out:</strong> ask the same model for a docstring or a methods note for a script you've already written — useful for a thesis appendix or reproducibility section</li>
        </ul>
        <Callout type="warning">
          <strong>Where this breaks down:</strong> an LLM generates plausible-looking
          geoprocessing code — that's a different thing from correct code. It will
          confidently get CRS units, field names, and version-specific method names
          wrong. Treat every output as a draft written by a fast but overconfident
          collaborator.
        </Callout>
      </div>

      {/* Concepts */}
      <div style={s.section}>
        <h2 style={s.h2}>Four building blocks</h2>
        <p style={s.p}>
          Before wiring anything together, understand these four pieces — click each to
          see how they fit:
        </p>
        <CoreConcepts />
      </div>

      {/* What you'll build */}
      <div style={s.section}>
        <h2 style={s.h2}>What you'll build</h2>
        <ul style={s.ul}>
          <li><strong>An ask_ai() helper:</strong> a reusable function that sends a prompt to Claude and returns PyQGIS code</li>
          <li><strong>A non-blocking version:</strong> the same call wrapped in a QgsTask so the canvas stays responsive</li>
          <li><strong>A working prompt → code → run loop:</strong> demonstrated on a real reproject-and-buffer example</li>
          <li><strong>A raster-reasoning pattern:</strong> feeding band statistics to the model for exploratory interpretation</li>
          <li><strong>A validation habit:</strong> a short checklist to run through before any AI-generated code touches a real project</li>
        </ul>
      </div>

      {/* Workflow */}
      <div style={s.section}>
        <h2 style={s.h2}>Step-by-step: prompt to production</h2>
        <WorkflowStepper />
      </div>

      {/* Reference */}
      <div style={s.section}>
        <h2 style={s.h2}>Reference while you build</h2>
        <div style={s.dataGrid}>
          {[
            { icon:"📖", name:"PyQGIS Developer Cookbook", url:"https://docs.qgis.org/latest/en/docs/pyqgis_developer_cookbook/", desc:"The canonical reference for the PyQGIS API — check any AI-generated method call against your installed QGIS version here.", tag:"API reference" },
            { icon:"⚙️", name:"QGIS Processing Algorithm List", url:"https://docs.qgis.org/latest/en/docs/user_manual/processing_algs/", desc:"Full list of native and provider algorithms callable through processing.run() — useful for spotting a hallucinated algorithm name.", tag:"Algorithms" },
            { icon:"🔑", name:"Anthropic API Docs", url:"https://docs.claude.com", desc:"Request/response format, models, and rate limits for the API calls used in ask_ai().", tag:"API docs" },
            { icon:"🧵", name:"QgsTask reference", url:"https://qgis.org/pyqgis/master/core/QgsTask.html", desc:"Background task API — how to keep long-running or networked operations off the main UI thread.", tag:"Async" },
          ].map((d, i) => (
            <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" style={s.dataCard}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{d.icon}</div>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4, flexWrap:"wrap" }}>
                <span style={{ fontWeight:600, fontSize:13, color:"#111" }}>{d.name}</span>
                <span style={s.dataTag}>{d.tag}</span>
              </div>
              <div style={{ fontSize:12, color:"#6B7280", lineHeight:1.5 }}>{d.desc}</div>
            </a>
          ))}
        </div>
        <Callout type="tip">
          A good habit for any AI-assisted geoprocessing script: keep the prompt that
          generated it in a comment at the top of the file, next to the script itself.
          Cheap insurance for reproducibility later.
        </Callout>
      </div>

      {/* Quiz */}
      <div style={s.section}>
        <h2 style={s.h2}>Test your understanding</h2>
        <Quiz />
      </div>

      {/* Next */}
      <div style={s.section}>
        <h2 style={s.h2}>What's next?</h2>
        <div style={s.nextGrid}>
          {[
            ["PyQGIS Automation Scripts","Batch-process geoprocessing workflows across many layers or projects without the console.","/tutorial/pyqgis-automation-scripts"],
            ["Building a QGIS Plugin","Package a working script — including an AI-assisted one — into a reusable plugin with a UI.","/tutorial/qgis-plugin-development"],
            ["Reproducible Geoprocessing","Version-control prompts, scripts, and outputs together for research-grade reproducibility.","/tutorial/reproducible-geoprocessing"],
          ].map(([title,desc,href],i) => (
            <a key={i} href={href} style={s.nextCard}>
              <div style={s.nextTitle}>{title}</div>
              <div style={s.nextDesc}>{desc}</div>
              <span style={{color:"#1D4ED8",fontSize:13,fontWeight:500}}>Read →</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { maxWidth:820, margin:"0 auto", padding:"28px 20px", fontFamily:"'Inter',system-ui,sans-serif", color:"#111827", lineHeight:1.65 },
  breadcrumb: { display:"flex", gap:6, alignItems:"center", fontSize:12, color:"#6B7280", marginBottom:20 },
  sep: { color:"#D1D5DB" },
  tags: { display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" },
  tag: { fontSize:11, padding:"3px 10px", borderRadius:20, background:"#F3F4F6", color:"#374151", border:"1px solid #E5E7EB" },
  partBadge: { fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, background:"#1D4ED8", color:"#fff", letterSpacing:"0.03em" },
  h1: { fontSize:"clamp(22px,4vw,32px)", fontWeight:700, lineHeight:1.2, margin:"0 0 14px" },
  h2: { fontSize:19, fontWeight:600, margin:"0 0 14px", color:"#111827", borderBottom:"2px solid #F3F4F6", paddingBottom:8 },
  lead: { fontSize:15, color:"#374151", margin:"0 0 16px", lineHeight:1.7 },
  callout: { padding:"12px 16px", borderRadius:8, margin:"0 0 20px", fontSize:13, lineHeight:1.65 },
  section: { marginBottom:44 },
  p: { fontSize:14, color:"#374151", margin:"0 0 14px", lineHeight:1.7 },
  ul: { paddingLeft:22, margin:"0 0 14px", fontSize:14, color:"#374151", lineHeight:1.9 },
  conceptBox: { border:"1.5px solid #E5E7EB", borderRadius:12, overflow:"hidden", marginBottom:24 },
  conceptNav: { display:"flex", flexWrap:"wrap", gap:8, padding:"12px 16px", background:"#F9FAFB", borderBottom:"1px solid #E5E7EB" },
  conceptBtn: { padding:"7px 16px", borderRadius:8, border:"1.5px solid #E5E7EB", background:"#fff", fontSize:13, cursor:"pointer", fontWeight:500, color:"#374151" },
  conceptBtnActive: { background:"#1D4ED8", color:"#fff", borderColor:"#1D4ED8" },
  conceptContent: { padding:"20px 22px" },
  stepperBox: { border:"1.5px solid #E5E7EB", borderRadius:12, overflow:"hidden", marginBottom:24 },
  stepperNav: { display:"flex", flexWrap:"wrap", background:"#F9FAFB", borderBottom:"1px solid #E5E7EB", padding:8, gap:6 },
  stepperBtn: { flex:"1 1 auto", padding:"9px 8px", border:"none", background:"transparent", fontSize:11, color:"#374151", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, borderRadius:7, minWidth:80 },
  stepperBtnActive: { background:"#1D4ED8", color:"#fff", fontWeight:600 },
  stepperContent: { padding:"20px 24px" },
  stepperNum: { fontSize:11, color:"#1D4ED8", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:6 },
  stepperTitle: { fontSize:16, fontWeight:600, color:"#111827", marginBottom:10 },
  stepperControls: { display:"flex", gap:10, marginTop:8 },
  stepperArrow: { padding:"6px 14px", borderRadius:7, border:"1.5px solid #E5E7EB", background:"#fff", fontSize:13, cursor:"pointer", color:"#374151" },
  codeWrap: { background:"#1E293B", borderRadius:10, overflow:"hidden", marginBottom:16 },
  codeHeader: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 14px", background:"#0F172A" },
  codeLang: { fontSize:11, color:"#94A3B8", fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.05em" },
  copyBtn: { fontSize:11, padding:"3px 10px", background:"#334155", color:"#CBD5E1", border:"none", borderRadius:5, cursor:"pointer" },
  pre: { margin:0, padding:"16px 20px", overflowX:"auto", fontSize:12, lineHeight:1.7, color:"#E2E8F0", fontFamily:"'Fira Code',monospace" },
  dataGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:12, marginBottom:16 },
  dataCard: { display:"block", padding:"14px", background:"#F9FAFB", border:"1.5px solid #E5E7EB", borderRadius:10, textDecoration:"none" },
  dataTag: { fontSize:11, padding:"2px 8px", borderRadius:20, background:"#EFF6FF", color:"#1D4ED8", border:"1px solid #BFDBFE", fontWeight:500 },
  quizCard: { background:"#F9FAFB", border:"1.5px solid #E5E7EB", borderRadius:10, padding:"18px", marginBottom:14 },
  quizQ: { fontSize:13, fontWeight:500, marginBottom:10, color:"#111" },
  quizOpt: { width:"100%", textAlign:"left", padding:"9px 13px", borderRadius:7, fontSize:12, transition:"all 0.15s" },
  revealBtn: { marginTop:10, padding:"6px 14px", background:"#1D4ED8", color:"#fff", border:"none", borderRadius:6, fontSize:12, cursor:"pointer", fontWeight:500 },
  explanation: { marginTop:10, padding:"9px 13px", background:"#F0FDF4", border:"1px solid #86EFAC", borderRadius:7, fontSize:12, color:"#166534", lineHeight:1.6 },
  nextGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:12 },
  nextCard: { display:"block", padding:"14px", background:"#F9FAFB", border:"1.5px solid #E5E7EB", borderRadius:10, textDecoration:"none" },
  nextTitle: { fontWeight:600, fontSize:13, color:"#111827", marginBottom:4 },
  nextDesc: { fontSize:12, color:"#6B7280", lineHeight:1.5, marginBottom:8 },
};