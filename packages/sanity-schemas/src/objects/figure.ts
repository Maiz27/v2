import { defineArrayMember, defineField, defineType } from 'sanity';

import { subtitle } from '../studio';

/** One image inside a `figure`, with its own required alt text. */
export const figureImage = defineType({
  name: 'figureImage',
  title: 'Figure image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description:
        'A fresh capture of the real product. Use the hotspot to mark what must stay in view.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('Upload the screenshot.'),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description:
        'What the screenshot shows, for people who cannot see it. One plain sentence.',
      validation: (Rule) =>
        Rule.required().error('Describe what the screenshot shows, for screen readers.'),
    }),
  ],
  preview: {
    select: { title: 'alt', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'Missing alt text', media };
    },
  },
});

/**
 * A numbered case-study figure: one screenshot, or two side by side (phone
 * shots), with an optional mono caption. `column` sits in the prose measure;
 * `wide` spans the article column like a code listing.
 */
export const figure = defineType({
  name: 'figure',
  title: 'Figure',
  type: 'object',
  description:
    'Numbered screenshots inside the case study. Place it where the prose refers to it: figures are numbered in reading order, after the plate.',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [defineArrayMember({ type: 'figureImage' })],
      description:
        'One image, or two to show a pair side by side (use pairs for phone shots). Each image needs its own alt text.',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(2)
          .error('Add one image, or two for a side-by-side pair.'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description:
        'Optional. Shown in the mono strip under the figure, after its number ("Fig. 02").',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      description:
        'Column sits in the prose measure. Wide spans the article column, the same width as a code listing: use it for dense desktop screens.',
      options: {
        list: [
          { title: 'Column (prose width)', value: 'column' },
          { title: 'Wide (article width)', value: 'wide' },
        ],
        layout: 'radio',
      },
      initialValue: 'column',
    }),
  ],
  preview: {
    select: {
      caption: 'caption',
      alt: 'images.0.alt',
      media: 'images.0.image',
      second: 'images.1._key',
      layout: 'layout',
    },
    prepare({ caption, alt, media, second, layout }) {
      return {
        title: caption || alt || 'Figure',
        subtitle: subtitle(second ? 'Pair' : 'Single', layout === 'wide' ? 'wide' : 'column'),
        media,
      };
    },
  },
});
