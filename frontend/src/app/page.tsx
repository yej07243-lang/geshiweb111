import { TOOLS } from "../lib/tools";
import Link from "next/link";
import { FileText, Image as ImageIcon, FileOutput, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Online File Converter
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Simple, fast and secure online file conversion tools for everyday tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TOOLS.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.id}`}
            className="group p-8 border rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all bg-white"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
              {tool.id.includes('pdf') || tool.id.includes('word') ? (
                <FileText className="text-blue-600 group-hover:text-white" />
              ) : (
                <ImageIcon className="text-blue-600 group-hover:text-white" />
              )}
            </div>
            <h2 className="text-xl font-bold mb-2 flex items-center">
              {tool.name}
              <ArrowRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>

      <section className="mt-24 py-12 border-t">
        <h2 className="text-3xl font-bold text-center mb-12">Why FastConvert?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <h3 className="font-bold text-lg mb-2">Secure & Private</h3>
            <p className="text-gray-500 text-sm">Your files are encrypted and automatically deleted from our servers after 30 minutes.</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg mb-2">High Quality</h3>
            <p className="text-gray-500 text-sm">We use the best conversion engines like LibreOffice to ensure high-quality results.</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg mb-2">Completely Free</h3>
            <p className="text-gray-500 text-sm">No registration required, no hidden costs. All tools are free to use.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

