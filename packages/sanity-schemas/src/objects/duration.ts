import {defineType, defineField} from 'sanity'

export const duration = defineType({
  name: 'duration',
  title: 'Job duration',
  type: 'object',
  options: {columns: 2},
  fields: [
    defineField({
      name: 'from',
      title: 'From',
      type: 'date',
      description: 'The CV shows the month and year.',
      validation: (Rule) => Rule.required().error('Add the start date.'),
    }),
    defineField({
      name: 'to',
      title: 'To',
      type: 'date',
      description: 'Leave empty while the role is current: the CV shows "Present".',
      validation: (Rule) =>
        Rule.custom((to, context) => {
          const from = (context.parent as {from?: string} | undefined)?.from
          return to && from && to < from ? 'The end date is before the start date.' : true
        }).warning(),
    }),
  ],
})
