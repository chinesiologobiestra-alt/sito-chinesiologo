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

  const pdfWidth = 210;
  const pdfHeight = 297;

  for (let i = 0; i < pagine.length; i++) {

    const pagina = pagine[i];

    const canvas = await html2canvas(pagina, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: pagina.scrollWidth,
      windowHeight: pagina.scrollHeight,
    });

    console.log("========== PAGINA", i + 1, "==========");
    console.log("Canvas:", canvas.width, "x", canvas.height);

    const imgData = canvas.toDataURL("image/png");

    const ratio = canvas.width / canvas.height;

    let renderWidth = pdfWidth;
    let renderHeight = renderWidth / ratio;

    if (renderHeight > pdfHeight) {
      renderHeight = pdfHeight;
      renderWidth = renderHeight * ratio;
    }

    const x = (pdfWidth - renderWidth) / 2;
    const y = (pdfHeight - renderHeight) / 2;

    console.log("Rapporto:", ratio);
    console.log("Render:", renderWidth, "x", renderHeight);
    console.log("Posizione:", x, y);

    if (i > 0) {
      pdf.addPage();
    }

    pdf.addImage(
      imgData,
      "PNG",
      x,
      y,
      renderWidth,
      renderHeight,
      undefined,
      "FAST"
    );
  }

  pdf.save(`${nomeFile}.pdf`);
}