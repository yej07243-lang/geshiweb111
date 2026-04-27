export type Tool = {
  id: string;
  name: { en: string; zh: string };
  description: { en: string; zh: string };
  from: string[];
  to: string;
  faqs: { q: { en: string; zh: string }; a: { en: string; zh: string } }[];
};

export const TOOLS: Tool[] = [
  {
    id: "pdf-to-word",
    name: { en: "PDF to Word", zh: "PDF 转 Word" },
    description: { en: "Convert your PDF documents to editable DOCX files.", zh: "将您的 PDF 文档转换为可编辑的 DOCX 文件。" },
    from: [".pdf"],
    to: "docx",
    faqs: [
      { 
        q: { en: "Is it free?", zh: "这是免费的吗？" }, 
        a: { en: "Yes, our PDF to Word converter is completely free to use.", zh: "是的，我们的 PDF 转 Word 工具完全免费使用。" } 
      }
    ]
  },
  {
    id: "word-to-pdf",
    name: { en: "Word to PDF", zh: "Word 转 PDF" },
    description: { en: "Convert DOCX or DOC documents to professional PDF files.", zh: "将 DOCX 或 DOC 文档转换为专业的 PDF 文件。" },
    from: [".doc", ".docx"],
    to: "pdf",
    faqs: []
  },
  {
    id: "jpg-to-png",
    name: { en: "JPG to PNG", zh: "JPG 转 PNG" },
    description: { en: "Convert JPG images to PNG with transparency support.", zh: "将 JPG 图像转换为支持透明度的 PNG 格式。" },
    from: [".jpg", ".jpeg"],
    to: "png",
    faqs: []
  },
  {
    id: "png-to-jpg",
    name: { en: "PNG to JPG", zh: "PNG 转 JPG" },
    description: { en: "Convert PNG images to JPG format to reduce file size.", zh: "将 PNG 图像转换为 JPG 格式以减小文件体积。" },
    from: [".png"],
    to: "jpg",
    faqs: []
  },
  {
    id: "webp-to-jpg",
    name: { en: "WebP to JPG", zh: "WebP 转 JPG" },
    description: { en: "Convert modern WebP images to widely supported JPG format.", zh: "将现代 WebP 图像转换为广泛支持的 JPG 格式。" },
    from: [".webp"],
    to: "jpg",
    faqs: []
  },
  {
    id: "compress-image",
    name: { en: "Compress Image", zh: "图片压缩" },
    description: { en: "Reduce the file size of your JPG, PNG, or WebP images.", zh: "减小 JPG、PNG 或 WebP 图像的文件体积。" },
    from: [".jpg", ".jpeg", ".png", ".webp"],
    to: "keep",
    faqs: []
  }
];