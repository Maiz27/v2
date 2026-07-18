import {defineField, defineType} from 'sanity'

// Singleton document backing the /cv resume page. One document, fixed _id ("cv").
// Not meant to be a repeatable/"add new" type — the desk structure pins it.
export default defineType({
  name: 'cv',
  title: 'CV',
  type: 'document',
  fields: [
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'array',
      description:
        'Experience shown on the CV. Array order is the display order — each entry links an Experience document, which carries its own resume bullets (CV Bullets field) alongside title, company, location, duration and tech.',
      of: [{type: 'reference', to: {type: 'experience'}}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'projects',
      title: 'Selected Projects',
      type: 'array',
      description:
        'Projects shown on the CV. Array order is the display order — the CV pulls each project’s tech, dates and link from the project itself, plus its “CV blurb” field.',
      of: [{type: 'reference', to: {type: 'project'}}],
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'object',
      fields: [
        defineField({
          name: 'degree',
          title: 'Degree',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'place',
          title: 'Place',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'detail',
          title: 'Detail',
          type: 'string',
          description: 'e.g. "CGPA 3.59"',
        }),
      ],
    }),
    defineField({
      name: 'skillGroups',
      title: 'Skill Groups',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'skillGroup',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'string',
              description: 'Skills, " / " separated',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'items'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'CV'}
    },
  },
})
