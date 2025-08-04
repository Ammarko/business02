import { Button } from '@/components/ui/button'
import { ArrowLeft, Users, Briefcase, TrendingUp } from 'lucide-react'

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            اعثر على شريك أعمالك المثالي
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
            منصة ذكية تربط رواد الأعمال والمبدعين والمستثمرين لبناء مشاريع ناجحة وشراكات مثمرة
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 text-lg px-8 py-3">
              ابدأ البحث عن شريك
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-700 text-lg px-8 py-3">
              انشر مشروعك
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">+1000</h3>
              <p className="text-purple-100">رائد أعمال نشط</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Briefcase className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">+500</h3>
              <p className="text-purple-100">مشروع منشور</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">+200</h3>
              <p className="text-purple-100">شراكة ناجحة</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

