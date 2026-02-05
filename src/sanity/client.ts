import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { projectId, dataset, apiVersion } from './config';

// Client for fetching data (read-only)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Helper function to fetch data with error handling
export async function sanityFetch<T>(query: string, params: Record<string, any> = {}): Promise<T> {
  return client.fetch<T>(query, params);
}
