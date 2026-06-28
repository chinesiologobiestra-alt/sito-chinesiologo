import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function generaPDF(nomeFile = "Valutazione") {

  const element = document.getElementById("scheda-valutazione");

  const canvas = await html2canvas(element, {

    scale: 3,
    useCORS: true,
    backgroundColor: "#ffffff",
    scrollY: -window.scrollY,

  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = 210;

  const pdfHeight = 297;

  const imgWidth = pdfWidth;

  const imgHeight =
    (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;

  let position = 0;

  pdf.addImage(
    imgData,
    "PNG",
    0,
    position,
    imgWidth,
    imgHeight,
    "",
    "FAST"
  );

  heightLeft -= pdfHeight;

  while (heightLeft > 0) {

    position = heightLeft - imgHeight;

    pdf.addPage();

    pdf.addImage(
      imgData,
      "PNG",
      0,
      position,
      imgWidth,
      imgHeight,
      "",
      "FAST"
    );

    heightLeft -= pdfHeight;

  }

  pdf.save(`${nomeFile}.pdf`);

}