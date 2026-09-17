/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A', // Primary Brand Green
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          950: '#052E16',
        },
        surface: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          DEFAULT: '#FFFFFF',
        },
        charcoal: {
          50: '#F6F6F7',
          100: '#E4E4E7',
          500: '#71717A',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B', // Deep Charcoal Text
          950: '#09090B',
        },
        status: {
          success: {
            bg: '#ECFDF5',
            text: '#065F46',
            border: '#A7F3D0',
            dot: '#10B981',
          },
          warning: {
            bg: '#FFFBEB',
            text: '#92400E',
            border: '#FDE68A',
            dot: '#F59E0B',
          },
          danger: {
            bg: '#FEF2F2',
            text: '#991B1B',
            border: '#FECACA',
            dot: '#EF4444',
          },
          info: {
            bg: '#EFF6FF',
            text: '#1E40AF',
            border: '#BFDBFE',
            dot: '#3B82F6',
          },
          neutral: {
            bg: '#F4F4F5',
            text: '#3F3F46',
            border: '#E4E4E7',
            dot: '#71717A',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft-xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'soft-sm': '0 2px 4px 0 rgba(0, 0, 0, 0.04)',
        'soft-md': '0 4px 12px -2px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'soft-xl': '0 20px 30px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -4px rgba(0, 0, 0, 0.04)',
        'glass': '0 8px 32px 0 rgba(16, 185, 129, 0.06)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
