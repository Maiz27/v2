import {defineField, defineType} from 'sanity'

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
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
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
      name: 'tech',
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
