export const Button = ({ children, variant = 'primary', className = '', disabled, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60';
  const variants = {
    primary: 'bg-primary-600 dark:bg-primary-500 text-white shadow-sm hover:bg-primary-700 dark:hover:bg-primary-600 focus:ring-primary-500 hover:shadow',
    secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-gray-400 border border-gray-300/50 dark:border-gray-600/50',
    danger: 'bg-red-600 dark:bg-red-500 text-white shadow-sm hover:bg-red-700 dark:hover:bg-red-600 focus:ring-red-500 hover:shadow',
    success: 'bg-green-600 dark:bg-green-500 text-white shadow-sm hover:bg-green-700 dark:hover:bg-green-600 focus:ring-green-500 hover:shadow',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

