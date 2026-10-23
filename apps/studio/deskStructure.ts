import type {StructureBuilder, StructureResolver} from 'sanity/structure'

// Document types that exist once, at a fixed id. The structure opens each
// directly, and sanity.config.ts removes create, duplicate and delete for them.
export const SINGLETON_TYPES: ReadonlySet<string> = new Set(['aboutMe', 'cv'])

const singleton = (S: StructureBuilder, schemaType: string, title: string) =>
  S.listItem()
    .id(schemaType)
    .title(title)
    .schemaType(schemaType)
    .child(S.document().schemaType(schemaType).documentId(schemaType).title(title))

const newestFirst = [{field: 'date', direction: 'desc' as const}]

export const myStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      singleton(S, 'aboutMe', 'About Me'),
      singleton(S, 'cv', 'CV'),
      S.divider(),

      S.listItem()
        .id('projects')
        .title('Projects')
        .schemaType('project')
        .child(
          S.list()
            .title('Projects')
            .items([
              S.listItem()
                .id('allProjects')
                .title('All projects')
                .schemaType('project')
                .child(
                  S.documentTypeList('project')
                    .title('All projects, newest first')
                    .defaultOrdering(newestFirst),
                ),
              S.listItem()
                .id('featuredProjects')
                .title('Featured on home')
                .schemaType('project')
                .child(
                  S.documentTypeList('project')
                    .title('Featured on home')
                    .filter('_type == "project" && featured == true')
                    .defaultOrdering(newestFirst),
                ),
            ]),
        ),
      S.documentTypeListItem('experience')
        .title('Experience')
        .child(
          S.documentTypeList('experience')
            .title('Experience, newest first')
            .defaultOrdering([{field: 'duration.from', direction: 'desc'}]),
        ),
      S.divider(),

      S.listItem()
        .id('settings')
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.documentTypeListItem('metadata')
                .title('Page metadata')
                .child(
                  S.documentTypeList('metadata')
                    .title('Page metadata')
                    .defaultOrdering([{field: 'slug.current', direction: 'asc'}]),
                ),
              S.documentTypeListItem('projectKind')
                .title('Project kinds')
                .child(
                  S.documentTypeList('projectKind')
                    .title('Project kinds')
                    .defaultOrdering([{field: 'title', direction: 'asc'}]),
                ),
              S.documentTypeListItem('tool')
                .title('Tools')
                .child(
                  S.documentTypeList('tool')
                    .title('Tools')
                    .defaultOrdering([{field: 'name', direction: 'asc'}]),
                ),
            ]),
        ),
    ])
