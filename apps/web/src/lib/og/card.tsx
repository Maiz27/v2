import { ImageResponse } from 'next/og';
import { OWNER } from '@/lib/site';
import { loadOgFonts } from './fonts';

/**
 * The shared Open Graph renderer: one proof sheet layout in the Negative
 * theme, used by the site default card and every case-study card.
 *
 * Satori (under ImageResponse) does not parse oklch(), so the theme tokens
 * from globals.css are restated here as their closest sRGB hex values
 * (converted via OKLab, rounded per channel).
 */
const COLOR = {
  paper: '#090e12', // --color-paper        oklch(16% 0.012 240)
  sunken: '#04080b', // --color-paper-sunken oklch(13% 0.012 240)
  ink: '#e6ecef', // --color-ink          oklch(94% 0.008 220)
  inkSoft: '#b3bcc0', // --color-ink-soft     oklch(79% 0.012 220)
  inkFaint: '#919a9d', // --color-ink-faint    oklch(68% 0.012 220)
  rule: '#32393d', // --color-rule         oklch(34% 0.012 235)
  mark: '#6ac5e8', // --color-mark         oklch(78% 0.1 225)
} as const;

const FONT = {
  display: 'STIX Two Text',
  body: 'IBM Plex Sans',
  mono: 'IBM Plex Mono',
} as const;

const WIDTH = 1200;
const HEIGHT = 630;
/** The thumbnail column: a little over a quarter of the sheet's measure. */
const PLATE_WIDTH = 336;

/** Sanity image CDN params for the thumbnail: bounded width, no upscaling. */
export const thumbnailUrl = (url: string): string => {
  const out = new URL(url);
  out.searchParams.set('w', '800');
  out.searchParams.set('fit', 'max');
  out.searchParams.set('auto', 'format');
  return out.toString();
};

/**
 * The heading's font size, stepped down by length so a long case-study title
 * still fits its three-line clamp. The thumbnail column narrows the measure,
 * so the steps come sooner when there is one.
 */
export const headingSize = (text: string, hasThumbnail: boolean): number => {
  const n = text.length;
  if (hasThumbnail) {
    if (n <= 32) return 68;
    if (n <= 52) return 60;
    return 52;
  }
  if (n <= 40) return 76;
  if (n <= 70) return 66;
  return 58;
};

/**
 * Fetch the gallery image as a data URL Satori can decode. Satori reads PNG
 * and JPEG but not WebP/AVIF, so the Accept header keeps Sanity's
 * `auto=format` negotiation on those two (a WebP original comes back as
 * JPEG). Any failure drops the thumbnail instead of failing the card.
 */
const loadThumbnail = async (url: string): Promise<string | null> => {
  try {
    const res = await fetch(thumbnailUrl(url), {
      headers: { Accept: 'image/png,image/jpeg' },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const type = res.headers.get('content-type')?.split(';')[0].trim();
    if (type !== 'image/png' && type !== 'image/jpeg') return null;
    const data = Buffer.from(await res.arrayBuffer()).toString('base64');
    return `data:${type};base64,${data}`;
  } catch {
    return null;
  }
};

const eyebrowStyle = {
  fontFamily: FONT.mono,
  fontSize: 17,
  letterSpacing: 3.4,
  textTransform: 'uppercase',
  color: COLOR.mark,
} as const;

/** Mono footer under a full-width hairline: who, and where. */
const Footer = ({ left, right }: { left: string; right: string }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderTop: `1px solid ${COLOR.rule}`,
      paddingTop: 22,
      fontFamily: FONT.mono,
      fontSize: 16,
      letterSpacing: 1.6,
    }}
  >
    <span style={{ color: COLOR.ink, textTransform: 'uppercase' }}>
      {left}
    </span>
    <span style={{ color: COLOR.inkFaint }}>{right}</span>
  </div>
);

const Sheet = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: WIDTH,
      height: HEIGHT,
      display: 'flex',
      flexDirection: 'column',
      padding: '58px 72px 48px',
      backgroundColor: COLOR.paper,
      color: COLOR.ink,
    }}
  >
    {children}
  </div>
);

const respond = async (element: React.ReactElement) =>
  new ImageResponse(element, {
    width: WIDTH,
    height: HEIGHT,
    fonts: await loadOgFonts(),
  });

/** The site default: the masthead name, role and the "Proof of work" line. */
export const renderSiteCard = () =>
  respond(
    <Sheet>
      <div style={eyebrowStyle}>Proof of work</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          flexGrow: 1,
          paddingBottom: 44,
        }}
      >
        <div
          style={{
            fontFamily: FONT.display,
            fontWeight: 700,
            fontSize: 148,
            lineHeight: 0.96,
            letterSpacing: -3,
          }}
        >
          {OWNER.name}
        </div>
        <div
          style={{
            marginTop: 26,
            fontFamily: FONT.body,
            fontSize: 30,
            color: COLOR.inkSoft,
          }}
        >
          {OWNER.role}
        </div>
      </div>
      <Footer left={OWNER.siteLabel} right={OWNER.githubLabel} />
    </Sheet>
  );

type CaseStudyCard = {
  /** The project name, set in the eyebrow. */
  title: string;
  /** The case-study headline (contentTitle, falling back to title). */
  heading: string;
  description?: string | null;
  /** Route path, e.g. '/projects/follow-sync', shown in the footer. */
  path: string;
  /** First gallery image URL (Sanity CDN), if the project has one. */
  imageUrl?: string | null;
};

export const renderCaseStudyCard = async ({
  title,
  heading,
  description,
  path,
  imageUrl,
}: CaseStudyCard) => {
  const thumbnail = imageUrl ? await loadThumbnail(imageUrl) : null;
  const size = headingSize(heading, Boolean(thumbnail));

  return respond(
    <Sheet>
      {/* Eyebrow row: the project over the text column, the plate label over
          the plate, so the heading and the frame share a top edge. */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 56 }}>
        <div style={{ ...eyebrowStyle, flexGrow: 1, flexBasis: 0 }}>
          {`Case study · ${title}`}
        </div>
        {thumbnail ? (
          <div
            style={{
              width: PLATE_WIDTH,
              fontFamily: FONT.mono,
              fontSize: 13,
              letterSpacing: 2.6,
              textTransform: 'uppercase',
              color: COLOR.inkFaint,
            }}
          >
            Plate 01
          </div>
        ) : null}
      </div>
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          marginTop: 40,
          marginBottom: 44,
          gap: 56,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            flexBasis: 0,
          }}
        >
          <div
            style={{
              display: 'block',
              lineClamp: 3,
              fontFamily: FONT.display,
              fontWeight: 700,
              fontSize: size,
              lineHeight: 1.06,
              letterSpacing: -size * 0.012,
            }}
          >
            {heading}
          </div>
          {description ? (
            <div
              style={{
                display: 'block',
                lineClamp: 2,
                marginTop: 'auto',
                fontFamily: FONT.body,
                fontSize: 23,
                lineHeight: 1.5,
                color: COLOR.inkSoft,
              }}
            >
              {description}
            </div>
          ) : null}
        </div>
        {thumbnail ? (
          <div
            style={{
              display: 'flex',
              width: PLATE_WIDTH,
              border: `1px solid ${COLOR.rule}`,
              backgroundColor: COLOR.sunken,
              overflow: 'hidden',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img>, next/image does not apply here */}
            <img
              src={thumbnail}
              alt=''
              width={PLATE_WIDTH}
              height={PLATE_WIDTH}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'left top',
              }}
            />
          </div>
        ) : null}
      </div>
      <Footer left={OWNER.name} right={`${OWNER.siteLabel}${path}`} />
    </Sheet>
  );
};
