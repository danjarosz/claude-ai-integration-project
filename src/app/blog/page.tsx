import { Heading, Text, Card, CardBody, HStack, InitialsAvatar } from "@/ui";

const posts = [
  {
    title: "First Post",
    excerpt: "This is a sample blog post.",
    author: "John Doe",
  },
  {
    title: "Second Post",
    excerpt: "Another sample blog post.",
    author: "Alice Smith",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen p-8">
      <Heading level={1} className="mb-6">
        Blog
      </Heading>
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.title}>
            <CardBody>
              <HStack gap={4} align="start">
                <InitialsAvatar name={post.author} size="md" color="primary" />
                <div className="flex-1">
                  <Heading level={2} size="lg">
                    {post.title}
                  </Heading>
                  <Text color="muted" size="sm" className="mt-1">
                    By {post.author}
                  </Text>
                  <Text className="mt-2">{post.excerpt}</Text>
                </div>
              </HStack>
            </CardBody>
          </Card>
        ))}
      </div>
    </main>
  );
}
