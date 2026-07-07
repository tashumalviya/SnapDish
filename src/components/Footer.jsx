import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Facebook, ChefHat, Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-border/50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="absolute -top-32 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-warm opacity-10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-warm text-primary-foreground">
              <ChefHat className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold gradient-text">SnapDish</span>
          </Link>
          <p className="mt-4 max-w-sm font-display text-2xl italic leading-snug text-foreground/80">
            “People who love to eat are always the best people.”
          </p>
          <p className="mt-2 text-sm text-muted-foreground">— Julia Child</p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/recipes" className="hover:text-foreground">Recipes</Link></li>
            <li><Link to="/add" className="hover:text-foreground">Add Recipe</Link></li>
            <li><Link to="/favorites" className="hover:text-foreground">Favorites</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Newsletter</h4>
          <p className="mb-3 text-sm text-muted-foreground">Weekly recipes & cooking inspiration.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              toast.success("You're subscribed! 🎉");
              setEmail("");
            }}
            className="flex items-center gap-2 rounded-full glass p-1 pl-4"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="grid h-9 w-9 place-items-center rounded-full bg-warm text-primary-foreground shadow-glow"
            >
              <Send className="h-4 w-4" />
            </motion.button>
          </form>
          <div className="mt-5 flex gap-3">
            {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -4, scale: 1.1 }}
                className="grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-card/50 text-foreground/70 hover:text-foreground hover:shadow-glow"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border/40 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SnapDish — Made with ❤️ and a pinch of salt.
      </div>
    </footer>
  );
}
