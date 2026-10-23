import groq from 'groq';

export const getAboutMe = groq`*[_type == "aboutMe"]{
  name,
  role,
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
  experience[]->{
    title,
    location,
    duration,
    company{name, label, href},
    tools[]->{name},
    cvBullets
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
  "images": images[]{
    _key,
    alt,
    caption,
    "url": image.asset->url,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    "lqip": image.asset->metadata.lqip
  },
  contentTitle,
  content[]{
    ...,
    _type == "image" => {
      "altText": asset->altText
    },
    _type == "figure" => {
      caption,
      layout,
      images[]{
        _key,
        alt,
        "url": image.asset->url,
        "width": image.asset->metadata.dimensions.width,
        "height": image.asset->metadata.dimensions.height,
        "lqip": image.asset->metadata.lqip
      }
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
