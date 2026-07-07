import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";

const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Dessert", "Veg", "Non-Veg", "Healthy", "Fast Food"];

export function toFormValues(r) {
  return {
    title: r?.title ?? "",
    image: r?.image,
    emoji: r?.emoji ?? "🍽️",
    ingredients: r?.ingredients.join("\n") ?? "",
    steps: r?.steps.join("\n") ?? "",
    category: r?.category ?? "Dinner",
    time: r?.time ?? 30,
    calories: r?.calories ?? 400,
  };
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-2xl glass px-4 py-3 text-sm outline-none transition-all focus:shadow-glow focus:ring-2 focus:ring-primary/40";

export default function RecipeForm({ initial, submitLabel, onSubmit }) {
  const [v, setV] = useState(toFormValues(initial));
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const set = (k, val) => setV((p) => ({ ...p, [k]: val }));

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => set("image", reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={(e) => { e.preventDefault(); onSubmit(v); }}
      className="grid gap-5"
    >
      <Field label="Recipe title">
        <input
          required
          value={v.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. Spicy Thai Basil Chicken"
          className={inputCls}
        />
      </Field>

      <Field label="Image">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          }}
          onClick={() => fileRef.current?.click()}
          className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
            dragOver ? "border-primary bg-primary/5 scale-[1.01]" : "border-border glass"
          }`}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
          {v.image ? (
            <div className="relative">
              <img src={v.image} alt="" className="mx-auto h-48 rounded-xl object-cover" />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); set("image", undefined); }}
                className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-destructive text-destructive-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 text-sm">Drag & drop or click to upload</p>
              <p className="mt-1 text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
            </>
          )}
        </div>
      </Field>

      <Field label="Emoji (fallback)">
        <input
          value={v.emoji ?? ""}
          onChange={(e) => set("emoji", e.target.value)}
          placeholder="🍽️"
          className={inputCls + " max-w-[120px] text-center text-2xl"}
        />
      </Field>

      <div className="grid gap-5 md:grid-cols-3">
        <Field label="Category">
          <select value={v.category} onChange={(e) => set("category", e.target.value)} className={inputCls}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Cooking time (min)">
          <input type="number" min={1} value={v.time} onChange={(e) => set("time", +e.target.value)} className={inputCls} />
        </Field>
        <Field label="Calories">
          <input type="number" min={0} value={v.calories} onChange={(e) => set("calories", +e.target.value)} className={inputCls} />
        </Field>
      </div>

      <Field label="Ingredients (one per line)">
        <textarea
          required
          rows={6}
          value={v.ingredients}
          onChange={(e) => set("ingredients", e.target.value)}
          placeholder={"200g pasta\n2 tbsp olive oil\n..."}
          className={inputCls}
        />
      </Field>

      <Field label="Cooking steps (one per line)">
        <textarea
          required
          rows={6}
          value={v.steps}
          onChange={(e) => set("steps", e.target.value)}
          placeholder={"Boil the pasta.\nMake the sauce.\n..."}
          className={inputCls}
        />
      </Field>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        className="mt-4 inline-flex items-center justify-center rounded-full bg-warm px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow"
      >
        {submitLabel}
      </motion.button>
    </motion.form>
  );
}
