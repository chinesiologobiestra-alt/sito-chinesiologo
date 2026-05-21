import { useState, useEffect } from "react";

export default function CookieBanner() {

  const [visible, setVisible] = useState(false);

  useEffect(() => {

    const accepted =
      localStorage.getItem("cookiesAccepted");

    if (!accepted) {
      setVisible(true);
    }

  }, []);

  const accept = () => {

    localStorage.setItem(
      "cookiesAccepted",
      "true"
    );

    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 bg-zinc-900 border border-yellow-700 rounded-3xl p-6 z-50">

      <p className="text-white mb-4">
        Questo sito utilizza cookie tecnici necessari al
        corretto funzionamento delle pagine.
      </p>

      <button
        onClick={accept}
        className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold"
      >
        Accetta
      </button>

    </div>
  );
}