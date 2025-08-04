import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Bell, User, LogOut, Settings, Menu, X } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'
import AuthModal from './AuthModal'

const Header = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState('signin')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut, loading } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    setUserMenuOpen(false)
  }

  const openAuthModal = (tab = 'signin') => {
    setAuthModalTab(tab)
    setAuthModalOpen(true)
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-700">شركاء البزنس</h1>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="ابحث عن مشاريع أو شركاء..."
                  className="pr-10 pl-4"
                />
              </div>
            </div>

            {/* Navigation & User Menu - Desktop */}
            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              {/* Navigation Links */}
              <nav className="flex items-center space-x-6 space-x-reverse">
                <Button variant="ghost" className="text-gray-700 hover:text-purple-700">
                  الرئيسية
                </Button>
                <Button variant="ghost" className="text-gray-700 hover:text-purple-700">
                  المشاريع
                </Button>
                <Button variant="ghost" className="text-gray-700 hover:text-purple-700">
                  الشركاء
                </Button>
                {user && (
                  <Button variant="ghost" className="text-gray-700 hover:text-purple-700 relative">
                    رسائلي
                    <Badge className="absolute -top-2 -left-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                      3
                    </Badge>
                  </Button>
                )}
              </nav>

              {/* User Actions */}
              {loading ? (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              ) : user ? (
                <div className="flex items-center space-x-4 space-x-reverse">
                  {/* Notifications */}
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -left-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[16px] h-4 flex items-center justify-center">
                      2
                    </Badge>
                  </Button>

                  {/* User Menu */}
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-2 space-x-reverse"
                    >
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-700 font-medium text-sm">
                          {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <span className="hidden lg:block text-sm font-medium">
                        {user.user_metadata?.full_name || 'المستخدم'}
                      </span>
                    </Button>

                    {userMenuOpen && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                        <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <User className="h-4 w-4 ml-2" />
                          الملف الشخصي
                        </button>
                        <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <Settings className="h-4 w-4 ml-2" />
                          الإعدادات
                        </button>
                        <hr className="my-1" />
                        <button
                          onClick={handleSignOut}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4 ml-2" />
                          تسجيل الخروج
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Post Project Button */}
                  <Button className="bg-purple-700 hover:bg-purple-800 text-white">
                    نشر مشروع
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Button
                    variant="outline"
                    onClick={() => openAuthModal('signin')}
                    className="text-purple-700 border-purple-700 hover:bg-purple-50"
                  >
                    تسجيل الدخول
                  </Button>
                  <Button
                    onClick={() => openAuthModal('signup')}
                    className="bg-purple-700 hover:bg-purple-800 text-white"
                  >
                    إنشاء حساب
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="ابحث عن مشاريع أو شركاء..."
                className="pr-10 pl-4"
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 pt-4 pb-4">
              <nav className="flex flex-col space-y-2">
                <Button variant="ghost" className="justify-start text-gray-700 hover:text-purple-700">
                  الرئيسية
                </Button>
                <Button variant="ghost" className="justify-start text-gray-700 hover:text-purple-700">
                  المشاريع
                </Button>
                <Button variant="ghost" className="justify-start text-gray-700 hover:text-purple-700">
                  الشركاء
                </Button>
                {user && (
                  <Button variant="ghost" className="justify-start text-gray-700 hover:text-purple-700">
                    رسائلي
                  </Button>
                )}
                
                {user ? (
                  <>
                    <Button variant="ghost" className="justify-start text-gray-700 hover:text-purple-700">
                      الإشعارات
                    </Button>
                    <Button variant="ghost" className="justify-start text-gray-700 hover:text-purple-700">
                      الملف الشخصي
                    </Button>
                    <Button
                      onClick={handleSignOut}
                      variant="ghost"
                      className="justify-start text-red-600 hover:text-red-700"
                    >
                      تسجيل الخروج
                    </Button>
                    <Button className="bg-purple-700 hover:bg-purple-800 text-white mt-4">
                      نشر مشروع
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => openAuthModal('signin')}
                      variant="outline"
                      className="justify-start text-purple-700 border-purple-700 hover:bg-purple-50 mt-4"
                    >
                      تسجيل الدخول
                    </Button>
                    <Button
                      onClick={() => openAuthModal('signup')}
                      className="justify-start bg-purple-700 hover:bg-purple-800 text-white"
                    >
                      إنشاء حساب
                    </Button>
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalTab}
      />

      {/* Overlay for user menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Header

