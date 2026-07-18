import groq from 'groq';

export const getAboutMe = groq`*[_type == "aboutMe"]{
  name,
  bio,
  "imageUrl": image.asset->url,
  heroLabel,
  heroHeadline,
  heroDescription,
  currentStatusLabel,
  currentStatus
}[0]`;

export const getCv = groq`*[_id in ["cv", "drafts.cv"]] | order(_id asc)[0]{
  summary,
  experience[]{
    bullets,
    experience->{
      title,
      location,
      duration,
      company{name, label, href},
      tools[]->{name}
    }
  },
  projects[]->{
    title,
    tools[]->{name},
    date,
    status,
    href,
    source,
    cvBlurb
  },
  education,
  skillGroups
}`;

export const getFeaturedProjects = groq`*[_type == "project" && featured == true] | order(date desc)[0..3]{
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
}`;

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
  content[]{
    ...,
    _type == "image" => {
      "altText": asset->altText
    }
  },
}[0]`;

export const getProjectMetadata = groq`*[_type == "project" && slug.current == $slug]{
  title,
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
  "kind": kind->title,
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
