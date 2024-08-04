import { Codeblock } from "./mdx/CodeBlock";
import { WEBSITE_HOST_URL } from "../lib/constants";
import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import type { MDXComponents } from "mdx/types";
import type { Metadata } from "next";
import NextImage from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useMDXComponent } from "next-contentlayer/hooks";
import React from "react";
import { Callout } from "./Callout";
import RefLink from "./RefLink";
import { BiLinkExternal } from "react-icons/bi";

export async function generateStaticParams() {
  return allPosts.map((post: any) => ({
    slug: post._raw.flattenedPath,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const post = allPosts.find(
    (post: any) => post._raw.flattenedPath === params.slug
  );

  if (!post) {
    return;
  }

  const { title, description, date, url } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: date,
      url: `${WEBSITE_HOST_URL}/blogs/${url}`,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `${WEBSITE_HOST_URL}/blogs/${url}`,
    },
  };
}

const HighlightLinks = ({ text }: {text: string}) => {
  // Regular expression to find URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Split the text into parts, separating URLs
  const parts = text.split(urlRegex);

  return (
    <div>
      {parts.map((part, index) =>
        urlRegex.test(part) ? (
          <RefLink
            key={index}
            href={part as string}
            className="dark:text-orange-400 text-orange-500 hover:underline"
          >{part} <BiLinkExternal className="inline" aria-hidden="true"/>
          </RefLink>
        ) : (
          part
        )
      )}
    </div>
  );
};



// Define your custom MDX components.
const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <div className="scroll-m-20 font-bold font-cal text-4xl">{children}</div>
  ),
  h2: ({ children }) => (
    <div className="mt-10 font-bold scroll-m-20 border-b border-b-zinc-200 pb-2 font-cal text-3xl transition-colors first:mt-0 dark:border-b-zinc-700">
      {children}
    </div>
  ),
  a: ({ children, href }) => {
    const isExternal = href?.startsWith("http");
    const Component = isExternal ? "a" : RefLink;
    return (
      <Component
        href={href as string}
        className="dark:text-orange-400 text-orange-500 hover:underline"
      >
        {children} {isExternal && <BiLinkExternal className="inline" aria-hidden="true" />}
      </Component>
    );
  },
  ul: ({ children }) => <ul className="mt-4 list-disc pl-8">{children}</ul>,
  code: ({ children }) => (
    <code className="w-1 relative rounded py-[0.2rem] px-[0.3rem] font-mono text-sm font-semibold bg-stone-700 text-stone-200">
      {children}
    </code>
  ),
  h3: ({ children }) => (
    <div className="mt-8 scroll-m-20 font-cal font-bold text-2xl text-stone-200 mb-8">
      {children}
    </div>
  ),
  pre: ({ children, className }) => {
    const language = className?.replace(/language-/, "");
    return <Codeblock data-language={language}>{children}</Codeblock>;
  },
  p: ({ children }) => (
    <div className="leading-7 [&:not(:first-child)]:mt-6">{children}</div>
  ),
  img: (props) => {
    // if (props.title !== undefined) {
    return (
      <div>
        <div>
          <NextImage
            width={0 as any}
            height={0 as any}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="rounded-lg"
            src={props.src as string}
            alt={props.alt || "Image"}
            // layout="fill"
            {...props}
          />
        </div>
        {props.title && (
          <div className="text-center italic text-stone-400 font-extralight mt-2 mb-8">
            <HighlightLinks text={props.title}/>
          </div>
        )}
      </div>
    );
  },
  Callout,
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find(
    (post: any) => post._raw.flattenedPath === params.slug
  );

  if (!post) {
    notFound();
  }

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
        {post.title}
      </h1>
      <time className="mb-2 block text-sm text-zinc-400" dateTime={post.date}>
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
      <div className="mb-2 block text-sm text-zinc-400">
        Author: {post.author}
      </div>
      <div className="block text-sm text-zinc-400">
       Estimate reading time: {Math.round(Number(post.estimate))} mins
      </div>
      <div className="mt-10 prose dark:prose-invert">
        <MDXContent components={mdxComponents} />
      </div>
    </div>
  );
};

export default PostLayout;
