import { NextRequest, NextResponse } from "next/server";
import { MOVESBOOK_BASE_URL } from "@/lib/auth/constants";

const REGISTER_ENDPOINT = `${MOVESBOOK_BASE_URL}/users/register`;

type CommonFields = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  countryId: string;
  stateId?: string;
  cityName?: string;
  sportId: string;
  zoneId: string;
  measureId: string;
  weekStartId: string;
  privacy: string;
  notificationPreference: string;
  informationUpdates: boolean;
};

type BirthDate = {
  day: string;
  month: string;
  year: string;
};

type AthleteFields = {
  gender: "M" | "F";
  zipcode?: string;
  dob: BirthDate;
  usertypeId: string;
};

type CoachFields = AthleteFields & {
  teamType: string;
};

type TeamFields = AthleteFields & {
  usertypeId: string;
};

type ClubFields = AthleteFields & {
  clubTypeId: string;
};

type SignupRequest = {
  role: "athlete" | "coach" | "team" | "club";
  user: CommonFields;
  athlete?: AthleteFields;
  coach?: CoachFields;
  team?: TeamFields;
  club?: ClubFields;
};

type RoleConfig = {
  roleId: string;
  genderField: string;
  zipcodeField: string;
  usertypeField?: string;
  teamtypeField?: string;
  clubtypeField?: string;
  dobPrefix: string;
};

const ROLE_CONFIG: Record<SignupRequest["role"], RoleConfig> = {
  athlete: {
    roleId: "5",
    genderField: "data[Athlete][gender]",
    zipcodeField: "data[Athlete][zipcode]",
    usertypeField: "data[Athlete][usertype_id]",
    dobPrefix: "data[Athlete][dob]",
  },
  coach: {
    roleId: "6",
    genderField: "data[Coach][gender]",
    zipcodeField: "data[Coach][zipcode]",
    usertypeField: "data[Coach][usertype_id]",
    teamtypeField: "data[Coach][teamtype]",
    dobPrefix: "data[Coach][dob]",
  },
  team: {
    roleId: "7",
    genderField: "data[Team][gender]",
    zipcodeField: "data[Team][zipcode]",
    usertypeField: "data[Team][usertype_id]",
    dobPrefix: "data[Team][dob]",
  },
  club: {
    roleId: "8",
    genderField: "data[Club][gender]",
    zipcodeField: "data[Club][zipcode]",
    clubtypeField: "data[Club][clubtype_id]",
    dobPrefix: "data[Club][dob]",
  },
};

function appendCommonFields(form: URLSearchParams, payload: SignupRequest) {
  const { user } = payload;

  form.append("_method", "POST");
  form.append("data[User][username]", user.username);
  form.append("data[User][firstname]", user.firstName);
  form.append("data[User][lastname]", user.lastName);
  form.append("data[User][email]", user.email);
  form.append("data[User][password]", user.password);
  form.append("data[User][repeat_password]", user.confirmPassword);
  form.append("data[User][country_id]", user.countryId);
  form.append("data[User][state_id]", user.stateId ?? "");
  form.append("data[User][city_name]", user.cityName ?? "");
  form.append("data[User][sport_id]", user.sportId);
  form.append("data[User][zone_id]", user.zoneId);
  form.append("data[User][measure_id]", user.measureId);
  form.append("data[User][week_id]", user.weekStartId);
  form.append("data[User][privacy]", user.privacy);
  form.append("data[User][receive_notification]", user.notificationPreference);
  form.append("data[User][information_updates]", user.informationUpdates ? "1" : "0");
  form.append("data[User][enabled]", "1");
  form.append("data[User][paid_status]", "Y");
  form.append("continue", "Continue");
}

function appendBirthDate(form: URLSearchParams, dobPrefix: string, dob: BirthDate) {
  form.append(`${dobPrefix}[day]`, dob.day);
  form.append(`${dobPrefix}[month]`, dob.month);
  form.append(`${dobPrefix}[year]`, dob.year);
}

export async function POST(request: NextRequest) {
  let payload: SignupRequest;

  try {
    payload = (await request.json()) as SignupRequest;
  } catch {
    return NextResponse.json({ message: "Invalid payload." }, { status: 400 });
  }

  const config = ROLE_CONFIG[payload.role];
  if (!config) {
    return NextResponse.json({ message: "Unsupported role." }, { status: 400 });
  }

  try {
    const form = new URLSearchParams();
    appendCommonFields(form, payload);
    form.append("data[User][role_id]", config.roleId);

    switch (payload.role) {
      case "athlete": {
        const details = payload.athlete;
        if (!details) {
          throw new Error("Missing athlete details.");
        }
        form.append(config.genderField, details.gender);
        form.append(config.zipcodeField, details.zipcode ?? "");
        if (config.usertypeField) {
          form.append(config.usertypeField, details.usertypeId);
        }
        appendBirthDate(form, config.dobPrefix, details.dob);
        break;
      }
      case "coach": {
        const details = payload.coach;
        if (!details) {
          throw new Error("Missing coach details.");
        }
        form.append(config.genderField, details.gender);
        form.append(config.zipcodeField, details.zipcode ?? "");
        if (config.usertypeField) {
          form.append(config.usertypeField, details.usertypeId);
        }
        if (config.teamtypeField) {
          form.append(config.teamtypeField, details.teamType);
        }
        appendBirthDate(form, config.dobPrefix, details.dob);
        break;
      }
      case "team": {
        const details = payload.team;
        if (!details) {
          throw new Error("Missing team details.");
        }
        form.append(config.genderField, details.gender);
        form.append(config.zipcodeField, details.zipcode ?? "");
        if (config.usertypeField) {
          form.append(config.usertypeField, details.usertypeId);
        }
        appendBirthDate(form, config.dobPrefix, details.dob);
        break;
      }
      case "club": {
        const details = payload.club;
        if (!details) {
          throw new Error("Missing club details.");
        }
        form.append(config.genderField, details.gender);
        form.append(config.zipcodeField, details.zipcode ?? "");
        if (config.clubtypeField) {
          form.append(config.clubtypeField, details.clubTypeId);
        }
        appendBirthDate(form, config.dobPrefix, details.dob);
        break;
      }
      default:
        break;
    }

    const upstreamResponse = await fetch(REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Movesbook Next.js",
      },
      body: form.toString(),
      redirect: "manual",
    });

    if (upstreamResponse.status === 302) {
      return NextResponse.json({ ok: true });
    }

    const errorHtml = await upstreamResponse.text();
    return NextResponse.json(
      { ok: false, message: "Signup not completed. Review data and try again.", payload: errorHtml },
      { status: 400 },
    );
  } catch (_error) {
    console.error("Movesbook signup failed:", _error);
    return NextResponse.json(
      { message: "Unable to complete signup with Movesbook at this time." },
      { status: 502 },
    );
  }
}

