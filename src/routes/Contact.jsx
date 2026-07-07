import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const inputCls =
  "w-full rounded-2xl glass px-4 py-3.5 text-sm outline-none transition-all focus:shadow-glow focus:ring-2 focus:ring-primary/40";

export default function Contact() {
  const [f, setF] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute -top-20 right-0 h-96 w-96 rounded-full bg-warm opacity-10 blur-3xl animate-blob" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[oklch(0.7_0.22_30)] opacity-10 blur-3xl animate-blob" style={{ animationDelay: "2s" }} />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-24 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <span className="rounded-full bg-accent/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider">📩 Get in touch</span>
          <h1 className="mt-4 font-display text-5xl md:text-6xl">
            Do You Want To <span className="gradient-text">Reach Us?</span> 📩
          </h1>
          <p className="mt-5 max-w-md text-muted-foreground">
            Have a recipe idea, partnership inquiry or feedback? We'd love to hear from you.
            Our kitchen door is always open.
          </p>

          <div className="mt-10 space-y-4">
            {[
              { Icon: Mail, l: "Email", v: "malviyatashu@gmail.com" },
              { Icon: Phone, l: "Phone", v: "+91 8827136854" },
              { Icon: MapPin, l: "Address", v: "Indore, India" },
            ].map(({ Icon, l, v }) => (
              <motion.div key={l} whileHover={{ x: 6 }} className="flex items-center gap-4 rounded-2xl glass p-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-warm text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{l}</div>
                  <div className="text-sm font-medium">{v}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
         onSubmit={async (e) => {
  e.preventDefault();

  try {
    await emailjs.send(
      "service_yrfa9i8",
      "template_3j0c296",
      {
        name: f.name,
        email: f.email,
        phone: f.phone,
        message: f.message,
      },
      "-R4HBlrq12BwzD5F9"
    );

    toast.success("Message sent successfully! 🎉");

    setSent(true);
    setF({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setTimeout(() => setSent(false), 3000);
  } catch (error) {
  console.log("Status:", error.status);
  console.log("Text:", error.text);
  console.log(error);
}
}}
          className="glass-strong rounded-3xl p-8 shadow-soft space-y-5"
        >
          <h2 className="font-display text-2xl">Send a message</h2>
          <input required placeholder="Your name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={inputCls} />
          <input required type="email" placeholder="Email address" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={inputCls} />
          <input placeholder="Phone number" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} className={inputCls} />
          <textarea required rows={5} placeholder="Your feedback or message..." value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} className={inputCls} />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-warm px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            {sent ? "Sent! ✓" : <>Send message <Send className="h-4 w-4" /></>}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
