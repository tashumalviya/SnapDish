import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Flame, Star, Heart, ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { recipesStore, useFavorites, useRecipes } from "../lib/recipes-store.js";
import { toast } from "sonner";

export default function RecipeDetails() {
  const { id } = useParams();
  const recipes = useRecipes();
  const recipe = recipes.find((r) => r.id === id);
  const { isFav, toggle } = useFavorites();
  const navigate = useNavigate();

  if (!recipe) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="text-3xl font-display">Recipe not found</h1>
        <Link to="/recipes" className="mt-6 inline-flex rounded-full bg-warm px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          Back to recipes
        </Link>
      </div>
    );
  }

  const fav = isFav(recipe.id);
  const nutrition = [
    { l: "Calories", v: `${recipe.calories} kcal` },
    { l: "Time", v: `${recipe.time} min` },
    { l: "Category", v: recipe.category },
    { l: "Rating", v: `${recipe.rating.toFixed(1)} ★` },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 pt-10 pb-24">
      <Link to="/recipes" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl shadow-glow">
          {recipe.image ? (
            <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center text-[12rem] bg-gradient-to-br from-[oklch(0.95_0.08_70)] to-[oklch(0.92_0.12_30)]">
              <motion.span animate={{ rotate: [0, 6, -6, 0] }} transition={{ duration: 6, repeat: Infinity }}>
                {recipe.emoji}
              </motion.span>
            </div>
          )}
          <button
            onClick={() => toggle(recipe.id)}
            className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full glass-strong"
            aria-label="Favorite"
          >
            <Heart className={`h-5 w-5 ${fav ? "fill-[oklch(0.65_0.25_25)] text-[oklch(0.65_0.25_25)]" : ""}`} />
          </button>
        </div>

        <div>
          <span className="rounded-full bg-accent/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider">{recipe.category}</span>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{recipe.title}</h1>

          <div className="mt-5 flex items-center gap-5 text-sm">
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" />{recipe.time} min</span>
            <span className="flex items-center gap-1.5"><Flame className="h-4 w-4 text-primary" />{recipe.calories} kcal</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-[oklch(0.75_0.18_75)] text-[oklch(0.75_0.18_75)]" />{recipe.rating.toFixed(1)}</span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {nutrition.map((n) => (
              <div key={n.l} className="glass rounded-2xl p-4">
                <div className="text-xs text-muted-foreground">{n.l}</div>
                <div className="mt-1 font-display text-xl">{n.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <Link
              to={`/edit/${recipe.id}`}
              className="inline-flex items-center gap-2 rounded-full glass-strong px-5 py-2.5 text-sm font-medium hover:shadow-soft"
            >
              <Pencil className="h-4 w-4" /> Edit
            </Link>
            <button
              onClick={() => {
                if (confirm("Delete this recipe?")) {
                  recipesStore.remove(recipe.id);
                  toast.success("Recipe deleted");
                  navigate("/recipes");
                }
              }}
              className="inline-flex items-center gap-2 rounded-full border border-destructive/30 px-5 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>
        </div>
      </motion.div>

      <div className="mt-16 grid gap-10 md:grid-cols-5">
        <motion.section initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:col-span-2">
          <h2 className="font-display text-2xl">Ingredients</h2>
          <ul className="mt-5 space-y-3">
            {recipe.ingredients.map((ing, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 glass rounded-xl p-3"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-warm text-xs text-primary-foreground">
                  {i + 1}
                </span>
                <span className="text-sm">{ing}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        <motion.section initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:col-span-3">
          <h2 className="font-display text-2xl">Step-by-step</h2>
          <ol className="mt-5 space-y-4">
            {recipe.steps.map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-4 rounded-2xl glass p-5"
              >
                <span className="font-display text-3xl gradient-text leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="pt-1 text-sm leading-relaxed">{s}</p>
              </motion.li>
            ))}
          </ol>
        </motion.section>
      </div>
    </div>
  );
}
