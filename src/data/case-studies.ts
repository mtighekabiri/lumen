/**
 * Case Studies Data
 *
 * To add a new case study:
 * 1. Add the card image to /public/case-studies/ (recommended: 600x400px, .jpg or .png)
 * 2. Add a new entry to the array below
 * 3. The carousel will automatically pick it up
 */

export interface CaseStudy {
  /** Unique identifier */
  id: string;
  /** Headline displayed on the card */
  headline: string;
  /** Image filename in /public/case-studies/ */
  image: string;
  /** URL path to the full case study (e.g. "/news/my-case-study") */
  href: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "cpg-roi",
    headline: "How a Leading CPG Brand Increased ROI by 40%",
    image: "cpg-roi.jpg",
    href: "/news/how-a-leading-cpg-brand-increased-roi-by-40",
  },
  {
    id: "automotive-attention",
    headline: "Driving Attention: An Automotive Campaign Success Story",
    image: "automotive-attention.jpg",
    href: "/news/driving-attention-automotive-campaign",
  },
  {
    id: "retail-optimisation",
    headline: "Retail Media Optimisation Through Attention Bidding",
    image: "retail-optimisation.jpg",
    href: "/news/retail-media-optimisation-attention-bidding",
  },
  {
    id: "streaming-ctv",
    headline: "Measuring Attention Across Streaming & CTV Platforms",
    image: "streaming-ctv.jpg",
    href: "/news/measuring-attention-streaming-ctv",
  },
  {
    id: "fmcg-packaging",
    headline: "FMCG Packaging Redesign Guided by Eye-Tracking Data",
    image: "fmcg-packaging.jpg",
    href: "/news/fmcg-packaging-redesign-eye-tracking",
  },
  {
    id: "finance-awareness",
    headline: "Building Brand Awareness in Financial Services",
    image: "finance-awareness.jpg",
    href: "/news/building-brand-awareness-financial-services",
  },
];
