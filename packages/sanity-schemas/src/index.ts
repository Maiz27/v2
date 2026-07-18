import about from './about';
import experience from './experience';
import project from './project';
import projectKind from './projectKind';
import tool from './tool';
import metadata from './metadata';
import cv from './cv';

import { duration } from './objects/duration';
import { company } from './objects/company';
import { projectImage } from './objects/projectImage';
import { snippet, snippetGroup } from './objects/codeBlock';

import blockContent from './objects/blockContent';

export const schemaTypes = [
  about,
  project,
  projectKind,
  experience,
  metadata,
  tool,
  cv,
  duration,
  company,
  projectImage,
  blockContent,
  snippet,
  snippetGroup,
];
