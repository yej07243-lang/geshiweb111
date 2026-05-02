export type ToolFaq = {
  question: string;
  answer: string;
};

export type Tool = {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  action: string;
  inputFormats: string[];
  outputFormat: string;
  accept: string;
  category: "document" | "image" | "audio";
  seoTitle: string;
  seoDescription: string;
  howToSteps: string[];
  about: string;
  faq: ToolFaq[];
  relatedTools: string[];
};

export const TOOLS: Tool[] = [
  {
    id: "pdf-to-word",
    slug: "pdf-to-word",
    name: "PDF to Word",
    title: "PDF to Word Converter",
    description: "Convert PDF files to editable Word documents online for free.",
    action: "convert PDF files to editable Word documents",
    inputFormats: [".pdf"],
    outputFormat: "docx",
    accept: ".pdf",
    category: "document",
    seoTitle: "PDF to Word Online Free | EasyFormat",
    seoDescription:
      "Use EasyFormat to convert PDF files to editable Word documents online for free. Fast, simple, secure, and no signup required.",
    howToSteps: ["Choose a PDF file from your device.", "Start the conversion and wait for the file to process.", "Download the converted Word document."],
    about:
      "The EasyFormat PDF to Word converter helps you turn PDF files into editable DOCX documents directly in your browser. It is useful when you need to revise text, reuse content, or move information from a PDF into a document workflow. Upload a PDF, start the conversion, and download the result when it is ready. The tool is designed for simple everyday files and does not require an account. Uploaded files are processed temporarily for conversion and are automatically deleted after 30 minutes. For best results, use clear PDFs with selectable text; scanned documents may not preserve layout or text perfectly.",
    faq: [
      { question: "Is the PDF to Word converter free?", answer: "Yes. You can use the PDF to Word tool for free without creating an account." },
      { question: "Will the Word file look exactly like the PDF?", answer: "Conversion quality depends on the source file. Text-based PDFs usually convert better than scanned or complex layout files." },
      { question: "How long are my files stored?", answer: "Uploaded and converted files are automatically deleted after 30 minutes." },
      { question: "Do I need to install software?", answer: "No. The converter runs online in your browser." },
    ],
    relatedTools: ["word-to-pdf", "compress-image", "jpg-to-png"],
  },
  {
    id: "word-to-pdf",
    slug: "word-to-pdf",
    name: "Word to PDF",
    title: "Word to PDF Converter",
    description: "Convert DOC or DOCX documents to PDF online for free.",
    action: "convert Word documents to PDF files",
    inputFormats: [".doc", ".docx"],
    outputFormat: "pdf",
    accept: ".doc,.docx",
    category: "document",
    seoTitle: "Word to PDF Online Free | EasyFormat",
    seoDescription:
      "Use EasyFormat to convert Word documents to PDF files online for free. Fast, simple, secure, and no signup required.",
    howToSteps: ["Select a DOC or DOCX file.", "Click the convert button to create a PDF.", "Download your PDF file when conversion finishes."],
    about:
      "The Word to PDF converter is built for quickly sharing documents in a more portable format. PDF files are easier to send, print, archive, and view consistently across devices. EasyFormat lets you upload a DOC or DOCX file and convert it online without installing office software in your browser workflow. The service is intended for fast, no-signup conversion of everyday documents. Files are stored only temporarily for processing and are automatically deleted after 30 minutes. Formatting accuracy can vary based on fonts, page layout, tables, and embedded media in the original document.",
    faq: [
      { question: "Can I convert DOCX to PDF for free?", answer: "Yes. DOC and DOCX files can be converted to PDF for free." },
      { question: "Do I need Microsoft Word installed?", answer: "No. Upload your Word file and EasyFormat handles the conversion online." },
      { question: "Are files deleted after conversion?", answer: "Yes. Files are automatically deleted after 30 minutes." },
      { question: "Is conversion accuracy guaranteed?", answer: "No. Most common documents work well, but exact formatting can vary." },
    ],
    relatedTools: ["pdf-to-word", "jpg-to-png", "png-to-jpg"],
  },
  {
    id: "jpg-to-png",
    slug: "jpg-to-png",
    name: "JPG to PNG",
    title: "JPG to PNG Converter",
    description: "Convert JPG images to PNG online for free.",
    action: "convert JPG images to PNG files",
    inputFormats: [".jpg", ".jpeg"],
    outputFormat: "png",
    accept: ".jpg,.jpeg",
    category: "image",
    seoTitle: "JPG to PNG Online Free | EasyFormat",
    seoDescription:
      "Use EasyFormat to convert JPG images to PNG files online for free. Fast, simple, secure, and no signup required.",
    howToSteps: ["Choose a JPG or JPEG image.", "Start the conversion to PNG.", "Download the converted PNG file."],
    about:
      "The JPG to PNG converter helps you change common JPEG images into PNG format for design, publishing, or web use. PNG is often preferred when you need lossless output or plan to continue editing an image after conversion. EasyFormat keeps the workflow simple: upload one image, convert it, and download the result. No account is required. Files are processed temporarily and automatically deleted after 30 minutes. Keep in mind that converting JPG to PNG does not restore detail that was already lost in the original compressed JPG file.",
    faq: [
      { question: "Can I convert JPEG files too?", answer: "Yes. Both .jpg and .jpeg files are supported." },
      { question: "Will JPG to PNG make the image transparent?", answer: "No. Conversion changes the format, but it does not automatically remove backgrounds." },
      { question: "Is there a file size limit?", answer: "Yes. The current maximum upload size is 200MB." },
    ],
    relatedTools: ["png-to-jpg", "webp-to-jpg", "compress-image"],
  },
  {
    id: "png-to-jpg",
    slug: "png-to-jpg",
    name: "PNG to JPG",
    title: "PNG to JPG Converter",
    description: "Convert PNG images to JPG online for free.",
    action: "convert PNG images to JPG files",
    inputFormats: [".png"],
    outputFormat: "jpg",
    accept: ".png",
    category: "image",
    seoTitle: "PNG to JPG Online Free | EasyFormat",
    seoDescription:
      "Use EasyFormat to convert PNG images to JPG files online for free. Fast, simple, secure, and no signup required.",
    howToSteps: ["Upload a PNG image.", "Convert the image to JPG.", "Download the new JPG file."],
    about:
      "The PNG to JPG converter is useful when you need a smaller, widely compatible image file. JPG is supported almost everywhere and is often a good choice for photos, email attachments, and web publishing. EasyFormat lets you convert PNG images online with a short no-signup workflow. Upload the image, start conversion, and download the output file. Uploaded and converted files are automatically deleted after 30 minutes. If your PNG includes transparency, the output JPG will not preserve transparent pixels because JPG does not support transparency.",
    faq: [
      { question: "Does JPG support transparent backgrounds?", answer: "No. Transparent areas from PNG files may be flattened during conversion." },
      { question: "Why convert PNG to JPG?", answer: "JPG files are often smaller and more widely supported for photos and web use." },
      { question: "Do I need an account?", answer: "No. You can convert files without signing up." },
    ],
    relatedTools: ["jpg-to-png", "webp-to-jpg", "compress-image"],
  },
  {
    id: "webp-to-jpg",
    slug: "webp-to-jpg",
    name: "WebP to JPG",
    title: "WebP to JPG Converter",
    description: "Convert WebP images to JPG online for free.",
    action: "convert WebP images to JPG files",
    inputFormats: [".webp"],
    outputFormat: "jpg",
    accept: ".webp",
    category: "image",
    seoTitle: "WebP to JPG Online Free | EasyFormat",
    seoDescription:
      "Use EasyFormat to convert WebP images to JPG files online for free. Fast, simple, secure, and no signup required.",
    howToSteps: ["Select a WebP image.", "Convert it to JPG format.", "Download the JPG result."],
    about:
      "The WebP to JPG converter helps when you need to use an image in apps, websites, or workflows that do not fully support WebP. JPG remains one of the most compatible image formats for sharing and publishing. EasyFormat provides a lightweight online conversion flow without requiring signup or software installation. Upload your WebP file, convert it, and download the JPG result. Files are temporarily processed and automatically deleted after 30 minutes. Because JPG is a lossy format, the result may differ slightly from the original WebP image.",
    faq: [
      { question: "Why convert WebP to JPG?", answer: "JPG is more widely supported by older apps, websites, and devices." },
      { question: "Is WebP upload supported?", answer: "Yes. You can upload .webp files up to 200MB." },
      { question: "Are images stored permanently?", answer: "No. Files are automatically deleted after 30 minutes." },
    ],
    relatedTools: ["jpg-to-png", "png-to-jpg", "compress-image"],
  },
  {
    id: "compress-image",
    slug: "compress-image",
    name: "Compress Image",
    title: "Compress Image Online",
    description: "Compress JPG, PNG, or WebP images online for free.",
    action: "compress image files",
    inputFormats: [".jpg", ".jpeg", ".png", ".webp"],
    outputFormat: "jpg",
    accept: ".jpg,.jpeg,.png,.webp",
    category: "image",
    seoTitle: "Compress Image Online Free | EasyFormat",
    seoDescription:
      "Use EasyFormat to compress image files online for free. Fast, simple, secure, and no signup required.",
    howToSteps: ["Choose a JPG, PNG, or WebP image.", "Start compression.", "Download the optimized image file."],
    about:
      "The image compression tool helps reduce file size for uploads, websites, email attachments, and everyday sharing. Smaller images can load faster and are easier to store or send. EasyFormat keeps compression simple with a browser-based workflow: choose an image, process it, and download the result. No signup is required. Uploaded images and generated files are automatically deleted after 30 minutes. Compression may change file format and visual quality depending on the source image and output settings, so review the result before using it in important projects.",
    faq: [
      { question: "What image formats can I compress?", answer: "JPG, JPEG, PNG, and WebP files are supported." },
      { question: "Will compression reduce quality?", answer: "Compression can reduce visual quality, especially for already optimized images." },
      { question: "Is the image compressor free?", answer: "Yes. You can compress images for free without signup." },
    ],
    relatedTools: ["jpg-to-png", "png-to-jpg", "webp-to-jpg"],
  },
  {
    id: "mp3-to-flac",
    slug: "mp3-to-flac",
    name: "MP3 to FLAC",
    title: "MP3 to FLAC Converter",
    description: "Convert MP3 audio files to FLAC online for free.",
    action: "convert MP3 audio files to FLAC files",
    inputFormats: [".mp3"],
    outputFormat: "flac",
    accept: ".mp3,audio/mpeg",
    category: "audio",
    seoTitle: "MP3 to FLAC Online Free | EasyFormat",
    seoDescription:
      "Use EasyFormat to convert MP3 audio files to FLAC online for free. Fast, simple, secure, and no signup required.",
    howToSteps: ["Choose an MP3 audio file.", "Start the conversion to FLAC.", "Download the converted FLAC file."],
    about:
      "The MP3 to FLAC converter helps you save an MP3 audio file in a lossless FLAC container for workflows that require FLAC compatibility. EasyFormat keeps the process simple: upload one MP3 file, convert it online, and download the FLAC result. No account is required. Uploaded and converted files are temporarily processed and automatically deleted after 30 minutes. Converting MP3 to FLAC does not restore audio detail that was already removed by MP3 compression, but it can still be useful when a destination app or archive workflow requires FLAC files.",
    faq: [
      { question: "Will MP3 to FLAC improve audio quality?", answer: "No. FLAC is lossless, but converting from MP3 cannot restore detail that was already lost." },
      { question: "Why convert MP3 to FLAC?", answer: "Use it when an app, archive, or workflow specifically requires FLAC files." },
      { question: "Are audio files stored permanently?", answer: "No. Files are automatically deleted after 30 minutes." },
    ],
    relatedTools: ["flac-to-aac"],
  },
  {
    id: "flac-to-aac",
    slug: "flac-to-aac",
    name: "FLAC to AAC",
    title: "FLAC to AAC Converter",
    description: "Convert FLAC audio files to AAC online for free.",
    action: "convert FLAC audio files to AAC files",
    inputFormats: [".flac"],
    outputFormat: "aac",
    accept: ".flac,audio/flac",
    category: "audio",
    seoTitle: "FLAC to AAC Online Free | EasyFormat",
    seoDescription:
      "Use EasyFormat to convert FLAC audio files to AAC online for free. Fast, simple, secure, and no signup required.",
    howToSteps: ["Select a FLAC audio file.", "Convert it to AAC format.", "Download the AAC result."],
    about:
      "The FLAC to AAC converter is useful when you need a smaller, widely supported audio file for phones, media libraries, sharing, or playback workflows. FLAC preserves audio without lossy compression, while AAC is designed for efficient playback at smaller file sizes. EasyFormat lets you upload a FLAC file, convert it in the browser workflow, and download an AAC result without signing up. Files are processed temporarily and automatically deleted after 30 minutes. Because AAC is lossy, review the converted audio before using it in important projects.",
    faq: [
      { question: "Will AAC be smaller than FLAC?", answer: "Usually yes. AAC uses lossy compression and is often much smaller than FLAC." },
      { question: "Does FLAC to AAC reduce quality?", answer: "AAC is lossy, so some audio detail can be removed during conversion." },
      { question: "Do I need to install software?", answer: "No. The converter runs online in your browser." },
    ],
    relatedTools: ["mp3-to-flac"],
  },
];

export function getToolById(id: string) {
  return TOOLS.find((tool) => tool.id === id || tool.slug === id);
}

export function getRelatedTools(tool: Tool) {
  return tool.relatedTools
    .map((id) => getToolById(id))
    .filter((relatedTool): relatedTool is Tool => Boolean(relatedTool));
}
