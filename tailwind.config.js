module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  content: ["./components/**/*.js", "./pages/**/*.js"],
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
      xs: "0.563rem",
      sm: "0.75rem",
      base: "18px",
      md: "1.333rem",
      lg: "1.777rem",
      xl: "2.369rem",
    },
    filter: {
      none: "none",
      grayscale: "grayscale(1)",
    },
    gap: (theme) => ({
      ...theme("spacing"),
    }),
    spacing: {
      xs: "3px",
      sm: "6px",
      md: "12px",
      lg: "21px",
      xl: "33px",
      xxl: "48px",
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
