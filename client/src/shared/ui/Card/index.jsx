export const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-card border border-gray-200/80 dark:border-gray-700/80 transition-all duration-250 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

