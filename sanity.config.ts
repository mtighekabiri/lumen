import { defineConfig } from 'sanity';
import { structureTool, type StructureBuilder } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';
import { projectId, dataset } from './src/sanity/config';

export default defineConfig({
  name: 'lumen-cms',
  title: 'Lumen Content Manager',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title('Content')
          .items([
            // Site Settings - singleton
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Blog Posts
            S.documentTypeListItem('post').title('Blog Posts'),
            // Pages
            S.documentTypeListItem('page').title('Pages'),
            // FAQs
            S.documentTypeListItem('faq').title('FAQs'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
