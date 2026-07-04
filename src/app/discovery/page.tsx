"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass, 
  MapPin, 
  Map, 
  BookOpen, 
  Utensils, 
  Palette, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  ArrowLeft,
  Navigation,
  Check,
  AlertCircle,
  Castle
} from "lucide-react";
import Header from "@/components/Header";
import { discoverDestination } from "./actions";
import { DestinationData } from "@/lib/fallbackData";

const INTEREST_TAGS = [
  { id: "weaving", label: "Handloom Weaving", icon: Palette },
  { id: "pottery", label: "Clay Pottery", icon: Palette },
  { id: "folklore", label: "Folklore & Lore", icon: BookOpen },
  { id: "music", label: "Folk Music & Fairs", icon: Sparkles },
  { id: "mansions", label: "Heritage Mansions", icon: MapPin },
  { id: "food", label: "Native Gastronomy", icon: Utensils },
];

const LOADING_MESSAGES = [
  "Consulting the village elders...",
  "Searching local artisan cooperatives...",
  "Translating ancient regional folklore...",
  "Mapping forgotten slow-travel trails...",
  "Unearthing historical origin recipes...",
];

export default function DiscoveryPage() {
  const [destination, setDestination] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [result, setResult] = useState<DestinationData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("lore");
  const [showValidationConfirm, setShowValidationConfirm] = useState(true);

  // Rotate loading messages while fetching
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) => 
      prev.includes(id) 
        ? prev.filter((item) => item !== id) 
        : [...prev, id]
    );
  };

  const triggerSearch = async (targetDest: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    setResult(null);
    setShowValidationConfirm(true); // Reset validation confirm step for new search

    try {
      const res = await discoverDestination(targetDest, selectedInterests);
      setIsLoading(false);
      if (res.success) {
        setResult(res.data);
        if (res.error) {
          setErrorMsg(res.error); // Display friendly fallback/offline warning
        }
      } else {
        setErrorMsg(res.error || "Something went wrong. Please try again.");
      }
    } catch (err: any) {
      console.error("Discovery error:", err);
      setIsLoading(false);
      setErrorMsg(`Connection error: ${err.message || err}. Please try again.`);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;
    triggerSearch(destination);
  };

  const handleUseSuggestion = (suggestion: string) => {
    setDestination(suggestion);
    triggerSearch(suggestion);
  };

  // Determine if we need to show the validation discrepancy UI
  const needsValidationConfirm = 
    result && 
    result.locationValidation && 
    result.locationValidation.isValid === false && 
    showValidationConfirm;

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 overflow-x-hidden selection:bg-primary selection:text-white font-sans">
      <Header />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 space-y-12">
        {/* Page Title */}
        <div className="space-y-3 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-flex items-center gap-2">
            <Compass className="w-8 h-8 text-primary animate-spin-slow" />
            <span>MittiMiles Discovery</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">
            Input a place name and choose interest highlights to map your authentic slow-travel journey.
          </p>
        </div>

        {/* Input Form & Loading Section */}
        <AnimatePresence mode="wait">
          {!result && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md p-8 rounded-3xl border border-orange-100/40 dark:border-zinc-800/50 shadow-xl"
            >
              <form onSubmit={handleSearch} className="space-y-8">
                {/* 1. Free text input */}
                <div className="space-y-2">
                  <label htmlFor="destination" className="block text-sm font-bold tracking-tight text-zinc-700 dark:text-zinc-300">
                    Where would you like to explore?
                  </label>
                  <input
                    type="text"
                    id="destination"
                    placeholder="Enter place, town, or region (e.g. Bishnupur, Karaikudi, Karnataka...)"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                    className="w-full px-5 py-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-base transition-colors"
                  />
                </div>

                {/* 2. Interest Tags */}
                <div className="space-y-3">
                  <span className="block text-sm font-bold tracking-tight text-zinc-700 dark:text-zinc-300">
                    Refine by Cultural Interests (Optional)
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {INTEREST_TAGS.map((tag) => {
                      const Icon = tag.icon;
                      const selected = selectedInterests.includes(tag.id);
                      return (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => toggleInterest(tag.id)}
                          aria-pressed={selected}
                          className={`flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-full border transition-all ${
                            selected
                              ? "bg-primary text-white border-primary shadow-sm scale-102"
                              : "bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-primary/40"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{tag.label}</span>
                          {selected && <Check className="w-3 h-3 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Action button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 py-4 font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:opacity-95 rounded-2xl shadow-lg shadow-primary/20 active:scale-99 transition-all duration-200"
                  >
                    <span>Make my journey awesome</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              role="status"
              aria-live="polite"
              className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md py-16 px-6 rounded-3xl border border-orange-100/40 dark:border-zinc-800/50 shadow-xl flex flex-col items-center justify-center space-y-6 text-center"
            >
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <Compass className="absolute inset-0 m-auto w-7 h-7 text-primary animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight">Mapping Your Voyage</h3>
                <p className="text-sm font-medium text-primary tracking-wide animate-pulse">
                  {LOADING_MESSAGES[loadingMsgIndex]}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Validation Confirmation Panel */}
        {needsValidationConfirm && result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            role="alert"
            className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md p-8 rounded-3xl border border-amber-200 dark:border-amber-900/40 shadow-xl space-y-6"
          >
            <div className="flex items-center space-x-3 text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-8 h-8" />
              <h3 className="text-xl font-bold tracking-tight">Wait, is this what you meant?</h3>
            </div>

            <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
              {result.locationValidation?.message || `The destination "${destination}" could not be logically resolved in its region.`}
            </p>

            {result.locationValidation?.suggestions && result.locationValidation.suggestions.length > 0 && (
              <div className="space-y-3">
                <span className="block text-xs font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-600">
                  Suggested Locations:
                </span>
                <div className="grid grid-cols-1 gap-3">
                  {result.locationValidation.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleUseSuggestion(suggestion)}
                      className="flex items-center justify-between p-4 bg-brand-bg dark:bg-zinc-950 border border-orange-100 hover:border-primary/40 dark:border-zinc-800 rounded-2xl text-left group transition-all"
                    >
                      <span className="font-semibold text-sm group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                        {suggestion}
                      </span>
                      <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
              <button
                onClick={() => setShowValidationConfirm(false)}
                className="flex-1 py-3 px-6 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-primary bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl transition"
              >
                Search for exactly "{destination}" anyway
              </button>
              <button
                onClick={() => setResult(null)}
                className="py-3 px-6 text-sm font-semibold text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 rounded-xl transition"
              >
                Cancel and search again
              </button>
            </div>
          </motion.div>
        )}

        {/* Results Showcase View */}
        {result && !needsValidationConfirm && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header back button & destination badge */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <button
                onClick={() => setResult(null)}
                className="flex items-center space-x-1 text-sm font-semibold text-zinc-500 hover:text-primary transition-colors focus:outline-none"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Search another town</span>
              </button>

              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-extrabold text-xl">{result.destinationName}</span>
                <span className="px-2.5 py-0.5 text-xs font-bold bg-[#2EC4B6]/10 text-accent dark:text-[#2EC4B6] rounded-full uppercase tracking-wider">
                  {result.stateOrRegion}
                </span>
              </div>
            </div>

            {/* Error Notice / Warning Banner (e.g. Offline warning) */}
            {errorMsg && (
              <div className="flex items-start space-x-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-600 dark:text-amber-400 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">{errorMsg}</p>
              </div>
            )}

            {/* Destination Description & Coordinates banner */}
            <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md p-6 rounded-3xl border border-orange-100/40 dark:border-zinc-800/50 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="space-y-1.5 flex-1">
                <h3 className="text-lg font-bold tracking-tight text-primary">{result.tagline}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                  {result.description}
                </p>
              </div>
              <div className="flex flex-row md:flex-col gap-3 items-start md:items-end flex-shrink-0">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-zinc-400 dark:text-zinc-600">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{result.coordinates.lat.toFixed(4)}° N, {result.coordinates.lng.toFixed(4)}° E</span>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${result.coordinates.lat},${result.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 text-xs font-bold text-white bg-accent hover:opacity-95 rounded-xl shadow-md transition-all duration-200"
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div role="tablist" className="flex border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto scrollbar-none">
              {[
                { id: "lore", label: "Oral History & Lore", icon: BookOpen },
                { id: "heritage", label: "Heritage Sights", icon: Castle },
                { id: "crafts", label: "Local Crafts", icon: Palette },
                { id: "food", label: "Regional Cuisines", icon: Utensils },
                { id: "itinerary", label: "Slow Itinerary", icon: Calendar },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                    }}
                    role="tab"
                    aria-selected={active}
                    aria-controls={`panel-${tab.id}`}
                    id={`tab-${tab.id}`}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors focus:outline-none ${
                      active
                        ? "border-primary text-primary"
                        : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab content displays */}
            <div className="min-h-[250px]">
              {activeTab === "lore" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="tabpanel"
                  id="panel-lore"
                  aria-labelledby="tab-lore"
                  className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md p-8 rounded-3xl border border-orange-100/40 dark:border-zinc-800/50 shadow-sm space-y-4"
                >
                  <h3 className="text-xl font-bold tracking-tight text-primary">
                    {result.lore.title}
                  </h3>
                  <p className="text-base text-zinc-700 dark:text-zinc-300 font-serif leading-relaxed italic border-l-4 border-primary/45 pl-4 py-1 whitespace-pre-line">
                    "{result.lore.story}"
                  </p>
                </motion.div>
              )}

              {activeTab === "heritage" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  role="tabpanel"
                  id="panel-heritage"
                  aria-labelledby="tab-heritage"
                  className="grid grid-cols-1 gap-6"
                >
                  {result.heritageSights && result.heritageSights.length > 0 ? (
                    result.heritageSights.map((sight, idx) => (
                      <div 
                        key={idx}
                        className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md p-6 rounded-3xl border border-orange-100/40 dark:border-zinc-800/50 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                      >
                        <div className="space-y-1.5 flex-1">
                          <h4 className="text-lg font-bold tracking-tight">{sight.name}</h4>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                            {sight.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0 px-3 py-1.5 bg-primary/10 text-primary text-xs font-extrabold uppercase rounded-lg border border-primary/20 tracking-wider">
                          {sight.historicalEra}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md p-8 rounded-3xl border border-orange-100/45 dark:border-zinc-800 text-center text-zinc-500">
                      No specific heritage sights documented for this destination.
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "crafts" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  role="tabpanel"
                  id="panel-crafts"
                  aria-labelledby="tab-crafts"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {result.crafts.map((craft, idx) => (
                    <div 
                      key={idx}
                      className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md p-6 rounded-3xl border border-orange-100/40 dark:border-zinc-800/50 shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 text-[10px] font-bold bg-primary/10 text-primary rounded-md uppercase tracking-wider">
                          <Palette className="w-3 h-3" />
                          <span>Craft Guild</span>
                        </div>
                        <h4 className="text-lg font-bold tracking-tight">{craft.name}</h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                          {craft.description}
                        </p>
                      </div>
                      <div className="pt-4 flex items-center space-x-1.5 text-xs text-zinc-400 dark:text-zinc-600 font-semibold border-t border-zinc-100 dark:border-zinc-800 mt-4">
                        <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="truncate">{craft.location}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "food" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  role="tabpanel"
                  id="panel-food"
                  aria-labelledby="tab-food"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {result.food.map((dish, idx) => (
                    <div 
                      key={idx}
                      className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md p-6 rounded-3xl border border-orange-100/40 dark:border-zinc-800/50 shadow-sm space-y-2"
                    >
                      <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 text-[10px] font-bold bg-amber-500/10 text-amber-500 rounded-md uppercase tracking-wider">
                        <Utensils className="w-3 h-3" />
                        <span>Native Dish</span>
                      </div>
                      <h4 className="text-lg font-bold tracking-tight">{dish.name}</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                        {dish.description}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "itinerary" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  role="tabpanel"
                  id="panel-itinerary"
                  aria-labelledby="tab-itinerary"
                  className="space-y-6"
                >
                  {result.itinerary.map((step, idx) => (
                    <div 
                      key={idx} 
                      className="flex gap-6 items-start group"
                    >
                      {/* Left timeline index indicator */}
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 text-primary border border-primary/20 rounded-full flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </div>
                        {idx < result.itinerary.length - 1 && (
                          <div className="w-0.5 h-16 bg-orange-100 dark:bg-zinc-800 my-1 flex-grow" />
                        )}
                      </div>

                      {/* Right content card */}
                      <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md p-6 rounded-3xl border border-orange-100/40 dark:border-zinc-800/50 shadow-sm flex-1 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="px-2.5 py-0.5 text-[10px] font-bold bg-primary/10 text-primary rounded-md uppercase tracking-wider">
                            {step.timeSlot}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-semibold whitespace-pre-line">
                          {step.activity}
                        </p>
                        {step.localTip && (
                          <div className="text-xs p-3 bg-[#2EC4B6]/10 border border-accent/20 rounded-xl text-accent dark:text-[#2EC4B6] font-medium">
                            <span className="font-bold">Local Tip:</span> {step.localTip}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-orange-100/30 dark:border-zinc-900 text-center text-zinc-500 dark:text-zinc-600 text-xs">
        <p>© 2026 MittiMiles. Created for Hackathon MVP. Powered by Google Gemini API.</p>
      </footer>
    </div>
  );
}
