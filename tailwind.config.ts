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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#FE9000', // Orange principal du logo
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#FE9000',
          600: '#FE8800',
          700: '#EA580C',
          800: '#C2410C',
          900: '#9A3412',
          950: '#431407',
        },
        dark: {
          DEFAULT: '#0A0A0A',
          50: '#525252',
          100: '#404040',
          200: '#262626',
          300: '#171717',
          400: '#0F0F0F',
          500: '#0A0A0A',
          600: '#050505',
          700: '#000000',
        },
        accent: {
          DEFAULT: '#FBBF24', // Jaune/Or pour contraste
          light: '#FDE68A',
          dark: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #FE9000 0%, #EA580C 100%)',
        'gradient-dark': 'linear-gradient(135deg, #171717 0%, #000000 100%)',
        'gradient-accent': 'linear-gradient(135deg, #FE9000 0%, #FBBF24 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgb(254 144 0 / 0.5), 0 0 20px rgb(254 144 0 / 0.3)' },
          '100%': { boxShadow: '0 0 20px rgb(254 144 0 / 0.5), 0 0 40px rgb(254 144 0 / 0.3)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}
export default config