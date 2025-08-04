import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Search, 
  MessageCircle, 
  Users, 
  Star, 
  Shield, 
  TrendingUp,
  Brain,
  FileText,
  Globe
} from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "مطابقة ذكية",
      description: "خوارزمية متقدمة تجد لك الشركاء المناسبين بناءً على المهارات والموقع ونوع الشراكة المطلوبة"
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "بحث متقدم",
      description: "أدوات بحث قوية تساعدك في العثور على المشاريع والشركاء المناسبين بسهولة وسرعة"
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "مراسلة فورية",
      description: "نظام دردشة متطور يدعم الرسائل النصية والصوتية وإرسال الملفات وجدولة الاجتماعات"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "إدارة الشراكات",
      description: "نظام شامل لإدارة طلبات الشراكة والاتفاقيات والتوقيعات الإلكترونية"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "تقييمات موثوقة",
      description: "نظام تقييم شفاف يساعدك في اختيار الشركاء المناسبين بناءً على تجارب سابقة"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "أمان وخصوصية",
      description: "حماية عالية لبياناتك الشخصية ومعلومات مشاريعك مع إمكانية التحكم في مستوى الخصوصية"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "تحليلات ذكية",
      description: "لوحة تحكم تفاعلية تعرض إحصائيات مشاريعك وتفاعل الشركاء المحتملين"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "محتوى تعليمي",
      description: "مكتبة شاملة من المقالات والفيديوهات التعليمية حول بناء الشراكات الناجحة"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "دعم متعدد اللغات",
      description: "واجهة تدعم اللغة العربية والإنجليزية لتوسيع نطاق الوصول للشركاء"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            لماذا تختار منصتنا؟
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            مجموعة شاملة من الأدوات والميزات المتقدمة لضمان نجاح شراكاتك التجارية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full text-purple-600 w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

