import { memo } from "react";
import { UserItem } from "./UserItem";
import { User } from "lucide-react";

export const UserList = memo(
  ({ users, onSelect, selectedUser, onCloseDetails, onEdit, onDelete }) => {
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
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    );
  }
);
