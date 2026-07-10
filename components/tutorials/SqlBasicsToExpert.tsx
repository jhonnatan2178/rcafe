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

function CodeBlock({ id, lang = "sql", children }) {
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

function PartBadge({ children }) {
  return <span style={s.partBadge}>{children}</span>;
}

// ── generic stepper (reused across all three parts) ───────────────────────────
function Stepper({ steps, idPrefix }) {
  const [active, setActive] = useState(0);
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
        <CodeBlock id={`${idPrefix}-${active}`} lang="sql">{steps[active].code}</CodeBlock>
        {steps[active].note && <Callout type={steps[active].noteType || "tip"}>{steps[active].note}</Callout>}
        <div style={s.stepperControls}>
          <button onClick={() => setActive(Math.max(0, active-1))} disabled={active===0} style={s.stepperArrow}>← Previous</button>
          <button onClick={() => setActive(Math.min(steps.length-1, active+1))} disabled={active===steps.length-1} style={s.stepperArrow}>Next →</button>
        </div>
      </div>
    </div>
  );
}

// ── generic quiz ────────────────────────────────────────────────────────────
function Quiz({ questions }) {
  const [chosen, setChosen] = useState({});
  const [revealed, setRevealed] = useState({});
  const choose = (qi, oi) => { if (!revealed[qi]) setChosen(c => ({ ...c, [qi]: oi })); };
  const reveal = (qi) => { if (chosen[qi] !== undefined) setRevealed(r => ({ ...r, [qi]: true })); };
  return (
    <div>
      {questions.map((q, qi) => (
        <div key={qi} style={s.quizCard}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10, marginBottom:10 }}>
            <p style={{ ...s.quizQ, marginBottom:0 }}><strong>Q{qi+1}.</strong> {q.q}</p>
            <span style={s.levelTag}>{q.level}</span>
          </div>
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

// ── content: Part 1 — basics ──────────────────────────────────────────────────
const basicsSteps = [
  {
    icon: "🔎", title: "SELECT, FROM, WHERE",
    desc: "Every query starts the same way: pick columns, name a table, filter rows. WHERE runs before any grouping or sorting — it decides which raw rows even make it to the next stage.",
    code: `SELECT name, region
FROM stations
WHERE region = 'Caribbean';

-- Multiple conditions
SELECT name, region
FROM stations
WHERE region = 'Caribbean' AND active = true;`,
    note: "NULL never equals anything with = — not even another NULL. Use IS NULL / IS NOT NULL to test for it; WHERE region = NULL silently returns zero rows.",
    noteType: "warning",
  },
  {
    icon: "↕️", title: "Sorting, limiting, de-duplicating",
    desc: "ORDER BY controls row order (ascending by default), LIMIT caps how many come back, and DISTINCT collapses duplicate rows in the result set.",
    code: `SELECT DISTINCT region
FROM stations
ORDER BY region ASC;

-- Top 5 highest readings
SELECT s.name, m.sample_date, m.tss_mgl
FROM samples m
JOIN stations s ON s.station_id = m.station_id
ORDER BY m.tss_mgl DESC
LIMIT 5;`,
  },
  {
    icon: "📊", title: "Aggregates & GROUP BY",
    desc: "COUNT, SUM, AVG, MIN, MAX collapse many rows into one per group. HAVING filters groups after aggregation — the equivalent of WHERE, but one stage later in execution order.",
    code: `SELECT station_id,
       COUNT(*)        AS n_samples,
       AVG(tss_mgl)    AS avg_tss
FROM samples
GROUP BY station_id
HAVING COUNT(*) > 10
ORDER BY avg_tss DESC;`,
    note: "WHERE filters rows before grouping; HAVING filters groups after. WHERE COUNT(*) > 10 is invalid — the count doesn't exist yet at that stage.",
  },
  {
    icon: "🔗", title: "Joins",
    desc: "INNER JOIN keeps only rows with a match on both sides. LEFT JOIN keeps every row from the left table, filling unmatched right-side columns with NULL — the most common join for \"give me everything, plus related data if it exists.\"",
    code: `-- INNER JOIN: only stations that have samples
SELECT s.name, m.sample_date, m.tss_mgl
FROM stations s
INNER JOIN samples m ON m.station_id = s.station_id;

-- LEFT JOIN: every station, even ones with zero samples
SELECT s.name, COUNT(m.sample_id) AS n_samples
FROM stations s
LEFT JOIN samples m ON m.station_id = s.station_id
GROUP BY s.name;`,
  },
  {
    icon: "🪆", title: "Subqueries",
    desc: "A query nested inside another. A scalar subquery returns one value; a correlated subquery references the outer row and re-runs per row — powerful, but worth watching for performance once tables get large.",
    code: `-- Scalar subquery
SELECT name FROM stations
WHERE station_id = (
  SELECT station_id FROM samples
  ORDER BY tss_mgl DESC LIMIT 1
);

-- Correlated subquery with EXISTS
SELECT s.name
FROM stations s
WHERE EXISTS (
  SELECT 1 FROM samples m
  WHERE m.station_id = s.station_id AND m.tss_mgl > 100
);`,
    note: "EXISTS often outperforms IN (SELECT ...) on large subqueries — it can stop at the first match instead of building the full result set.",
  },
];

// ── content: Part 2 — intermediate ───────────────────────────────────────────
const intermediateSteps = [
  {
    icon: "🧩", title: "CTEs — the WITH clause",
    desc: "A Common Table Expression names a subquery so you can reference it like a table, making multi-step logic readable top to bottom instead of nested inside-out.",
    code: `WITH high_tss AS (
  SELECT station_id, AVG(tss_mgl) AS avg_tss
  FROM samples
  GROUP BY station_id
  HAVING AVG(tss_mgl) > 50
)
SELECT s.name, h.avg_tss
FROM high_tss h
JOIN stations s USING (station_id)
ORDER BY h.avg_tss DESC;

-- Recursive CTE: generate a month series without a calendar table
WITH RECURSIVE months AS (
  SELECT DATE '2025-01-01' AS month
  UNION ALL
  SELECT month + INTERVAL '1 month'
  FROM months
  WHERE month < DATE '2026-06-01'
)
SELECT month FROM months;`,
  },
  {
    icon: "🪟", title: "Window functions",
    desc: "Unlike GROUP BY, window functions don't collapse rows — every input row stays in the output, with a value computed over a \"window\" of related rows alongside it. This is the single most useful intermediate skill for time-series and ranking work.",
    code: `SELECT
  station_id,
  sample_date,
  tss_mgl,
  ROW_NUMBER() OVER (PARTITION BY station_id ORDER BY sample_date)         AS visit_num,
  LAG(tss_mgl) OVER (PARTITION BY station_id ORDER BY sample_date)         AS prev_tss,
  AVG(tss_mgl) OVER (PARTITION BY station_id ORDER BY sample_date
                      ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)           AS rolling_avg_3
FROM samples;`,
    note: "PARTITION BY resets the window per group (like GROUP BY would), but ORDER BY inside OVER() controls row order within that partition for running calculations — the two clauses do different jobs.",
  },
  {
    icon: "🔀", title: "CASE expressions",
    desc: "Inline conditional logic — the closest thing SQL has to if/elif/else, usable anywhere a value is expected: SELECT, WHERE, ORDER BY, even inside aggregates.",
    code: `SELECT
  name,
  CASE
    WHEN avg_tss > 100 THEN 'poor'
    WHEN avg_tss > 50  THEN 'moderate'
    ELSE 'good'
  END AS water_quality_class
FROM (
  SELECT s.name, AVG(m.tss_mgl) AS avg_tss
  FROM stations s JOIN samples m USING (station_id)
  GROUP BY s.name
) t;`,
  },
  {
    icon: "🕳️", title: "Handling NULLs",
    desc: "SQL uses three-valued logic: TRUE, FALSE, and UNKNOWN. Any comparison against NULL returns UNKNOWN, which behaves like FALSE in a WHERE clause — this trips up more real queries than any other single SQL quirk.",
    code: `-- Replace NULL with a default
SELECT name, COALESCE(region, 'unknown') AS region
FROM stations;

-- Avoid divide-by-zero when a count could be 0
SELECT station_id, sum_tss / NULLIF(n_samples, 0) AS avg_tss
FROM station_totals;

-- Wrong — never matches, even for NULL rows:
-- WHERE region = NULL
-- Right:
-- WHERE region IS NULL`,
  },
  {
    icon: "➕", title: "Set operations",
    desc: "UNION combines result sets from two queries with the same column shape. Plain UNION removes duplicates (an implicit sort/dedupe step); UNION ALL keeps everything and is faster when you know there's no overlap.",
    code: `SELECT name FROM stations WHERE region = 'Caribbean'
UNION
SELECT name FROM stations WHERE region = 'Pacific';

-- Faster when duplicates are impossible or don't matter
SELECT station_id FROM samples WHERE sample_date >= '2026-01-01'
UNION ALL
SELECT station_id FROM samples WHERE tss_mgl > 100;`,
  },
  {
    icon: "🔤", title: "String & date functions",
    desc: "Every SQL dialect has its own names for these, but the shapes are consistent: truncate/format a date, transform case, concatenate or extract substrings.",
    code: `SELECT
  station_id,
  DATE_TRUNC('month', sample_date) AS month,
  UPPER(region)                    AS region_upper,
  name || ' (' || region || ')'    AS label
FROM samples
JOIN stations USING (station_id);`,
  },
];

// ── content: Part 3 — advanced / expert ──────────────────────────────────────
const advancedSteps = [
  {
    icon: "🗂️", title: "Indexes & EXPLAIN ANALYZE",
    desc: "An index lets the database jump to matching rows instead of scanning the whole table. EXPLAIN shows the planner's estimated strategy; EXPLAIN ANALYZE actually runs the query and reports real timings — the two can disagree, and that gap is often the most useful diagnostic you have.",
    code: `CREATE INDEX idx_samples_station_date
  ON samples (station_id, sample_date);

EXPLAIN ANALYZE
SELECT * FROM samples
WHERE station_id = 42
ORDER BY sample_date DESC
LIMIT 10;`,
    note: "Look for \"Seq Scan\" vs \"Index Scan\" in the plan. A sequential scan on a large table where you expected an index hit is the first thing to investigate.",
    noteType: "key",
  },
  {
    icon: "🔒", title: "Transactions & isolation",
    desc: "A transaction groups statements so they succeed or fail together (atomicity — the 'A' in ACID). Isolation level controls what concurrent transactions can see of each other's uncommitted or committed changes.",
    code: `BEGIN;
UPDATE stations SET region = 'Caribbean Coast' WHERE station_id = 12;
INSERT INTO audit_log (station_id, action) VALUES (12, 'region_updated');
COMMIT;
-- ROLLBACK; instead of COMMIT undoes everything since BEGIN

-- Postgres default is READ COMMITTED; SERIALIZABLE is the strictest
BEGIN ISOLATION LEVEL SERIALIZABLE;
-- ...
COMMIT;`,
  },
  {
    icon: "🪞", title: "Views & materialized views",
    desc: "A view is a saved query — it re-runs live every time you select from it, with no storage of its own. A materialized view stores the result physically and needs an explicit REFRESH, trading freshness for speed.",
    code: `CREATE VIEW station_summary AS
SELECT station_id, COUNT(*) AS n_samples, AVG(tss_mgl) AS avg_tss
FROM samples
GROUP BY station_id;

CREATE MATERIALIZED VIEW station_summary_mv AS
SELECT station_id, COUNT(*) AS n_samples, AVG(tss_mgl) AS avg_tss
FROM samples
GROUP BY station_id;

REFRESH MATERIALIZED VIEW station_summary_mv;`,
  },
  {
    icon: "⚡", title: "Functions & triggers",
    desc: "Stored functions push reusable logic into the database itself; triggers run that logic automatically in response to inserts, updates, or deletes — useful for validation, auditing, or derived-value maintenance that should never be skippable.",
    code: `CREATE FUNCTION classify_tss(tss numeric) RETURNS text AS $$
BEGIN
  IF tss > 100 THEN RETURN 'poor';
  ELSIF tss > 50 THEN RETURN 'moderate';
  ELSE RETURN 'good';
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_flag_high_tss
AFTER INSERT ON samples
FOR EACH ROW
WHEN (NEW.tss_mgl > 150)
EXECUTE FUNCTION notify_high_tss();`,
  },
  {
    icon: "🚀", title: "Query optimization patterns",
    desc: "The single highest-leverage habit: keep indexed columns \"sargable\" — usable by an index — by avoiding functions wrapped around them in WHERE clauses.",
    code: `-- Non-sargable: wraps the column in a function,
-- so the index on sample_date can't be used
SELECT * FROM samples
WHERE DATE(sample_date) = '2026-01-01';

-- Sargable rewrite: same result, index-friendly
SELECT * FROM samples
WHERE sample_date >= '2026-01-01'
  AND sample_date <  '2026-01-02';`,
    note: "Also watch for: SELECT * pulling columns you don't need, N+1 query patterns from application code looping a query per row, and IN (...) lists with thousands of literals.",
    noteType: "warning",
  },
  {
    icon: "🗺️", title: "Spatial SQL with PostGIS",
    desc: "PostGIS extends the same SQL you've just learned with geometry types and functions — the natural next step once tabular SQL feels comfortable, and directly relevant if you're already working in QGIS's DB Manager.",
    code: `-- Stations within 5 km of a point
SELECT name
FROM stations
WHERE ST_DWithin(
  geom,
  ST_SetSRID(ST_MakePoint(-74.78, 10.96), 4326)::geography,
  5000
);

-- A spatial index matters just as much as a regular one
CREATE INDEX idx_stations_geom ON stations USING GIST (geom);`,
  },
];

const quizQuestions = [
  { level: "Beginner", q: "What's the difference between WHERE and HAVING?", opts: ["They're interchangeable", "WHERE filters rows before grouping; HAVING filters groups after aggregation", "HAVING is only for numbers, WHERE is only for text"], ans: 1, exp: "WHERE runs before GROUP BY collapses rows into groups, so it can't reference an aggregate like COUNT(*). HAVING runs after aggregation, specifically to filter on those aggregate results." },
  { level: "Beginner", q: "A LEFT JOIN between stations and samples returns a station with zero samples. What do the sample columns show?", opts: ["The row is excluded entirely", "NULL for every sample column", "Zero (0) for every sample column"], ans: 1, exp: "LEFT JOIN keeps every row from the left table regardless of a match. When there's no matching right-side row, every column from the right table comes back as NULL — not zero, not excluded." },
  { level: "Intermediate", q: "Why does a window function like AVG(...) OVER (PARTITION BY ...) keep every row, while GROUP BY collapses them?", opts: ["Window functions are just a slower version of GROUP BY", "PARTITION BY resets the calculation per group but doesn't remove rows from the result set", "They only work on numeric columns"], ans: 1, exp: "GROUP BY physically reduces N rows to one row per group. A window function computes a value per partition but leaves all N rows intact — that's the entire point: per-row detail plus group-level context, side by side." },
  { level: "Intermediate", q: "Why does WHERE region = NULL always return zero rows, even for rows where region actually is NULL?", opts: ["It's a syntax error", "NULL comparisons evaluate to UNKNOWN, not TRUE, under three-valued logic — you need IS NULL instead", "NULL is treated as the string \"NULL\""], ans: 1, exp: "SQL's three-valued logic means any = comparison involving NULL returns UNKNOWN rather than TRUE or FALSE, and WHERE only keeps rows where the condition is TRUE. IS NULL is a special test built specifically to catch this case." },
  { level: "Advanced", q: "What's the practical difference between EXPLAIN and EXPLAIN ANALYZE?", opts: ["No difference, ANALYZE just adds color output", "EXPLAIN shows the planner's estimate only; EXPLAIN ANALYZE actually executes the query and reports real timings", "EXPLAIN ANALYZE is only available in MySQL"], ans: 1, exp: "EXPLAIN alone never runs the query — it shows what the planner intends to do, based on statistics. EXPLAIN ANALYZE actually executes it (side effects and all, for a write query) and reports real row counts and timing, which can expose stale statistics or bad estimates." },
  { level: "Advanced", q: "Why does wrapping an indexed column in a function, like WHERE DATE(sample_date) = '2026-01-01', usually stop the index from being used?", opts: ["Functions are always slower than raw columns", "The planner would have to evaluate the function on every row before it could compare against the index, defeating the point of indexing", "DATE() doesn't exist in SQL"], ans: 1, exp: "An index on sample_date is built on the raw column values. Wrapping it in DATE(...) means the database can't look up matches directly in that index — it would have to compute DATE(sample_date) per row first, which is exactly what an index is meant to avoid." },
  { level: "Advanced", q: "What's the key tradeoff of a materialized view compared to a regular view?", opts: ["Materialized views can't be queried with SELECT", "A materialized view stores results physically and needs an explicit REFRESH, trading live freshness for query speed", "Regular views are always faster"], ans: 1, exp: "A regular view is just a saved query — every SELECT re-runs it live. A materialized view runs the query once, stores the result, and serves from that stored copy until you REFRESH it again, which is fast to query but can go stale." },
  { level: "Expert", q: "Why does a spatial index (GIST) matter for a query using ST_DWithin or ST_Intersects?", opts: ["Spatial functions don't work at all without one", "Without it, the database must test every geometry in the table against the condition; the index lets it narrow candidates first using a bounding-box check", "GIST indexes only speed up text search, not geometry"], ans: 1, exp: "Geometry comparisons are expensive to compute row by row. A GIST spatial index lets Postgres first filter down to geometries whose bounding boxes could possibly satisfy the condition, then run the precise (expensive) spatial test only on that much smaller candidate set." },
];

// ── main ─────────────────────────────────────────────────────────────────────
export default function SqlBasicsToExpert() {
  return (
    <div style={s.page}>
      <div style={s.breadcrumb}>
        <span>GIS Applications</span><span style={s.sep}>›</span>
        <span>Databases</span><span style={s.sep}>›</span>
        <span style={{color:"#111"}}>SQL: Basics to Expert</span>
      </div>

      <div style={s.tags}>
        {["Beginner → Expert","~60 min","SQL","PostgreSQL","PostGIS"].map(t => (
          <span key={t} style={s.tag}>{t}</span>
        ))}
      </div>

      <h1 style={s.h1}>SQL: From SELECT to Query Optimization</h1>
      <p style={s.lead}>
        Three parts, each building on the last: core querying, then the intermediate
        tools that make real analysis possible, then the expert-level habits —
        indexing, transactions, optimization — that separate a query that works from
        one that scales. Examples run throughout on a small, consistent monitoring
        schema: stations and their water quality samples.
      </p>

      <Callout type="key">
        <strong>How SQL actually executes:</strong> not top to bottom as written, but
        roughly FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.
        A surprising number of "why doesn't this work" questions — like referencing
        a SELECT alias in WHERE — trace back to this execution order.
      </Callout>

      {/* Part 1 */}
      <div style={s.section}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
          <PartBadge>Part 1 — Beginner</PartBadge>
          <h2 style={{ ...s.h2, border:"none", padding:0, margin:0 }}>Core querying</h2>
        </div>
        <p style={s.p}>
          The five operations that cover the large majority of everyday querying.
        </p>
        <Stepper steps={basicsSteps} idPrefix="basics" />
      </div>

      {/* Part 2 */}
      <div style={s.section}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
          <PartBadge>Part 2 — Intermediate</PartBadge>
          <h2 style={{ ...s.h2, border:"none", padding:0, margin:0 }}>Real analysis</h2>
        </div>
        <p style={s.p}>
          Where SQL stops feeling like a data-retrieval language and starts feeling
          like an analysis tool.
        </p>
        <Stepper steps={intermediateSteps} idPrefix="mid" />
      </div>

      {/* Part 3 */}
      <div style={s.section}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
          <PartBadge>Part 3 — Advanced / Expert</PartBadge>
          <h2 style={{ ...s.h2, border:"none", padding:0, margin:0 }}>Making it scale and last</h2>
        </div>
        <p style={s.p}>
          The habits that matter once a table stops fitting comfortably in memory,
          or once more than one person is writing to it at the same time.
        </p>
        <Stepper steps={advancedSteps} idPrefix="adv" />
      </div>

      {/* Reference */}
      <div style={s.section}>
        <h2 style={s.h2}>Reference while you build</h2>
        <div style={s.dataGrid}>
          {[
            { icon:"📖", name:"PostgreSQL Documentation", url:"https://www.postgresql.org/docs/current/", desc:"The canonical reference — syntax, function lists, and the query planner's own documentation.", tag:"Reference" },
            { icon:"🧠", name:"Use The Index, Luke", url:"https://use-the-index-luke.com", desc:"A free, dialect-agnostic deep dive into indexing and why queries are slow — the best single resource for the optimization part of this tutorial.", tag:"Indexing" },
            { icon:"🗺️", name:"PostGIS Documentation", url:"https://postgis.net/documentation/", desc:"Full function reference for the spatial SQL extension used in the last advanced step.", tag:"Spatial" },
            { icon:"🧪", name:"Mode SQL Tutorial", url:"https://mode.com/sql-tutorial/", desc:"A well-regarded interactive practice environment if you want to drill these patterns hands-on.", tag:"Practice" },
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
      </div>

      {/* Quiz */}
      <div style={s.section}>
        <h2 style={s.h2}>Test your understanding</h2>
        <p style={s.p}>Questions span all three parts — level is marked on each one.</p>
        <Quiz questions={quizQuestions} />
      </div>

      {/* Next */}
      <div style={s.section}>
        <h2 style={s.h2}>What's next?</h2>
        <div style={s.nextGrid}>
          {[
            ["PyQGIS: Basics to AI Integration","Apply the querying mindset from this tutorial inside QGIS itself, including PostGIS via DB Manager.","/tutorial/pyqgis-ai"],
            ["CRS Explained","Coordinate reference systems — essential once your SQL starts touching geometry columns.","/tutorial/crs-explained"],
            ["Vector vs Raster","The other foundational GIS data-model distinction, useful alongside spatial SQL.","/tutorial/vector-vs-raster"],
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
  levelTag: { fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:20, background:"#F3F4F6", color:"#6B7280", border:"1px solid #E5E7EB", whiteSpace:"nowrap" },
  h1: { fontSize:"clamp(22px,4vw,32px)", fontWeight:700, lineHeight:1.2, margin:"0 0 14px" },
  h2: { fontSize:19, fontWeight:600, margin:"0 0 14px", color:"#111827", borderBottom:"2px solid #F3F4F6", paddingBottom:8 },
  lead: { fontSize:15, color:"#374151", margin:"0 0 16px", lineHeight:1.7 },
  callout: { padding:"12px 16px", borderRadius:8, margin:"0 0 20px", fontSize:13, lineHeight:1.65 },
  section: { marginBottom:44 },
  p: { fontSize:14, color:"#374151", margin:"0 0 14px", lineHeight:1.7 },
  ul: { paddingLeft:22, margin:"0 0 14px", fontSize:14, color:"#374151", lineHeight:1.9 },
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
