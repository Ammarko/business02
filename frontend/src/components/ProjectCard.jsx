import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { MapPin, Clock, Users, Star } from 'lucide-react'

const ProjectCard = ({ project }) => {
  const {
    title = "تطبيق توصيل طعام ذكي",
    description = "نبحث عن شريك تقني لتطوير تطبيق توصيل طعام يستخدم الذكاء الاصطناعي لتحسين تجربة المستخدم وتوقع الطلبات.",
    stage = "فكرة",
    category = "تقني",
    location = "الرياض، السعودية",
    skills = ["React Native", "Node.js", "AI/ML"],
    sharePercentage = "25%",
    ownerName = "أحمد محمد",
    ownerRating = 4.8,
    timePosted = "منذ يومين"
  } = project || {}

  const getStageColor = (stage) => {
    switch (stage) {
      case "فكرة": return "bg-blue-100 text-blue-800"
      case "MVP": return "bg-yellow-100 text-yellow-800"
      case "قائم": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "تقني": return "bg-purple-100 text-purple-800"
      case "تجاري": return "bg-orange-100 text-orange-800"
      case "تعليمي": return "bg-indigo-100 text-indigo-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{title}</h3>
          <div className="flex gap-2">
            <Badge className={getStageColor(stage)}>{stage}</Badge>
            <Badge className={getCategoryColor(category)}>{category}</Badge>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">{description}</p>
      </CardHeader>

      <CardContent className="py-3">
        {/* Skills */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">المهارات المطلوبة:</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project Info */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>نسبة الشراكة: {sharePercentage}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{timePosted}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {ownerName.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{ownerName}</p>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600">{ownerRating}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              عرض التفاصيل
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              تقدم للشراكة
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProjectCard

