import React from "react";

const Button = ({
  children,
  variant = "default",
  size = "md",
  style,
  onClick,
  ...props
}) => {
  // Base style
  const baseStyle = {
    border: "none",
    borderRadius: "0.375rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease, border-color 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  };

  // Variants
  const variants = {
    default: {
      backgroundColor: "#2563eb", // blue
      color: "#ffffff",
    },
    destructive: {
      backgroundColor: "#dc2626", // red
      color: "#ffffff",
    },
    outline: {
      backgroundColor: "transparent",
      color: "#374151", // gray-700
      border: "1px solid #d1d5db", // gray-300
    },
  };

  // Sizes
  const sizes = {
    md: { padding: "0.5rem 1rem", fontSize: "0.875rem" }, // text-sm
    lg: { padding: "0.75rem 1.25rem", fontSize: "1rem" }, // text-base
    icon: { padding: "0.5rem", borderRadius: "9999px" }, // circle
  };

  // Hover colors for variants
  const hoverColors = {
    default: "#1e40af", // darker blue
    destructive: "#b91c1c", // darker red
    outline: "#f3f4f6", // light gray bg
  };

  // Hover handlers
  const handleMouseEnter = (e) => {
    if (variant !== "outline") {
      e.currentTarget.style.backgroundColor = hoverColors[variant];
    } else {
      e.currentTarget.style.backgroundColor = hoverColors.outline;
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = variants[variant].backgroundColor || "transparent";
  };

  return (
    <button
      style={{
        ...baseStyle,
        ...variants[variant],
        ...sizes[size],
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
