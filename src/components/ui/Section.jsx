import React from "react";

const Section = ({
  children,
  className = "",
  containerClass = "",
  fullWidth = false,
  padding = "default",
  ...props
}) => {
  const paddingClasses = {
    none: "",
    sm: "py-8",
    default: "py-16",
    lg: "py-24",
  };

  const containerClasses = fullWidth
    ? `w-full ${paddingClasses[padding]} ${className}`
    : `container mx-auto px-4 ${paddingClasses[padding]} ${className}`;

  const combinedContainerClass = `${containerClasses} ${containerClass}`;

  return (
    <section className={combinedContainerClass} {...props}>
      {children}
    </section>
  );
};

export default Section;
