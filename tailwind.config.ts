import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: '#5B21B6',
          blue: '#1E40AF',
          pink: '#DB2777',
          cyan: '#06B6D4',
        },
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #5B21B6 0%, #1E40AF 50%, #DB2777 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(91,33,182,0.1) 0%, rgba(30,64,175,0.1) 100%)',
        'gradient-text': 'linear-gradient(90deg, #06B6D4 0%, #DB2777 100%)',
        'gradient-cta': 'linear-gradient(135deg, #06B6D4 0%, #1E40AF 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

