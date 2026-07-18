import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutMe',
  title: 'About Me',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroLabel',
      title: 'Hero Label',
      type: 'string',
      description: 'Small label above hero headline (e.g. "Proof of work")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main hero headline (e.g. "The work, written down.")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 4,
      description: 'Paragraph below hero headline',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'currentStatusLabel',
      title: 'Current Status Label',
      type: 'string',
      description: 'e.g. "2026 · Currently"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'currentStatus',
      title: 'Current Status',
      type: 'text',
      rows: 3,
      description: 'What you\'re currently working on',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
