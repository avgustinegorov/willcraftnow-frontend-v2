import { StatusGoodSmall } from "grommet-icons"
const theme = {
  rounding: 2,
  spacing: 28,
  defaultMode: "light",
  global: {
    colors: {
      brand: {
        dark: "rgb(28, 81, 100)",
        light: "#297490",
      },
      background: {
        dark: "#111111",
        light: "#FFFFFF",
      },
      "background-back": {
        dark: "#111111",
        light: "#EEEEEE",
      },
      "background-front": {
        dark: "#222222",
        light: "rgb(28, 81, 100)",
      },
      "background-contrast": {
        dark: "#FFFFFF11",
        light: "rgba(28, 81, 100, 0.08)",
      },
      text: {
        dark: "#EEEEEE",
        light: "#344e5f",
      },
      "text-strong": {
        dark: "#FFFFFF",
        light: "#000000",
      },
      "text-weak": {
        dark: "#CCCCCC",
        light: "#444444",
      },
      "text-xweak": {
        dark: "#999999",
        light: "#666666",
      },
      border: {
        dark: "#444444",
        light: "#CCCCCC",
      },
      control: {
        light: "brand",
        dark: "brand",
      },
      focus: "brand",
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": {
        light: "brand",
        dark: "brand",
      },
      "selected-text": {
        light: "text-strong",
        dark: "text-strong",
      },
      "status-critical": {
        light: "#E57373",
        dark: "#E57373",
      },
      "status-warning": {
        light: "#885053",
        dark: "885053",
      },
      "status-ok": {
        light: "#94C9A9",
        dark: "94C9A9",
      },
      "status-unknown": {
        light: "#CCCCCC",
        dark: "CCCCCC",
      },
      "status-disabled": {
        light: "#CCCCCC",
        dark: "CCCCCC",
      },
      "graph-0": {
        light: "brand",
        dark: "brand",
      },
      "graph-1": {
        light: "status-warning",
        dark: "status-warning",
      },
    },
    font: {
      family: '"Lato"',
      size: "21px",
      height: "28px",
      maxWidth: "588px",
    },
    active: {
      background: "active-background",
      color: "active-text",
    },
    hover: {
      background: "active-background",
      color: "active-text",
    },
    selected: {
      background: "selected-background",
      color: "selected-text",
    },
    control: {
      border: {
        radius: "2px",
      },
    },
    drop: {
      border: {
        radius: "2px",
      },
    },
    borderSize: {
      xsmall: "1px",
      small: "2px",
      medium: "5px",
      large: "14px",
      xlarge: "28px",
    },
    breakpoints: {
      small: {
        value: 600,
        borderSize: {
          xsmall: "1px",
          small: "2px",
          medium: "5px",
          large: "7px",
          xlarge: "14px",
        },
        edgeSize: {
          none: "0px",
          hair: "1px",
          xxsmall: "2px",
          xsmall: "4px",
          small: "7px",
          medium: "14px",
          large: "28px",
          xlarge: "56px",
        },
        size: {
          xxsmall: "28px",
          xsmall: "56px",
          small: "112px",
          medium: "224px",
          large: "448px",
          xlarge: "896px",
          full: "100%",
        },
      },
      medium: {
        value: 960,
      },
      large: {},
    },
    edgeSize: {
      none: "0px",
      hair: "1px",
      xxsmall: "4px",
      xsmall: "7px",
      small: "14px",
      medium: "28px",
      large: "56px",
      xlarge: "112px",
      responsiveBreakpoint: "small",
    },
    input: {
      padding: "14px",
      weight: 600,
    },
    spacing: "28px",
    size: {
      xxsmall: "56px",
      xsmall: "112px",
      small: "224px",
      medium: "448px",
      large: "896px",
      xlarge: "1344px",
      xxlarge: "1792px",
      full: "100%",
    },
  },
  chart: {},
  diagram: {
    line: {},
  },
  meter: {},
  button: {
    border: {
      width: "1px",
      radius: "21px",
    },
    padding: {
      vertical: "5px",
      horizontal: "26px",
    },
  },
  checkBox: {
    check: {
      radius: "2px",
    },
    toggle: {
      radius: "28px",
      size: "56px",
    },
    size: "28px",
  },
  radioButton: {
    size: "28px",
  },
  formField: {
    border: {
      color: "border",
      error: {
        color: {
          dark: "white",
          light: "status-critical",
        },
      },
      position: "inner",
      side: "bottom",
    },
    content: {
      pad: "small",
    },
    disabled: {
      background: {
        color: "status-disabled",
        opacity: "medium",
      },
    },
    error: {
      color: "status-critical",
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    help: {
      color: "dark-3",
      margin: {
        start: "small",
      },
    },
    info: {
      color: "text-xweak",
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    label: {
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    margin: {
      bottom: "small",
    },
    round: "2px",
  },
  scale: 1.1,
  calendar: {
    small: {
      fontSize: "14.466666666666667px",
      lineHeight: 1.375,
      daySize: "32.00px",
    },
    medium: {
      fontSize: "21px",
      lineHeight: 1.45,
      daySize: "64.00px",
    },
    large: {
      fontSize: "40.6px",
      lineHeight: 1.11,
      daySize: "128.00px",
    },
  },
  clock: {
    analog: {
      hour: {
        width: "9px",
        size: "28px",
      },
      minute: {
        width: "5px",
        size: "14px",
      },
      second: {
        width: "4px",
        size: "11px",
      },
      size: {
        small: "84px",
        medium: "112px",
        large: "168px",
        xlarge: "252px",
        huge: "336px",
      },
    },
    digital: {
      text: {
        xsmall: {
          size: "7.933333333333334px",
          height: 1.5,
        },
        small: {
          size: "14.466666666666667px",
          height: 1.43,
        },
        medium: {
          size: "21px",
          height: 1.375,
        },
        large: {
          size: "27.53333333333333px",
          height: 1.167,
        },
        xlarge: {
          size: "34.06666666666666px",
          height: 1.1875,
        },
        xxlarge: {
          size: "47.13333333333333px",
          height: 1.125,
        },
      },
    },
  },
  heading: {
    weight: 400,
    level: {
      "1": {
        small: {
          size: "36px",
          height: "42px",
          maxWidth: "854px",
        },
        medium: {
          size: "53px",
          height: "59px",
          maxWidth: "1277px",
        },
        large: {
          size: "88px",
          height: "94px",
          maxWidth: "2122px",
        },
        xlarge: {
          size: "124px",
          height: "130px",
          maxWidth: "2966px",
        },
      },
      "2": {
        small: {
          size: "31px",
          height: "37px",
          maxWidth: "749px",
        },
        medium: {
          size: "44px",
          height: "50px",
          maxWidth: "1066px",
        },
        large: {
          size: "58px",
          height: "64px",
          maxWidth: "1382px",
        },
        xlarge: {
          size: "71px",
          height: "77px",
          maxWidth: "1699px",
        },
      },
      "3": {
        small: {
          size: "27px",
          height: "33px",
          maxWidth: "643px",
        },
        medium: {
          size: "36px",
          height: "42px",
          maxWidth: "854px",
        },
        large: {
          size: "44px",
          height: "50px",
          maxWidth: "1066px",
        },
        xlarge: {
          size: "53px",
          height: "59px",
          maxWidth: "1277px",
        },
      },
      "4": {
        small: {
          size: "22px",
          height: "28px",
          maxWidth: "538px",
        },
        medium: {
          size: "27px",
          height: "33px",
          maxWidth: "643px",
        },
        large: {
          size: "31px",
          height: "37px",
          maxWidth: "749px",
        },
        xlarge: {
          size: "36px",
          height: "42px",
          maxWidth: "854px",
        },
      },
      "5": {
        small: {
          size: "16px",
          height: "22px",
          maxWidth: "379px",
        },
        medium: {
          size: "16px",
          height: "22px",
          maxWidth: "379px",
        },
        large: {
          size: "16px",
          height: "22px",
          maxWidth: "379px",
        },
        xlarge: {
          size: "16px",
          height: "22px",
          maxWidth: "379px",
        },
      },
      "6": {
        small: {
          size: "14px",
          height: "20px",
          maxWidth: "326px",
        },
        medium: {
          size: "14px",
          height: "20px",
          maxWidth: "326px",
        },
        large: {
          size: "14px",
          height: "20px",
          maxWidth: "326px",
        },
        xlarge: {
          size: "14px",
          height: "20px",
          maxWidth: "326px",
        },
      },
    },
  },
  paragraph: {
    small: {
      size: "16px",
      height: "22px",
      maxWidth: "379px",
    },
    medium: {
      size: "18px",
      height: "26px",
      maxWidth: "432px",
    },
    large: {
      size: "22px",
      height: "30px",
      maxWidth: "538px",
    },
    xlarge: {
      size: "27px",
      height: "35px",
      maxWidth: "643px",
    },
    xxlarge: {
      size: "36px",
      height: "44px",
      maxWidth: "854px",
    },
  },
  text: {
    xsmall: {
      size: "14px",
      height: "20px",
      maxWidth: "326px",
    },
    small: {
      size: "16px",
      height: "22px",
      maxWidth: "379px",
    },
    medium: {
      size: "18px",
      height: "24px",
      maxWidth: "432px",
    },
    large: {
      size: "22px",
      height: "28px",
      maxWidth: "538px",
    },
    xlarge: {
      size: "27px",
      height: "33px",
      maxWidth: "643px",
    },
    xxlarge: {
      size: "36px",
      height: "42px",
      maxWidth: "854px",
    },
  },
  layer: {
    background: {
      dark: "#111111",
      light: "#FFFFFF",
    },
  },
  carousel: {
    icons: {
      current: StatusGoodSmall,
    },
  },
}

export default theme
