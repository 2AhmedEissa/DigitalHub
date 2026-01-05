import { memo } from "react";
import { User, ChevronRight, Mail } from "lucide-react";
import UserDetails from "./UserDetails";

const UserItem = memo(({ user, onSelect, isSelected, onCloseDetails }) => {
  return (
    <li className="space-y-3 list-none">
      <button
        onClick={() => onSelect(user)}
        className={`flex items-center justify-between w-full p-4 rounded-2xl transition-all duration-300 border ${
          isSelected
            ? "bg-indigo-50 border-indigo-200 shadow-sm ring-1 ring-indigo-200"
            : "bg-white border-gray-100 hover:border-indigo-100 hover:shadow-lg hover:-translate-y-0.5"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className={`h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-lg transition-colors duration-300 ${
                isSelected
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "bg-linear-to-br from-indigo-100 to-purple-100 text-indigo-600"
              }`}
            >
              {user.name[0]}
            </div>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>

          <div className="text-left">
            <h4
              className={`font-bold transition-colors ${
                isSelected ? "text-indigo-900" : "text-gray-900"
              }`}
            >
              {user.name}
            </h4>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Mail className="h-3 w-3" />
                {user.email}
              </span>
              <span className="hidden sm:flex items-center gap-1 text-xs text-indigo-600/70 font-medium">
                <User className="h-3 w-3" />
                {user.username}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isSelected && (
            <span className="hidden group-hover:block text-[10px] font-bold text-indigo-500 uppercase tracking-widest mr-2">
              View Profile
            </span>
          )}
          <ChevronRight
            className={`h-5 w-5 transition-all duration-300 ${
              isSelected
                ? "text-indigo-500 rotate-90 lg:rotate-0"
                : "text-gray-300"
            }`}
          />
        </div>
      </button>

      {/* Mobile */}
      {isSelected && (
        <div className="lg:hidden animate-in slide-in-from-top-4 fade-in duration-300">
          <UserDetails user={user} onClose={onCloseDetails} />
        </div>
      )}
    </li>
  );
});

export const UserList = memo(
  ({ users, onSelect, selectedUser, onCloseDetails }) => {
    if (users.length === 0) {
      return (
        <div className="text-center py-16 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <User className="h-8 w-8 text-gray-300" />
          </div>
          <h4 className="text-gray-900 font-bold mb-1">No matches found</h4>
          <p className="text-gray-500 text-sm">
            Try adjusting your search criteria.
          </p>
        </div>
      );
    }

    const selectedId = selectedUser?.id;

    return (
      <ul className="grid gap-4 p-0">
        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            onSelect={onSelect}
            isSelected={selectedId === user.id}
            onCloseDetails={onCloseDetails}
          />
        ))}
      </ul>
    );
  }
);

export const UserSkeleton = () => (
  <div className="grid gap-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-white animate-pulse"
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gray-100"></div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-100 rounded"></div>
            <div className="h-3 w-48 bg-gray-50 rounded"></div>
          </div>
        </div>
        <div className="h-5 w-5 bg-gray-50 rounded"></div>
      </div>
    ))}
  </div>
);
