import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tool',
  title: 'Tool',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Href',
      type: 'url',
    }),
    defineField({
      name: 'iconSource',
      title: 'Icon Source',
      type: 'string',
      options: {
        list: ['react-icons', 'custom'],
        layout: 'radio',
      },
      initialValue: 'react-icons',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      description:
        "The name of the icon from 'react-icons/si', this should be the component name (e.g., 'SiReact').",
      hidden: ({parent}) => parent?.iconSource !== 'react-icons',
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context.document?.iconSource === 'react-icons' && !field) {
            return 'Icon name is required for react-icons'
          }
          return true
        }),
    }),
    defineField({
      name: 'iconSvg',
      title: 'Icon SVG',
      type: 'image',
      options: {
        accept: 'image/svg+xml',
      },
      description: 'Upload a custom SVG icon.',
      hidden: ({parent}) => parent?.iconSource !== 'custom',
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context.document?.iconSource === 'custom' && !field) {
            return 'SVG upload is required for custom icons'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'iconSvg',
    },
  },
})
