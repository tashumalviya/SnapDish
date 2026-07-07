import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Flame, Star, Heart } from "lucide-react";
import { useFavorites } from "../lib/recipes-store.js";

export default function RecipeCard({ recipe, index = 0 }) {
  const { isFav, toggle } = useFavorites();
  const fav = isFav(recipe.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl glass shadow-soft hover:shadow-glow transition-shadow"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-warm/20">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-7xl bg-gradient-to-br from-[oklch(0.95_0.08_70)] to-[oklch(0.92_0.1_30)] dark:from-[oklch(0.3_0.08_70)] dark:to-[oklch(0.25_0.1_30)]">
            <motion.span animate={{ rotate: [0, 6, -6, 0] }} transition={{ duration: 6, repeat: Infinity }}>
              {recipe.emoji ?? "🍽️"}
            </motion.span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <button
          onClick={(e) => { e.preventDefault(); toggle(recipe.id); }}
          aria-label="Favorite"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass-strong"
        >
          <Heart className={`h-4 w-4 transition-all ${fav ? "fill-[oklch(0.65_0.25_25)] text-[oklch(0.65_0.25_25)] scale-110" : "text-foreground"}`} />
        </button>
        <span className="absolute left-3 top-3 rounded-full bg-card/90 backdrop-blur px-3 py-1 text-xs font-medium">
          {recipe.category}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight">{recipe.title}</h3>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-accent/30 px-2 py-1 text-xs">
            <Star className="h-3 w-3 fill-current text-[oklch(0.75_0.18_75)]" />
            {recipe.rating.toFixed(1)}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{recipe.time} min</span>
          <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5" />{recipe.calories} kcal</span>
        </div>
        <Link
          to={`/recipes/${recipe.id}`}
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-warm px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] active:scale-95"
        >
          View Recipe
        </Link>
      </div>
    </motion.article>
  );
}
