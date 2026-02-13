/**
 * Case Studies Data
 *
 * When WordPress is configured (WORDPRESS_API_URL), case studies are pulled
 * from posts in the "Case Study" category. Otherwise, the static fallback
 * array below is used.
 *
 * To add a new static case study:
 * 1. Add the card image to /public/case-studies/ (recommended: 600x400px, .jpg or .png)
 * 2. Add a new entry to the array below
 * 3. The carousel will automatically pick it up
 */

import { wpGetCaseStudies } from '@/lib/wordpress';

export interface CaseStudy {
  /** Unique identifier */
  id: string;
  /** Headline displayed on the card */
  headline: string;
  /** Full image path or URL (local: "/case-studies/img.jpg", WordPress: full URL) */
  image: string;
  /** URL path to the full case study (e.g. "/news/my-case-study") */
  href: string;
}

const staticCaseStudies: CaseStudy[] = [
  {
    id: "cpg-roi",
    headline: "How a Leading CPG Brand Increased ROI by 40%",
    image: "/case-studies/cpg-roi.jpg",
    href: "/news/how-a-leading-cpg-brand-increased-roi-by-40",
  },
  {
    id: "automotive-attention",
    headline: "Driving Attention: An Automotive Campaign Success Story",
    image: "/case-studies/automotive-attention.jpg",
    href: "/news/driving-attention-automotive-campaign",
  },
  {
    id: "retail-optimisation",
    headline: "Retail Media Optimisation Through Attention Bidding",
    image: "/case-studies/retail-optimisation.jpg",
    href: "/news/retail-media-optimisation-attention-bidding",
  },
  {
    id: "streaming-ctv",
    headline: "Measuring Attention Across Streaming & CTV Platforms",
    image: "/case-studies/streaming-ctv.jpg",
    href: "/news/measuring-attention-streaming-ctv",
  },
  {
    id: "fmcg-packaging",
    headline: "FMCG Packaging Redesign Guided by Eye-Tracking Data",
    image: "/case-studies/fmcg-packaging.jpg",
    href: "/news/fmcg-packaging-redesign-eye-tracking",
  },
  {
    id: "finance-awareness",
    headline: "Building Brand Awareness in Financial Services",
    image: "/case-studies/finance-awareness.jpg",
    href: "/news/building-brand-awareness-financial-services",
  },
];

/** Fetch case studies from WordPress, falling back to static data */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  const wpStudies = await wpGetCaseStudies();
  if (wpStudies && wpStudies.length > 0) return wpStudies;
  return staticCaseStudies;
}
