'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: '숏폼 추천', href: '/shorts' },
    { label: '롱폼 추천', href: '/long-form' },
    { label: '키워드 검색', href: '/keyword-search' },
    { label: '트렌드 분석', href: '/trends' },
    { label: '도구', href: '/tools' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-primary-cyan to-primary-pink rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-lg md:text-xl">Y</span>
            </div>
            <span className="text-white font-bold text-lg md:text-xl hidden sm:block">
              Topic Finder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <Link
              href="/keyword-search"
              aria-label="검색"
              className="p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>

            <div className="hidden md:block">
              <Button size="sm" variant="primary">
                시작하기
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              aria-label="메뉴"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Button size="md" variant="primary" className="w-full">
                  시작하기
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

