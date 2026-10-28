
import {
  ArrowUpRight,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

import {
  cityEvidence,
  researchSources,
  type CityId,
} from "@/lib/gcc-data";

interface Props {
  selectedCities: CityId[];
}

export default function CityComparison({
  selectedCities,
}: Props) {
  const displayed = selectedCities.map(
    (id) => cityEvidence[id]
  );

  return (
    <section className="rounded-2xl border border-white/10 bg-[#111827] p-6">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Evidence / 03
          </p>
          <h2 className="text-2xl font-semibold">
            Market comparison
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Published benchmarks for selected cities.
          </p>
        </div>
        <BarChart3 className="text-cyan-400" size={24} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {displayed.map((city) => (
          <article
            key={city.id}
            className="rounded-xl border border-white/10 bg-[#0b1220] p-4"
          >
            <div className="mb-5">
              <h3 className="font-semibold">{city.name}</h3>
              <p className="text-xs text-slate-500">
                {city.state}
              </p>
            </div>

            <p className="text-xs text-slate-400">
              Software engineer median CTC
            </p>
            <p className="mt-1 text-2xl font-bold text-cyan-400">
              ₹{city.engineerMedianLpa}L
              <span className="ml-1 text-xs font-normal text-slate-500">
                /year
              </span>
            </p>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-cyan-400"
                style={{
                  width: `${
                    (city.engineerMedianLpa / 15.7) * 100
                  }%`,
                }}
              />
            </div>

            <div className="mt-6 space-y-4 border-t border-white/10 pt-4">
              <div>
                <p className="text-xs text-slate-500">
                  Senior engineer median CTC
                </p>
                <p className="mt-1 font-semibold">
                  ₹{city.seniorMedianLpa}L/year
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Indicative office rent
                </p>
                <p className="mt-1 font-semibold">
                  ₹{city.rentRange[0]}–{city.rentRange[1]}
                </p>
                <p className="text-xs text-slate-500">
                  per sq ft / month
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Professionals tracked by Flexiple
                </p>
                <p className="mt-1 font-semibold">
                  {city.trackedProfessionalsMillions}M+
                </p>
                <p className="text-xs text-slate-500">
                  All tracked profiles, not available engineers
                </p>
              </div>
            </div>

            <a
              href={city.salarySource}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center gap-1 text-xs font-medium text-cyan-400 hover:underline"
            >
              View city evidence
              <ArrowUpRight size={14} />
            </a>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-cyan-400/15 bg-cyan-400/5 p-4">
        <div className="mb-2 flex items-center gap-2">
          <ShieldCheck
            size={17}
            className="text-cyan-400"
          />
          <h3 className="text-sm font-semibold">
            Source transparency
          </h3>
        </div>

        <p className="text-xs leading-6 text-slate-400">
          Compensation represents published annual CTC
          medians, not guaranteed hiring costs. Office
          rent figures are indicative ranges. Talent graph
          counts do not measure immediately available
          software engineers.
        </p>

        <div className="mt-4 flex flex-wrap gap-4">
          {Object.values(researchSources).map((source) => (
            <a
              key={source.name}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-cyan-300 hover:underline"
            >
              {source.name}
              <ArrowUpRight size={13} />
            </a>
          ))}
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Salary data: August 2026 · JLL rent page:
          publication date not stated
        </p>
      </div>
    </section>
  );
}
