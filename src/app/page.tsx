"use client";
import CityComparison from "@/components/CityComparison";
import DecisionBrief from "@/components/DecisionBrief";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  CircleCheck,
  Compass,
  FileText,
  Globe2,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type CityId = "bengaluru" | "hyderabad" | "pune";
type Priority = "cost" | "talent" | "balanced";

const cities: {
  id: CityId;
  name: string;
  subtitle: string;
  description: string;
}[] = [
  {
    id: "bengaluru",
    name: "Bengaluru",
    subtitle: "Karnataka",
    description: "Established technology and GCC ecosystem",
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    subtitle: "Telangana",
    description: "Technology, healthcare and life sciences",
  },
  {
    id: "pune",
    name: "Pune",
    subtitle: "Maharashtra",
    description: "Engineering, R&D and financial services",
  },
];

const priorities: {
  id: Priority;
  name: string;
  description: string;
}[] = [
  {
    id: "cost",
    name: "Cost efficiency",
    description: "Prioritize published cost benchmarks",
  },
  {
    id: "talent",
    name: "Talent ecosystem",
    description: "Prioritize industry and talent context",
  },
  {
    id: "balanced",
    name: "Balanced",
    description: "Evaluate trade-offs across indicators",
  },
];

export default function Home() {
  const [teamSize, setTeamSize] = useState("75");
  const [priority, setPriority] = useState<Priority>("balanced");
  const [selectedCities, setSelectedCities] = useState<CityId[]>([
    "bengaluru",
    "hyderabad",
    "pune",
  ]);
  const [preview, setPreview] = useState(false);

  const validSize =
    /^\d+$/.test(teamSize) &&
    Number(teamSize) >= 1 &&
    Number(teamSize) <= 5000;

  function toggleCity(city: CityId) {
    setPreview(false);
    setSelectedCities((current) => {
      if (current.includes(city)) {
        if (current.length <= 2) return current;
        return current.filter((id) => id !== city);
      }
      return [...current, city];
    });
  }

  const selectedNames = cities
    .filter((city) => selectedCities.includes(city.id))
    .map((city) => city.name);

  const selectedPriority = priorities.find(
    (item) => item.id === priority
  );

  return (
    <main className="min-h-screen bg-[#080d19] text-slate-100">
      {/* Navigation */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
              <Compass size={22} strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight">
                GCC<span className="text-cyan-400">Proof</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Decision Intelligence
              </div>
            </div>
          </a>

          <nav className="flex items-center gap-5 text-sm">
            <a href="#workspace" className="hidden text-slate-300 hover:text-white sm:block">
              Workspace
            </a>
            <a href="#methodology" className="text-slate-400 hover:text-white">
              Methodology
            </a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-8">
        {/* Hero */}
        <section className="mb-12 max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-300">
            <Sparkles size={13} />
            AI-powered GCC location intelligence
          </div>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Big decisions.
            <br />
            <span className="text-cyan-400">Better evidence.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
            Compare India&apos;s leading GCC locations using published
            market evidence, transparent assumptions, and
            AI-assisted decision research.
          </p>

          <div className="mt-7 flex flex-wrap gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-cyan-400" />
              Source-backed evidence
            </span>
            <span className="flex items-center gap-2">
              <Globe2 size={16} className="text-cyan-400" />
              Three Indian technology hubs
            </span>
            <span className="flex items-center gap-2">
              <FileText size={16} className="text-cyan-400" />
              Decision-ready research
            </span>
          </div>
        </section>

          <div id="workspace" className="grid gap-6 lg:items-start lg:grid-cols-[420px_minmax(0,1fr)]">
          {/* Scenario builder */}
          <section className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <div className="mb-7 flex items-start justify-between gap-3">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">
                  Workspace / 01
                </p>
                <h2 className="text-2xl font-semibold">
                  Define your GCC
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Configure your expansion research scenario.
                </p>
              </div>
              <Building2 size={24} className="text-slate-500" />
            </div>

            <div className="space-y-7">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Business function
                </label>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Building2 size={17} className="text-cyan-400" />
                    <span className="text-sm">Software Engineering</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    MVP scope
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="team-size" className="mb-2 block text-sm font-medium">
                  Planned team size
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0b1220] px-4 py-2">
                  <input
                    id="team-size"
                    type="number"
                    min={1}
                    max={5000}
                    value={teamSize}
                    onChange={(e) => {
                      setTeamSize(e.target.value);
                      setPreview(false);
                    }}
                    className="w-full bg-transparent py-2 text-lg font-semibold outline-none"
                  />
                  <span className="text-sm text-slate-500">
                    employees
                  </span>
                </div>
                {!validSize && (
                  <p className="mt-2 text-xs text-rose-300">
                    Enter a whole number between 1 and 5,000.
                  </p>
                )}
              </div>

              <div>
                <p className="mb-3 text-sm font-medium">
                  Decision priority
                </p>
                <div className="space-y-2">
                  {priorities.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={priority === item.id}
                      onClick={() => {
                        setPriority(item.id);
                        setPreview(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
                        priority === item.id
                          ? "border-cyan-400/60 bg-cyan-400/10"
                          : "border-white/10 bg-[#0b1220] hover:border-white/25"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {item.description}
                        </p>
                      </div>
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        priority === item.id
                          ? "border-cyan-400 bg-cyan-400 text-slate-950"
                          : "border-slate-600"
                      }`}>
                        {priority === item.id && <Check size={13} />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium">
                  Compare locations
                </p>
                <div className="space-y-2">
                  {cities.map((city) => {
                    const selected = selectedCities.includes(city.id);
                    return (
                      <button
                        type="button"
                        key={city.id}
                        aria-pressed={selected}
                        onClick={() => toggleCity(city.id)}
                        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                          selected
                            ? "border-cyan-400/30 bg-cyan-400/5"
                            : "border-white/10 bg-[#0b1220]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <MapPin
                            size={17}
                            className={selected ? "text-cyan-400" : "text-slate-500"}
                          />
                          <div>
                            <p className="text-sm font-medium">
                              {city.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {city.subtitle}
                            </p>
                          </div>
                        </div>
                        <div className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                          selected
                            ? "border-cyan-400 bg-cyan-400 text-slate-950"
                            : "border-slate-600"
                        }`}>
                          {selected && <Check size={14} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Select at least two cities.
                </p>
              </div>

              <button
                type="button"
                disabled={!validSize}
                onClick={() => setPreview(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-4 text-sm font-bold text-[#07101b] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Preview research scenario
                <ArrowRight size={18} />
              </button>
            </div>
          </section>

          {/* Research workspace */}
          <section className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
              <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">
                    Research / 02
                  </p>
                  <h2 className="text-2xl font-semibold">
                    Location intelligence
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Your selected Indian GCC locations.
                  </p>
                </div>
                <Globe2 size={24} className="text-slate-500" />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {cities
                  .filter((city) => selectedCities.includes(city.id))
                  .map((city, index) => (
                    <div
                      key={city.id}
                      className="rounded-xl border border-white/10 bg-[#0b1220] p-4"
                    >
                      <div className="mb-6 flex items-center justify-between">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                          <MapPin size={18} />
                        </div>
                        <span className="text-xs text-slate-500">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold">
                        {city.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {city.subtitle}
                      </p>
                      <p className="mt-4 text-xs leading-5 text-slate-400">
                        {city.description}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <CityComparison selectedCities={selectedCities} />
            <div className="rounded-2xl border border-white/10 bg-[#111827] p-6" aria-live="polite">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    Research brief
                  </h2>
                  <p className="text-xs text-slate-500">
                    Scenario preview
                  </p>
                </div>
              </div>

              {preview ? (
                <div className="space-y-4">
                  <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-300">
                      <CircleCheck size={16} />
                      Scenario configured
                    </div>
                    <p className="text-sm leading-7 text-slate-300">
                      Research a {Number(teamSize).toLocaleString()}-person
                      software-engineering GCC, comparing{" "}
                      {selectedNames.join(", ")}, with an emphasis
                      on {selectedPriority?.name.toLowerCase()}.
                    </p>
                  </div>
                  <p className="text-sm leading-6 text-slate-400">
                    In the next development phases, verified
                    comparison metrics and an AI-generated
                    decision brief will appear in this workspace.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-white/15 bg-[#0b1220] px-5 py-9 text-center">
                  <Sparkles
                    size={29}
                    className="mx-auto mb-4 text-slate-500"
                  />
                  <p className="font-medium">
                    Your research starts here
                  </p>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Configure a GCC scenario, select your cities,
                    and preview your research requirements.
                  </p>
                </div>
              )}
            </div>

            <div
              id="methodology"
              className="rounded-2xl border border-white/10 bg-[#111827] p-6"
            >
              <DecisionBrief
                key={`${teamSize}-${priority}-${selectedCities.join("-")}`}
                teamSize={teamSize}
                priority={priority}
                selectedCities={selectedCities}
                />
              <div className="mb-4 flex items-center gap-2">
                <ShieldCheck size={20} className="text-cyan-400" />
                <h2 className="font-semibold">
                  Evidence-first methodology
                </h2>
              </div>
              <p className="text-sm leading-7 text-slate-400">
                GCC Proof separates published evidence from
                interpretation. Data sources, reporting periods,
                and limitations will be available alongside the
                comparison and AI analysis.
              </p>

              <div className="mt-5 space-y-3">
                <a
                  href="https://flexiple.com/gcc/india"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm text-slate-300 hover:text-cyan-300"
                >
                  Flexiple — GCC & talent intelligence
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href="https://www.jll.com/en-in/property-types/global-capability-centres"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm text-slate-300 hover:text-cyan-300"
                >
                  JLL — GCC office market research
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <span>GCC Proof · Evidence-led decisions</span>
          <span>Research prototype · Not investment advice</span>
        </footer>
      </div>
    </main>
  );
}
