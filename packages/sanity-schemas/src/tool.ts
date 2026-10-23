import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tool',
  title: 'Tool',
  type: 'document',
  description:
    'One technology for the tech stacks of projects and roles. The site shows tool names: the first tool of a project on its card, and the full list on the case study and the CV.',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'As it should read in a stack, e.g. "Next.js" or "Sanity".',
      validation: (Rule) => Rule.required().error('Add the tool\'s name.'),
    }),
    defineField({
      name: 'href',
      title: 'Homepage',
      type: 'url',
      description: 'Optional. The tool\'s official site.',
    }),
    defineField({
      name: 'iconSource',
      title: 'Icon source',
      type: 'string',
      description:
        'Where the icon comes from. The current site shows names only; the icon labels this tool in the Studio list.',
      options: {
        list: [
          {title: 'react-icons (Simple Icons)', value: 'react-icons'},
          {title: 'Custom SVG upload', value: 'custom'},
        ],
        layout: 'radio',
      },
      initialValue: 'react-icons',
      validation: (Rule) => Rule.required().error('Pick where the icon comes from.'),
    }),
    defineField({
      name: 'iconName',
      title: 'Icon name',
      type: 'string',
      description:
        "The component name from 'react-icons/si', e.g. 'SiReact'. Search the Simple Icons set on react-icons.github.io.",
      hidden: ({parent}) => parent?.iconSource !== 'react-icons',
      validation: (Rule) => [
        Rule.custom((field, context) => {
          if (context.document?.iconSource === 'react-icons' && !field) {
            return 'Add the icon\'s component name, e.g. SiReact, or switch Icon source to Custom SVG upload.'
          }
          return true
        }),
        Rule.regex(/^Si[A-Z0-9][A-Za-z0-9]*$/, {name: 'Simple Icons component'}).warning(
          'Simple Icons components start with "Si" followed by the name, e.g. SiNextdotjs.',
        ),
      ],
    }),
    defineField({
      name: 'iconSvg',
      title: 'Icon SVG',
      type: 'image',
      options: {
        accept: 'image/svg+xml',
      },
      description: 'Upload a single-colour SVG icon.',
      hidden: ({parent}) => parent?.iconSource !== 'custom',
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context.document?.iconSource === 'custom' && !field) {
            return 'Upload the SVG, or switch Icon source to react-icons.'
          }
          return true
        }),
    }),
  ],
  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'iconSvg',
      iconSource: 'iconSource',
      iconName: 'iconName',
    },
    prepare({title, media, iconSource, iconName}) {
      return {
        title: title || 'Unnamed tool',
        subtitle: iconSource === 'custom' ? 'Custom SVG' : iconName || 'No icon',
        media,
      }
    },
  },
})
