# San Diego Local Pros — sdlocalpros.com

A hyper-local directory of home service professionals across San Diego neighborhoods. Built with programmatic SEO to rank for hundreds of "[service] + [neighborhood]" keywords.

## 🚀 Quick Start (Deploy in 30 Minutes)

### Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account (you already have the repo `sd-local-pros`)
- Vercel account (free at vercel.com — sign up with your GitHub)
- Domain `sdlocalpros.com` purchased and accessible

### Step 1: Get the Code Running Locally

```bash
# Clone your repo (or copy these files into it)
cd sd-local-pros

# Install dependencies
npm install

# Copy the environment template
cp .env.example .env.local

# Start the dev server
npm run dev

# Open http://localhost:3000 — you should see the site!
```

### Step 2: Set Up Zapier Webhook (5 min)

This sends you email + SMS alerts when someone adds a business or claims a listing.

1. Go to zapier.com → Create a new Zap
2. Trigger: "Webhooks by Zapier" → "Catch Hook"
3. Copy the webhook URL Zapier gives you
4. Paste it into `.env.local` as `ZAPIER_WEBHOOK_URL`
5. Add Actions:
   - **Email:** "Gmail" → "Send Email" → To: your email → Subject: `{{alert_type}}: {{business_name}}` → Body: `{{message}}`
   - **SMS:** "SMS by Zapier" → "Send SMS" → To: your phone → Body: `{{alert_type}}: {{business_name}} — {{contact_name}} ({{contact_email}})`
6. Test and publish the Zap

### Step 3: Push to GitHub

```bash
git add .
git commit -m "Initial SD Local Pros build"
git push origin main
```

### Step 4: Deploy to Vercel (5 min)

1. Go to vercel.com → "Add New Project"
2. Import your `sd-local-pros` GitHub repo
3. Vercel auto-detects Next.js — just click "Deploy"
4. After deployment, go to Settings → Environment Variables
5. Add: `ZAPIER_WEBHOOK_URL` = your Zapier URL
6. Redeploy to pick up the env var

### Step 5: Connect Your Domain (5 min)

1. In Vercel → your project → Settings → Domains
2. Add `sdlocalpros.com` and `www.sdlocalpros.com`
3. Vercel will show you DNS records to add
4. Go to your domain registrar and update DNS:
   - Type: CNAME → Name: www → Value: `cname.vercel-dns.com`
   - Type: A → Name: @ → Value: `76.76.21.21`
5. Wait 5–30 minutes for DNS propagation
6. Vercel auto-provisions SSL certificate

### Step 6: Submit to Search Engines (10 min)

1. **Google Search Console:** Go to search.google.com/search-console
   - Add property → URL prefix → `https://sdlocalpros.com`
   - Verify via DNS (add TXT record) or HTML file
   - Submit sitemap: `https://sdlocalpros.com/sitemap.xml`

2. **Bing Webmaster Tools:** Go to bing.com/webmasters
   - Add site → Submit sitemap
   - Can import from Google Search Console directly

### Step 7: Set Up Google Analytics (5 min)

1. Go to analytics.google.com → Create account/property
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add to `.env.local`: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
4. Add the GA script to your layout (TODO: see layout.tsx comments)
5. Redeploy

---

## 📊 Outscraper Data Import

### Running Your First Scrape

1. Go to outscraper.com → Sign up (free tier is fine)
2. Go to Google Maps Scraper
3. Run these queries one at a time (or in batch):

```
Plumbers, La Jolla, San Diego, CA
Plumbers, North Park, San Diego, CA
Plumbers, Pacific Beach, San Diego, CA
Plumbers, Hillcrest, San Diego, CA
Plumbers, Point Loma, San Diego, CA
... (repeat for all 20 Tier 1 neighborhoods)

Electricians, La Jolla, San Diego, CA
Electricians, North Park, San Diego, CA
... (repeat for all 20 neighborhoods)

HVAC, La Jolla, San Diego, CA
... (continue for all 10 categories × 20 neighborhoods)
```

**Settings:**
- Limit: 20–40 results per query
- Drop duplicates: YES
- Enable "Emails & Contacts" enrichment
- Export format: CSV

### Import Format

After downloading your CSVs, the business data should be formatted to match the `Business` interface in `src/lib/types.ts`. Key fields to map:

| Outscraper Field | Our Field |
|---|---|
| name | name |
| full_address | address |
| city | city |
| state | state |
| postal_code | zipCode |
| phone | phone |
| site | website |
| rating | rating |
| reviews | reviewCount |
| description | description |
| latitude | lat |
| longitude | lng |
| working_hours | hours |

You'll need to manually assign `categorySlug` and `neighborhoodSlug` based on your query. Generating a `slug` from the business name (lowercase, hyphens) and a unique `id`.

### Replacing Sample Data

1. Format your Outscraper data as shown above
2. Replace the contents of `src/data/businesses.ts` with your real data
3. Run `npm run build` to regenerate all static pages
4. Push to GitHub → Vercel auto-deploys

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                          # Homepage
│   ├── layout.tsx                        # Root layout (nav + footer)
│   ├── globals.css                       # Tailwind + custom styles
│   ├── sitemap.ts                        # Auto-generated sitemap (200+ URLs)
│   ├── robots.ts                         # Search engine instructions
│   ├── [category]/
│   │   ├── page.tsx                      # Category page (e.g. /plumbers)
│   │   └── [neighborhood]/
│   │       └── page.tsx                  # THE MONEY PAGE (e.g. /plumbers/north-park)
│   ├── neighborhoods/
│   │   ├── page.tsx                      # All neighborhoods
│   │   └── [slug]/page.tsx              # Single neighborhood
│   ├── blog/
│   │   ├── page.tsx                      # Blog index
│   │   └── [slug]/page.tsx              # Blog post
│   ├── about/page.tsx                    # About (Salois Digital credit)
│   ├── contact/page.tsx                  # Contact form
│   ├── add-business/page.tsx             # Add business form
│   ├── claim/page.tsx                    # Claim listing form
│   └── api/
│       ├── submit-listing/route.ts       # Handles new business submissions
│       └── claim-listing/route.ts        # Handles claim requests
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                    # Frosted glass navigation
│   │   └── Footer.tsx                    # Footer with internal links
│   └── ui/
│       └── index.tsx                     # Shared components (cards, ratings, etc.)
├── data/
│   ├── neighborhoods.ts                  # 20 neighborhoods with unique content
│   ├── categories.ts                     # 10 service categories with FAQs
│   ├── businesses.ts                     # Business listings (replace with Outscraper)
│   └── blog-posts.ts                     # 5 launch blog posts
└── lib/
    ├── types.ts                          # TypeScript interfaces
    └── utils.tsx                         # Helper functions + icon map
```

## 📈 Page Count at Launch

| Page Type | Count | Example URL |
|---|---|---|
| Homepage | 1 | / |
| Category pages | 10 | /plumbers |
| Neighborhood pages | 20 | /neighborhoods/north-park |
| Service + Neighborhood | 200 | /plumbers/north-park |
| Blog posts | 5 | /blog/how-much-does-a-plumber-cost-in-san-diego |
| Static pages | 4 | /about, /contact, /add-business, /claim |
| **TOTAL** | **240** | |

## 🔍 SEO Features Built In

- **Unique meta titles and descriptions** for every page
- **Schema.org markup**: BreadcrumbList, FAQPage, CollectionPage, Article, LocalBusiness
- **Auto-generated sitemap.xml** with all 240+ URLs
- **Canonical URLs** on every page
- **Internal linking web**: every page links to related categories, neighborhoods, and blog posts
- **Open Graph tags** for social sharing
- **robots.txt** configured properly

## ⚡ What to Do Each Week (3–5 hours)

1. **Write 2 blog posts** (use the existing posts as templates — cost guides rank best)
2. **Send 10–20 outreach emails** to listed businesses (claim listing / featured placement)
3. **Post in 2–3 SD Facebook groups** (share helpful blog posts, not the directory directly)
4. **Check Google Search Console** for indexing issues or new keyword opportunities
5. **Respond to any form submissions** within 24 hours

---

Built with ❤️ by [Salois Digital](https://saloisdigital.com)
