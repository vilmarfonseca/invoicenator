import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-50': '#ffa4a4',
        'primary-100': '#ff9192',
        'primary-200': '#fc7d81',
        'primary-300': '#f8686f',
        'primary-400': '#f4515e',
        'primary-500': '#ef334c',
        'primary-600': '#d02b41',
        'primar-700': '#b12336',
        'primary-800': '#941c2c',
        'primary-900': '#781422',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
