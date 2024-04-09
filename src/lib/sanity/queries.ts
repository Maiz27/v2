export const getAboutMe = `*[_type == "about"]{
  name,
  bio,
  "imageUrl": image.asset->url,
  stats
}[0]`;

export const getExperiences = `*[_type == "experience"]{
  title,
  location,
  partTime,
  duration,
  company,
  description,
  "logo": company.logo.asset->url
} | order(duration.from desc)`;

export const getFeaturedProjects = `*[_type == "project" && featured == true]{
  title,
  featured,
  status,
  description,
  href,
  source,
  tech[]->{
    name,
  },
  "images": images[].image.asset->url
}`;

export const getProjects = `*[_type == "project"]{
  title,
  featured,
  status,
  description,
  href,
  source,
  tech[]->{
    name,
  },
  "images": images[].image.asset->url
} | order(featured desc)`;
