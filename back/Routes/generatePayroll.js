import PDFDocument from "pdfkit";
import fs from "fs";
import { transcode } from "buffer";

function generatePayrollSlip(
  matricule,
  nom,
  date,
  salaireDeBase,
  RetenueSecuSle,
  Panier,
  Transport,
  RetenueIrg,
  TotalGains,
  TotalRetenues,
  NET_A_PAYER
) {
  const doc = new PDFDocument();
  const outputPath = "payroll-slip.pdf";
  doc.pipe(fs.createWriteStream(outputPath));

  doc
    .fontSize(16)
    .text("Bulletin de paie - Janvier 2024", { align: "center" })
    .moveDown()
    .fontSize(12)
    .text("Company Name", { align: "left" })
    .text("123 Your Street", { align: "left" })
    .text("Your City, AB12 3BC", { align: "left" })
    .text("01234 456 789", { align: "left" })
    .moveDown(2);

  doc
    .fontSize(12)
    .text(`MATRICULE: ${matricule}`, { continued: true })
    .text(`Nom: ${nom}`, { align: "right" })
    .moveDown(0.5)
    .text("Fonction: 32222", { continued: true })
    .text("Sit. familiale: 32222", { align: "right" })
    .moveDown(0.5)
    .text("Affectation: 32222", { continued: true })
    .text(`Date ent: ${date}`, { align: "right" })
    .moveDown(0.5)
    .text("N° Compte: 32222", { continued: true })
    .text("N°SS: ", { align: "right" })
    .moveDown(2);

  const startX = 50;
  let startY = 300;
  const columnWidths = [80, 200, 60, 60, 60];

  doc
    .fontSize(10)
    .text("Code", startX, startY)
    .text("Libelle", startX + columnWidths[0], startY)
    .text("N/Base", startX + columnWidths[0] + columnWidths[1], startY)
    .text(
      "Taux",
      startX + columnWidths[0] + columnWidths[1] + columnWidths[2],
      startY
    )
    .text(
      "Gain",
      startX +
        columnWidths[0] +
        columnWidths[1] +
        columnWidths[2] +
        columnWidths[3],
      startY
    )
    .moveTo(startX, startY + 15)
    .lineTo(550, startY + 15)
    .stroke();

  const rows = [
    ["R30", "SALAIRE DE BASE", "24", "0.00", `${salaireDeBase}`],
    ["R510", "RETENUE SECU. SLE.", "120000", "9.00", `${RetenueSecuSle}`],
    ["N522", "PANIER (NOMBRE)", "", "", `${Panier}`],
    ["R532", "TRANSPORT", "8800", "", `${Transport}`],
    ["R660", "RETENUE IRG", "129000", "10.00", `${RetenueIrg}`],
  ];

  startY += 20;

  rows.forEach((row) => {
    row.forEach((cell, i) => {
      doc.text(
        cell,
        startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0),
        startY
      );
    });
    startY += 15;
  });

  doc
    .moveDown(2)
    .fontSize(12)
    .text(`Total Gains: ${TotalGains} DA`, { align: "left" })
    .text(`Total Retenues: ${TotalRetenues} DA`, { align: "left" })
    .moveDown()
    .fontSize(14)
    .text(`Net à Payer: ${NET_A_PAYER} DA`, {
      align: "right",
      underline: true,
    });

  doc.moveDown(2).fontSize(10).fillColor("gray");

  doc.end();
  console.log(`Payroll slip generated: ${outputPath}`);
}

export { generatePayrollSlip };
