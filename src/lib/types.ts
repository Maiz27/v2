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
  company: Company;
  location: string;
  duration: {
    from: string;
    to?: string;
  };
  description: string[];
  isPartTime?: boolean;
};

export type Company = {
  name: string;
  href: string;
  label: string;
  logo: string;
};

export type Tool = {
  name: string;
  icon: JSX.Element;
  href: string;
};
