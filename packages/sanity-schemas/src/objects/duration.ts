import {defineType, defineField} from 'sanity'

export const duration = defineType({
  name: 'duration',
  title: 'Job Duration',
  type: 'object',
  fields: [
    defineField({
      name: 'from',
      title: 'From Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'to',
      title: 'To Date',
      type: 'date',
      description: 'Leave empty if still working here',
    }),
  ],
})
