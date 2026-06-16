import { defineField, defineType } from 'sanity';
import { UrlFetcherInput } from '../components/UrlFetcherInput';

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
      name: 'imageUrl',
      title: 'Product Image URL (Direct Link)',
      type: 'url',
      description: 'Direct link to the image (e.g. Amazon image URL)',
      // Made optional so it won't block if fallback is used
    }),
    defineField({
      name: 'cloudinaryImage',
      title: 'Fallback Product Image',
      type: 'cloudinary.asset',
      description: 'Upload an image to Cloudinary if direct link is not available',
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
      components: {
        input: UrlFetcherInput,
      },
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
