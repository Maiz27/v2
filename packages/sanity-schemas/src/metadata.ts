import {defineType, defineField} from 'sanity'
import {subtitle} from './studio'

// The route paths the site asks for (getDynamicMetaData in apps/web).
const ROUTES = ['/', '/projects', '/cv']

export default defineType({
  name: 'metadata',
  title: 'Page Metadata',
  type: 'document',
  description:
    'The search title and description of one listing page. Case studies take theirs from the project.',
  fields: [
    defineField({
      name: 'slug',
      title: 'Page Slug',
      type: 'slug',
      description: `The route this entry describes, exactly as the site asks for it: ${ROUTES.join(', ')}. Type it in; do not generate it.`,
      validation: (Rule) => [
        Rule.required().error(`Type the route, one of ${ROUTES.join(', ')}.`),
        Rule.custom((slug) =>
          !slug?.current || ROUTES.includes(slug.current)
            ? true
            : `The site only reads ${ROUTES.join(', ')}. This entry will not be used.`,
        ).warning(),
      ],
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The browser tab and search result title, 60 characters at most.',
      validation: (Rule) =>
        Rule.required().max(60).error('Write a title of 60 characters or fewer: search results cut longer ones.'),
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 3,
      description: 'The search result and link preview description, 170 characters at most.',
      validation: (Rule) =>
        Rule.required()
          .max(170)
          .error('Write a description of 170 characters or fewer: search results cut longer ones.'),
    }),
  ],
  orderings: [
    {
      title: 'Route',
      name: 'routeAsc',
      by: [{field: 'slug.current', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    prepare(selection: {title?: string; slug?: {current?: string}}) {
      const {title, slug} = selection
      // A new entry has neither yet; never list it as "undefined".
      return {
        title: subtitle(slug?.current, title) || 'Untitled page',
      }
    },
  },
})
