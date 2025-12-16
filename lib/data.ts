import type { FamilyReadingYear } from "./types";
import { graceReadingYear } from "./member-data/grace";
import { alexaReadingYear } from "./member-data/alexa";
import { momReadingYear } from "./member-data/mom";
import { dadReadingYear } from "./member-data/dad";

export const familyReadingYear2025: FamilyReadingYear = {
  year: 2025,
  familyName: "Wnorowski",
  members: [
    graceReadingYear,
    alexaReadingYear,
    momReadingYear,
    dadReadingYear,
  ],
};
