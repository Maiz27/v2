import {defineArrayMember, defineField, defineType, type ValidationContext} from 'sanity'

import {assetDimensions, excludeChosen, subtitle, yearOf} from './studio'

const MAX_FEATURED = 4
const MIN_FEATURED = 2
const PLATE_SIZE = 4

// The `drafts` perspective overlays each draft on its published document, so
// a project being edited is counted once.
const FEATURED_API_VERSION = '2025-02-19'

async function countOtherFeatured(context: ValidationContext): Promise<number | null> {
  const id = context.document?._id
  if (!id) return null
  const publishedId = id.replace(/^drafts\./, '')
  return context
    .getClient({apiVersion: FEATURED_API_VERSION})
    .fetch<number>(
      `count(*[_type == "project" && featured == true && !(_id in [$publishedId, $draftId])])`,
      {publishedId, draftId: `drafts.${publishedId}`},
      {perspective: 'drafts'},
    )
}

type PlateImage = {
  image?: {asset?: {_ref?: string}}
}

/** The composition rules `planPlate()` in apps/web applies to the gallery,
 *  checked as warnings so documents saved before them still publish. */
function plateAdvice(images: PlateImage[] | undefined): string | true {
  if (!images || images.length === 0) return true

  const shown = images
    .slice(0, PLATE_SIZE)
    .map((item) => assetDimensions(item?.image?.asset?._ref))
  const sized = shown.filter((size): size is {width: number; height: number} => size !== null)
  const allPortrait = sized.length > 0 && sized.every(({width, height}) => height > width)
  const first = shown[0]
  if (!allPortrait && first && first.height > first.width) {
    return 'The first image is the main screen, and it is portrait. Put a landscape screenshot first and the phone shot second.'
  }

  return true
}

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  description:
    'One project: its card on the home page and archive, its case study at /projects/<slug>, and its entry on the CV.',
  groups: [
    {name: 'overview', title: 'Overview', default: true},
    {name: 'links', title: 'Links'},
    {name: 'plate', title: 'Plate'},
    {name: 'caseStudy', title: 'Case study'},
    {name: 'cv', title: 'CV'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'overview',
      description:
        'The project name. Shown on cards, in the archive, on the CV and on the share image. The case study uses it when Case-study headline is empty.',
      validation: (Rule) => Rule.required().error('Add the project name.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'overview',
      description:
        'The end of the case-study address: /projects/<slug>. Press Generate to make it from the title. Changing it after publishing breaks links that were already shared.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.custom((slug) =>
          slug?.current ? true : 'Generate a slug: without one the case study has no address.',
        ).warning(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured on home',
      type: 'boolean',
      group: 'overview',
      description: `Show this project on the home page. Keep between ${MIN_FEATURED} and ${MAX_FEATURED} projects featured: the home page lists the ${MAX_FEATURED} newest featured projects by date.`,
      initialValue: false,
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          const others = await countOtherFeatured(context)
          if (others === null) return true
          const total = others + (value === true ? 1 : 0)

          if (total > MAX_FEATURED) {
            return `${total} projects are featured, and the home page shows only the ${MAX_FEATURED} newest. Unfeature one so the home page shows the ones you choose.`
          }
          if (total < MIN_FEATURED) {
            return `Only ${total} project${total === 1 ? ' is' : 's are'} featured. Feature at least ${MIN_FEATURED} so the home page has a list to show.`
          }
          return true
        }).warning(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      group: 'overview',
      description:
        'When the project shipped, or started if it is ongoing. Projects are listed newest first by this date, and it is shown with the project on the site and the CV.',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (Rule) => Rule.required().error('Add the date: it sets where the project is listed.'),
    }),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'reference',
      group: 'overview',
      to: {type: 'projectKind'},
      description:
        'What this project is, for the archive filter (not the tech stack). Add a new kind under Settings, Project kinds.',
      validation: (Rule) => Rule.required().error('Pick a kind so the archive filter can place it.'),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'overview',
      description:
        'Whether the work is done, still going, or on hold. Shown after the date in the case-study header.',
      options: {
        list: [
          {title: 'Completed', value: 'completed'},
          {title: 'Ongoing', value: 'ongoing'},
          {title: 'Paused', value: 'paused'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().error('Pick a status.'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'overview',
      rows: 3,
      description:
        'One or two sentences, 200 characters at most. Shown on project cards, as the search description and on the share image.',
      validation: (Rule) =>
        Rule.required()
          .max(200)
          .error('Write one or two sentences of 200 characters or fewer: cards and the share image cut longer text.'),
    }),
    defineField({
      name: 'href',
      title: 'Live URL',
      type: 'url',
      group: 'links',
      description: 'Where the product runs. Shown on the case study and the CV. Leave empty if nothing is live.',
    }),
    defineField({
      name: 'source',
      title: 'Source code URL',
      type: 'url',
      group: 'links',
      description: 'The public repository. Leave empty for private code.',
    }),
    defineField({
      name: 'tools',
      title: 'Tech stack',
      type: 'array',
      group: 'overview',
      description:
        'In the order to show them. The first tool is the one named on the home page and in the archive; the case study and the CV list them all. Add a missing tool under Settings, Tools.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: {type: 'tool'},
          options: {filter: excludeChosen},
        }),
      ],
      validation: (Rule) => [
        Rule.required().error('Add at least the main tool: cards name the first one.'),
        Rule.unique().warning('A tool appears twice. Remove the repeat.'),
      ],
    }),
    defineField({
      name: 'images',
      title: 'Plate images',
      type: 'array',
      group: 'plate',
      description: `The plate under the case-study header, built from the first ${PLATE_SIZE} images in this order: 1, the main screen (landscape); 2, a companion, normally a portrait phone shot; 3 and 4, two landscape details. If every image is portrait they sit in one row. The plate has no label or caption; the first image is also the card image and the share-image thumbnail. Every image needs alt text. Drag to reorder: list order decides, not the Order index.`,
      of: [defineArrayMember({type: 'projectImage'})],
      validation: (Rule) => [
        Rule.max(PLATE_SIZE).warning(
          `The plate shows only the first ${PLATE_SIZE} images. Move the ones you want into the first ${PLATE_SIZE} places and remove the rest.`,
        ),
        Rule.custom((images: PlateImage[] | undefined) => plateAdvice(images)).warning(),
      ],
    }),
    defineField({
      name: 'cvBlurb',
      title: 'CV blurb',
      type: 'text',
      group: 'cv',
      rows: 4,
      description:
        'A short resume-voice description, 600 characters at most. Used only when this project is in the CV document\'s Selected projects list; the CV takes the tech stack, date and live URL from this project.',
      validation: (Rule) => Rule.max(600).error('Keep the CV blurb to 600 characters or fewer.'),
    }),
    defineField({
      name: 'contentTitle',
      title: 'Case-study headline',
      type: 'string',
      group: 'caseStudy',
      description:
        'The headline over the case study, also used as the page title and on the share image. Leave empty to use the project title.',
    }),
    defineField({
      name: 'content',
      title: 'Case study',
      type: 'blockContent',
      group: 'caseStudy',
      description:
        'The article. Start sections at Heading 2: they are numbered and listed in the contents; Heading 3 adds a subsection to the contents. Insert a Figure for screenshots and a Code snippet or Code tabs for code. Figures are numbered in reading order after the plate.',
    }),
  ],
  orderings: [
    {
      title: 'Date, newest first',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0.image',
      featured: 'featured',
      kind: 'kind.title',
      date: 'date',
      status: 'status',
    },
    prepare({title, media, featured, kind, date, status}) {
      return {
        title: title || 'Untitled project',
        subtitle: subtitle(featured ? 'Featured' : '', kind, yearOf(date), status),
        media,
      }
    },
  },
})
