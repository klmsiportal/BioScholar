import Link from 'next/link';
import { BIO_MODULES } from '@/lib/data';
import { BookOpen, ChevronRight } from 'lucide-react';
import ClientHomeStats from '@/components/ClientHomeStats'; // New component for the chart

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Master Biology from Freshman to Senior</h1>
            <p className="text-lg text-slate-600">
                Comprehensive modules, interactive quizzes, and AI-powered visual explanations to help you ace your exams.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BIO_MODULES.map((mod) => (
                <Link href={`/module/${mod.id}`} key={mod.id} className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                    <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                        <BookOpen size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{mod.title}</h3>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-2">{mod.description}</p>
                    
                    <div className="flex items-center text-indigo-600 font-semibold text-sm group-hover:gap-2 transition-all">
                        Start Module <ChevronRight size={16} />
                    </div>
                </Link>
            ))}
        </div>

        {/* Stats / CTA Section */}
        <div className="mt-20 bg-slate-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-20 -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600 rounded-full blur-[100px] opacity-20 -ml-16 -mb-16"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h2 className="text-3xl font-bold mb-4">Track Your Progress</h2>
                    <p className="text-slate-300 max-w-md">
                        Visualize your learning journey with detailed analytics. Identify weak spots and master complex biological concepts.
                    </p>
                </div>
                {/* Client component for Recharts to avoid SSR issues */}
                <div className="w-full md:w-1/3 h-48 bg-white/5 rounded-xl border border-white/10 p-4">
                     <ClientHomeStats />
                </div>
            </div>
        </div>
    </div>
  );
}
