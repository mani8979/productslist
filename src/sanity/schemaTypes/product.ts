import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rank',
      title: 'Product Rank',
      type: 'number',
      description: 'Used for sorting and displaying the # badge',
      validation: (rule) => rule.required().positive().integer(),
    }),
    defineField({
      name: 'redirectUrl',
      title: 'Redirect URL (Affiliate Link)',
      type: 'url',
      description: 'The URL where the user will be redirected when they click the product.',
      validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Electronics', value: 'Electronics' },
          { title: 'Home & Kitchen', value: 'Home & Kitchen' },
          { title: 'Gadgets', value: 'Gadgets' },
          { title: 'Gifts', value: 'Gifts' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'rank',
    },
    prepare({ title, media, subtitle }) {
      return {
        title,
        media,
        subtitle: `Rank: #${subtitle}`,
      };
    },
  },
});
