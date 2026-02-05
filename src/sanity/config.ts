// Sanity Configuration
// After creating your Sanity project at https://sanity.io/manage,
// update these values or set them in your .env.local file

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

// Used for server-side fetching and mutations
export const token = process.env.SANITY_API_TOKEN;

// Studio configuration
export const studioUrl = '/studio';
