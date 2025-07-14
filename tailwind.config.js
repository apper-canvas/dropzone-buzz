/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#5B67F0',
        secondary: '#8B92FF',
        accent: '#00D4AA',
        surface: '#FFFFFF',
        background: '#F7F9FC',
        success: '#00D4AA',
        warning: '#FFA726',
        error: '#EF5350',
        info: '#42A5F5',
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
          muted: '#9CA3AF',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #5B67F0 0%, #8B92FF 100%)',
        'gradient-success': 'linear-gradient(135deg, #00D4AA 0%, #42A5F5 100%)',
        'gradient-progress': 'linear-gradient(90deg, #5B67F0 0%, #8B92FF 100%)',
        'gradient-bg': 'linear-gradient(135deg, #F7F9FC 0%, #EDF2F7 100%)',
      },
      animation: {
        'pulse-success': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.5s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};