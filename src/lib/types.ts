export type AboutMe = {
  name: string;
  bio: string;
  imageUrl: string;
  stats: AboutMeStats;
};

export type AboutMeStats = {
  clients: number;
  experience: number;
  projects: number;
  contributions: number;
};

export type ProjectStatus = 'completed' | 'ongoing' | 'paused';

export type Project = {
  title: string;
  description: string;
  tech: string[];
  status: ProjectStatus;
  image: string;
  href: string | null;
  source: string | null;
};

export type Experience = {
  title: string;
  location: string;
  partTime: boolean;
  duration: {
    from: string;
    to?: string;
  };
  company: Company;
  description: RichText;
};

export type Company = {
  name: string;
  href: string;
  label: string;
  logo: Object;
};

export type Tool = {
  name: string;
  icon: JSX.Element;
  href: string;
};

export type RichText = Array<{
  _type: string;
  style: string;
  children: Array<{
    _type: string;
    text: string;
  }>;
}>;
