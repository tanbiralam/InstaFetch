/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Pastel color palette for 2025 design with improved contrast
        pastel: {
          blue: "#7FB3D5",
          blueLight: "#BFD7ED",
          pink: "#DB7093",
          pinkLight: "#F9C6D1",
          green: "#82C99A",
          greenLight: "#C3E6CB",
          yellow: "#F4D03F",
          yellowLight: "#FFF3CD",
          purple: "#9B59B6",
          purpleLight: "#D4C4FB",
          orange: "#E67E22",
          orangeLight: "#FFE0B2",
          teal: "#48C9B0",
          tealLight: "#B2EBF2",
          red: "#E74C3C",
          redLight: "#F8D7DA",
          gray: "#95A5A6",
          grayLight: "#E2E8F0",
        },
        // Social media brand colors with pastel variants (improved contrast)
        social: {
          instagram: "#E1306C",
          instagramPastel: "#E87E9C",
          facebook: "#1877F2",
          facebookPastel: "#5B9BD5",
          twitter: "#1DA1F2",
          twitterPastel: "#5BBCF5",
          youtube: "#FF0000",
          youtubePastel: "#FF5252",
          tiktok: "#000000",
          tiktokPastel: "#8C7AE6",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.8 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.1)',
        'neon': '0 0 10px rgba(66, 153, 225, 0.5), 0 0 20px rgba(66, 153, 225, 0.3)',
        'pastel': '0 8px 25px -5px rgba(127, 179, 213, 0.5)',
      },
      backdropFilter: {
        'glass': 'blur(10px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}