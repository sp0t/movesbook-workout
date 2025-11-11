export type HighlightSlide = {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  accent: string;
};

export const highlightSlides: HighlightSlide[] = [
  {
    id: "analytics",
    title: "Performance analytics in real time",
    description:
      "Monitor training loads, wellness metrics, and athlete readiness across every squad with interactive dashboards.",
    ctaLabel: "Explore analytics",
    ctaHref: "#features",
    accent: "from-emerald-400/20 via-emerald-400/10 to-transparent",
  },
  {
    id: "collaboration",
    title: "Collaboration across every role",
    description:
      "Coaches, teams, and clubs coordinate workouts, feedback, and progress with shared calendars and workflows.",
    ctaLabel: "See team tools",
    ctaHref: "#roles",
    accent: "from-sky-400/25 via-indigo-400/15 to-transparent",
  },
  {
    id: "automation",
    title: "Automated routines & alerts",
    description:
      "Automate session templates, wellness surveys, and reminders so staff can focus on coaching, not admin tasks.",
    ctaLabel: "Automate your day",
    ctaHref: "#automation",
    accent: "from-amber-400/25 via-orange-400/15 to-transparent",
  },
];

export type RoleCard = {
  id: string;
  label: string;
  description: string;
  color: string;
};

export const roleCards: RoleCard[] = [
  {
    id: "athlete",
    label: "Athletes",
    description:
      "Personal workout vaults, moveframes, and progress markers that travel from season to season.",
    color: "from-emerald-500/30 to-emerald-400/10",
  },
  {
    id: "coach",
    label: "Coaches",
    description:
      "Plan for entire rosters, share programs instantly, and review completed sessions with smart filters.",
    color: "from-sky-500/30 to-sky-400/10",
  },
  {
    id: "team",
    label: "Teams",
    description:
      "Coordinate squads, manage banners, and centralize schedule changes with permissions that scale.",
    color: "from-purple-500/30 to-purple-400/10",
  },
  {
    id: "club",
    label: "Clubs",
    description:
      "Oversee multiple teams, build resource libraries, and create seasonal templates for every department.",
    color: "from-amber-500/30 to-amber-400/10",
  },
];

export const metricHighlights = [
  { label: "Countries", value: "52", detail: "Movesbook community worldwide" },
  { label: "Sessions logged", value: "14M+", detail: "Captured across endurance and indoor sports" },
  { label: "Roles supported", value: "4", detail: "Athletes, Coaches, Teams, Clubs" },
  { label: "Integrations", value: "25+", detail: "Wearables, GPS trackers, EMR, and more" },
] as const;

