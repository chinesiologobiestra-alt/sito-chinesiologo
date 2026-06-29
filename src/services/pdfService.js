import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function generaPDF(nomeFile = "Valutazione") {

  const pagine = document.querySelectorAll(".pdf-page");

  if (!pagine.length) {

    alert("Nessuna pagina trovata.");

    return;

  }

  const pdf = new jsPDF({

    orientation: "portrait",
    unit: "mm",
    format: "a4",

  });

  const pageWidth = 210;
  const pageHeight = 297;

  const margin = 5;

  const printableWidth = pageWidth - margin * 2;
  const printableHeight = pageHeight - margin * 2;

  for (let i = 0; i < pagine.length; i++) {

    const canvas = await html2canvas(pagine[i], {

      scale: 3,

      useCORS: true,

      backgroundColor: "#ffffff",

      logging: false,

      scrollX: 0,

      scrollY: 0,

      windowWidth: pagine[i].scrollWidth,

      windowHeight: pagine[i].scrollHeight,

    });

    const imgData = canvas.toDataURL("image/png");

    if (i > 0) {

      pdf.addPage();

    }

    pdf.addImage(

      imgData,

      "PNG",

      margin,

      margin,

      printableWidth,

      printableHeight,

      undefined,

      "FAST"

    );

  }

  pdf.save(`${nomeFile}.pdf`);

}