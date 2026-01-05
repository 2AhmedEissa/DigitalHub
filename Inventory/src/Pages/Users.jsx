import { useUsers } from "../hooks/useUsers";
import UserSearch from "../components/Users/UserSearch";
import { UserList, UserSkeleton } from "../components/Users/UserList";
import UserDetails from "../components/Users/UserDetails";
import { Users as UsersIcon, AlertCircle, Sparkles } from "lucide-react";

const Users = () => {
  const {
    users,
    search,
    loading,
    error,
    selectedUser,
    handleSearchChange,
    handleSelectUser,
    handleClearSelection,
  } = useUsers();

  return (
    <main className="w-full max-w-350 mx-auto animate-in fade-in duration-700">
      <header className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-6 mb-8 shadow-xl shadow-indigo-500/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <UsersIcon className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold  tracking-tight bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-violet-600 ml-2">
                User List
              </h1>
            </div>
          </div>

          <UserSearch value={search} onChange={handleSearchChange} />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        {/* List */}
        <section className="lg:col-span-2 space-y-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-100 border border-white/40 p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900">Users</h3>
                {search && (
                  <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">
                    Filtering
                  </span>
                )}
              </div>
              {!loading && (
                <span className="text-sm font-semibold text-indigo-600 bg-indigo-50/50 px-4 py-1.5 rounded-full border border-indigo-100/50">
                  {users.length} {users.length === 1 ? "User" : "Users"}
                </span>
              )}
            </div>

            {loading ? (
              <UserSkeleton />
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 text-rose-500 bg-rose-50/50 rounded-3xl border border-dashed border-rose-100">
                <AlertCircle className="h-10 w-10 mb-2" />
                <p className="font-bold">{error}</p>
              </div>
            ) : (
              <UserList
                users={users}
                onSelect={handleSelectUser}
                selectedUser={selectedUser}
                onCloseDetails={handleClearSelection}
              />
            )}
          </div>
        </section>

        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24">
            {selectedUser ? (
              <UserDetails user={selectedUser} onClose={handleClearSelection} />
            ) : (
              <div className="bg-white/40 backdrop-blur-sm border-2 border-dashed border-indigo-100/50 rounded-[2.5rem] p-12 text-center shadow-inner group">
                <div className="h-24 w-24 bg-white rounded-4xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/10 group-hover:scale-110 transition-transform duration-500">
                  <div className="h-12 w-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 text-xl mb-3">
                  Details
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  Select a user to view their details.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Users;
