import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPosts, getBlogPost, getAllBlogSlugs } from '@/data/blog-posts';
import { categories } from '@/data/categories';
import { Breadcrumbs, CTABanner } from '@/components/ui';

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle, description: post.metaDescription,
      url: `https://sdlocalpros.com/blog/${post.slug}`, type: 'article',
      publishedTime: post.publishedAt, modifiedTime: post.updatedAt,
    },
    alternates: { canonical: `https://sdlocalpros.com/blog/${post.slug}` },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const relatedCats = post.relatedCategories
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter(Boolean);

  // Article schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: 'San Diego Local Pros' },
    publisher: {
      '@type': 'Organization', name: 'San Diego Local Pros',
      url: 'https://sdlocalpros.com',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-gradient-to-b from-apple-blue-bg/30 to-white pt-12 pb-8">
        <div className="container-tight">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title },
          ]} />

          <div className="flex items-center gap-2 text-body-sm text-apple-gray-mid mb-4">
            <Calendar className="w-4 h-4" />
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'long', day: 'numeric', year: 'numeric',
            })}
            <span className="mx-1">·</span>
            {post.author}
          </div>

          <h1 className="text-headline-mobile lg:text-headline text-apple-black mb-4 text-balance">
            {post.title}
          </h1>
          <p className="text-body-lg text-apple-gray-dark max-w-3xl">{post.excerpt}</p>
        </div>
      </section>

      <article className="section-white !pt-8">
        <div className="container-tight">
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-apple-black prose-headings:font-display
              prose-h2:text-title prose-h2:mt-10 prose-h2:mb-4
              prose-p:text-apple-gray-dark prose-p:text-body prose-p:leading-relaxed
              prose-a:text-apple-blue prose-a:no-underline hover:prose-a:underline
              prose-strong:text-apple-black
              prose-li:text-apple-gray-dark"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-apple-gray-light/50">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-apple-gray-bg text-apple-gray-dark text-body-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Categories */}
          {relatedCats.length > 0 && (
            <div className="mt-8">
              <h3 className="text-body font-semibold text-apple-black mb-3">Related Services</h3>
              <div className="flex flex-wrap gap-3">
                {relatedCats.map((cat) => cat && (
                  <Link key={cat.slug} href={`/${cat.slug}`} className="btn-secondary text-body-sm !py-2 !px-4">
                    Find {cat.namePlural} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-10">
            <Link href="/blog" className="btn-ghost text-body">
              <ArrowLeft className="w-4 h-4" /> Back to all guides
            </Link>
          </div>
        </div>
      </article>

      <CTABanner
        title="Need a pro for your project?"
        description="Browse top-rated, licensed professionals across every San Diego neighborhood."
        primaryAction={{ label: 'Find a Pro', href: '/' }}
      />
    </>
  );
}
