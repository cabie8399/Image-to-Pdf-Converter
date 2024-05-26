import { PDFDocument } from 'pdf-lib';

async function embedImages(dataBuffer) {
  const pdfDoc = await PDFDocument.create();
  for await (const buffer of dataBuffer) {
    const pngImage = await pdfDoc.embedPng(buffer);
    const pngDims = pngImage.scale(0.5);
    const page = pdfDoc.addPage();

    page.drawImage(pngImage, {
      x: page.getWidth() / 2 - pngDims.width / 2 + 75,
      y: page.getHeight() / 2 - pngDims.height + 250,
      width: pngDims.width,
      height: pngDims.height,
    });
  }
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

export default embedImages;
