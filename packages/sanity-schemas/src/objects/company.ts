import {defineType, defineField} from 'sanity'

export const company = defineType({
  name: 'company',
  title: 'Job company',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Company name',
      type: 'string',
      description: 'Shown after the job title on the CV.',
      validation: (Rule) => Rule.required().error('Add the company name.'),
    }),
    defineField({
      name: 'label',
      title: 'Company type',
      type: 'string',
      description: "Optional, e.g. 'Agency', 'Startup', 'Enterprise'. Shown before the location on the CV.",
    }),
    defineField({
      name: 'href',
      title: 'Company website',
      type: 'url',
      description: 'Optional. Makes the company name a link on the CV.',
    }),
    defineField({
      name: 'logo',
      title: 'Company logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description:
        'Editor-only: labels the role in the Studio list and is not shown on the site. A square PNG works best.',
    }),
  ],
})
