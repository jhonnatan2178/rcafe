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
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Texto */}
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

            /* HEADINGS */
            prose-h1:text-3xl
            prose-h2:text-2xl
            prose-h3:text-xl
            prose-h2:mt-10
            prose-h3:mt-8

            /* LINKS */
            prose-a:text-emerald-600
            prose-a:font-semibold
            prose-a:underline
            hover:prose-a:text-emerald-700

            /* LISTAS (FIX BULLETS) */
            prose-ul:list-disc
            prose-ul:pl-6
            prose-ol:list-decimal
            prose-ol:pl-6
            prose-li:my-2
            prose-li:marker:text-emerald-600

            /* CÓDIGO INLINE */
            prose-code:bg-slate-100
            prose-code:text-emerald-700
            prose-code:px-1
            prose-code:py-0.5
            prose-code:rounded
            prose-code:before:content-none
            prose-code:after:content-none

            /* IMÁGENES */
            prose-img:rounded-xl
            prose-img:mx-auto
            prose-img:max-w-full
            prose-img:my-10
          "
          dangerouslySetInnerHTML={{ __html: tutorial.content }}
        />

        {/* BLOQUE DE CÓDIGO */}
        {tutorial.codeSnippet && (
          <pre className="bg-slate-900 text-emerald-300 p-6 rounded-xl mt-12 overflow-x-auto text-sm">
            <code>{tutorial.codeSnippet}</code>
          </pre>
        )}
      </section>
    </>
  );
}

export default TutorialPage;