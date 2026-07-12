import {defineField, defineType} from 'sanity'

const MAX_FEATURED = 4
const MIN_FEATURED = 2

async function getFeaturedCount(context: any, excludeId?: string) {
  const {getClient} = context
  const client = getClient({apiVersion: '2024-01-01'})
  return client.fetch(
    `count(*[_type == "project" && featured == true ${excludeId ? `&& _id != $id` : ''}])`,
    {id: excludeId}
  )
}

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          // Get current featured count excluding this document
          const count = await getFeaturedCount(context, context.document?._id)
          
          // Get the CURRENT stored value of featured for this document
          const currentFeatured = context.document?.featured ?? false
          
          // Only validate if the value is actually CHANGING
          if (value === currentFeatured) return true
          
          // Trying to FEATURE a project (false -> true)
          if (value === true && currentFeatured === false) {
            if (count >= MAX_FEATURED) {
              return `Maximum of ${MAX_FEATURED} featured projects allowed. Unfeature another project first.`
            }
            return true
          }
          
          // Trying to UNFEATURE a project (true -> false)
          if (value === false && currentFeatured === true) {
            // After unfeaturing, total featured would be `count` (since current is excluded)
            if (count < MIN_FEATURED) {
              return `Minimum of ${MIN_FEATURED} featured projects required. Feature another project before unfeaturing this one.`
            }
            return true
          }
          
          return true
        }),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      description: 'What this project is, for the archive filter (not the tech stack).',
      options: {
        list: [
          {title: 'Web app', value: 'Web app'},
          {title: 'Client site', value: 'Client site'},
          {title: 'Game', value: 'Game'},
          {title: 'Android app', value: 'Android app'},
          {title: 'This site', value: 'This site'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Completed', value: 'completed'},
          {title: 'Ongoing', value: 'ongoing'},
          {title: 'Paused', value: 'paused'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'description',
      type: 'text',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'href',
      title: 'Preview URL',
      type: 'url',
    }),
    defineField({
      name: 'source',
      title: 'Source Code URL',
      type: 'url',
    }),
    defineField({
      name: 'tools',
      title: 'Tech Stack',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tool'}}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'projectImage'}],
    }),
    defineField({
      name: 'contentTitle',
      title: 'Content Title',
      type: 'string',
      description: 'The title of the blog of the project',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      description: 'The main blog content of the project',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.[0].image',
      featured: 'featured',
    },
    prepare(selection) {
      const {title, media, featured} = selection
      return {
        title: `${title}${featured ? ' (Featured)' : ''}`,
        media: media,
      }
    },
  },
})
