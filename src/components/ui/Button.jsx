import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "font-bold rounded-full transition-all duration-300 text-center inline-block cursor-pointer";

  const variants = {
    primary: "bg-darkBlue hover:bg-lightBlue text-white",
    secondary: "bg-lightBlue hover:bg-darkBlue text-white",
    outline:
      "border-2 border-darkBlue text-darkBlue hover:bg-darkBlue hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const combinedClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
