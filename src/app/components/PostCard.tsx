import { Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'

export function PostCard(post: Post) {
  return (
    <article className="flex flex-col items-start justify-between">
      <div className="flex items-center justify-between gap-x-4">
        <div className='font-bold border-amber-500 rounded-md px-4 py-1 text-sm text-orange-400 border-2'>
          Est: {Math.round(Number(post.estimate))} min
        </div>
        <time dateTime={post.date}>
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>     
      </div>
      <div className="group relative mt-4">
        <h3 className="duration-300 mt-3 text-3xl font-semibold leading-6 hover:text-orange-400 ">
          <Link className="link" href={post.url}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6">
          {post.description}
        </p>
      </div>
    </article>
  )
}