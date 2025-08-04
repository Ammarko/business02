import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  MessageSquare, 
  Settings, 
  BarChart3,
  Shield,
  LogOut,
  Menu,
  X
} from 'lucide-react'

const AdminSidebar = ({ activeSection, setActiveSection }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'users', label: 'المستخدمين', icon: Users },
    { id: 'projects', label: 'المشاريع', icon: FolderOpen },
    { id: 'messages', label: 'الرسائل', icon: MessageSquare },
    { id: 'analytics', label: 'التحليلات', icon: BarChart3 },
    { id: 'moderation', label: 'الإشراف', icon: Shield },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ]

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} min-h-screen`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-purple-700">لوحة التحكم</h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2"
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <Button
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'} ${
                    activeSection === item.id 
                      ? 'bg-purple-700 text-white hover:bg-purple-800' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <Icon className={`h-5 w-5 ${isCollapsed ? '' : 'ml-3'}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="ghost"
          className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'} text-red-600 hover:bg-red-50`}
        >
          <LogOut className={`h-5 w-5 ${isCollapsed ? '' : 'ml-3'}`} />
          {!isCollapsed && <span>تسجيل الخروج</span>}
        </Button>
      </div>
    </div>
  )
}

export default AdminSidebar

