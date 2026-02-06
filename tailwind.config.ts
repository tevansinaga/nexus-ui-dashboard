import type { Config } from "tailwindcss";

const config: Config = {
  // 1. Mengaktifkan mode gelap berbasis class agar ThemeToggle (jika ada) berfungsi
  darkMode: "class",
  
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {
      colors: {
        // Custom branding agar konsisten dengan warna biru Nexus UI
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6", // Biru Utama
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      
      // 2. Menambahkan Keyframes untuk animasi kustom
      keyframes: {
        "bounce-slow": {
          "0%, 100%": { 
            transform: "translateY(0) rotateX(6deg) rotateY(-12deg) rotateZ(2deg)" 
          },
          "50%": { 
            transform: "translateY(-20px) rotateX(6deg) rotateY(-12deg) rotateZ(2deg)" 
          },
        },
        "float-particle": {
          "0%, 100%": { transform: "translate(0, 0) opacity(0.3)" },
          "50%": { transform: "translate(10px, -10px) opacity(0.6)" },
        }
      },

      // 3. Menambahkan Animasi agar bisa dipanggil di LoginPage
      animation: {
        "bounce-slow": "bounce-slow 5s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-particle": "float-particle 3s ease-in-out infinite",
      },

      // 4. Utilitas untuk Efek Perspektif 3D (Custom Utilities)
      // Catatan: Tailwind secara default tidak punya perspective, kita bisa tambahkan via plugin atau manual
    },
  },
  
  plugins: [
    // Plugin untuk menambahkan utilitas perspektif secara otomatis
    function ({ addUtilities }: any) {
      addUtilities({
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".rotate-x-6": {
          transform: "rotateX(6deg)",
        },
        ".-rotate-y-12": {
          transform: "rotateY(-12deg)",
        },
      });
    },
  ],
};

export default config;