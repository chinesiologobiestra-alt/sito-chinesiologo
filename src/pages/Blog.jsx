import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Blog() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {

    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", {
        ascending: false,
      });

    setPosts(data || []);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-24">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-yellow-500 mb-14">
          Blog
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {posts.map((post) => (

            <a
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-zinc-900 rounded-3xl overflow-hidden border border-yellow-700 hover:scale-[1.02] transition"
            >

              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-56 object-cover"
                />
              )}

              <div className="p-6">

                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  {post.title}
                </h2>

                <p className="text-gray-300 leading-7">
                  {post.excerpt}
                </p>

              </div>

            </a>

          ))}

        </div>

      </div>

    </div>
  );
}