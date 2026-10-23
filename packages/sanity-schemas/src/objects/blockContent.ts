import { defineType, defineArrayMember } from 'sanity';

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        // Values are stored; only the titles are editor copy. H2 and H3 feed
        // the case-study contents (apps/web/src/lib/outline.ts).
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 1 (avoid: the page title is the H1)', value: 'h1' },
        { title: 'Heading 2 (numbered section)', value: 'h2' },
        { title: 'Heading 3 (subsection)', value: 'h3' },
        { title: 'Heading 4 (not in contents)', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'string',
                description:
                  'A full address starting with https://, http://, mailto: or tel:.',
                validation: (Rule: {
                  custom: (arg0: (href: string | undefined) => true | string) => any;
                }) =>
                  Rule.custom((href: string | undefined) => {
                    const validPrefixes = [
                      'http://',
                      'https://',
                      'mailto:',
                      'tel:',
                    ];
                    const isValid =
                      typeof href === 'string' &&
                      validPrefixes.some((prefix) => href.startsWith(prefix));

                    if (isValid) {
                      return true;
                    } else {
                      return 'Start the link with https://, http://, mailto: or tel:.';
                    }
                  }),
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: 'image',
      title: 'Image (legacy, unnumbered: use Figure)',
      options: { hotspot: true },
    }),
    // Numbered screenshot figure (single or pair). The bare `image` above
    // stays for legacy content.
    defineArrayMember({
      type: 'figure',
      title: 'Figure (screenshots)',
    }),
    // Custom Code Block
    defineArrayMember({
      type: 'snippet',
      title: 'Code snippet',
    }),
    defineArrayMember({
      type: 'snippetGroup',
      title: 'Code tabs',
    }),
  ],
});
