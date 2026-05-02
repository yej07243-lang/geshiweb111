export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoLandingPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  keyword: string;
  toolSlug: string;
  toolName: string;
  toolIntro: string;
  primaryUse: string;
  audience: string;
  sourceFormat: string;
  targetFormat: string;
  qualityNote: string;
  securityNote: string;
  relatedTools: string[];
  faq: SeoFaq[];
};

export const SEO_LANDING_PAGES: SeoLandingPage[] = [
  {
    slug: "convert-pdf-to-word",
    title: "Convert PDF to Word Online Free | EasyFormat",
    description:
      "Convert PDF to Word online for free with EasyFormat. Upload a PDF, create an editable DOCX file, and download it with no signup required.",
    h1: "Convert PDF to Word Online",
    keyword: "convert PDF to Word",
    toolSlug: "pdf-to-word",
    toolName: "PDF to Word Converter",
    toolIntro:
      "Use the PDF to Word converter when a fixed PDF needs to become an editable document for rewriting, quoting, review, or republishing.",
    primaryUse:
      "The page is designed for people who already have a PDF and need a Word document quickly, without installing office software or learning a complex editor.",
    audience: "students, office teams, freelancers, admins, editors, and anyone who receives documents in PDF format",
    sourceFormat: "PDF",
    targetFormat: "DOCX",
    qualityNote:
      "Text-based PDFs usually convert more cleanly than scanned PDFs. If the file contains columns, tables, unusual fonts, or image-only pages, open the downloaded Word file and review the layout before sharing it.",
    securityNote:
      "EasyFormat processes uploaded files temporarily for conversion, and files auto delete after 30 minutes. Avoid uploading highly sensitive legal, medical, financial, or confidential files to any online converter.",
    relatedTools: ["word-to-pdf", "compress-image", "jpg-to-png"],
    faq: [
      { question: "Can I convert PDF to Word for free?", answer: "Yes. EasyFormat lets you convert supported PDF files to Word online without signup." },
      { question: "Will the Word document be editable?", answer: "Text-based PDFs usually produce editable DOCX output, but scanned files may need OCR or manual cleanup." },
      { question: "How long are uploaded PDFs stored?", answer: "Files are processed temporarily and deleted automatically after 30 minutes." },
      { question: "Do I need Microsoft Word installed?", answer: "No. You can convert in the browser and open the downloaded DOCX in any compatible editor." },
    ],
  },
  {
    slug: "how-to-convert-pdf-to-word",
    title: "How to Convert PDF to Word Online | EasyFormat",
    description:
      "Learn how to convert PDF to Word online, when DOCX output is useful, and how to review converted documents before editing or sharing.",
    h1: "How to Convert PDF to Word",
    keyword: "how to convert PDF to Word",
    toolSlug: "pdf-to-word",
    toolName: "PDF to Word Converter",
    toolIntro:
      "The fastest workflow is to choose a PDF, run the converter, download the DOCX, and review the result before making edits.",
    primaryUse:
      "This guide helps users understand the steps, limits, and best practices behind PDF to Word conversion, especially when layout accuracy matters.",
    audience: "people preparing reports, forms, study notes, contracts, article drafts, and reusable document content",
    sourceFormat: "PDF",
    targetFormat: "Word DOCX",
    qualityNote:
      "A PDF that was exported from Word, Google Docs, or another editor will usually convert better than a scanned paper document. Complex layouts may still need small adjustments.",
    securityNote:
      "Before uploading, make sure you have permission to process the document. EasyFormat deletes temporary files automatically after 30 minutes, but sensitive files deserve extra care.",
    relatedTools: ["word-to-pdf", "compress-image", "png-to-jpg"],
    faq: [
      { question: "What is the easiest way to convert PDF to Word?", answer: "Open the PDF to Word tool, upload the PDF, start conversion, and download the DOCX file." },
      { question: "Why does my converted file need cleanup?", answer: "PDF is a final-layout format, so tables, columns, images, and scanned pages can require manual adjustment after conversion." },
      { question: "Can I convert a PDF and then make it a PDF again?", answer: "Yes. Convert PDF to Word for editing, then use Word to PDF when the document is ready to share." },
      { question: "Is signup required?", answer: "No. The EasyFormat PDF to Word workflow does not require an account." },
    ],
  },
  {
    slug: "compress-image-to-100kb",
    title: "Compress Image to 100KB Online | EasyFormat",
    description:
      "Compress images online toward 100KB for uploads, email, forms, and websites. Reduce JPG, PNG, or WebP file size with no signup.",
    h1: "Compress Image to 100KB Online",
    keyword: "compress image to 100KB",
    toolSlug: "compress-image",
    toolName: "Compress Image",
    toolIntro:
      "Use the image compressor when an upload form, email system, profile page, or website has a strict file size limit.",
    primaryUse:
      "The goal is to reduce image file size while keeping the picture usable for the destination, whether that destination is a form, website, message, or document.",
    audience: "job applicants, students, website owners, marketplace sellers, support teams, and people submitting online forms",
    sourceFormat: "JPG, PNG, or WebP",
    targetFormat: "compressed image output",
    qualityNote:
      "A 100KB target is easier for small photos, screenshots, and simple graphics than for large detailed images. If the result looks too soft, resize the image dimensions first or use a slightly larger limit.",
    securityNote:
      "Images are processed temporarily and deleted automatically after 30 minutes. Do not upload private IDs, confidential screenshots, or sensitive personal images unless an online workflow is appropriate.",
    relatedTools: ["png-to-jpg", "jpg-to-png", "webp-to-jpg"],
    faq: [
      { question: "Can every image be compressed to exactly 100KB?", answer: "Not always. Very large or detailed images may need resizing or stronger compression to approach 100KB." },
      { question: "Will compression reduce quality?", answer: "Yes, compression can reduce visual detail, so review the downloaded image before uploading it elsewhere." },
      { question: "Which formats can I compress?", answer: "EasyFormat supports JPG, JPEG, PNG, and WebP image uploads for compression." },
      { question: "Is the image compressor free?", answer: "Yes. You can compress supported images online without signup." },
    ],
  },
  {
    slug: "reduce-image-size-online",
    title: "Reduce Image Size Online Free | EasyFormat",
    description:
      "Reduce image size online for free. Compress JPG, PNG, and WebP files for faster uploads, smaller emails, and lighter web pages.",
    h1: "Reduce Image Size Online",
    keyword: "reduce image size online",
    toolSlug: "compress-image",
    toolName: "Compress Image",
    toolIntro:
      "Use the compression tool when an image is too large for upload, slow to send, or heavier than needed for a web page.",
    primaryUse:
      "Reducing image size helps remove practical blockers: failed uploads, slow page speed, oversized email attachments, and storage-heavy media folders.",
    audience: "bloggers, creators, students, office workers, support agents, developers, and anyone preparing images for online use",
    sourceFormat: "JPG, PNG, WebP, or JPEG",
    targetFormat: "smaller image file",
    qualityNote:
      "Compression is a balance between file size and visible quality. Photos often tolerate compression well, while screenshots with text may need a gentler setting or a format conversion.",
    securityNote:
      "EasyFormat deletes temporary upload and output files after 30 minutes. Keep a local original before compressing, especially if the image is important.",
    relatedTools: ["jpg-to-png", "png-to-jpg", "webp-to-jpg"],
    faq: [
      { question: "What is the best way to reduce image size?", answer: "Compress the image, convert to a more suitable format, or resize dimensions before upload." },
      { question: "Does reducing size change image dimensions?", answer: "Compression mainly reduces file weight; dimensions may depend on the tool settings and output process." },
      { question: "Should I keep the original image?", answer: "Yes. Keep the original in case the compressed output loses too much detail." },
      { question: "Can smaller images improve websites?", answer: "Yes. Smaller images can reduce load time and make pages easier to deliver." },
    ],
  },
  {
    slug: "free-file-converter-online",
    title: "Free File Converter Online | EasyFormat",
    description:
      "Use EasyFormat as a free file converter online for PDF, Word, JPG, PNG, WebP, MP3, FLAC, AAC, and image compression tasks with no signup required.",
    h1: "Free File Converter Online",
    keyword: "free file converter online",
    toolSlug: "pdf-to-word",
    toolName: "PDF to Word Converter",
    toolIntro:
      "EasyFormat brings common document, image, and audio converters together so users can move from one file format to another in a focused workflow.",
    primaryUse:
      "This page is for users who do not know which exact converter they need yet, but know they need a fast online utility for documents, images, or audio files.",
    audience: "students, small businesses, creators, office workers, website owners, and everyday users with mixed file formats",
    sourceFormat: "PDF, DOC, DOCX, JPG, PNG, JPEG, WebP, MP3, or FLAC",
    targetFormat: "PDF, DOCX, JPG, PNG, compressed image output, FLAC, or AAC",
    qualityNote:
      "Choose the converter based on the required destination format. PDF is useful for final sharing, DOCX for editing, JPG for compatibility, PNG for crisp graphics, compression for smaller uploads, and audio formats for playback or archive needs.",
    securityNote:
      "Files are processed temporarily and automatically deleted after 30 minutes. For highly sensitive content, consider whether an offline tool is a better fit.",
    relatedTools: ["mp3-to-flac", "flac-to-aac", "pdf-to-word"],
    faq: [
      { question: "What can I convert with EasyFormat?", answer: "EasyFormat supports common PDF, Word, JPG, PNG, WebP, MP3, FLAC, AAC, and image compression workflows." },
      { question: "Is EasyFormat free?", answer: "Yes. The current online converter tools are free to use without an account." },
      { question: "How do I choose the right converter?", answer: "Start with the file you have and the format required by the app, website, or person receiving it." },
      { question: "Are files stored permanently?", answer: "No. Uploaded and converted files auto delete after 30 minutes." },
    ],
  },
  {
    slug: "convert-mp3-to-flac",
    title: "Convert MP3 to FLAC Online Free | EasyFormat",
    description:
      "Convert MP3 to FLAC online for free with EasyFormat. Upload an MP3 audio file, create a FLAC file, and download it with no signup required.",
    h1: "Convert MP3 to FLAC Online",
    keyword: "convert MP3 to FLAC",
    toolSlug: "mp3-to-flac",
    toolName: "MP3 to FLAC Converter",
    toolIntro:
      "Use the MP3 to FLAC converter when an audio workflow, archive, player, or editing app requires a FLAC file.",
    primaryUse:
      "This page is designed for people who already have an MP3 file and need a FLAC output quickly without installing audio software.",
    audience: "musicians, podcasters, DJs, archivists, editors, students, and anyone preparing audio for a specific app or library",
    sourceFormat: "MP3",
    targetFormat: "FLAC",
    qualityNote:
      "FLAC is lossless, but converting from MP3 cannot restore audio detail already removed by MP3 compression. Use this conversion for format compatibility rather than quality recovery.",
    securityNote:
      "Audio files are processed temporarily for conversion and deleted automatically after 30 minutes. Keep a local copy of the original before uploading.",
    relatedTools: ["flac-to-aac"],
    faq: [
      { question: "Can I convert MP3 to FLAC for free?", answer: "Yes. EasyFormat lets you convert MP3 audio files to FLAC online without signup." },
      { question: "Does MP3 to FLAC improve quality?", answer: "No. The output is FLAC, but quality cannot exceed the original MP3 source." },
      { question: "Why would I convert MP3 to FLAC?", answer: "Convert when an archive, media library, editor, or playback workflow specifically requires FLAC." },
      { question: "How long are uploaded audio files stored?", answer: "Uploaded and converted files are deleted automatically after 30 minutes." },
    ],
  },
  {
    slug: "convert-flac-to-aac",
    title: "Convert FLAC to AAC Online Free | EasyFormat",
    description:
      "Convert FLAC to AAC online for free. Upload a FLAC audio file, create a smaller AAC file, and download it with no signup required.",
    h1: "Convert FLAC to AAC Online",
    keyword: "convert FLAC to AAC",
    toolSlug: "flac-to-aac",
    toolName: "FLAC to AAC Converter",
    toolIntro:
      "Use the FLAC to AAC converter when a large lossless audio file needs a smaller playback-friendly format.",
    primaryUse:
      "This page is designed for people who need to turn FLAC audio into AAC for phones, media libraries, messaging, editing, or compatibility.",
    audience: "music listeners, creators, editors, students, podcast teams, and anyone preparing audio for portable playback or sharing",
    sourceFormat: "FLAC",
    targetFormat: "AAC",
    qualityNote:
      "AAC is lossy, so the converted file is usually smaller but may remove some audio detail. Listen to the output before using it in an important project.",
    securityNote:
      "EasyFormat processes audio files temporarily and deletes uploaded and converted files after 30 minutes.",
    relatedTools: ["mp3-to-flac"],
    faq: [
      { question: "Can I convert FLAC to AAC online?", answer: "Yes. Upload a supported FLAC file, convert it to AAC, and download the result." },
      { question: "Will AAC be smaller than FLAC?", answer: "Usually yes. AAC uses lossy compression and is commonly much smaller than FLAC." },
      { question: "Does FLAC to AAC reduce quality?", answer: "AAC can reduce audio detail because it is a lossy format." },
      { question: "Do I need to install FFmpeg?", answer: "No. EasyFormat handles conversion online in the browser workflow." },
    ],
  },
  {
    slug: "audio-converter-online",
    title: "Audio Converter Online Free | MP3, FLAC, AAC | EasyFormat",
    description:
      "Use EasyFormat as a free online audio converter for MP3, FLAC, and AAC workflows. Convert audio files with no signup required.",
    h1: "Audio Converter Online",
    keyword: "audio converter online",
    toolSlug: "flac-to-aac",
    toolName: "FLAC to AAC Converter",
    toolIntro:
      "EasyFormat includes focused audio conversion tools for practical MP3, FLAC, and AAC format changes.",
    primaryUse:
      "This page is for users who need a simple online audio converter and want to choose the right output format for playback, archiving, editing, or sharing.",
    audience: "music listeners, creators, podcast editors, students, support teams, and anyone moving audio between apps or devices",
    sourceFormat: "MP3 or FLAC",
    targetFormat: "FLAC or AAC",
    qualityNote:
      "Choose the output based on your destination. FLAC is useful for lossless-compatible workflows, while AAC is useful for smaller playback-friendly files.",
    securityNote:
      "Audio files are processed temporarily and automatically deleted after 30 minutes. Avoid uploading audio you do not have permission to process.",
    relatedTools: ["mp3-to-flac", "flac-to-aac"],
    faq: [
      { question: "What audio formats can EasyFormat convert?", answer: "EasyFormat currently supports MP3 to FLAC and FLAC to AAC conversion workflows." },
      { question: "Is the online audio converter free?", answer: "Yes. The current audio conversion tools are free to use without creating an account." },
      { question: "Which audio format should I choose?", answer: "Use FLAC when a workflow requires lossless-compatible output and AAC when you need a smaller playback-friendly file." },
      { question: "Are audio files deleted?", answer: "Yes. Uploaded and converted audio files auto delete after 30 minutes." },
    ],
  },
];

export function getSeoLandingPage(slug: string) {
  return SEO_LANDING_PAGES.find((page) => page.slug === slug);
}

export function getSeoLandingSections(page: SeoLandingPage) {
  return [
    {
      heading: `What ${page.keyword} means`,
      paragraphs: [
        `${page.h1} is a practical search because users usually want a finished file, not a long technical explanation. The file they have is blocking the next step: an upload form asks for a different format, a document needs editing, a website needs a smaller image, an audio player needs a compatible file, or a recipient cannot open the original file. EasyFormat focuses on these common moments by giving each task a clear page, a visible tool entry, and direct links to related converters. ${page.primaryUse}`,
        `The important idea is that conversion should match the destination. ${page.sourceFormat} and ${page.targetFormat} serve different needs, so the best workflow starts by asking where the file will go next. If the destination is an editor, choose an editable format. If the destination is sharing or printing, choose a stable format. If the destination is a form, website, media library, or player, file size and compatibility often matter as much as visual or audio quality.`,
      ],
    },
    {
      heading: "When to use this online tool",
      paragraphs: [
        `This workflow is useful for ${page.audience}. It is especially helpful when you only need to handle one file and do not want to install a large desktop application. Online conversion also helps on shared computers, lightweight laptops, and devices where the original editing software is unavailable. The EasyFormat approach is intentionally narrow: choose a converter, upload a supported file, start the process, and download the output.`,
        `A focused online tool reduces small mistakes. It shows the supported input formats, the expected output format, and the next action. That matters because many users arrive from a search result with a specific job in mind. They do not want a complex dashboard or a generic file manager; they want a reliable path from the current file to the required file. EasyFormat keeps the page centered on that task while still offering internal links for related needs.`,
      ],
    },
    {
      heading: "Recommended workflow",
      paragraphs: [
        `Start by opening the recommended tool on this page. Choose the file from your device, confirm that the format is supported, and run the conversion or compression. When the result is ready, download it and open it before sending, publishing, playing, or uploading it elsewhere. This review step is small, but it prevents many common problems such as missing text, changed layout, softened images, flattened transparency, audio artifacts, or a file that is still larger than the destination allows.`,
        `${page.qualityNote} Keep the original file until the new file has been accepted by the destination. If the output is not right, return to the original rather than repeatedly processing a processed copy. Repeated conversion or compression can make quality worse, especially with image files, lossy audio files, or complex documents.`,
      ],
    },
    {
      heading: "File safety and temporary processing",
      paragraphs: [
        `${page.securityNote} Online tools are convenient, but users should still think about file sensitivity before uploading. A school assignment, blog image, product photo, sample audio clip, or everyday office file may be a reasonable fit. A confidential contract, private medical record, financial statement, unreleased audio master, or file you do not have permission to process deserves more caution.`,
        `EasyFormat is designed for temporary conversion tasks rather than permanent storage. The short workflow helps you finish the job and move on: upload, process, download, and review. You remain responsible for checking the output and deciding whether it is appropriate to share. For important files, keep backups and compare the result with the source before deleting anything locally.`,
      ],
    },
    {
      heading: "Related conversion tasks",
      paragraphs: [
        `File conversion often becomes a chain of small tasks. A PDF may become Word for editing and then return to PDF for sharing. A PNG may become JPG for compatibility and then need compression for an upload limit. A WebP image may become JPG because an older platform does not accept modern image formats. A FLAC audio file may become AAC for smaller playback-friendly sharing. The internal links on this page help users continue that workflow without starting a new search.`,
        `If you are unsure which tool to choose, use the requirement from the destination as the guide. Look at the file extension requested by the website, app, teacher, client, teammate, media library, or playback device, then select the converter that creates that output. This simple habit keeps conversion practical and avoids unnecessary format changes.`,
      ],
    },
  ];
}
