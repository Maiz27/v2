/**
 * CV content, fetched from the Sanity `cv` singleton and mapped into the shape
 * the /cv page renders. The types below are the page's contract; `getCvData`
 * runs the GROQ query and derives the display-only bits (project `meta` and
 * `hrefLabel`) from the referenced project documents.
 *
 * Separator convention matches the rest of the site: " / " between stack items.
 */
import { fetchSanityData } from '@/lib/sanity/client';
import { getCv } from '@/lib/sanity/queries';
import type { GetCvResult } from '@/lib/sanity/types';

export type CvRole = {
  title: string;
  org: string;
  place: string;
  /** Human-readable range, e.g. "October 2022 to Present". */
  dates: string;
  bullets: string[];
  /** Stack, " / " separated. */
  tech: string;
};

export type CvProject = {
  name: string;
  /** Combined "stack / year, status" — used by the print layout only. */
  meta: string;
  /** "2026, ongoing" — screen header, next to the name. */
  dateLabel: string;
  /** "Flutter / Dart" — screen-only, its own line. */
  stack: string;
  href?: string;
  hrefLabel: string;
  blurb: string;
};

export type CvEducation = {
  degree: string;
  place: string;
  detail: string;
};

export type CvSkillGroup = {
  label: string;
  items: string;
};

export type CvData = {
  summary: string;
  experience: CvRole[];
  projects: CvProject[];
  education: CvEducation;
  skillGroups: CvSkillGroup[];
};

/** Strip the protocol and any trailing slash: "https://a.com/b/" -> "a.com/b". */
const bareUrl = (url: string): string =>
  url.replace(/^https?:\/\//, '').replace(/\/$/, '');

type RawCv = NonNullable<GetCvResult>;
type RawProject = NonNullable<RawCv['projects']>[number];
type RawExperience = NonNullable<RawCv['experience']>[number];

/** "October 2022" — long month + year, en-US, from a `YYYY-MM-DD` date string. */
const formatMonthYear = (dateStr: string): string => {
  // Use UTC to avoid timezone shifts for date-only strings
  const [year, month] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1));
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
};

/** "October 2022 to Present" / "January 2024 to June 2026" from a duration. */
const formatDates = (
  duration: { from?: string; to?: string } | null | undefined,
): string => {
  const from = duration?.from ? formatMonthYear(duration.from) : '';
  const to = duration?.to ? formatMonthYear(duration.to) : 'Present';
  return from ? `${from} to ${to}` : '';
};

const mapExperience = (exp: RawExperience): CvRole => ({
  title: exp?.title ?? '',
  org: exp?.company?.name ?? '',
  place: exp?.location ?? '',
  dates: formatDates(exp?.duration),
  bullets: exp?.cvBullets ?? [],
  tech: (exp?.tools ?? [])
    .map((t) => t?.name)
    .filter((name): name is string => Boolean(name))
    .join(' / '),
});

/** "Flutter / Dart" — tech stack only. */
const projectStack = (project: RawProject): string =>
  (project.tools ?? [])
    .map((t) => t?.name)
    .filter((name): name is string => Boolean(name))
    .join(' / ');

/** "2026, ongoing" — year with a status suffix (omitted when completed). */
const projectDateLabel = (project: RawProject): string => {
  const year = project.date ? new Date(project.date).getFullYear().toString() : '';
  const statusSuffix =
    project.status && project.status !== 'completed' ? `, ${project.status}` : '';
  return year ? `${year}${statusSuffix}` : '';
};

const mapProject = (project: RawProject): CvProject => {
  const link = project.href ?? project.source ?? '';
  const stack = projectStack(project);
  const dateLabel = projectDateLabel(project);
  return {
    name: project.title ?? '',
    meta: [stack, dateLabel].filter(Boolean).join(' / '),
    dateLabel,
    stack,
    href: link || undefined,
    hrefLabel: link ? bareUrl(link) : '',
    blurb: project.cvBlurb ?? '',
  };
};

/**
 * Fetch the CV singleton from Sanity and map it into `CvData`. `education` and
 * `skillGroups` map through unchanged; `experience` and `projects` are both
 * plain reference arrays on the `cv` doc (array order is display order) that
 * get reference-expanded here — `experience` pulls title/org/place/dates/tech
 * and resume bullets (`cvBullets`) from the linked `experience` doc, `projects`
 * pulls its display `meta`/`hrefLabel` plus `cvBlurb` from the linked project.
 */
export async function getCvData(): Promise<CvData> {
  const cv = await fetchSanityData<GetCvResult>(getCv);

  if (!cv) {
    throw new Error('No `cv` document found in Sanity.');
  }

  return {
    summary: cv.summary ?? '',
    experience: (cv.experience ?? []).map(mapExperience),
    projects: (cv.projects ?? []).map(mapProject),
    education: {
      degree: cv.education?.degree ?? '',
      place: cv.education?.place ?? '',
      detail: cv.education?.detail ?? '',
    },
    skillGroups: (cv.skillGroups ?? []).map((group) => ({
      label: group.label ?? '',
      items: group.items ?? '',
    })),
  };
}
