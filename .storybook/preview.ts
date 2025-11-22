import type { Preview } from "@storybook/react";
import "../styles/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "rgba(255, 255, 255, 1.00)",
        },
        {
          name: "dark",
          value: "rgba(54, 63, 73, 1.00)",
        },
        {
          name: "primary",
          value: "rgba(11, 73, 135, 1.00)",
        },
      ],
    },
  },
};

export default preview;