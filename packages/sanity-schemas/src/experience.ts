import { defineArrayMember, defineField, defineType } from 'sanity';

import { excludeChosen, subtitle, yearOf } from './studio';

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  description:
    'One role. It reaches the site only when the CV document lists it under Experience.',
  fields: [
    defineField({
      name: 'title',
      title: 'Job title',
      type: 'string',
      description: 'As it should read on the CV, e.g. "CTO".',
      validation: (Rule) => Rule.required().error('Add the job title.'),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City and country, or "Remote". Shown after the company type on the CV.',
      validation: (Rule) =>
        Rule.required()
          .max(200)
          .error('Add the location in 200 characters or fewer, e.g. "Juba, South Sudan".'),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'duration',
      description: 'Shown on the CV as "October 2022 to Present".',
      validation: (Rule) => Rule.required().error('Add when the role started.'),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'company',
      validation: (Rule) => Rule.required().error('Add the company.'),
    }),
    defineField({
      name: 'tools',
      title: 'Tech stack',
      type: 'array',
      description: 'In the order to show them, as one line under the bullets on the CV.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: { type: 'tool' },
          options: { filter: excludeChosen },
        }),
      ],
      validation: (Rule) => Rule.unique().warning('A tool appears twice. Remove the repeat.'),
    }),
    defineField({
      name: 'cvBullets',
      title: 'CV bullets',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Resume-voice accomplishments for this role, one per bullet, in display order. Rendered on /cv (the project counterpart is the project\'s CV blurb).',
    }),
  ],
  orderings: [
    {
      title: 'Start date, newest first',
      name: 'startDesc',
      by: [{ field: 'duration.from', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      company: 'company.name',
      from: 'duration.from',
      to: 'duration.to',
      media: 'company.logo',
    },
    prepare({ title, company, from, to, media }) {
      const years = from ? `${yearOf(from)} to ${to ? yearOf(to) : 'now'}` : '';
      return {
        title: title || 'Untitled role',
        subtitle: subtitle(company, years),
        media,
      };
    },
  },
});
