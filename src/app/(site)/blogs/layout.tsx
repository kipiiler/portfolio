export default function MdxLayout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here
    return <main className="lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6">{children}</main>
}