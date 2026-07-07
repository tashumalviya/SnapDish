import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Clock, ChefHat, Flame } from "lucide-react";
import heroImg from "../assets/hero-food.jpg";
import FloatingFood from "../components/FloatingFood.jsx";
import QuoteCarousel from "../components/QuoteCarousel.jsx";
import RecipeCard from "../components/RecipeCard.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { useRecipes } from "../lib/recipes-store.js";

export default function Index() {
  const recipes = useRecipes();
  const trending = recipes.filter((r) => r.trending).slice(0, 4);
  const quick = recipes.filter((r) => r.time <= 15).slice(0, 4);
  const today = recipes[0];

  return (
    <>
      <section className="relative overflow-hidden bg-hero">
        <FloatingFood />
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[oklch(0.78_0.18_70)] opacity-30 blur-3xl animate-blob" />
        <div className="absolute -right-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.7_0.22_30)] opacity-20 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pt-16 pb-32 md:grid-cols-2 md:pt-24 md:pb-40">
          <div className="relative z-10 flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex w-fit items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Curated recipes from kitchens worldwide
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl"
            >
              Cook Delicious <br />
              Food With <span className="gradient-text">Love</span>{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="inline-block"
              >❤️</motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 max-w-md text-lg text-foreground/70"
            >
              From quick weeknight bites to weekend showstoppers — explore a
              hand-crafted collection of recipes designed to inspire your kitchen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/add" className="group inline-flex items-center gap-2 rounded-full bg-warm px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-10 flex gap-8 text-sm"
            >
              {[
                { n: "500+", l: "Recipes" },
                { n: "120k", l: "Home Cooks" },
                { n: "4.9★", l: "Avg. Rating" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl">{s.n}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative z-10 hidden md:block"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-glow border border-white/30">
              <img src={heroImg} alt="Beautiful food" width={1536} height={1024} className="h-full w-full object-cover" />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-5 left-5 glass-strong rounded-2xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-warm text-primary-foreground">
                    <ChefHat className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Today's Pick</div>
                    <div className="text-sm font-semibold">Creamy Truffle Pasta</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                className="absolute top-5 right-5 glass-strong rounded-2xl px-4 py-2 text-sm"
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Ready in 25 min
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="🔥 Trending Now"
          title="Most loved this week"
          subtitle="Recipes our community can't stop cooking right now."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((r, i) => <RecipeCard key={r.id} recipe={r} index={i} />)}
        </div>
      </section>

      <QuoteCarousel />

      {today && (
        <section className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeading eyebrow="✨ Today's Special" title="Chef's recommendation" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-12 grid items-center gap-10 rounded-3xl glass p-8 md:grid-cols-2 md:p-12 shadow-soft"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-warm/10">
              {today.image ? (
                <img src={today.image} alt={today.title} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center text-[10rem] bg-gradient-to-br from-[oklch(0.95_0.08_70)] to-[oklch(0.92_0.12_30)]">
                  <motion.span animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.08, 1] }} transition={{ duration: 6, repeat: Infinity }}>
                    {today.emoji}
                  </motion.span>
                </div>
              )}
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-primary">{today.category}</span>
              <h3 className="mt-2 font-display text-4xl">{today.title}</h3>
              <p className="mt-4 text-muted-foreground">
                A perfectly balanced dish crafted to impress. Rich, comforting and ready
                in minutes — the kind of plate that turns a regular dinner into a moment.
              </p>
              <div className="mt-6 flex gap-6 text-sm">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />{today.time} min</span>
                <span className="flex items-center gap-2"><Flame className="h-4 w-4 text-primary" />{today.calories} kcal</span>
              </div>
              <Link to={`/recipes/${today.id}`} className="mt-8 inline-flex rounded-full bg-warm px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
                Cook it tonight →
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading eyebrow="⏱️ Quick & Easy" title="15-minute recipes" subtitle="Fast doesn't mean boring." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quick.length > 0 ? quick.map((r, i) => <RecipeCard key={r.id} recipe={r} index={i} />) :
            recipes.slice(0, 4).map((r, i) => <RecipeCard key={r.id} recipe={r} index={i} />)}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-warm p-12 md:p-16 text-center text-primary-foreground shadow-glow"
        >
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_30%_20%,white,transparent_40%),radial-gradient(circle_at_70%_80%,white,transparent_40%)]" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-5xl">Share your signature dish</h2>
            <p className="mx-auto mt-4 max-w-xl opacity-90">
              Inspire thousands of home cooks. Upload your favorite recipe — it only takes a minute.
            </p>
            <Link to="/add" className="mt-8 inline-flex rounded-full bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-soft hover:scale-105 transition-transform">
              Add your recipe →
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
