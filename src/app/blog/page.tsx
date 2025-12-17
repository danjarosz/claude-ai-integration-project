export default function BlogPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="space-y-4">
        <article className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold">First Post</h2>
          <p className="text-gray-600 mt-2">This is a sample blog post.</p>
        </article>
        <article className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold">Second Post</h2>
          <p className="text-gray-600 mt-2">Another sample blog post.</p>
        </article>
      </div>
    </main>
  );
}