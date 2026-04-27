export type Tool = {
  id: string;
  name: { en: string; zh: string };
  description: { en: string; zh: string };
  from: string[];
  to: string;
  category: "document" | "image";
  faqs: { q: { en: string; zh: string }; a: { en: string; zh: string } }[];
};

export const TOOLS: Tool[] = [
  {
    id: "pdf-to-word",
    name: { en: "PDF to Word", zh: "PDF 转 Word" },
    description: { en: "Convert PDF documents into editable DOCX files.", zh: "将 PDF 文档转换为可编辑的 DOCX 文件。" },
    from: [".pdf"],
    to: "docx",
    category: "document",
    faqs: [
      {
        q: { en: "Is it free?", zh: "这是免费的吗？" },
        a: { en: "Yes, the converter is free to use.", zh: "是的，该转换工具可以免费使用。" },
      },
    ],
  },
  {
    id: "word-to-pdf",
    name: { en: "Word to PDF", zh: "Word 转 PDF" },
    description: { en: "Convert DOCX or DOC documents into clean PDF files.", zh: "将 DOCX 或 DOC 文档转换为 PDF 文件。" },
    from: [".doc", ".docx"],
    to: "pdf",
    category: "document",
    faqs: [],
  },
  {
    id: "jpg-to-png",
    name: { en: "JPG to PNG", zh: "JPG 转 PNG" },
    description: { en: "Convert JPG images to PNG format.", zh: "将 JPG 图片转换为 PNG 格式。" },
    from: [".jpg", ".jpeg"],
    to: "png",
    category: "image",
    faqs: [],
  },
  {
    id: "png-to-jpg",
    name: { en: "PNG to JPG", zh: "PNG 转 JPG" },
    description: { en: "Convert PNG images to smaller JPG files.", zh: "将 PNG 图片转换为体积更小的 JPG 文件。" },
    from: [".png"],
    to: "jpg",
    category: "image",
    faqs: [],
  },
  {
    id: "webp-to-jpg",
    name: { en: "WebP to JPG", zh: "WebP 转 JPG" },
    description: { en: "Convert WebP images to widely supported JPG format.", zh: "将 WebP 图片转换为兼容性更好的 JPG 格式。" },
    from: [".webp"],
    to: "jpg",
    category: "image",
    faqs: [],
  },
  {
    id: "compress-image",
    name: { en: "Compress Image", zh: "图片压缩" },
    description: { en: "Reduce the file size of JPG, PNG, or WebP images.", zh: "压缩 JPG、PNG 或 WebP 图片体积。" },
    from: [".jpg", ".jpeg", ".png", ".webp"],
    to: "jpg",
    category: "image",
    faqs: [],
  },
];
