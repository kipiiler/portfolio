import { PostCard } from "../../components/PostCard";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Link from "next/link";

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <section className="max-w-7xl mb-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
          From the blogs
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          Hey there! I&apos;m really into infrastructure and computer graphics,
          and this blog is my little corner of the web where I share what
          I&apos;m learning and working on. I&apos;m all about keeping things
          relaxed and down-to-earth, so you&apos;ll find a mix of tech insights
          and casual musings here. Thanks for stopping by!
        </p>
      </section>
      <div className="mt-10 space-y-12 border-t border-gray-200 pt-10 dark:border-gray-700">
        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </main>
  );
}
