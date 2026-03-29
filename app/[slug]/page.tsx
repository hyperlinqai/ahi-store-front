import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { slug: string };
}

interface PageData {
  title: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  isActive: boolean;
}

async function getPageData(slug: string): Promise<PageData | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1'}/pages/${slug}`, {
      next: { revalidate: 60 } // Revalidate every minute
    });
    
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Failed to fetch page:", error);
    return null;
  }
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const page = await getPageData(params.slug);

  if (!page || !page.isActive) {
    return { title: 'Page Not Found' };
  }

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription,
  };
}

export default async function CMSPage({ params }: PageProps) {
  const page = await getPageData(params.slug);

  if (!page || !page.isActive) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">
          {page.title}
        </h1>
        <article 
          className="prose prose-lg sm:prose-base max-w-none prose-headings:font-bold prose-a:text-brand-gold-600 hover:prose-a:text-brand-gold-500"
          dangerouslySetInnerHTML={{ __html: page.content }} 
        />
      </div>
    </div>
  );
}
