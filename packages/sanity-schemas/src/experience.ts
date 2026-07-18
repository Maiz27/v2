import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'duration',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'company',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tools',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tool' } }],
    }),
    defineField({
      name: 'cvBullets',
      title: 'CV Bullets',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Resume-voice accomplishment bullets for this role, rendered on /cv (mirrors project.cvBlurb).',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'company.logo',
    },
  },
});
