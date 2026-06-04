/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Fixed: Added ** to scan all subdirectories
  ],
  theme: {
    extend: {
     fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['MEIRO', 'sans-serif'],
},
      colors: {
        // Core Brand Colors
        hadei: {
          yellow: '#F5F216', // Primary Yellow
          black: '#000000',  // Structural Black
          white: '#FFFFFF',  // Base White
        },
        // Extended Palette
        surface: {
          soft: '#FFFDE8',   // Soft Yellow
          light: '#F8F8F8',  // Light Gray
          border: '#EAEAEA', // Border Gray
        },
        // State Colors
        state: {
          success: '#16A34A', // Success Green
          warning: '#F59E0B', // Warning Orange
          error: '#EF4444',   // Error Red
        }
      },
      borderRadius: {
        // Soft geometric corners
        'xs': '8px',    // Tags and compact elements
        'sm': '12px',   // Dropdowns and small containers
        'md': '16px',   // Buttons and input fields
        'lg': '20px',   // Profile components
        'xl': '24px',   // Cards, panels, and major containers
        'full': '999px',// Avatars, pills, and circular actions
      },
    },
  },
  plugins: [],
}