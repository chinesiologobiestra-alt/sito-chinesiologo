import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function generaPDF(
  nomeFile = "Documento",
  orientation = "portrait"
) {
  const pagine = document.querySelectorAll(".pdf-page");

  if (!pagine.length) {
    alert("Nessuna pagina trovata.");
    return;
  }

  const pdf = new jsPDF({
    orientation,
    unit: "mm",
    format: "a4",
  });

  const pdfWidth = orientation === "portrait" ? 210 : 297;
  const pdfHeight = orientation === "portrait" ? 297 : 210;

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