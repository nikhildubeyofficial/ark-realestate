import Link from "next/link";

const featuredPost = {
  title: "Prices in Dubai to Rise: What Luxury Buyers Need to Know",
  excerpt:
    "From property viewings by private helicopter to seamless key handover — every detail considered. Our latest market analysis for high-net-worth investors.",
  date: "March 15, 2025",
  category: "Market Insights",
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
};

const posts = [
  {
    title: "Prices in Dubai to Rise",
    excerpt:
      "From property viewings by private helicopter to seamless key handover — every detail considered.",
    date: "March 12, 2025",
  },
  {
    title: "Top 10 Off-Plan Developments in 2025",
    excerpt:
      "Exclusive access to the most sought-after off-plan projects from leading developers.",
    date: "March 10, 2025",
  },
  {
    title: "Why Emirates Hills Remains a Safe Haven",
    excerpt:
      "Stability, privacy, and world-class amenities in one of Dubai's most prestigious communities.",
    date: "March 8, 2025",
  },
  {
    title: "Golden Visa and Real Estate: Your Guide",
    excerpt:
      "How property investment in Dubai can secure your family's future in the UAE.",
    date: "March 5, 2025",
  },
  {
    title: "Palm Jumeirah: Beyond the Icon",
    excerpt:
      "Living on the Palm — what it really means for discerning homeowners.",
    date: "March 1, 2025",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative border-b border-white/5 py-20">
        <div className="mx-auto max-w-[1280px] px-8 md:px-20">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
            <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
              Knowledge hub
            </span>
          </div>
          <h1 className="mt-4 font-serif text-5xl font-light italic text-white/90 md:text-6xl">
            Latest <span className="text-[#c9a84c]">Blogs</span>
          </h1>
          <p className="mt-6 max-w-xl font-light text-white/50 text-sm leading-relaxed">
            Handpicked insights from Dubai&apos;s most prestigious addresses.
            Market intelligence, lifestyle, and exclusive listings.
          </p>
        </div>
      </section>

      {/* Featured post */}
      <section className="border-b border-white/5 py-16">
        <div className="mx-auto max-w-[1280px] px-8 md:px-20">
          <Link
            href="#"
            className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/5 transition hover:border-[#c9a84c]/30 md:flex-row"
          >
            <div className="relative h-[320px] w-full md:h-auto md:min-h-[400px] md:w-1/2">
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${featuredPost.image})` }}
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:w-1/2 md:p-12">
              <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
                {featuredPost.category}
              </span>
              <h2 className="mt-2 font-serif text-3xl font-medium text-white/90 md:text-4xl">
                {featuredPost.title}
              </h2>
              <p className="mt-4 font-light text-white/50 text-sm leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <p className="mt-6 text-xs text-white/40">{featuredPost.date}</p>
              <span className="mt-4 inline-flex items-center gap-2 font-light text-[#c9a84c] text-sm transition group-hover:gap-3">
                Read more <span>→</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Blog list */}
      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-8 md:px-20">
          <div className="flex flex-col gap-0 border-t border-white/10">
            {posts.map((post, i) => (
              <Link
                key={post.title}
                href="#"
                className="group flex flex-col gap-4 border-b border-white/10 py-8 transition hover:bg-white/5 md:flex-row md:items-center md:gap-8"
              >
                <span className="w-8 shrink-0 font-serif text-2xl font-light italic text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-xl font-medium text-white/90 transition group-hover:text-[#c9a84c] md:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-1 font-light text-white/50 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="mt-2 text-xs text-white/40">{post.date}</p>
                </div>
                <span className="shrink-0 text-[#c9a84c] transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
