import { memo, useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { debounce } from "../../utils/useDebounce";

const UserSearch = memo(({ value: externalValue, onChange }) => {
  const [localValue, setLocalValue] = useState(externalValue);

  const debouncedOnChange = useRef(
    debounce((val) => {
      onChange(val);
    }, 300)
  ).current;

  useEffect(() => {
    setLocalValue(externalValue);
  }, [externalValue]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };

  return (
    <div className="relative group w-full md:w-96 mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl leading-5 
                   placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
                   transition-all duration-200 shadow-sm"
        placeholder="Search users by name..."
        value={localValue}
        onChange={handleInputChange}
      />
    </div>
  );
});


export default UserSearch;
