import * as React from "react";
import { clsx as cn } from 'clsx';

// Card container
const Card = React.forwardRef(function Card({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
      {...props}
    />
  );
});
Card.displayName = "Card";

// Card header
const CardHeader = React.forwardRef(function CardHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
});
CardHeader.displayName = "CardHeader";

// Card title
const CardTitle = React.forwardRef(function CardTitle({ className, ...props }, ref) {
  return (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
});
CardTitle.displayName = "CardTitle";

// Card description
const CardDescription = React.forwardRef(function CardDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
CardDescription.displayName = "CardDescription";

// Card content
const CardContent = React.forwardRef(function CardContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  );
});
CardContent.displayName = "CardContent";

// Card footer
const CardFooter = React.forwardRef(function CardFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
});
CardFooter.displayName = "CardFooter";

// Export all
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };