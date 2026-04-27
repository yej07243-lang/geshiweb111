export type Tool = {
    id: string;
    name: string;
    description: string;
    seoTitle: string;
    seoDesc: string;
    from: string[];
    to: string;
    faqs: { q: string; a: string }[];
  };
  
  export const TOOLS: Tool[] = [
    {
      id: 'pdf-to-word',
      name: 'PDF to Word',
      description: 'Convert your PDF documents to editable DOCX files.',
      seoTitle: 'Convert PDF to Word Online - Free & Experimental',
      seoDesc: 'Easily convert PDF to Word (DOCX) online. Experimental feature with high fidelity.',
      from: ['.pdf'],
      to: 'docx',
      faqs: [
        { q: 'Is it free?', a: 'Yes, our PDF to Word converter is completely free to use.' },
        { q: 'How long are my files kept?', a: 'All files are automatically deleted after 30 minutes.' }
      ]
    },
    {
      id: 'word-to-pdf',
      name: 'Word to PDF',
      description: 'Convert DOCX or DOC documents to professional PDF files.',
      seoTitle: 'Convert Word to PDF Online - Fast & Secure',
      seoDesc: 'Professional Word to PDF conversion. Keep your layout and fonts intact.',
      from: ['.doc', '.docx'],
      to: 'pdf',
      faqs: [
        { q: 'Will my formatting be preserved?', a: 'Yes, we use LibreOffice to ensure the best possible layout retention.' }
      ]
    },
    {
      id: 'jpg-to-png',
      name: 'JPG to PNG',
      description: 'Convert JPG images to PNG with transparency support.',
      seoTitle: 'JPG to PNG Converter - Online Image Conversion',
      seoDesc: 'Convert JPEG to PNG format easily. Fast, free, and secure.',
      from: ['.jpg', '.jpeg'],
      to: 'png',
      faqs: [
        { q: 'Can I convert multiple files?', a: 'Currently, we support one file at a time for maximum speed.' }
      ]
    },
    {
      id: 'png-to-jpg',
      name: 'PNG to JPG',
      description: 'Convert PNG images to JPG format to reduce file size.',
      seoTitle: 'PNG to JPG Converter - Reduce Image File Size',
      seoDesc: 'Easily convert PNG to JPG and optimize your images for the web.',
      from: ['.png'],
      to: 'jpg',
      faqs: []
    },
    {
      id: 'webp-to-jpg',
      name: 'WebP to JPG',
      description: 'Convert modern WebP images to widely supported JPG format.',
      seoTitle: 'WebP to JPG Converter - High Quality Conversion',
      seoDesc: 'Convert WebP to JPG online. Maintain image quality while ensuring compatibility.',
      from: ['.webp'],
      to: 'jpg',
      faqs: []
    },
    {
      id: 'compress-image',
      name: 'Compress Image',
      description: 'Reduce the file size of your JPG, PNG, or WebP images.',
      seoTitle: 'Online Image Compressor - Reduce File Size without Quality Loss',
      seoDesc: 'Compress JPG, PNG, and WebP images quickly. Save storage and bandwidth.',
      from: ['.jpg', '.jpeg', '.png', '.webp'],
      to: 'keep',
      faqs: [
        { q: 'How much can I compress?', a: 'It depends on the image, but we typically achieve 50-80% reduction.' }
      ]
    }
  ];
