import { TUTORIALS } from "../constants";
import { TutorialCard } from "./TutorialCard";

function TutorialsPage() {

  // Obtener categorías únicas
  const categories = Array.from(
    new Set(TUTORIALS.map(t => t.category))
  );

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">

      <h1 className="text-4xl font-bold mb-16 text-slate-900">
        Aplicaciones GIS
      </h1>

      {categories.map(category => {

        const filteredTutorials = TUTORIALS.filter(
          t => t.category === category
        );

        return (
          <div key={category} className="mb-20">

            <h2 className="text-2xl font-bold mb-8 text-emerald-700">
              {category}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {filteredTutorials.map(tutorial => (
                <TutorialCard
                  key={tutorial.id}
                  tutorial={tutorial}
                />
              ))}
            </div>

          </div>
        );
      })}

    </section>
  );
}

export default TutorialsPage;