interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div className={`
      border border-gray-200 dark:border-gray-800 
      bg-white dark:bg-[#1a1a1a] 
      rounded-xl p-6 
      shadow-sm
      ${hover ? 'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}

