import { useParams, Link } from "react-router-dom";
import { TUTORIALS } from "../constants";
import { lazy, Suspense } from "react";

// ── lazy-load each tutorial component ────────────────────────────────────────
const VectorVsRaster  = lazy(() => import("./tutorials/VectorVsRaster"));
const CRSExplained    = lazy(() => import("./tutorials/CRSExplained"));
const FloodRisk       = lazy(() => import("./tutorials/FloodRisk"));
const WildfireNBR     = lazy(() => import("./tutorials/WildfireNBR"));
const WaterQuality    = lazy(() => import("./tutorials/WaterQuality"));
const CordobaFloodGEE = lazy(() => import("./tutorials/CordobaFloodGEE"));

// ── map tutorial id → React component ────────────────────────────────────────
const COMPONENT_MAP: Record<string, React.ComponentType> = {
  "vector-vs-raster":     VectorVsRaster,
  "crs-explained":        CRSExplained,
  "python-flood-risk":    FloodRisk,
  "r-wildfire-nbr":       WildfireNBR,
  "water-quality":        WaterQuality,
  "cordoba-gee":          CordobaFloodGEE,
};

// ── loading spinner ───────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div className="flex items-center justify-center py-40">
      <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// ── fallback: render HTML content from constants ──────────────────────────────
function HTMLTutorial({ tutorial }: { tutorial: any }) {
  return (
    <>
      {tutorial.image ? (
        <div
          className="relative h-[380px] bg-cover bg-center"
          style={{ backgroundImage: `url(${tutorial.image})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 max-w-4xl mx-auto h-full flex flex-col justify-end px-6 pb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              {tutorial.title}
            </h1>
            <p className="text-emerald-300 mt-2">
              {tutorial.category} • {tutorial.level}
            </p>
          </div>
        </div>
      ) : (
        <section className="max-w-4xl mx-auto pt-24 px-6">
          <h1 className="text-4xl font-bold mb-4">{tutorial.title}</h1>
          <p className="text-emerald-600 mb-10">
            {tutorial.category} • {tutorial.level}
          </p>
        </section>
      )}

      <section className="max-w-4xl mx-auto py-20 px-6">
        <div
          className="prose prose-slate max-w-3xl mx-auto
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
            prose-h2:mt-10 prose-h3:mt-8
            prose-a:text-emerald-600 prose-a:font-semibold prose-a:underline
            hover:prose-a:text-emerald-700
            prose-ul:list-disc prose-ul:pl-6
            prose-ol:list-decimal prose-ol:pl-6
            prose-li:my-2 prose-li:marker:text-emerald-600
            prose-code:bg-slate-100 prose-code:text-emerald-700
            prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-code:before:content-none prose-code:after:content-none
            prose-img:rounded-xl prose-img:mx-auto
            prose-img:max-w-full prose-img:my-10"
          dangerouslySetInnerHTML={{ __html: tutorial.content }}
        />
        {tutorial.codeSnippet && (
          <pre className="bg-slate-900 text-emerald-300 p-6 rounded-xl mt-12 overflow-x-auto text-sm">
            <code>{tutorial.codeSnippet}</code>
          </pre>
        )}
      </section>
    </>
  );
}

// ── main component ────────────────────────────────────────────────────────────
export default function TutorialPage() {
  const { id } = useParams();
  const tutorial = TUTORIALS.find(t => t.id === id);

  if (!tutorial) {
    return (
      <section className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-3xl font-bold mb-4">Tutorial not found</h1>
        <Link to="/tutorials" className="text-emerald-600 font-semibold hover:underline">
          ← Back to tutorials
        </Link>
      </section>
    );
  }

  const CustomComponent = id ? COMPONENT_MAP[id] : undefined;

  if (CustomComponent) {
    return (
      <Suspense fallback={<Spinner />}>
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Back link */}
          <Link
            to="/tutorials"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 mb-8 transition-colors"
          >
            ← All tutorials
          </Link>
          <CustomComponent />
        </div>
      </Suspense>
    );
  }

  // fallback to HTML renderer for tutorials without a React component
  return <HTMLTutorial tutorial={tutorial} />;
}