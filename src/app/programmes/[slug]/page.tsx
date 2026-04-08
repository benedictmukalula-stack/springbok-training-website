import type { Metadata } from 'next';
import { getAllCourses } from '@/lib/courses-data';
import CourseDetailClient from './CourseDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const courses = getAllCourses();
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getAllCourses().find((c) => c.slug === slug);
  if (!course) return { title: 'Course Not Found' };
  return {
    title: `${course.title} | Springbok Training Academy`,
    description: course.shortDescription,
    openGraph: {
      title: course.title,
      description: course.shortDescription,
      siteName: 'Springbok Training and Business Solutions',
      type: 'website',
    },
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = getAllCourses().find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h1>
          <p className="text-gray-500 mb-6">The course you&apos;re looking for doesn&apos;t exist.</p>
          <a href="/programmes" className="text-[#16a34a] font-medium hover:underline">
            ← Back to Programmes
          </a>
        </div>
      </div>
    );
  }

  return <CourseDetailClient course={course} />;
}
