import { defineField, defineType } from 'sanity';

const languageAlternatives = [
  { title: 'Typescript', value: 'typescript' },
  { title: 'Javascript', value: 'javascript' },
  { title: 'HTML', value: 'html' },
  { title: 'CSS', value: 'css' },
  { title: 'SCSS', value: 'scss' },
  { title: 'JSON', value: 'json' },
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
    defineField({
      name: 'annotations',
      title: 'Annotations',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'codeAnnotation',
          title: 'Code Annotation',
          fields: [
            defineField({
              name: 'id',
              title: 'ID',
              type: 'string',
              description:
                'Short slug-ish string, unique within this snippet. Used as the anchor id and the data-annot value.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'kind',
              title: 'Kind',
              type: 'string',
              options: {
                list: [
                  { title: 'Decision', value: 'decision' },
                  { title: 'Context', value: 'context' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'match',
              title: 'Match',
              type: 'string',
              description:
                "Exact substring of the code to anchor to. Must appear verbatim in the snippet's code.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'occurrence',
              title: 'Occurrence',
              type: 'number',
              description:
                '1-based; which occurrence of `match` to use if it appears more than once. Defaults to 1.',
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
              description: 'The note itself.',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'id', subtitle: 'kind' },
          },
        },
      ],
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
