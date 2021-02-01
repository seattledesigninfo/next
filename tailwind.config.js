module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  purge: {
    content: ["./components/**/*.js", "./pages/**/*.js"],
  },
  theme: {
    colors: {
      brand: "var(--brand-color)",
      highlight: "var(--highlight-color)",
      link: {
        default: "var(--link-color)",
        hover: "var(--link-color-hover)",
        focus: "var(--focus-color)",
      },
      gray: {
        light: "#eee",
        dark: "#666",
      },
      white: "#fff",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    boxShadow: {
      default: "0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06)",
      top: "0 -8px 16px 0 rgba(0, 0, 0, .1)",
    },
    container: {
      center: true,
      padding: {
        default: "1rem",
      },
    },
    cursor: {
      pointer: "pointer",
      "w-resize": "w-resize",
      "e-resize": "e-resize",
    },
    fontFamily: {
      sans: ["Helvetica", "Arial", "sans-serif"],
      display: ["Kavivanar"],
      mono: ["Roboto Mono"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "1rem",
      base: "16px",
      md: "1.5rem",
      lg: "1.75rem",
      xl: "2rem",
      xxl: "2.25rem",
    },
    filter: {
      none: "none",
      grayscale: "grayscale(1)",
    },
    gap: (theme) => ({
      ...theme("spacing"),
    }),
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "48px",
      none: "0 !important",
    },
    outline: {
      dashed: "dashed 2px",
    },
    extend: {
      transitionProperty: {
        margin: "margin",
        top: "top",
      },
    },
  },
  variants: {
    outline: ["focus", "focus-within"],
  },
  plugins: [],
};
