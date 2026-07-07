import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { useFavorites, useRecipes } from "../lib/recipes-store.js";

export default function Favorites() {
  const recipes = useRecipes();
  const { favs } = useFavorites();
  const list = recipes.filter((r) => favs.includes(r.id));

  return (
    <div className="mx-auto max-w-7xl px-6 pt-16 pb-24">
      <SectionHeading eyebrow="❤️ Saved" title="Your favorites" subtitle="Recipes you'll cook again and again." />
      {list.length === 0 ? (
        <div className="mt-16 text-center">
          <div className="text-6xl">💔</div>
          <p className="mt-4 text-muted-foreground">No favorites yet.</p>
          <Link to="/recipes" className="mt-6 inline-flex rounded-full bg-warm px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
            Explore recipes
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((r, i) => <RecipeCard key={r.id} recipe={r} index={i} />)}
        </div>
      )}
    </div>
  );
}
