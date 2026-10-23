import {defineType, defineField} from 'sanity'

import {assetDimensions, subtitle} from '../studio'

/** One image in a project's plate gallery (`project.images[]`). */
export const projectImage = defineType({
  name: 'projectImage',
  title: 'Plate image',
  type: 'object',
  fields: [
    defineField({
      name: 'index',
      title: 'Order index',
      type: 'number',
      description:
        'A label for this list only: the site follows the list order, not this number. Use the image\'s position, 1 for the first.',
      validation: (Rule) => Rule.required().error('Add the image\'s position, 1 for the first.'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description:
        'A fresh capture of the real product. Position 1 is the main screen (landscape), 2 the companion (usually a portrait phone shot), 3 and 4 the landscape details.',
      validation: (Rule) => Rule.required().error('Upload the screenshot.'),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description:
        'What the screenshot shows, for people who cannot see it. One plain sentence, e.g. "The Stalemates board mid-game with the move list open."',
      validation: (Rule) =>
        Rule.custom((alt) =>
          typeof alt === 'string' && alt.trim() !== ''
            ? true
            : 'Add alt text. Without it the site reads out "<title> screenshot", which says nothing about the image.',
        ).warning(),
    }),
  ],
  preview: {
    select: {
      index: 'index',
      alt: 'alt',
      media: 'image',
      ref: 'image.asset._ref',
    },
    prepare({index, alt, media, ref}) {
      const size = assetDimensions(ref)
      const shape = size ? (size.height > size.width ? 'portrait' : 'landscape') : ''
      return {
        title: alt || 'Untitled image',
        subtitle: subtitle(
          typeof index === 'number' ? `Image ${index}` : '',
          shape,
          alt ? '' : 'missing alt text',
        ),
        media,
      }
    },
  },
})
