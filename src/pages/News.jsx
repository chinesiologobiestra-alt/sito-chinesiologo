import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function News() {

  const [news, setNews] = useState([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {

    const { data } = await supabase
      .from("news_posts")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    setNews(data || []);
  };

  return (

    <div className="min-h-screen bg-black text-white px-6 py-24">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-yellow-500 mb-14">
          News & Eventi
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          {news.map((item) => (

            <a
  href={`/news/${item.id}`}
  key={item.id}
              className="bg-zinc-900 border border-yellow-700 rounded-3xl overflow-hidden"
            >

              {item.image_url && (

                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-72 object-cover"
                />

              )}

              <div className="p-8">

                {item.event_date && (

                  <p className="text-yellow-500 text-sm mb-4 uppercase tracking-widest">
                    Evento • {item.event_date}
                  </p>

                )}

                <h2 className="text-3xl font-bold text-yellow-400 mb-5">
                  {item.title}
                </h2>

                <p className="text-gray-300 leading-8 line-clamp-4">
  {item.content
    ?.replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .substring(0, 220)}...
</p>

              </div>

            </a>

          ))}

        </div>

      </div>

    </div>

  );
}