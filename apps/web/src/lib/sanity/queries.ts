import groq from 'groq';

export const getAboutMe = groq`*[_type == "aboutMe"]{
  name,
  bio,
  "imageUrl": image.asset->url,
  heroLabel,
  heroHeadline,
  heroDescription,
  currentStatusLabel,
  currentStatus,
  email,
  github,
  githubLabel,
  linkedin,
  linkedinLabel
}[0]`;

export const getMainImage = groq`*[_type == "aboutMe"]{
  "imageUrl": image.asset->url,
}[0]`;

export const getExperiences = groq`*[_type == "experience"]{
  title,
  location,
  partTime,
  duration,
  company,
  description,
  "logo": company.logo.asset->url,
  tools[]->{
    name,
    href,
    iconSource,
    iconName,
    "iconSvg": iconSvg.asset->url
  },
} | order(duration.from desc)`;

export const getFeaturedProjects = groq`*[_type == "project" && featured == true]{
  title,
  slug,
  featured,
  date,
  status,
  description,
  href,
  source,
  tools[]->{
   name,
    href,
    iconSource,
    iconName,
    "iconSvg": iconSvg.asset->url
  },
   "mainImage": images[0].image.asset->url
}[0..3] | order(date desc)`;

export const getProjectBySlug = groq`*[_type == "project" && slug.current == $slug]{
  title,
  slug,
  date,
  status,
  description,
  href,
  source,
  tools[]->{
    name,
    href,
    iconSource,
    iconName,
    "iconSvg": iconSvg.asset->url
  },
  "images": images[].image.asset->url,
  contentTitle,
  content,
}[0]`;

export const getProjectMetadata = groq`*[_type == "project" && slug.current == $slug]{
  slug,
  description,
  "images": images[0].image.asset->url,
  contentTitle,
}[0]`;

export const getProjectsForSEO = groq`*[_type == "project"]{
  "slug": slug.current,
  "publishedAt": date,
}`;

export const getMetadata = groq`*[_type == "metadata" && slug.current == $slug]{
  "slug": slug.current,
  title,
  description,
}[0]`;

export const getProjects = groq`*[_type == "project"]{
  title,
  slug,
  featured,
  date,
  status,
  kind,
  description,
  href,
  source,
  tools[]->{
    name,
    href,
    iconSource,
    iconName,
    "iconSvg": iconSvg.asset->url
  },
   "mainImage": images[0].image.asset->url
} | order(date desc)`;

export const getTools = groq`*[_type == "tool"]{
  name,
  href,
  iconSource,
  iconName,
  "iconSvg": iconSvg.asset->url
}`;
