import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { blogPosts } from '@/data/blog-posts';
import { Breadcrumbs, SectionHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Blog | San Diego Home Service Guides & Tips',
  description: 'Expert guides on home service costs, hiring tips, and maintenance advice for San Diego homeowners.',
  alternates: { canonical: 'https://sdlocalpros.com/blog' },
};

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      <section className="bg-gradient-to-b from-apple-blue-bg/30 to-white pt-12 pb-12">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
          <h1 className="text-headline-mobile lg:text-headline text-apple-black mb-4">
            San Diego Home Service Guides
          </h1>
          <p className="text-body-lg text-apple-gray-dark max-w-3xl">
            Cost guides, hiring tips, and expert advice to help San Diego homeowners make smart decisions about home services.
          </p>
        </div>
      </section>

      <section className="section-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-6 group flex flex-col">
                <div className="flex items-center gap-2 text-caption text-apple-gray-mid mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long', day: 'numeric', year: 'numeric',
                  })}
                </div>
                <h2 className="text-subtitle text-apple-black group-hover:text-apple-blue transition-colors mb-3 flex-1">
                  {post.title}
                </h2>
                <p className="text-body-sm text-apple-gray-dark mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="btn-ghost text-body-sm mt-auto">
                  Read guide <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
