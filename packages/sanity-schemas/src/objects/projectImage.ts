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
  ],
  preview: {
    select: {
      index: 'index',
      media: 'image',
    },
    prepare(selection) {
      const {index, media} = selection
      return {
        title: `Image (${index})`,
        media: media,
      }
    },
  },
})
