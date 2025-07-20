const Loader = ({ size = 'xl' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-24 h-24', 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div
        className={`
          ${sizeClasses[size]} 
          border-[6px] 
          border-orange-400 
          border-t-transparent 
          rounded-full 
          animate-spin 
          shadow-xl
        `}
      ></div>
    </div>
  );
};

export default Loader;
