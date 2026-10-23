import {defineType, defineField} from 'sanity'

export const projectImage = defineType({
  name: 'projectImage',
  title: 'Project Image',
  type: 'object',
  fields: [
    defineField({
      name: 'index',
      title: 'Order Index',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'What the image shows, for screen readers.',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'The plate shows the first non-empty caption among its images, so put the plate caption on the first image.',
    }),
  ],
  preview: {
    select: {
      index: 'index',
      caption: 'caption',
      media: 'image',
    },
    prepare(selection) {
      const {index, caption, media} = selection
      return {
        title: caption ? `Image (${index}): ${caption}` : `Image (${index})`,
        media: media,
      }
    },
  },
})
