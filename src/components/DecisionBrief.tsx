
"use client";

import { useState } from "react";
import {
    ArrowUpRight,
    Check,
    Copy,
    Loader2,
    Sparkles,
    ShieldAlert,
} from "lucide-react";

import {
    cityEvidence,
    type CityId,
} from "@/lib/gcc-data";

type Priority = "cost" | "talent" | "balanced";

type Brief = {
    recommendationCity: CityId;
    summary: string;
    rationale: string;
    tradeoffs: {
        city: CityId;
        advantage: string;
        limitation: string;
    }[];
    unknowns: string[];
    nextSteps: string[];
};

interface Props {
    teamSize: string;
    priority: Priority;
    selectedCities: CityId[];
}

export default function DecisionBrief({
    teamSize,
    priority,
    selectedCities,
}: Props) {
    const [brief, setBrief] = useState<Brief | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const validSize =
        /^\d+$/.test(teamSize) &&
        Number(teamSize) >= 1 &&
        Number(teamSize) <= 5000;

    async function generateBrief() {
        setLoading(true);
        setError("");
        setBrief(null);
        setCopied(false);

        try {
            const response = await fetch("/api/brief", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                signal: AbortSignal.timeout(90000),
                body: JSON.stringify({
                    teamSize: Number(teamSize),
                    priority,
                    selectedCities,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error || "Unable to generate brief."
                );
            }

            setBrief(result.brief as Brief);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Unexpected error."
            );
        } finally {
            setLoading(false);
        }
    }

    async function copyBrief() {
        if (!brief) return;

        const text = [
            "GCC PROOF — DECISION BRIEF",
            `Engineering GCC | ${teamSize} employees`,
            `Priority: ${priority}`,
            "",
            "RECOMMENDATION",
            cityEvidence[brief.recommendationCity].name,
            brief.summary,
            "",
            "RATIONALE",
            brief.rationale,
            "",
            "CITY TRADEOFFS",
            ...brief.tradeoffs.flatMap((item) => [
                cityEvidence[item.city].name,
                `Advantage: ${item.advantage}`,
                `Limitation: ${item.limitation}`,
            ]),
            "",
            "UNKNOWNS",
            ...brief.unknowns.map((item) => `- ${item}`),
            "",
            "NEXT STEPS",
            ...brief.nextSteps.map((item) => `- ${item}`),
            "",
            "SOURCES",
            "https://flexiple.com/gcc/india",
            "https://www.jll.com/en-in/property-types/global-capability-centres",
            "",
            "Research prototype. Verify evidence before investment decisions.",
        ].join("\n");

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
        } catch {
            setError("Unable to copy. Check clipboard permissions.");
        }
    }

    return (
        <section className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-violet-400/10 p-3 text-violet-300">
                    <Sparkles size={21} />
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-violet-300">
                        AI / 04
                    </p>
                    <h2 className="text-xl font-semibold">
                        AI Decision Brief
                    </h2>
                </div>
            </div>

            <p className="mb-5 text-sm leading-6 text-slate-400">
                Generate a conditional location recommendation
                based on your scenario and our curated evidence.
            </p>

            <button
                type="button"
                onClick={generateBrief}
                disabled={loading || !validSize || selectedCities.length < 2}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-400 px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        Generating research brief...
                    </>
                ) : (
                    <>
                        <Sparkles size={18} />
                        Generate AI Decision Brief
                    </>
                )}
            </button>

            {error && (
                <div role="alert" className="mt-5 flex gap-2 rounded-xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-200">
                    <ShieldAlert size={19} className="shrink-0" />
                    {error}
                </div>
            )}

            {brief && (
                <div className="mt-6 space-y-6" aria-live="polite">
                    <div className="rounded-xl border border-cyan-400/25 bg-cyan-400/5 p-5">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                            Conditional recommendation
                        </p>
                        <h3 className="text-2xl font-bold">
                            {cityEvidence[brief.recommendationCity].name}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-slate-300">
                            {brief.summary}
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-2 font-semibold">
                            Why this city?
                        </h3>
                        <p className="text-sm leading-7 text-slate-400">
                            {brief.rationale}
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-3 font-semibold">
                            City trade-offs
                        </h3>
                        <div className="space-y-3">
                            {brief.tradeoffs.map((item) => (
                                <div
                                    key={item.city}
                                    className="rounded-xl border border-white/10 bg-[#0b1220] p-4"
                                >
                                    <h4 className="mb-2 font-semibold text-cyan-300">
                                        {cityEvidence[item.city].name}
                                    </h4>
                                    <p className="text-sm leading-6 text-slate-300">
                                        <strong>Advantage: </strong>
                                        {item.advantage}
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        <strong>Limitation: </strong>
                                        {item.limitation}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-3 font-semibold">
                            Unknowns and limitations
                        </h3>
                        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-400">
                            {brief.unknowns.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-3 font-semibold">
                            Recommended next steps
                        </h3>
                        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-400">
                            {brief.nextSteps.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-t border-white/10 pt-5">
                        <h3 className="mb-3 text-sm font-semibold">
                            Research sources
                        </h3>

                        <a
                            href="https://flexiple.com/gcc/india"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mb-2 flex items-center gap-2 text-sm text-cyan-300 hover:underline"
                        >
                            Flexiple GCC Intelligence
                            <ArrowUpRight size={14} />
                        </a>

                        <a
                            href="https://www.jll.com/en-in/property-types/global-capability-centres"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-cyan-300 hover:underline"
                        >
                            JLL GCC Research
                            <ArrowUpRight size={14} />
                        </a>

                        <p className="mt-3 text-xs leading-5 text-slate-500">
                            Sources support the comparison dataset, not
                            necessarily every AI interpretation. This is
                            a preliminary research brief, not a final
                            site-selection recommendation.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={copyBrief}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-medium transition hover:bg-white/10"
                    >
                        {copied ? <Check size={17} /> : <Copy size={17} />}
                        {copied ? "Copied!" : "Copy Decision Brief"}
                    </button>
                </div>
            )}
        </section>
    );
}
