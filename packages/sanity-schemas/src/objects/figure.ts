import { defineArrayMember, defineField, defineType } from 'sanity';

/** One image inside a `figure`, with its own required alt text. */
export const figureImage = defineType({
  name: 'figureImage',
  title: 'Figure Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'What the screenshot shows, for screen readers.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'alt', media: 'image' },
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
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [defineArrayMember({ type: 'figureImage' })],
      description: 'One image, or two to show a pair side by side.',
      validation: (Rule) => Rule.required().min(1).max(2),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
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
    },
    prepare({ caption, alt, media }) {
      return {
        title: caption || alt || 'Figure',
        media,
      };
    },
  },
});
