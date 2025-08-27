import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'metadata',
  title: 'Page Metadata',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Page Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(170),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    prepare(selection: {title: string; slug: {current: string}}) {
      const {title, slug} = selection
      return {
        title: `${slug.current} - ${title}`,
      }
    },
  },
})
