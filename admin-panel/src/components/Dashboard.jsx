import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, FolderOpen, MessageSquare, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    {
      title: 'إجمالي المستخدمين',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      description: 'مستخدم نشط'
    },
    {
      title: 'المشاريع النشطة',
      value: '89',
      change: '+5%',
      changeType: 'positive',
      icon: FolderOpen,
      description: 'مشروع منشور'
    },
    {
      title: 'الرسائل اليومية',
      value: '2,341',
      change: '+18%',
      changeType: 'positive',
      icon: MessageSquare,
      description: 'رسالة اليوم'
    },
    {
      title: 'معدل النجاح',
      value: '73%',
      change: '+3%',
      changeType: 'positive',
      icon: TrendingUp,
      description: 'شراكة ناجحة'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'user_registered',
      message: 'مستخدم جديد: أحمد محمد',
      time: 'منذ 5 دقائق',
      status: 'success'
    },
    {
      id: 2,
      type: 'project_created',
      message: 'مشروع جديد: تطبيق التجارة الإلكترونية',
      time: 'منذ 15 دقيقة',
      status: 'info'
    },
    {
      id: 3,
      type: 'partnership_formed',
      message: 'شراكة جديدة تم تكوينها',
      time: 'منذ 30 دقيقة',
      status: 'success'
    },
    {
      id: 4,
      type: 'report_received',
      message: 'تقرير جديد يحتاج مراجعة',
      time: 'منذ ساعة',
      status: 'warning'
    },
    {
      id: 5,
      type: 'user_verified',
      message: 'تم التحقق من مستخدم: سارة أحمد',
      time: 'منذ ساعتين',
      status: 'success'
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <TrendingUp className="h-4 w-4 text-blue-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
        <p className="text-gray-600 mt-2">نظرة عامة على أداء المنصة والأنشطة الحديثة</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center space-x-2 space-x-reverse mt-2">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      stat.changeType === 'positive' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {stat.change}
                  </Badge>
                  <span className="text-xs text-gray-500">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>الأنشطة الحديثة</CardTitle>
            <CardDescription>آخر الأحداث والأنشطة على المنصة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 space-x-reverse">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                    {activity.status === 'success' ? 'مكتمل' : 
                     activity.status === 'warning' ? 'يحتاج مراجعة' : 'جديد'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إحصائيات سريعة</CardTitle>
            <CardDescription>ملخص الأداء لهذا الأسبوع</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">مستخدمين جدد</span>
                <span className="font-semibold">+47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">مشاريع منشورة</span>
                <span className="font-semibold">+12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">شراكات مكونة</span>
                <span className="font-semibold">+8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">تقارير محلولة</span>
                <span className="font-semibold">+15</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">معدل الرضا</span>
                <span className="font-semibold text-green-600">94%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard

