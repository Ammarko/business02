import { Button } from '@/components/ui/button'
import ProjectCard from './ProjectCard'
import { ArrowLeft } from 'lucide-react'
import { useProjects } from '../hooks/useProjects'

const FeaturedProjects = () => {
  const { projects, loading, error } = useProjects({ featured: true })

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              المشاريع المميزة
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              اكتشف أحدث الفرص والمشاريع الواعدة التي تبحث عن شركاء موهوبين
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              المشاريع المميزة
            </h2>
            <p className="text-red-600 mb-8">حدث خطأ في تحميل المشاريع: {error}</p>
            <Button onClick={() => window.location.reload()}>
              إعادة المحاولة
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            المشاريع المميزة
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اكتشف أحدث الفرص والمشاريع الواعدة التي تبحث عن شركاء موهوبين
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">لا توجد مشاريع مميزة حالياً</p>
          </div>
        )}

        <div className="text-center">
          <Button size="lg" variant="outline" className="text-purple-700 border-purple-700 hover:bg-purple-50">
            عرض جميع المشاريع
            <ArrowLeft className="mr-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects

