import { getPost, getAllPosts } from "@/services/post";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { PostList } from "@/components/post/list";
import { Metadata } from "next";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProductById(id: string) {
  const { data, error } = await getPost(id);
  return { data, error };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const { data } = await getProductById(id);
  if (!data) {
    return {
      title: "Post not found",
      description: "This doesn't exist.",
    };
  }
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description ?? "",
      url: `/post/${id}`,
    }
  }
}

export default async function ProductPage({ params }: PostPageProps) {
  const { id } = await params;
  const [{ data, error }, { data: posts }] = await Promise.all([
     getProductById(id),
     getAllPosts(),
   ])
  if (error || !data) {
    return (
      <Empty>
            <EmptyHeader>
              <EmptyTitle>404 - Not Found</EmptyTitle>
              <EmptyDescription>
                The page you&apos;re looking for doesn&apos;t exist. Try searching for
                what you need below.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
    )
  }
  const otherPosts = posts?.filter((p) => p.id !== data.id) ?? []
  return (
    <div className="w-19/20">
      <PostList posts={otherPosts} featuredPost={data}/>
    </div>
  )
}
