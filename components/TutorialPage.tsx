import { useParams } from "react-router-dom";
import { TUTORIALS } from "../constants";

function TutorialPage() {
  const { id } = useParams();

  const tutorial = TUTORIALS.find(t => t.id === id);

  if (!tutorial) {
    return (
      <section className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-3xl font-bold">
          Tutorial no encontrado
        </h1>
      </section>
    );
  }

  return (
    <>
      {/* ================= HERO / PORTADA ================= */}
      {tutorial.image ? (
        <div
          className="relative h-[380px] bg-cover bg-center"
          style={{ backgroundImage: `url(${tutorial.image})` }}
        >
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Título */}
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
          <h1 className="text-4xl font-bold mb-4">
            {tutorial.title}
          </h1>

          <p className="text-emerald-600 mb-10">
            {tutorial.category} • {tutorial.level}
          </p>
        </section>
      )}

      {/* ================= CONTENIDO ================= */}
      <section className="max-w-4xl mx-auto py-20 px-6">
        <div
          className="
            prose prose-slate max-w-3xl mx-auto
            prose-img:rounded-xl
            prose-img:mx-auto
            prose-img:max-w-full
            prose-img:my-10
          "
          dangerouslySetInnerHTML={{ __html: tutorial.content }}
        />

        {tutorial.codeSnippet && (
          <pre className="bg-slate-900 text-emerald-300 p-6 rounded-xl mt-10 overflow-x-auto">
            <code>{tutorial.codeSnippet}</code>
          </pre>
        )}
      </section>
    </>
  );
}

export default TutorialPage;