import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faq',
  title: 'Frequently Asked Question',
  type: 'document',
  fields: [
    defineField({
      name: 'index',
      title: 'Index',
      type: 'number',
      validation: (Rule) => Rule.required(),
      description: 'Order of the questions.',
    }),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'question',
      index: 'index',
    },
    prepare(selection) {
      const {title, index} = selection
      return {
        title: `${index}. ${title}`,
      }
    },
  },
})
