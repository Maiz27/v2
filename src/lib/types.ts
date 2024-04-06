export type Project = {
  title: string;
  description: string;
  tech: string[];
  status: 'completed' | 'ongoing' | 'paused';
  image: string;
  href: string | null;
  source: string | null;
};
