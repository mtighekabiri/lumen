import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      initialValue: 'Lumen Research',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'The Attention Technology Company',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main headline on homepage (before rotating text)',
      initialValue: 'Turn attention into',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 2,
      initialValue: 'We help data-driven advertisers to minimise ad waste and maximise return.',
    }),
    defineField({
      name: 'rotatingWords',
      title: 'Rotating Words',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Words that rotate in the hero headline',
      initialValue: ['action', 'conversion', 'awareness', 'consideration', 'profit', 'sales', 'memory'],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'hello@lumen-research.com',
    }),
    defineField({
      name: 'stats',
      title: 'Company Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
        },
      ],
      initialValue: [
        { value: '650K+', label: 'Eye-Tracking Sessions' },
        { value: '30B+', label: 'Programmatic Impressions' },
        { value: '2013', label: 'Founded' },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'twitter', title: 'Twitter URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
