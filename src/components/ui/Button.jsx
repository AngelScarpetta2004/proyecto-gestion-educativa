// src/components/ui/Button.jsx
export function Button({ children, type = "button", variant = "primary", ...props }) {
    const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
      success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };
    
    const classes = `${baseClasses} ${variants[variant]}`;
    
    return (
      <button type={type} className={classes} {...props}>
        {children}
      </button>
    );
  }