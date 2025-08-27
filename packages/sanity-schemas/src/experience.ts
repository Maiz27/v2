import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'partTime',
      title: 'Part time',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'duration',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'company',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tech',
      title: 'Tech Stack',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tool'}}],
    }),
    defineField({
      name: 'description',
      title: 'Job description',
      type: 'description',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'company.logo',
    },
  },
})
