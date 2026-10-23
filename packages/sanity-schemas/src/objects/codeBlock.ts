import { defineArrayMember, defineField, defineType, type Path } from 'sanity';

import { nthIndexOf, subtitle, valueAtPath } from '../studio';

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

const ANNOTATION_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type SnippetValue = { code?: { code?: string } };
type AnnotationValue = { occurrence?: number };

/** The code of the snippet that holds the annotation at `path`. */
function snippetCode(document: unknown, path: Path | undefined): string | undefined {
  if (!path) return undefined;
  const at = path.lastIndexOf('annotations');
  if (at < 1) return undefined;
  const snippet = valueAtPath(document, path.slice(0, at)) as SnippetValue | undefined;
  return snippet?.code?.code;
}

const codeAnnotation = defineArrayMember({
  type: 'object',
  name: 'codeAnnotation',
  title: 'Code annotation',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      description:
        'A short lowercase slug, unique within this snippet (e.g. "guard-null"). Used as the note\'s anchor id and data-annot value.',
      validation: (Rule) => [
        Rule.required().error('Add a short ID such as "guard-null".'),
        Rule.regex(ANNOTATION_ID, { name: 'slug' }).warning(
          'Use lowercase letters, numbers and single hyphens, e.g. "guard-null".',
        ),
      ],
    }),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      description:
        'Decision (red): why this, what I rejected. Context (grey): what it does.',
      options: {
        list: [
          { title: 'Decision', value: 'decision' },
          { title: 'Context', value: 'context' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.required().error('Pick Decision or Context.'),
    }),
    defineField({
      name: 'match',
      title: 'Match',
      type: 'string',
      description:
        'The exact text in the code to highlight: a condition, an identifier or one line, not a block. Copy it from the code; it must appear there verbatim, spaces and quotes included.',
      validation: (Rule) => [
        Rule.required().error('Copy the text to highlight from the code.'),
        Rule.custom((match, context) => {
          if (typeof match !== 'string' || match === '') return true;
          const code = snippetCode(context.document, context.path);
          if (code === undefined) return true;
          const occurrence = (context.parent as AnnotationValue | undefined)?.occurrence ?? 1;
          if (nthIndexOf(code, match, 1) === -1) {
            return 'This text does not appear in the code, so the note will be skipped. Copy it from the code exactly.';
          }
          if (nthIndexOf(code, match, occurrence) === -1) {
            return `The text appears fewer than ${occurrence} times in the code. Lower Occurrence or pick a longer match.`;
          }
          return true;
        }).warning(),
      ],
    }),
    defineField({
      name: 'occurrence',
      title: 'Occurrence',
      type: 'number',
      description:
        'Only when the match appears more than once: 2 highlights the second time it appears, 3 the third. Leave empty for the first.',
      validation: (Rule) =>
        Rule.positive()
          .integer()
          .custom((value) => {
            if (value !== undefined && value < 1) return 'Must be a positive integer';
            return true;
          })
          .error('Use a whole number, 1 or more. Leave it empty for the first occurrence.'),
    }),
    defineField({
      name: 'body',
      title: 'Note',
      type: 'text',
      rows: 3,
      description: 'The note itself, a sentence or two. Shown in the margin and in the popover.',
      validation: (Rule) => Rule.required().error('Write the note.'),
    }),
  ],
  preview: {
    select: { id: 'id', kind: 'kind', match: 'match' },
    prepare({ id, kind, match }) {
      return {
        title: id || 'Untitled note',
        subtitle: subtitle(kind, match),
      };
    },
  },
});

export const snippet = defineType({
  name: 'snippet',
  title: 'Code snippet',
  type: 'object',
  description: 'One code listing, with optional annotations pinned to exact text in the code.',
  fields: [
    defineField({
      name: 'filename',
      title: 'Filename',
      type: 'string',
      description:
        'The file\'s path from the repository root, with forward slashes (e.g. src/lib/gist.ts). Shown in the listing header; tabs in Code tabs shorten it to the shortest ending that tells the files apart.',
      validation: (Rule) => [
        Rule.required().error('Add the file path, e.g. src/lib/gist.ts.'),
        Rule.custom((filename) => {
          if (typeof filename !== 'string') return true;
          return /\\/.test(filename) || /^\.?\//.test(filename)
            ? 'Write the path from the repository root with forward slashes, e.g. src/lib/gist.ts.'
            : true;
        }).warning(),
      ],
    }),
    defineField({
      name: 'source',
      title: 'Source URL',
      type: 'url',
      description:
        'Optional. The file in the public repository, ideally pinned to a commit so it keeps matching the excerpt. Shown as "view source". Leave empty for private code.',
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'code',
      description:
        'The excerpt as it appears in the file. Pick its language so the highlighting matches. Changing the code can break annotation matches: check the warnings below.',
      options: {
        language: 'typescript',
        languageAlternatives,
      },
      validation: (Rule) => Rule.required().error('Paste the code.'),
    }),
    defineField({
      name: 'annotations',
      title: 'Annotations',
      type: 'array',
      description:
        'Notes pinned to exact text in the code, numbered in list order. Annotate only where a token teaches something the prose does not pin down.',
      of: [codeAnnotation],
      validation: (Rule) =>
        Rule.custom((annotations: Array<{ id: string }> | undefined) => {
          if (!annotations) return true;
          const ids = annotations.map((a) => a.id);
          const unique = new Set(ids);
          return unique.size === ids.length
            ? true
            : 'Two annotations share an ID. Give each one its own ID within this snippet.';
        }),
    }),
  ],
  preview: {
    select: {
      filename: 'filename',
      language: 'code.language',
      annotations: 'annotations',
    },
    prepare({ filename, language, annotations }) {
      const notes = Array.isArray(annotations) ? annotations.length : 0;
      return {
        title: filename || 'Untitled snippet',
        subtitle: subtitle(language, notes ? `${notes} note${notes === 1 ? '' : 's'}` : ''),
      };
    },
  },
});

export const snippetGroup = defineType({
  name: 'snippetGroup',
  title: 'Code tabs',
  type: 'object',
  description: 'Several files shown as tabs in one listing.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional. Shown in the listing header above the tabs.',
    }),
    defineField({
      name: 'snippets',
      title: 'Files',
      type: 'array',
      description: 'One code snippet per tab, in tab order.',
      of: [{ type: 'snippet' }],
      validation: (Rule) => [
        Rule.required().error('Add the files to show as tabs.'),
        Rule.min(2).warning('One file reads better as a plain Code snippet. Add a second file or use Code snippet.'),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      snippets: 'snippets',
    },
    prepare({ title, snippets }) {
      const files: Array<{ filename?: string }> = Array.isArray(snippets) ? snippets : [];
      const names = files
        .map((file) => file?.filename?.split('/').pop())
        .filter(Boolean)
        .join(', ');
      return {
        title: title || 'Code tabs',
        subtitle: subtitle(`${files.length} file${files.length === 1 ? '' : 's'}`, names),
      };
    },
  },
});
