import { MOVESBOOK_BASE_URL } from "./constants";

type Option = {
  value: string;
  label: string;
};

export type SignupMetadata = {
  countries: Option[];
  sports: Option[];
  timezones: Option[];
  measures: Option[];
  weekStarts: Option[];
  privacyLevels: Option[];
  notificationLevels: Option[];
  athleteUsertypes: Option[];
  coachUsertypes: Option[];
  coachTeamTypes: Option[];
  teamUsertypes: Option[];
  clubTypes: Option[];
};

const MOVESBOOK_REGISTER_ENDPOINT = `${MOVESBOOK_BASE_URL}/users/register`;

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#x2f;/gi, "/")
    .replace(/&#39;/gi, "'");
}

function parseSelectOptions(html: string, selectName: string): Option[] {
  const pattern = new RegExp(`name="${selectName}"[\s\S]*?<\/select>`, "i");
  const match = html.match(pattern);
  if (!match) {
    return [];
  }

  const optionRegex = /<option\s+value="([^"]*)">(.*?)<\/option>/gi;
  const options: Option[] = [];
  let optionMatch: RegExpExecArray | null = optionRegex.exec(match[0]);

  while (optionMatch) {
    options.push({
      value: decodeHtml(optionMatch[1]).trim(),
      label: decodeHtml(optionMatch[2]).trim(),
    });
    optionMatch = optionRegex.exec(match[0]);
  }

  return options;
}

export const FALLBACK_METADATA: SignupMetadata = {
  countries: [
    { value: "233", label: "United States" },
    { value: "110", label: "Italy" },
    { value: "77", label: "United Kingdom" },
  ],
  sports: [
    { value: "14", label: "Running" },
    { value: "16", label: "Swim" },
    { value: "9", label: "Cycling" },
  ],
  timezones: [
    { value: "204", label: "Etc/UTC" },
    { value: "268", label: "Europe/Rome" },
    { value: "451", label: "America/New_York" },
  ],
  measures: [
    { value: "1", label: "Metric" },
    { value: "2", label: "English" },
  ],
  weekStarts: [
    { value: "1", label: "Monday" },
    { value: "7", label: "Sunday" },
  ],
  privacyLevels: [
    { value: "Public", label: "Public" },
    { value: "Only friends", label: "Only friends" },
    { value: "Only myself", label: "Only myself" },
  ],
  notificationLevels: [
    { value: "2", label: "All comments" },
    { value: "1", label: "No notifications" },
  ],
  athleteUsertypes: [{ value: "7", label: "Generic member" }],
  coachUsertypes: [{ value: "30", label: "Coach" }],
  coachTeamTypes: [
    { value: "2", label: "Athletic team" },
    { value: "4", label: "Testing Teamtype" },
  ],
  teamUsertypes: [
    { value: "2", label: "Athletic team" },
    { value: "9", label: "New start" },
  ],
  clubTypes: [
    { value: "1", label: "Gym" },
    { value: "2", label: "Fitness club" },
  ],
};

export async function fetchSignupMetadata(): Promise<SignupMetadata> {
  try {
    const response = await fetch(MOVESBOOK_REGISTER_ENDPOINT, {
      method: "GET",
      headers: {
        "User-Agent": "Movesbook Next.js",
        Accept: "text/html,application/xhtml+xml",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(`Movesbook metadata request failed with status ${response.status}. Falling back to defaults.`);
      return FALLBACK_METADATA;
    }

    const html = await response.text();

    return {
      countries: parseSelectOptions(html, "data[User][country_id]") || FALLBACK_METADATA.countries,
      sports: parseSelectOptions(html, "data[User][sport_id]") || FALLBACK_METADATA.sports,
      timezones: parseSelectOptions(html, "data[User][zone_id]") || FALLBACK_METADATA.timezones,
      measures: parseSelectOptions(html, "data[User][measure_id]") || FALLBACK_METADATA.measures,
      weekStarts: parseSelectOptions(html, "data[User][week_id]") || FALLBACK_METADATA.weekStarts,
      privacyLevels: parseSelectOptions(html, "data[User][privacy]") || FALLBACK_METADATA.privacyLevels,
      notificationLevels:
        parseSelectOptions(html, "data[User][receive_notification]") || FALLBACK_METADATA.notificationLevels,
      athleteUsertypes:
        parseSelectOptions(html, "data[Athlete][usertype_id]") || FALLBACK_METADATA.athleteUsertypes,
      coachUsertypes: parseSelectOptions(html, "data[Coach][usertype_id]") || FALLBACK_METADATA.coachUsertypes,
      coachTeamTypes: parseSelectOptions(html, "data[Coach][teamtype]") || FALLBACK_METADATA.coachTeamTypes,
      teamUsertypes: parseSelectOptions(html, "data[Team][usertype_id]") || FALLBACK_METADATA.teamUsertypes,
      clubTypes: parseSelectOptions(html, "data[Club][clubtype_id]") || FALLBACK_METADATA.clubTypes,
    };
  } catch (error) {
    console.warn("Unable to reach Movesbook for signup metadata. Using fallback set.", error);
    return FALLBACK_METADATA;
  }
}

