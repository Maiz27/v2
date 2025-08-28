import { defineField, defineType } from 'sanity';

const languageAlternatives = [
  { title: 'Typescript', value: 'typescript' },
  { title: 'Javascript', value: 'javascript' },
  { title: 'HTML', value: 'html' },
  { title: 'CSS', value: 'css' },
  { title: 'Java', value: 'java' },
  { title: 'Kotlin', value: 'kotlin' },
  { title: 'Dart', value: 'dart' },
  { title: 'Jsx', value: 'jsx' },
  { title: 'Tsx', value: 'tsx' },
  { title: 'GROQ', value: 'groq' },
  { title: 'Yaml', value: 'yaml' },
];

export const snippet = defineType({
  name: 'snippet',
  title: 'Code Snippet',
  type: 'object',
  fields: [
    defineField({
      name: 'filename',
      title: 'Filename',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source URL',
      type: 'url',
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'code',
      options: {
        language: 'typescript',
        languageAlternatives,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const snippetGroup = defineType({
  name: 'snippetGroup',
  title: 'Snippet Group',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'snippets',
      title: 'Snippets',
      type: 'array',
      of: [{ type: 'snippet' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
