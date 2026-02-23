import { useParams } from "react-router-dom";
import { TUTORIALS } from "../constants";

function TutorialPage() {
  const { id } = useParams();

  const tutorial = TUTORIALS.find(t => t.id === id);

  if (!tutorial) {
    return (
      <section className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-3xl font-bold">Tutorial no encontrado</h1>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto py-20 px-6">

      <h1 className="text-4xl font-bold mb-4">
        {tutorial.title}
      </h1>

      <p className="text-emerald-600 mb-6">
        {tutorial.category} • {tutorial.level}
      </p>

      <div
        className="
          prose prose-slate max-w-3xl mx-auto
          prose-img:rounded-xl
          prose-img:mx-auto
          prose-img:max-w-full
        "
        dangerouslySetInnerHTML={{ __html: tutorial.content }}
      />

      {tutorial.codeSnippet && (
        <pre className="bg-slate-900 text-emerald-300 p-6 rounded-xl mt-8 overflow-x-auto">
          <code>{tutorial.codeSnippet}</code>
        </pre>
      )}

    </section>
  );
}

export default TutorialPage;