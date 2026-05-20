import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import ReactQuill from "react-quill-new";
import "quill/dist/quill.snow.css";;

export default function ContentManager() {

  const [type, setType] = useState("blog");

  const [posts, setPosts] = useState([]);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image_url: "",
    event_date: "",
  });

  useEffect(() => {
    loadContent();
  }, [type]);

  const loadContent = async () => {

    const table =
      type === "blog"
        ? "blog_posts"
        : "news_posts";

    const { data } = await supabase
      .from(table)
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    setPosts(data || []);
  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImage = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const fileName =
      `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, file);

    if (error) {

  console.log(error);

  alert(error.message);

  return;
}

const pixelRatio = window.devicePixelRatio || 1;

    const { data } = supabase.storage
      .from("blog-images")
      .getPublicUrl(fileName);

    setForm((prev) => ({
      ...prev,
      image_url: data.publicUrl,
    }));

    console.log(data.publicUrl);

    alert("Immagine caricata!");
  };

  const publish = async () => {

    if (type === "blog") {

      await supabase
        .from("blog_posts")
        .insert([
          {
            title: form.title,
            slug: form.slug,
            excerpt: form.excerpt,
            content: form.content,
            image_url: form.image_url,
            published: true,
          },
        ]);

    } else {

      await supabase
        .from("news_posts")
        .insert([
          {
            title: form.title,
            content: form.content,
            image_url: form.image_url,
            event_date: form.event_date,
          },
        ]);
    }

    setForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image_url: "",
      event_date: "",
    });

    loadContent();

    alert("Contenuto pubblicato!");
  };

  const remove = async (id) => {

    const table =
      type === "blog"
        ? "blog_posts"
        : "news_posts";

    await supabase
      .from(table)
      .delete()
      .eq("id", id);

    loadContent();
  };

  return (

    <section className="py-24 px-6 bg-zinc-950">

      <div className="max-w-5xl mx-auto">

        <h2 className="text-4xl font-bold text-yellow-500 mb-10 text-center">
          Gestione Contenuti
        </h2>

        <div className="flex gap-4 mb-8">

          <button
            onClick={() => setType("blog")}
            className={`px-6 py-3 rounded-2xl ${
              type === "blog"
                ? "bg-yellow-500 text-black"
                : "bg-zinc-800 text-white"
            }`}
          >
            Blog
          </button>

          <button
            onClick={() => setType("news")}
            className={`px-6 py-3 rounded-2xl ${
              type === "news"
                ? "bg-yellow-500 text-black"
                : "bg-zinc-800 text-white"
            }`}
          >
            News
          </button>

        </div>

        <div className="space-y-4 mb-14">

          <input
            name="title"
            placeholder="Titolo"
            value={form.title}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-yellow-700 text-white"
          />

          {type === "blog" && (

            <>
              <input
                name="slug"
                placeholder="slug-articolo"
                value={form.slug}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-black border border-yellow-700 text-white"
              />

              <div className="bg-white text-black rounded-2xl overflow-hidden">

  <ReactQuill
    theme="snow"
    value={form.content}
    onChange={(value) =>
      setForm({
        ...form,
        content: value,
      })
    }
    className="h-72 mb-12"
  />

</div>
            </>

          )}

          <textarea
            name="content"
            placeholder="Contenuto"
            value={form.content}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-yellow-700 text-white h-52"
          />

          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
            className="w-full p-4 rounded-xl bg-black border border-yellow-700 text-white"
          />

          {type === "news" && (

            <input
              type="date"
              name="event_date"
              value={form.event_date}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black border border-yellow-700 text-white"
            />

          )}

          <button
            onClick={() => {

  if (!form.image_url) {
    alert("Attendi caricamento immagine");
    return;
  }

  publish();
}}
            className="bg-yellow-500 text-black font-bold px-8 py-4 rounded-2xl hover:bg-yellow-400"
          >
            Pubblica
          </button>

        </div>

        <div className="space-y-6">

          {posts.map((post) => (

            <div
              key={post.id}
              className="bg-black border border-yellow-700 rounded-3xl p-6 flex justify-between items-center"
            >

              <div>

                <h3 className="text-2xl font-bold text-yellow-400">
                  {post.title}
                </h3>

              </div>

              <button
                onClick={() => remove(post.id)}
                className="bg-red-600 hover:bg-red-500 px-5 py-3 rounded-xl"
              >
                Elimina
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
}