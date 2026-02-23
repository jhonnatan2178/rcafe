import React from "react";
import { TUTORIALS } from "../constants";
import { TutorialCard } from "./TutorialContent";

export default function TutorialsPage() {

  const categories = [...new Set(TUTORIALS.map(t => t.category))];

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">

      <h1 className="text-4xl font-bold mb-16">
        All Tutorials
      </h1>

      {categories.map((category) => (
        <div key={category} className="mb-16">

          <h2 className="text-2xl font-semibold mb-6">
            {category}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TUTORIALS
              .filter(t => t.category === category)
              .map(tutorial => (
                <TutorialCard
                  key={tutorial.id}
                  tutorial={tutorial}
                />
              ))}
          </div>

        </div>
      ))}

    </div>
  );
}