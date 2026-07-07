import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import RecipeForm from "../components/RecipeForm.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { recipesStore, useRecipes } from "../lib/recipes-store.js";

export default function EditRecipe() {
  const { id } = useParams();
  const recipes = useRecipes();
  const recipe = recipes.find((r) => r.id === id);
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

  return (
    <div className="mx-auto max-w-3xl px-6 pt-16 pb-24">
      <SectionHeading eyebrow="✏️ Edit" title="Update recipe" subtitle="Refine the details and save." />
      <div className="mt-12 rounded-3xl glass p-6 md:p-10 shadow-soft">
        <RecipeForm
          initial={recipe}
          submitLabel="Save changes"
          onSubmit={(v) => {
            recipesStore.update(recipe.id, {
              title: v.title,
              image: v.image,
              emoji: v.emoji,
              ingredients: v.ingredients.split("\n").map((s) => s.trim()).filter(Boolean),
              steps: v.steps.split("\n").map((s) => s.trim()).filter(Boolean),
              category: v.category,
              time: v.time,
              calories: v.calories,
            });
            toast.success("Recipe updated! ✨");
            navigate(`/recipes/${recipe.id}`);
          }}
        />
      </div>
    </div>
  );
}
