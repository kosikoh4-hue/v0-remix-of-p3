export const responsiveDesign = {
  typography: {
    fontStack:
      'SFRounded, ui-rounded, "SF Pro Rounded", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    textSizing: {
      small: "text-sm",
      base: "text-base",
      large: "text-xl",
    },
    lineHeights: {
      tight: "leading-[145%]",
      normal: "leading-[150%]",
    },
    letterSpacing: {
      tight: "tracking-[0.0015em]",
      normal: "tracking-[0.0025em]",
    },
  },

  layout: {
    gridSystem: "grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr))",
    container: {
      maxWidth: "max-w-[1168px]",
      margin: "mx-auto",
      padding: "px-4 md:px-16",
    },
  },

  components: {
    header: {
      position: "sticky top-0 z-50",
      effect: "header-glass",
      height: "h-[72px] md:h-[100px]",
    },
    experienceCards: {
      background: "bg-black rounded-lg shadow-md",
      dimensions: "w-full md:w-[368px]",
      hover: "transition-opacity duration-500 ease-in-out",
    },
    searchBar: {
      shape: "rounded-[90px]",
      border: "border-[1.5px] border-soft-grey",
    },
  },

  animations: {
    shake: `
      @keyframes w3m-shake {
        0% { transform: scale(1) rotate(0deg); }
        20% { transform: scale(1) rotate(-1deg); }
        40% { transform: scale(1) rotate(1deg); }
        60% { transform: scale(1) rotate(-1deg); }
        80% { transform: scale(1) rotate(1deg); }
        100% { transform: scale(1) rotate(0deg); }
      }
    `,
    transitions: {
      transform: "transition-transform duration-300",
      opacity: "transition-opacity duration-500 ease-in-out",
      colors: "transition-colors duration-200",
    },
  },

  customProperties: {
    spacing: {
      xs: "--wui-spacing-xs: 8px",
      s: "--wui-spacing-s: 12px",
      m: "--wui-spacing-m: 14px",
      l: "--wui-spacing-l: 16px",
    },
    borderRadius: {
      xs: "--wui-border-radius-xs: calc(var(--w3m-border-radius-master) * 4)",
      s: "--wui-border-radius-s: calc(var(--w3m-border-radius-master) * 5)",
    },
  },

  effects: {
    shadows: {
      card: "shadow-md",
    },
    loading: {
      pulse: "animate-pulse",
    },
  },
} as const
