import { motion } from "framer-motion";

const items = [
  { e: "🍕", x: "8%", y: "12%", d: 0 },
  { e: "🍔", x: "82%", y: "20%", d: 0.6 },
  { e: "🍝", x: "12%", y: "68%", d: 1.2 },
  { e: "🍰", x: "78%", y: "72%", d: 0.3 },
  { e: "🥤", x: "50%", y: "8%", d: 0.9 },
  { e: "🍜", x: "62%", y: "55%", d: 1.5 },
  { e: "🥑", x: "30%", y: "30%", d: 0.4 },
  { e: "🍓", x: "92%", y: "48%", d: 1.1 },
];

export default function FloatingFood() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: [0, -25, 0], rotate: [0, 8, -8, 0] }}
          transition={{
            opacity: { delay: it.d, duration: 0.8 },
            scale: { delay: it.d, duration: 0.8 },
            y: { delay: it.d, duration: 5 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
            rotate: { delay: it.d, duration: 7 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute text-4xl md:text-6xl drop-shadow-xl select-none"
          style={{ left: it.x, top: it.y }}
        >
          {it.e}
        </motion.div>
      ))}
    </div>
  );
}
