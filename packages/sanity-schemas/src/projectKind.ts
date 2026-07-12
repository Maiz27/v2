import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projectKind',
  title: 'Project Kind',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'What a project is, for the archive filter (e.g. "Web app", "Client site").',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
