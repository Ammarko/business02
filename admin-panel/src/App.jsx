import { useState } from 'react'
import AdminSidebar from './components/AdminSidebar'
import AdminHeader from './components/AdminHeader'
import Dashboard from './components/Dashboard'
import UsersManagement from './components/UsersManagement'
import ProjectsManagement from './components/ProjectsManagement'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />
      case 'users':
        return <UsersManagement />
      case 'projects':
        return <ProjectsManagement />
      case 'messages':
        return <div className="p-6"><h1 className="text-2xl font-bold">إدارة الرسائل</h1><p className="text-gray-600 mt-2">قريباً...</p></div>
      case 'analytics':
        return <div className="p-6"><h1 className="text-2xl font-bold">التحليلات</h1><p className="text-gray-600 mt-2">قريباً...</p></div>
      case 'moderation':
        return <div className="p-6"><h1 className="text-2xl font-bold">الإشراف</h1><p className="text-gray-600 mt-2">قريباً...</p></div>
      case 'settings':
        return <div className="p-6"><h1 className="text-2xl font-bold">الإعدادات</h1><p className="text-gray-600 mt-2">قريباً...</p></div>
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App
