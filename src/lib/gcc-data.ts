
export type CityId = "bengaluru" | "hyderabad" | "pune";

export interface CityEvidence {
  id: CityId;
  name: string;
  state: string;
  rentRange: [number, number];
  engineerMedianLpa: number;
  seniorMedianLpa: number;
  trackedProfessionalsMillions: number;
  strength: string;
  salarySource: string;
}

export const researchSources = {
  rent: {
    name: "JLL GCC Real Estate Research",
    url: "https://www.jll.com/en-in/property-types/global-capability-centres",
    period: "Publication date not stated",
  },
  salary: {
    name: "Flexiple GCC Talent Intelligence",
    url: "https://flexiple.com/gcc/india",
    period: "August 2026",
  },
};

export const cityEvidence: Record<CityId, CityEvidence> = {
  bengaluru: {
    id: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    rentRange: [80, 120],
    engineerMedianLpa: 15.7,
    seniorMedianLpa: 32.5,
    trackedProfessionalsMillions: 7.1,
    strength: "Established technology and GCC ecosystem",
    salarySource: "https://flexiple.com/gcc/bengaluru",
  },
  hyderabad: {
    id: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    rentRange: [60, 95],
    engineerMedianLpa: 10.4,
    seniorMedianLpa: 24.2,
    trackedProfessionalsMillions: 5.3,
    strength: "Technology, healthcare and life sciences",
    salarySource: "https://flexiple.com/gcc/hyderabad",
  },
  pune: {
    id: "pune",
    name: "Pune",
    state: "Maharashtra",
    rentRange: [55, 80],
    engineerMedianLpa: 9.5,
    seniorMedianLpa: 22.3,
    trackedProfessionalsMillions: 2.4,
    strength: "Engineering, R&D and financial services",
    salarySource: "https://flexiple.com/gcc/pune",
  },
};
