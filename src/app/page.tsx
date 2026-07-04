"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Compass, 
  MapPin, 
  Map, 
  BookOpen, 
  Utensils, 
  Palette, 
  Calendar, 
  ArrowRight, 
  AlertTriangle, 
  Sparkles, 
  HelpCircle,
  ChevronDown
} from "lucide-react";
import Header from "@/components/Header";

// Animation Variants with explicit const typing for Tailwind & TS compatibility
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(255, 107, 53, 0.08)",
    transition: { duration: 0.3, ease: "easeInOut" }
  }
} as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-bg dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 overflow-x-hidden selection:bg-primary selection:text-white font-sans">
      <Header />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-hidden">
        {/* Background Decorative Gradients */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-gradient-to-tr from-primary/20 to-secondary/10 rounded-full blur-3xl -z-10 animate-pulse duration-5000" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-gradient-to-br from-accent/20 to-secondary/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-8 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border border-orange-200/50 dark:border-zinc-800"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary dark:text-secondary">
              Discover Beyond the Top 10 Lists
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-none"
          >
            Travel the <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">True Soul</span> <br />
            of Every Destination
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed"
          >
            Unlock native oral folklore, connect directly with master artisans, and experience regional culinary traditions. Be a traveler, not just a tourist.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md pt-4"
          >
            <a 
              href="/discovery"
              className="group flex items-center justify-center space-x-2 px-8 py-4 font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:opacity-95 rounded-2xl shadow-lg shadow-primary/20 active:scale-98 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <span>Begin Your Voyage</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
             <a 
              href="#problem"
              className="flex items-center justify-center space-x-2 px-8 py-4 font-semibold text-zinc-700 dark:text-zinc-300 bg-white/70 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <span>Read the Problem</span>
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center space-y-1 text-zinc-400 dark:text-zinc-600 cursor-pointer"
          onClick={() => {
            document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-xs uppercase font-bold tracking-widest">Scroll Story</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. THE PROBLEM SECTION */}
      <section id="problem" className="py-24 px-6 bg-zinc-950 text-white relative">
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">The Travel Gap</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              We Are Missing the Authentic
            </h2>
            <p className="max-w-2xl mx-auto text-zinc-400 text-base sm:text-lg leading-relaxed">
              Standard travel platforms send millions of travelers to the exact same popular spots, feeding commercial tourism traps and leaving rich cultural heritage invisible.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Card 1 */}
            <motion.div 
              variants={fadeIn}
              className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-2xl space-y-4"
            >
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">The Star-Rating Trap</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Star ratings prioritize volume and westernized commercial venues. True local homestays and authentic artisan studios go completely unlisted.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              variants={fadeIn}
              className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-2xl space-y-4"
            >
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Overcrowding & Congestion</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                By funneling tourist crowds to a select few spots, we damage historical landmarks and fail to distribute economic benefits to local neighborhoods.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              variants={fadeIn}
              className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-2xl space-y-4"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Forgotten Folklore</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Without guides documenting regional lore and folklore, rich generational storytelling and ancient traditions disappear silently.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. OUR MISSION SECTION */}
      <section id="story" className="py-24 px-6 bg-brand-bg dark:bg-zinc-950 relative">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Visual Column */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="w-full md:w-1/2 relative aspect-square md:aspect-auto md:h-[450px] rounded-3xl overflow-hidden bg-gradient-to-tr from-primary via-secondary to-accent p-1 flex items-center justify-center group"
          >
            <div className="w-full h-full bg-brand-bg dark:bg-zinc-950 rounded-[22px] flex flex-col items-center justify-center p-8 text-center space-y-6">
              <div className="p-4 bg-orange-100 dark:bg-zinc-900 rounded-full text-primary shadow-lg">
                <Compass className="w-12 h-12" />
              </div>
              <blockquote className="text-xl italic font-serif text-zinc-700 dark:text-zinc-300 leading-relaxed">
                "Traveling is not about tick boxes on a paper; it is about building deep, silent conversations with the land and the hands that keep its heritage alive."
              </blockquote>
              <span className="text-xs uppercase font-extrabold tracking-widest text-primary">
                — The MittiMiles Philosophy
              </span>
            </div>
          </motion.div>

          {/* Narrative Column */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="w-full md:w-1/2 space-y-6"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 rounded-full text-primary">
              <Compass className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">The MittiMiles Mission</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              We Empower Cultural Keeper Communities
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              MittiMiles connects curious travelers with dying local art traditions (like hand-carved clay horses in Panchmura, intricate weaving clusters, or historic folk music hubs). 
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              By translating search intent into highly relevant cultural maps, we give local cooperative societies the recognition they deserve and generate income channels directly for rural artisans.
            </p>
            <div className="pt-2">
              <a 
                href="#solution"
                className="inline-flex items-center space-x-2 text-primary font-bold hover:text-primary-hover transition-colors"
              >
                <span>Discover our GenAI features</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. THE GENAI SOLUTION PILLARS */}
      <section id="solution" className="py-24 px-6 bg-white dark:bg-zinc-900 border-y border-orange-100/50 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-accent/10 rounded-full text-accent dark:text-accent">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Product Features</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Our Generative AI Suite
            </h2>
            <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
              MittiMiles uses the state-of-the-art Gemini API to build an active, storytelling-driven travel companion.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="bg-brand-bg dark:bg-zinc-950 p-8 rounded-3xl border border-orange-100/40 dark:border-zinc-800 space-y-5"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white shadow-md shadow-primary/10">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">AI Destination Discovery</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Describe niche interest queries (e.g. *"terracotta architecture, organic farm stays"*) and get mapped instantly to lesser-known cultural coordinates.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="bg-brand-bg dark:bg-zinc-950 p-8 rounded-3xl border border-orange-100/40 dark:border-zinc-800 space-y-5"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-md shadow-primary/10">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Oral Storytelling & Lore</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Read or listen to the oral legends and origin stories of ancient crafts, temples, and places, written in a warm, narrative-driven tone.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="bg-brand-bg dark:bg-zinc-950 p-8 rounded-3xl border border-orange-100/40 dark:border-zinc-800 space-y-5"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-md shadow-primary/10">
                <Map className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Hidden Gems Maps</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Geocode your discover routes directly onto maps, complete with custom labels and deep links to avoid getting lost on dirt tracks.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="bg-brand-bg dark:bg-zinc-950 p-8 rounded-3xl border border-orange-100/40 dark:border-zinc-800 space-y-5"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center text-white shadow-md shadow-primary/10">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Local Food & Fairs</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Spotlight traditional, hyper-local culinary dishes and historical village markets instead of standard global tourist dining options.
              </p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="bg-brand-bg dark:bg-zinc-950 p-8 rounded-3xl border border-orange-100/40 dark:border-zinc-800 space-y-5"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-white shadow-md shadow-primary/10">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Crafts & Artisans</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Locate micro-weaving clusters and ancient pottery studios, ensuring travel spend feeds direct income into local hands.
              </p>
            </motion.div>

            {/* Feature 6 */}
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="bg-brand-bg dark:bg-zinc-950 p-8 rounded-3xl border border-orange-100/40 dark:border-zinc-800 space-y-5"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-md shadow-primary/10">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Cultural Itinerary</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Generate structured, day-by-day sequence planners focused entirely on slow travel, festivals, and authentic learning.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. DYNAMIC CALL-TO-ACTION PANEL */}
      <section className="py-24 px-6 bg-brand-bg dark:bg-zinc-950 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto p-12 sm:p-20 bg-gradient-to-tr from-primary to-secondary rounded-[40px] text-white shadow-xl shadow-primary/20 relative overflow-hidden">
          {/* Background overlay graphic */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-80" />

          <div className="relative space-y-8 flex flex-col items-center">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready to Discover <br className="hidden sm:block" />
              the Hidden Soul?
            </h2>
            <p className="max-w-lg text-orange-50 font-medium text-sm sm:text-base leading-relaxed">
              Launch our discovery model, input your specific travel interests, and experience the cultural voyage of a lifetime.
            </p>
             <a href="/discovery" className="inline-block px-8 py-4 bg-white text-primary hover:bg-orange-50 font-bold rounded-2xl shadow-lg active:scale-98 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none">
              Launch MittiMiles Discovery
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-orange-100/30 dark:border-zinc-900 text-center text-zinc-500 dark:text-zinc-600 text-xs">
        <p>© 2026 MittiMiles. Created for Hackathon MVP. Powered by Google Gemini API.</p>
      </footer>
    </div>
  );
}
