import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutMe',
  title: 'About Me',
  type: 'document',
  description:
    'Who you are, and the words of the home page hero and About section. There is one About Me document; the site falls back to built-in copy for an empty optional field.',
  groups: [
    {name: 'identity', title: 'Identity', default: true},
    {name: 'hero', title: 'Home hero'},
    {name: 'about', title: 'About section'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'identity',
      description:
        'Not shown on the site today: the masthead, CV and share cards use the name set in the site code. Keep the two the same.',
      validation: (Rule) => Rule.required().error('Add your name.'),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      group: 'identity',
      description:
        'Professional identity line shown in the masthead and the CV header (e.g. "Full Stack Developer"). Code falls back to a built-in default until this is set.',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'blockContent',
      group: 'about',
      description: 'The paragraphs of the About section on the home page.',
      validation: (Rule) => Rule.required().error('Write the bio shown in the About section.'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'identity',
      description: 'A portrait. Not shown on the site today; use the hotspot to mark your face.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Upload a portrait.'),
    }),
    defineField({
      name: 'heroLabel',
      title: 'Hero label',
      type: 'string',
      group: 'hero',
      description: 'Small label above the hero headline (e.g. "Proof of work").',
      validation: (Rule) => Rule.required().error('Add the small label above the headline.'),
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero headline',
      type: 'string',
      group: 'hero',
      description: 'The main hero headline (e.g. "The work, written down.").',
      validation: (Rule) => Rule.required().error('Add the hero headline.'),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero description',
      type: 'text',
      group: 'hero',
      rows: 4,
      description: 'The paragraph below the hero headline.',
      validation: (Rule) => Rule.required().error('Add the paragraph below the headline.'),
    }),
    defineField({
      name: 'currentStatusLabel',
      title: 'Current status label',
      type: 'string',
      group: 'about',
      description: 'The small label under the bio, e.g. "2026 · Currently".',
      validation: (Rule) => Rule.required().error('Add the label, e.g. "2026 · Currently".'),
    }),
    defineField({
      name: 'currentStatus',
      title: 'Current status',
      type: 'text',
      group: 'about',
      rows: 3,
      description: "What you're working on now, a sentence or two under the label.",
      validation: (Rule) => Rule.required().error("Say what you're working on now."),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
