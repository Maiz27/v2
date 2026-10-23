import { renderSiteCard } from '@/lib/og/card';

export const alt = 'Maged Faiz, Full Stack Developer: proof of work';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return renderSiteCard();
}
