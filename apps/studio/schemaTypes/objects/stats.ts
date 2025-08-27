import {defineType, defineField} from 'sanity'

export const stats = defineType({
  name: 'stats',
  title: 'Portfolio Stats',
  type: 'object',
  fields: [
    defineField({
      name: 'clients',
      title: 'Clients',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contributions',
      title: 'Contributions',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
