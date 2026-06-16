import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
  basePath: '/admin',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mc9i0vzc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'Premium Finds Admin',
  schema,
  plugins: [
    structureTool(),
  ],
})
