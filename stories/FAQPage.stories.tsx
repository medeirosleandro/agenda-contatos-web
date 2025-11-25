import type { Meta, StoryObj } from "@storybook/react";
import { FAQPage } from "../components/FAQPage";

/**
 * FAQPage Component
 * 
 * A comprehensive FAQ (Frequently Asked Questions) page that displays:
 * - A search field for filtering questions
 * - A list of most searched topics with ranking
 * - All FAQ items organized in collapsible cards
 * 
 * Design System Compliance:
 * - Uses 100% CSS variables from /styles/globals.css
 * - Typography: Poppins for headings/buttons, Source Sans Pro for body text
 * - Colors: Primary, Accent, Muted, Foreground, Card, Border
 * - Border Radius: var(--radius-card) for cards, var(--radius) for inputs
 * - Spacing and layout follow design system tokens
 */
const meta = {
  title: "Pages/FAQPage",
  component: FAQPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The FAQ page provides users with quick access to common questions and answers. It features a search functionality to filter content, and displays the top 5 most searched topics with their search count. Each FAQ item is collapsible and categorized for better organization.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onBack: {
      description: "Callback function triggered when the back button is clicked",
      action: "back clicked",
    },
  },
} satisfies Meta<typeof FAQPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default FAQ Page
 * 
 * Shows the FAQ page in its default state with:
 * - Empty search field
 * - Top 5 most searched topics visible
 * - All FAQ items collapsed
 */
export const Default: Story = {
  args: {
    onBack: () => console.log("Back button clicked"),
  },
};

/**
 * Mobile View
 * 
 * Displays the FAQ page optimized for mobile devices.
 * The layout is fully responsive and adapts to smaller screens.
 */
export const Mobile: Story = {
  args: {
    onBack: () => console.log("Back button clicked"),
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Tablet View
 * 
 * Shows how the FAQ page appears on tablet devices.
 * The responsive layout adjusts content width appropriately.
 */
export const Tablet: Story = {
  args: {
    onBack: () => console.log("Back button clicked"),
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};

/**
 * Desktop View
 * 
 * Displays the FAQ page on desktop with maximum width constraint
 * centered on the screen for optimal readability.
 */
export const Desktop: Story = {
  args: {
    onBack: () => console.log("Back button clicked"),
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

/**
 * Interactive Demo
 * 
 * Fully interactive FAQ page where you can:
 * - Search for questions
 * - Click on top searched topics
 * - Expand/collapse FAQ items
 * - Navigate back
 */
export const Interactive: Story = {
  args: {
    onBack: () => alert("Navigating back to main page"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Try searching for keywords like 'adicionar', 'editar', 'excluir', or 'ordenar' to filter the FAQ items. Click on any top searched topic to automatically search for it.",
      },
    },
  },
};

/**
 * Design System Colors
 * 
 * This story demonstrates how the FAQ page uses CSS variables:
 * - Primary color for the header background
 * - Accent color for ranking badges and icons
 * - Card color for FAQ items background
 * - Border color for separators and card borders
 * - Muted colors for secondary information
 */
export const DesignSystemColors: Story = {
  args: {
    onBack: () => console.log("Back button clicked"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "All colors are defined using CSS variables from the design system. Update /styles/globals.css to see the changes reflected immediately.",
      },
    },
  },
};

/**
 * Typography Showcase
 * 
 * Demonstrates the typography system used in the FAQ page:
 * - H1: Poppins, 32px (--text-2xl), Semibold (600)
 * - H2: Poppins, 24px (--text-xl), Semibold (600)
 * - Question Text: Poppins, 16px (--text-base), Semibold (600)
 * - Answer Text: Source Sans Pro, 16px (--text-base), Regular (400)
 * - Captions: Poppins, 11px (--text-xs), Regular (400)
 */
export const TypographyShowcase: Story = {
  args: {
    onBack: () => console.log("Back button clicked"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "All typography uses the design system fonts: Poppins for headings and Source Sans Pro for body text, with sizes defined by CSS variables.",
      },
    },
  },
};

/**
 * Accessibility Features
 * 
 * The FAQ page includes several accessibility features:
 * - Semantic HTML structure
 * - Keyboard navigation support
 * - ARIA labels for screen readers
 * - High contrast colors meeting WCAG standards
 * - Focus indicators on interactive elements
 */
export const Accessibility: Story = {
  args: {
    onBack: () => console.log("Back button clicked"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Try navigating using only the keyboard (Tab, Enter, Space). All interactive elements are accessible and properly labeled.",
      },
    },
  },
};

/**
 * Empty Search Results
 * 
 * This story simulates what users see when their search query
 * doesn't match any FAQ items. It provides clear feedback and
 * encourages users to try different search terms.
 */
export const EmptySearchResults: Story = {
  args: {
    onBack: () => console.log("Back button clicked"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "When no results are found, the page displays a helpful message. Try searching for 'xyz' to see the empty state.",
      },
    },
  },
};
