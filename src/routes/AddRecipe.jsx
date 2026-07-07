import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import RecipeForm from "../components/RecipeForm.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { recipesStore } from "../lib/recipes-store.js";

export default function AddRecipe() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-3xl px-6 pt-16 pb-24">
      <SectionHeading eyebrow="✍️ Share" title="Add a recipe" subtitle="A few details and your dish goes live." />
      <div className="mt-12 rounded-3xl glass p-6 md:p-10 shadow-soft">
        <RecipeForm
          submitLabel="Publish recipe"
          onSubmit={(v) => {
            const r = recipesStore.add({
              title: v.title,
              image: v.image,
              emoji: v.emoji,
              ingredients: v.ingredients.split("\n").map((s) => s.trim()).filter(Boolean),
              steps: v.steps.split("\n").map((s) => s.trim()).filter(Boolean),
              category: v.category,
              time: v.time,
              calories: v.calories,
            });
            toast.success("Recipe published! 🎉");
            navigate(`/recipes/${r.id}`);
          }}
        />
      </div>
    </div>
  );
}
