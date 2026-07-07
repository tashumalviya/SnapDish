import { useEffect, useState, useSyncExternalStore } from "react";

const KEY = "recipes:v1";
const FAV_KEY = "favorites:v1";

const SEED = [
  {
    id: "seed-1", title: "Creamy Truffle Pasta", emoji: "🍝",
    ingredients: ["200g fettuccine", "2 tbsp butter", "150ml cream", "Truffle oil", "Parmesan", "Black pepper"],
    steps: ["Boil pasta al dente.", "Melt butter, add cream and reduce.", "Toss pasta with sauce.", "Finish with truffle oil & parmesan."],
    category: "Dinner", time: 25, calories: 620, rating: 4.8, trending: true, createdAt: Date.now() - 9e8,
  },
  {
    id: "seed-2", title: "Smashed Avocado Toast", emoji: "🥑",
    ingredients: ["2 slices sourdough", "1 ripe avocado", "Lemon", "Chili flakes", "Olive oil", "Sea salt"],
    steps: ["Toast bread until golden.", "Mash avocado with lemon & salt.", "Spread, drizzle oil, top with chili."],
    category: "Breakfast", time: 10, calories: 320, rating: 4.6, trending: true, createdAt: Date.now() - 8e8,
  },
  {
    id: "seed-3", title: "Classic Margherita Pizza", emoji: "🍕",
    ingredients: ["Pizza dough", "San Marzano tomatoes", "Fresh mozzarella", "Basil", "Olive oil"],
    steps: ["Stretch dough thin.", "Top with sauce & mozzarella.", "Bake at 250°C for 8 min.", "Finish with basil & oil."],
    category: "Dinner", time: 30, calories: 780, rating: 4.9, trending: true, createdAt: Date.now() - 7e8,
  },
  {
    id: "seed-4", title: "Berry Bliss Smoothie", emoji: "🫐",
    ingredients: ["1 cup mixed berries", "1 banana", "Greek yogurt", "Honey", "Almond milk"],
    steps: ["Blend everything until smooth.", "Pour into a tall glass.", "Top with chia seeds."],
    category: "Healthy", time: 5, calories: 240, rating: 4.7, createdAt: Date.now() - 6e8,
  },
  {
    id: "seed-5", title: "Molten Chocolate Lava Cake", emoji: "🍫",
    ingredients: ["100g dark chocolate", "100g butter", "2 eggs", "50g sugar", "30g flour"],
    steps: ["Melt chocolate & butter.", "Whisk eggs + sugar.", "Fold in flour.", "Bake 10 min at 200°C."],
    category: "Dessert", time: 20, calories: 480, rating: 4.9, trending: true, createdAt: Date.now() - 5e8,
  },
  {
    id: "seed-6", title: "Spicy Ramen Bowl", emoji: "🍜",
    ingredients: ["Ramen noodles", "Miso paste", "Chili oil", "Soft egg", "Scallions", "Bok choy"],
    steps: ["Simmer broth with miso.", "Cook noodles.", "Assemble bowl with toppings."],
    category: "Lunch", time: 25, calories: 560, rating: 4.7, createdAt: Date.now() - 4e8,
  },
  {
    id: "seed-7", title: "Smash Burger Deluxe", emoji: "🍔",
    ingredients: ["Beef patty", "Brioche bun", "Cheddar", "Caramelized onions", "Special sauce", "Pickles"],
    steps: ["Sear patty hard & fast.", "Melt cheese on top.", "Toast bun.", "Stack & serve."],
    category: "Fast Food", time: 15, calories: 720, rating: 4.5, createdAt: Date.now() - 3e8,
  },
  {
    id: "seed-8", title: "Rainbow Buddha Bowl", emoji: "🥗",
    ingredients: ["Quinoa", "Chickpeas", "Avocado", "Roasted veg", "Tahini dressing"],
    steps: ["Cook quinoa.", "Roast veg.", "Assemble with dressing."],
    category: "Veg", time: 30, calories: 510, rating: 4.6, createdAt: Date.now() - 2e8,
  },
];

const listeners = new Set();
let cache = null;

function read() {
  if (cache) return cache;
  if (typeof window === "undefined") return SEED;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(SEED));
      cache = SEED;
      return cache;
    }
    cache = JSON.parse(raw);
    return cache;
  } catch {
    cache = SEED;
    return cache;
  }
}

function write(list) {
  cache = list;
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
  listeners.forEach((l) => l());
}

export const recipesStore = {
  subscribe(cb) { listeners.add(cb); return () => listeners.delete(cb); },
  getSnapshot() { return read(); },
  add(r) {
    const next = {
      ...r,
      id: `r-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: Date.now(),
      rating: r.rating ?? 4.5,
    };
    write([next, ...read()]);
    return next;
  },
  update(id, patch) { write(read().map((r) => (r.id === id ? { ...r, ...patch } : r))); },
  remove(id) { write(read().filter((r) => r.id !== id)); },
  get(id) { return read().find((r) => r.id === id); },
};

export function useRecipes() {
  return useSyncExternalStore(recipesStore.subscribe, recipesStore.getSnapshot, () => SEED);
}

export function useFavorites() {
  const [favs, setFavs] = useState([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      setFavs(raw ? JSON.parse(raw) : []);
    } catch {}
  }, []);
  const save = (list) => {
    setFavs(list);
    localStorage.setItem(FAV_KEY, JSON.stringify(list));
  };
  return {
    favs,
    isFav: (id) => favs.includes(id),
    toggle: (id) => save(favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id]),
  };
}
