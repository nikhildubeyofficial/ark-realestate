import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blogPosts";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen">
      <section className="border-b border-white/10 py-14 md:py-20">
        <div className="mx-auto max-w-[980px] px-6 md:px-8">
          <Link href="/blog" className="text-sm text-[#c9a84c] hover:text-[#fcf6ba]">
            ← Back to blogs
          </Link>
          <p className="mt-6 font-sans text-xs font-medium tracking-[0.14em] text-[#c9a84c]">
            {post.category}
          </p>
          <h1 className="mt-3 font-serif text-4xl text-white/95 md:text-6xl">{post.title}</h1>
          <p className="mt-4 text-sm text-white/45">{post.date}</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[980px] px-6 md:px-8">
          <div
            className="mb-10 h-[280px] w-full overflow-hidden rounded-lg border border-white/10 bg-cover bg-center md:h-[420px]"
            style={{ backgroundImage: `url(${post.image})` }}
          />

          <article className="space-y-5">
            {post.content.map((paragraph, idx) => (
              <p key={`${post.slug}-${idx}`} className="text-base leading-relaxed text-white/75">
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
}
