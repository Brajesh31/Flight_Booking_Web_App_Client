const CustomButton = ({
  text,
  icon: Icon,
  iconPosition = "left", 
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-slate-800 hover:bg-slate-500 transition-all disabled:opacity-50 ${className}`}
    >
      {iconPosition === "left" && Icon && <Icon className="w-5 h-5" />}
      <span>{text}</span>
      {iconPosition === "right" && Icon && <Icon className="w-5 h-5" />}
    </button>
  );
};

export default CustomButton;
