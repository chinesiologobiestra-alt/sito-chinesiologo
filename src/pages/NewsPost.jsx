import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function NewsPost() {

  const { id } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {

    const { data } = await supabase
      .from("news_posts")
      .select("*")
      .eq("id", id)
      .single();

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

        {post.image_url && (

          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-[450px] object-cover rounded-3xl mb-10"
          />

        )}

        <h1 className="text-5xl font-bold text-yellow-500 mb-8">
          {post.title}
        </h1>

        {post.event_date && (

          <p className="text-yellow-400 mb-8 text-lg">
            Evento: {post.event_date}
          </p>

        )}

        <div
          className="text-gray-300 leading-8 text-lg"
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />

      </div>

    </div>

  );
}