import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Label = forwardRef(({ 
  className, 
  ...props 
}, ref) => {
  const baseStyles = "text-sm font-medium text-text-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";
  
  return (
    <label
      ref={ref}
      className={cn(baseStyles, className)}
      {...props}
    />
  );
});

Label.displayName = "Label";

export default Label;