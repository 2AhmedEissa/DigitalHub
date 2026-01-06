import { memo, useState } from "react";
import { Mail, Phone, Globe, X, User, Edit, Trash2 } from "lucide-react";
import { ConfirmPopover } from "../Shared/ConfirmPopover";

const UserDetails = memo(({ user, onClose, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  if (!user) return null;

  return (
    <article className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
      <header className="flex items-center justify-end lg:justify-between  lg:p-6  lg:border-b border-gray-50">
        <div className="hidden lg:flex items-center gap-3">
          <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 line-clamp-1">
              {user.name}
            </h3>
            <p className="text-xs text-gray-400">@{user.username}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="hidden lg:block pr-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </header>

      <section className="p-4 lg:p-6 space-y-5">
        <div className="grid gap-4">
          <InfoRow icon={<Mail />} label="Email" value={user.email} />
          <InfoRow icon={<Phone />} label="Phone" value={user.phone} />
          <InfoRow icon={<Globe />} label="Website" value={user.website} />
          <InfoRow icon={<User />} label="Username" value={user.username} />
        </div>

        {(onEdit || onDelete) && (
          <div className="flex items-center gap-3 pt-4 mt-4 border-t border-gray-100 lg:hidden">
            {onEdit && (
              <button
                onClick={() => onEdit(user)}
                className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-indigo-50 text-indigo-600 font-semibold text-sm hover:bg-indigo-100 transition-colors"
              >
                <Edit className="h-4 w-4" />
                Edit
              </button>
            )}
            {onDelete && (
              <div className="relative flex-1">
                <button
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-rose-50 text-rose-600 font-semibold text-sm hover:bg-rose-100 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
                <ConfirmPopover
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
                  onConfirm={() => {
                    onDelete(user);
                    setAnchorEl(null);
                  }}
                  title="Delete User?"
                  description="This action cannot be undone."
                  confirmLabel="Delete"
                />
              </div>
            )}
          </div>
        )}
      </section>
    </article>
  );
});

const InfoRow = ({ icon, label, value, href }) => (
  <div className="flex items-start gap-4 group">
    <div className="mt-0.5 text-indigo-400 group-hover:text-indigo-600 transition-colors [&>svg]:h-4 [&>svg]:w-4">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors truncate block"
        >
          {value}
        </a>
      ) : (
        <p className="text-sm font-medium text-gray-900 truncate">{value}</p>
      )}
    </div>
  </div>
);

export default UserDetails;
