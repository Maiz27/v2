import {defineType, defineField} from 'sanity'

export const company = defineType({
  name: 'company',
  title: 'Job Company',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Company Type',
      type: 'string',
      description: "Company Type, e.g. 'Agency', 'Startup', 'Enterprise' etc.",
    }),
    defineField({
      name: 'href',
      title: 'Company Website',
      type: 'url',
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Company Logo, preferably a png image',
    }),
  ],
})
