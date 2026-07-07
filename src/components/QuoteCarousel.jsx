import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const QUOTES = [
  { text: "People who love to eat are always the best people.", author: "Julia Child" },
  { text: "Life is uncertain. Eat dessert first.", author: "Ernestine Ulmer" },
  { text: "Good food is the foundation of genuine happiness.", author: "Auguste Escoffier" },
  { text: "One cannot think well, love well, sleep well, if one has not dined well.", author: "Virginia Woolf" },
];

function Typewriter({ text }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const id = setInterval(() => {
      setN((v) => (v < text.length ? v + 1 : v));
    }, 28);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span>
      {text.slice(0, n)}
      <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-primary align-middle" />
    </span>
  );
}

export default function QuoteCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 6000);
    return () => clearInterval(id);
  }, []);

  const q = QUOTES[i];

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-24">
      <div className="absolute inset-0 -z-10 rounded-3xl bg-warm opacity-5 blur-3xl" />
      <div className="glass rounded-3xl p-10 md:p-16 text-center shadow-soft">
        <Quote className="mx-auto mb-6 h-10 w-10 text-primary/60" />
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-display text-2xl md:text-4xl leading-snug">
              <Typewriter text={q.text} />
            </p>
            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-muted-foreground">— {q.author}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex justify-center gap-2">
          {QUOTES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-warm" : "w-2 bg-border"}`}
              aria-label={`Quote ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
