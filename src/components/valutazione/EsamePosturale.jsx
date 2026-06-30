import PosturaSelect from "./PosturaSelect";

export default function EsamePosturale({
  scheda,
  setScheda,
}) {

  const posturale = scheda.posturale || {};

  function aggiorna(campo, valore) {
    setScheda((prev) => ({
      ...prev,
      posturale: {
        ...prev.posturale,
        [campo]: valore,
      },
    }));
  }

  const normale = ["Normale","DX","SX","Altro"];
  const curva = ["Normale","Aumentata","Ridotta"];
  const ginocchia = ["Normale","Valgo","Varo","Recurvato"];
  const piedi = ["Normale","Pronati","Supinati","Piatto","Cavo"];

  return (
    <div className="space-y-5">

      <div className="grid grid-cols-2 gap-6">

        <div>
          <h3 className="text-lg font-bold mb-2 text-yellow-600">
            Vista Anteriore
          </h3>

          <PosturaSelect label="Capo" value={posturale.capoFront}
            onChange={(v)=>aggiorna("capoFront",v)} options={normale} />

          <PosturaSelect label="Spalle" value={posturale.spalleFront}
            onChange={(v)=>aggiorna("spalleFront",v)} options={normale} />

          <PosturaSelect label="Clavicole" value={posturale.clavicole}
            onChange={(v)=>aggiorna("clavicole",v)} options={normale} />

          <PosturaSelect label="Torace" value={posturale.torace}
            onChange={(v)=>aggiorna("torace",v)}
            options={["Normale","Carenato","Escavato"]} />

          <PosturaSelect label="Bacino" value={posturale.bacinoFront}
            onChange={(v)=>aggiorna("bacinoFront",v)} options={normale} />

          <PosturaSelect label="Ginocchia" value={posturale.ginocchia}
            onChange={(v)=>aggiorna("ginocchia",v)} options={ginocchia} />

          <PosturaSelect label="Piedi" value={posturale.piedi}
            onChange={(v)=>aggiorna("piedi",v)} options={piedi} />
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2 text-yellow-600">
            Vista Laterale
          </h3>

          <PosturaSelect label="Capo" value={posturale.capoLat}
            onChange={(v)=>aggiorna("capoLat",v)}
            options={["Normale","Anteriorizzato","Posteriorizzato"]} />

          <PosturaSelect label="Spalle" value={posturale.spalleLat}
            onChange={(v)=>aggiorna("spalleLat",v)}
            options={["Normale","Anteriorizzate","Posteriorizzate"]} />

          <PosturaSelect label="Cifosi" value={posturale.cifosi}
            onChange={(v)=>aggiorna("cifosi",v)} options={curva} />

          <PosturaSelect label="Lordosi" value={posturale.lordosi}
            onChange={(v)=>aggiorna("lordosi",v)} options={curva} />

          <PosturaSelect label="Bacino" value={posturale.bacinoLat}
            onChange={(v)=>aggiorna("bacinoLat",v)}
            options={["Neutro","Antiversione","Retroversione"]} />
        </div>

      </div>

      <div>
        <h3 className="text-lg font-bold mb-2 text-yellow-600">
          Vista Posteriore
        </h3>

        <div className="grid grid-cols-2 gap-4">

          <PosturaSelect label="Scapole"
            value={posturale.scapole}
            onChange={(v)=>aggiorna("scapole",v)}
            options={["Normali","Alata DX","Alata SX","Alate Bilaterali"]} />

          <PosturaSelect label="Rachide"
            value={posturale.rachide}
            onChange={(v)=>aggiorna("rachide",v)}
            options={["Normale","Deviazione","Scoliosi"]} />

          <PosturaSelect label="Triangoli della taglia"
            value={posturale.triangoli}
            onChange={(v)=>aggiorna("triangoli",v)}
            options={["Simmetrici","Asimmetrici"]} />

          <PosturaSelect label="Tendine d'Achille"
            value={posturale.achille}
            onChange={(v)=>aggiorna("achille",v)}
            options={["Normale","Valgo","Varo"]} />

        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Osservazioni posturali
        </label>

        <textarea
          rows={4}
          value={posturale.note || ""}
          onChange={(e)=>aggiorna("note",e.target.value)}
          className="w-full rounded-lg border border-zinc-300 p-2 text-sm resize-none"
        />
      </div>

    </div>
  );
}