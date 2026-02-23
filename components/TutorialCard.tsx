import { Link } from "react-router-dom";

interface Tutorial {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
}

export function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all">

      {/* Imagen */}
      <img
        src={tutorial.image}
        alt={tutorial.title}
        className="w-full h-56 object-cover"
      />

      {/* Contenido */}
      <div className="p-6">

        <h2 className="text-2xl font-bold mb-2 text-slate-900">
          {tutorial.title}
        </h2>

        <p className="text-sm text-emerald-600 mb-4">
          {tutorial.date}
        </p>

        <p className="text-slate-600 mb-4 line-clamp-3">
          {tutorial.description}
        </p>

        <Link
          to={`/tutorial/${tutorial.id}`}
          className="text-emerald-600 font-semibold hover:underline"
        >
          Seguir leyendo →
        </Link>

      </div>
    </div>
  );
}