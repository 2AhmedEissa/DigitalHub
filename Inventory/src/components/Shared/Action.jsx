export const ActionButton = ({ icon: Icon, label, onClick, variant = "primary" }) => (
  <button
    onClick={(e) => {
      e.stopPropagation(); 
      onClick();
    }}
    className="group relative p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
  >
    <Icon
      className={`h-4 w-4 ${
        variant === "danger" ? "text-rose-500" : "text-gray-500"
      }`}
    />

    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
      {label}
    </span>
  </button>
);
