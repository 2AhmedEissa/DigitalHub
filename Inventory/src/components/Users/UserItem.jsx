import { memo, useState } from "react";
import { Mail, User, ChevronRight, Edit, Trash2 } from "lucide-react";
import UserDetails from "./UserDetails";
import { ActionButton } from "../Shared/Action";
import { ConfirmPopover } from "../Shared/ConfirmPopover";

export const UserItem = memo(
  ({ user, onSelect, isSelected, onCloseDetails, onEdit, onDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    return (
      <li className="space-y-3 list-none">
        <div
          role="button"
          tabIndex={0}
          onClick={() => (isSelected ? onCloseDetails() : onSelect(user))}
          className={`flex items-center justify-between w-full p-4 rounded-2xl transition-all duration-300 border cursor-pointer ${
            isSelected
              ? "bg-indigo-50 border-indigo-200 shadow-sm ring-1 ring-indigo-200"
              : "bg-white border-gray-100 hover:border-indigo-100 hover:shadow-lg hover:-translate-y-0.5"
          }`}
        >
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
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

            <div className="text-left min-w-0">
              <h4
                className={`font-bold truncate transition-colors ${
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

          <div className="flex items-center gap-2 shrink-0 ml-2">
            {!isSelected && (
              <span className="hidden group-hover:block text-[10px] font-bold text-indigo-500 uppercase tracking-widest mr-2">
                View Profile
              </span>
            )}
            <div className="hidden lg:flex items-center gap-2">
              <ActionButton
                icon={Edit}
                label="Edit User"
                onClick={() => onEdit(user)}
              />
              <ActionButton
                icon={Trash2}
                label="Delete User"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                variant="danger"
              />
              <ConfirmPopover
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                onConfirm={() => {
                  onDelete(user);
                  setAnchorEl(null);
                }}
                title={`${user.name}`}
                description="This action cannot be undone. Are you sure?"
                confirmLabel="Delete"
                cancelLabel="Cancel"
              />
            </div>
            <ChevronRight
              className={`h-5 w-5 transition-all duration-300 lg:hidden ${
                isSelected
                  ? "text-indigo-500 rotate-90 lg:rotate-0"
                  : "text-gray-300"
              }`}
            />
          </div>
        </div>

        {/* Mobile */}
        {isSelected && (
          <div className="lg:hidden animate-in slide-in-from-top-4 fade-in duration-300">
            <UserDetails
              user={user}
              onClose={onCloseDetails}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        )}
      </li>
    );
  }
);
