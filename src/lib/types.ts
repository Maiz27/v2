import { ReactNode } from 'react';
import { TargetAndTransition } from 'framer-motion';

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
  slug: { current: string };
  featured: boolean;
  date: string;
  status: ProjectStatus;
  description: string;
  mainImage: string;
  images: string[];
  tech: ProjectTech[];
  href: string | null;
  source: string | null;
  contentTitle: string;
  content: RichText;
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
  tech?: ProjectTech[];
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
  icon: JSX.Element | string;
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

export type Code = {
  code: string;
  language: string;
  filename: string;
};

export type Faq = {
  index: number;
  question: string;
  answer: string;
};

export type BaseAnimationWrapperProps = {
  children: ReactNode;
  threshold?: number;
  delay?: number;
  className?: string;
  tag?: MotionTag;
  initial?: TargetAndTransition;
  whileInView?: TargetAndTransition;
  once?: boolean;
  duration?: number;
  [x: string]: any;
};

export type TOAST_STATUS = 'success' | 'error' | 'info' | 'warning';

export type MotionTag =
  | 'main'
  | 'div'
  | 'section'
  | 'article'
  | 'ul'
  | 'a'
  | 'form'
  | 'span'
  | 'aside'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'button';
