import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setPost(data);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Caricamento...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-yellow-500 mb-10 leading-tight">
          {post.title}
        </h1>

        <div
  className="text-gray-300 text-lg leading-9 break-words max-w-full overflow-hidden [&_p]:mb-6 [&_strong]:font-bold [&_h2]:text-3xl [&_h2]:text-yellow-500 [&_h2]:mb-6"
  dangerouslySetInnerHTML={{ __html: post.content }}
></div>
      </div>
    </div>
  );
}