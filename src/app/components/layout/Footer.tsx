export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 mt-44">
      <div className="max-w-7xl mx-auto flex lg:flex-row flex-col items-center lg:justify-between justify-center gap-y-4 md:px-16 px-6 py-16 text-zinc-400">
        <small className=" duration-200 font-mono">
          All rights reserved &copy; {new Date().getFullYear()}
        </small>

        <small>
          Built{" "}
          <a
            href="https://github.com/kipiiler"
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="text-orange-400">@kipiiler</span> credits to{" "}
          </a>
          <a
            href="https://github.com/Evavic44/sanity-nextjs-site"
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="text-orange-400">@Victor Eke</span>
          </a>
        </small>
      </div>
    </footer>
  );
}
