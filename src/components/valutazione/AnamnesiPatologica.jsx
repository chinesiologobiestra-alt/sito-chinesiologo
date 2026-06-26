import CheckboxGroup from "./CheckboxGroup";
import TextAreaField from "./TextAreaField";

const patologie = [
  "Cardiovascolari",
  "Respiratorie",
  "Metaboliche / Endocrine",
  "Gastrointestinali",
  "Neurologiche",
  "Ortopediche",
  "Psicologiche",
  "Altro",
];

const sintomi = [
  "Cervicalgia",
  "Dorsalgia",
  "Lombalgia",
  "Cefalea",
  "Vertigini",
  "Acufeni",
  "Bruciore",
  "Altro",
];

export default function AnamnesiPatologica({
  scheda,
  setScheda,
}) {

  const updateText = (campo, valore) => {
    setScheda({
      ...scheda,
      patologica: {
        ...scheda.patologica,
        [campo]: valore,
      },
    });
  };

  const toggleCheckbox = (gruppo, voce) => {

    const lista = scheda.patologica[gruppo] || [];

    const nuovaLista = lista.includes(voce)
      ? lista.filter((v) => v !== voce)
      : [...lista, voce];

    setScheda({
      ...scheda,
      patologica: {
        ...scheda.patologica,
        [gruppo]: nuovaLista,
      },
    });
  };

  return (

    <div className="space-y-6">

      <div className="grid grid-cols-2 gap-8">

        <CheckboxGroup
          title="Patologie"
          items={patologie}
          values={scheda.patologica.patologie || []}
          onToggle={(item) =>
            toggleCheckbox("patologie", item)
          }
        />

        <CheckboxGroup
          title="Disturbi / Sintomi"
          items={sintomi}
          values={scheda.patologica.sintomi || []}
          onToggle={(item) =>
            toggleCheckbox("sintomi", item)
          }
        />

      </div>

      <TextAreaField
        rows={2}
        label="Interventi chirurgici"
        value={scheda.patologica.interventi}
        onChange={(e) =>
          updateText("interventi", e.target.value)
        }
      />

      <TextAreaField
        rows={2}
        label="Traumi / Infortuni"
        value={scheda.patologica.traumi}
        onChange={(e) =>
          updateText("traumi", e.target.value)
        }
      />

      <TextAreaField
        rows={2}
        label="Farmaci assunti"
        value={scheda.patologica.farmaci}
        onChange={(e) =>
          updateText("farmaci", e.target.value)
        }
      />

      <TextAreaField
        rows={2}
        label="Allergie / Intolleranze"
        value={scheda.patologica.allergie}
        onChange={(e) =>
          updateText("allergie", e.target.value)
        }
      />

    </div>

  );

}