import about from './about';
import experience from './experience';
import project from './project';
import tool from './tool';
import metadata from './metadata';

import { duration } from './objects/duration';
import { company } from './objects/company';
import { jobDescription } from './objects/jobDescription';
import { projectImage } from './objects/projectImage';
import { snippet, snippetGroup } from './objects/codeBlock';

import blockContent from './objects/blockContent';

export const schemaTypes = [
  about,
  project,
  experience,
  metadata,
  tool,
  duration,
  company,
  jobDescription,
  projectImage,
  blockContent,
  snippet,
  snippetGroup,
];
