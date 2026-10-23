import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projectKind',
  title: 'Project kind',
  type: 'document',
  description:
    'A filter on the projects archive. Each project picks one kind; a kind no project uses never appears on the site.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'What a project is, for the archive filter (e.g. "Web app", "Client site").',
      validation: (Rule) => Rule.required().error('Name the kind, e.g. "Web app".'),
    }),
  ],
  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
