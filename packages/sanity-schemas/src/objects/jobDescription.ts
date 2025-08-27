import {defineType, defineArrayMember} from 'sanity'

export const jobDescription = defineType({
  title: 'Job Description',
  name: 'description',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'string',
                validation: (Rule: {
                  custom: (arg0: (href: string) => true | 'Invalid URL') => any
                }) =>
                  Rule.custom((href: string) =>
                    href.startsWith('http://') ||
                    href.startsWith('https://') ||
                    href.startsWith('mailto:')
                      ? true
                      : 'Invalid URL',
                  ),
              },
            ],
          },
        ],
      },
    }),
  ],
})
