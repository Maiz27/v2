export const myStructure = (S: any) =>
  S.list()
    .title('Base')
    .items([
      // Add a single document to the first panel,
      S.listItem()
        .title('About Me')
        .child(S.document().schemaType('aboutMe').documentId('aboutMe')),
      S.listItem().title('CV').child(S.document().schemaType('cv').documentId('cv')),
      // Removing singleton document types from the main document type list
      ...S.documentTypeListItems().filter(
        (listItem: {getId: () => string}) => !['aboutMe', 'cv'].includes(listItem.getId()),
      ),
    ])
