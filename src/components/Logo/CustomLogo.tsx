import React from "react";
import { rem, useMantineTheme } from "@mantine/core";

// Define props for CustomLogo
export interface CustomLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number | string;
  type?: "full" | "mark"; // "full" (default) shows logo + text, "mark" shows only logo
  text?: string; // Dynamic text for the logo
}

// CustomLogo component
export function CustomLogo({
  size = 30,
  type = "full",
  text = "Summify",
  ...others
}: CustomLogoProps) {
  const theme = useMantineTheme(); // Access the Mantine theme
  const primaryColor = theme.colors[theme.primaryColor][7]; // Get the primary color

  // Calculate text size based on logo size (relative to 30px default size)
  const textSize = typeof size === "number" ? rem(size * 0.45) : rem(30 * 0.5);

  return (
    <div style={{ display: "flex", alignItems: "center" }} {...others}>
      {/* Inline SVG Logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width={size}
        height={size}
      >
        <polygon
          fill={primaryColor} // Use the theme's primary color
          points="26,35.164 24.004,36.293 22,35.159 22,17.476 17,20.311 17,38.07 24,42.039 31,38.075 31,20.264 26,17.428"
        />
        <polygon
          fill={primaryColor} // Use the theme's primary color
          points="24,5.995 8,14.979 8,32.981 13,35.808 13,17.964 24.004,11.742 35,17.959 35,35.813 40,32.986 40,15.042"
        />
      </svg>

      {/* Show text only when type="full" */}
      {type === "full" && (
        <span
          className="mantine-visible-from-md"
          style={{
            color: primaryColor, // Use the theme's primary color
            fontSize: textSize,
            fontWeight: "bold",
            userSelect: "none", // Prevent text selection
            cursor: "pointer",
            // marginLeft: rem(8), // Add some spacing between the logo and text
          }}
        >
          {text} {/* Render the dynamic text */}
        </span>
      )}
    </div>
  );
}
