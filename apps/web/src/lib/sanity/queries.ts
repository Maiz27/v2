export const getAboutMe = `*[_type == "aboutMe"]{
  name,
  bio,
  "imageUrl": image.asset->url,
  stats
}[0]`;

export const getMainImage = `*[_type == "aboutMe"]{
  "imageUrl": image.asset->url,
}[0]`;

export const getExperiences = `*[_type == "experience"]{
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

export const getFeaturedProjects = `*[_type == "project" && featured == true]{
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
}[0..1] | order(date desc)`;

export const getProjectBySlug = `*[_type == "project" && slug.current == $slug]{
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

export const getProjectMetadata = `*[_type == "project" && slug.current == $slug]{
  slug,
  description,
  "images": images[0].image.asset->url,
  contentTitle,
}[0]`;

export const getProjectsForSEO = `*[_type == "project"]{
  "slug": slug.current,
  "publishedAt": date,
}`;

export const getFaqs = `*[_type == "faq"]{
  index,
  question,
  answer,
} | order(index asc)`;

export const getMetadata = `*[_type == "metadata" && slug.current == $slug]{
  "slug": slug.current,
  title,
  description,
}[0]`;

export const getProjects = `*[_type == "project"]{
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
} | order(date desc)`;

export const getTools = `*[_type == "tool"]{
  name,
  href,
  iconSource,
  iconName,
  "iconSvg": iconSvg.asset->url
}`;
