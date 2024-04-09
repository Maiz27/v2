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
export type ProjectTech = {
  name: string;
};

export type Project = {
  title: string;
  featured: boolean;
  status: ProjectStatus;
  description: string;
  images: string[];
  tech: ProjectTech[];
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

export type Faq = {
  index: number;
  question: string;
  answer: string;
};
