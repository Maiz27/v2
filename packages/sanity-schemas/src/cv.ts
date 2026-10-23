import {defineArrayMember, defineField, defineType} from 'sanity'

import {excludeChosen} from './studio'

// Singleton document backing the /cv resume page. One document, fixed _id ("cv").
// Not meant to be a repeatable/"add new" type — the desk structure pins it.
export default defineType({
  name: 'cv',
  title: 'CV',
  type: 'document',
  description:
    'The /cv page. It picks and orders roles and projects; their bullets, blurbs, dates and stacks are edited on the Experience and Project documents themselves.',
  fields: [
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 5,
      description: 'The opening paragraph under the CV header.',
      validation: (Rule) => Rule.required().error('Write the summary paragraph.'),
    }),
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'array',
      description:
        'Roles shown on the CV, in display order. Each links an Experience document, which carries its own CV bullets, title, company, location, dates and tech.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: {type: 'experience'},
          options: {filter: excludeChosen},
        }),
      ],
      validation: (Rule) => [
        Rule.required().min(1).error('Add at least one role.'),
        Rule.unique().warning('A role appears twice. Remove the repeat.'),
      ],
    }),
    defineField({
      name: 'projects',
      title: 'Selected projects',
      type: 'array',
      description:
        'Projects shown on the CV, in display order. The CV takes each project\'s tech, date and live URL from the project itself, plus its CV blurb (Project, CV tab).',
      of: [
        defineArrayMember({
          type: 'reference',
          to: {type: 'project'},
          options: {filter: excludeChosen},
        }),
      ],
      validation: (Rule) => Rule.unique().warning('A project appears twice. Remove the repeat.'),
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
          validation: (Rule) => Rule.required().error('Add the degree.'),
        }),
        defineField({
          name: 'place',
          title: 'Place',
          type: 'string',
          description: 'The university, and its city if useful.',
          validation: (Rule) => Rule.required().error('Add where you studied.'),
        }),
        defineField({
          name: 'detail',
          title: 'Detail',
          type: 'string',
          description: 'Optional, e.g. "CGPA 3.59".',
        }),
      ],
    }),
    defineField({
      name: 'skillGroups',
      title: 'Skill groups',
      type: 'array',
      description: 'The skills section, one row per group, in display order.',
      of: [
        {
          type: 'object',
          name: 'skillGroup',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'The group name, e.g. "Frontend".',
              validation: (Rule) => Rule.required().error('Name the group.'),
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'string',
              description: 'The skills on one line, separated by " / ".',
              validation: (Rule) => Rule.required().error('List the skills, separated by " / ".'),
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
    select: {summary: 'summary'},
    prepare({summary}) {
      return {title: 'CV', subtitle: summary}
    },
  },
})
