import { useState, useMemo, useRef } from "react";
import { products } from "../../data/products";
import { debounce } from "../../utils/useDebounce";
import toast from "react-hot-toast";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Tags,
  DollarSign,
  Package,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function ProductTable() {
  const [data, setData] = useState(products);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [offerFilter, setOfferFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const debouncedSetSearch = useRef(
    debounce((value) => {
      setDebouncedSearch(value);
    }, 300)
  ).current;

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSetSearch(value);
    setCurrentPage(1);
  };

  const categories = useMemo(
    () => ["All", ...new Set(data.map((p) => p.category))],
    [data]
  );

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchesOffer =
        offerFilter === "All"
          ? true
          : offerFilter === "Yes"
          ? item.offer
          : !item.offer;

      let matchesPrice = true;
      if (selectedPriceRange === "low") matchesPrice = item.price < 100;
      if (selectedPriceRange === "mid")
        matchesPrice = item.price >= 100 && item.price <= 300;
      if (selectedPriceRange === "high") matchesPrice = item.price > 300;

      return matchesSearch && matchesCategory && matchesOffer && matchesPrice;
    });
  }, [
    debouncedSearch,
    selectedCategory,
    offerFilter,
    selectedPriceRange,
    data,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Delete handler
  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-medium text-gray-900">
            Are you sure you want to delete this product?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setData((prev) => prev.filter((p) => p.id !== id));
                toast.dismiss(t.id);
                toast.success("Product deleted successfully!", {
                  icon: "🗑️",
                  style: {
                    borderRadius: "12px",
                    background: "#333",
                    color: "#fff",
                  },
                });
              }}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors shadow-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
        style: {
          padding: "16px",
          color: "#1e293b",
          background: "#fff",
          borderRadius: "20px",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          border: "1px border-gray-100",
          minWidth: "300px",
        },
      }
    );
  };

  // Edit handler
  const handleEdit = (id) => {
    toast(`Opening edit for product #${id}`, {
      icon: "🏽",
      style: {
        borderRadius: "12px",
        background: "#fff",
        color: "#333",
        border: "1px solid #e2e8f0",
      },
    });
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto animate-in fade-in duration-500">
      {/* Search & Filter Header */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-6 mb-8 shadow-xl shadow-indigo-500/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              Product Inventory
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your catalogue with ease
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative group w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl leading-5 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
                         transition-all duration-200 shadow-sm"
              placeholder="Search products by name..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Tags className="h-4 w-4 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-10 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none transition-all cursor-pointer hover:bg-white"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter className="h-3 w-3 text-gray-400" />
            </div>
          </div>

          {/* Price Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-4 w-4 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-10 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none transition-all cursor-pointer hover:bg-white"
              value={selectedPriceRange}
              onChange={(e) => {
                setSelectedPriceRange(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Prices</option>
              <option value="low">Under $100</option>
              <option value="mid">$100 - $300</option>
              <option value="high">Above $300</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter className="h-3 w-3 text-gray-400" />
            </div>
          </div>

          {/* Offer Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Package className="h-4 w-4 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-10 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none transition-all cursor-pointer hover:bg-white"
              value={offerFilter}
              onChange={(e) => {
                setOfferFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Offers</option>
              <option value="Yes">On Offer Only</option>
              <option value="No">No Offer</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter className="h-3 w-3 text-gray-400" />
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-end px-2">
            <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {filteredData.length} Results
            </span>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-100 border border-white/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-left">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Offer
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Suppliers
                </th>
                {/* <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Stock
                </th> */}
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.length > 0 ? (
                paginatedData.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-indigo-50/30 transition-colors duration-150 group"
                  >
                    {/* Product Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm">
                          {product.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            ID: #{product.id.toString().padStart(4, "0")}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900">
                        ${product.price}
                      </div>
                    </td>

                    {/* Offer */}
                    <td className="px-6 py-4">
                      {product.offer ? (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Yes
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1 bg-gray-100 text-gray-700">
                          <XCircle className="w-3 h-3" /> No
                        </span>
                      )}
                    </td>

                    {/* Suppliers */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {product.suppliers.map((supplier, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-2 py-0.5 bg-gray-50 border border-gray-100 rounded text-[10px] text-gray-500"
                          >
                            {supplier}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Stock 
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-700">
                        {product.stock} units
                      </div>
                    </td>*/}

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="p-2 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 bg-white border border-gray-200 rounded-lg hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 transition-all shadow-sm"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Package className="w-12 h-12 text-gray-300 mb-2" />
                      <p>No products found matching your filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Page{" "}
            <span className="font-semibold text-indigo-600">{currentPage}</span>{" "}
            of <span className="font-semibold">{totalPages || 1}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 enabled:hover:bg-gray-50 enabled:active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 enabled:hover:bg-gray-50 enabled:active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
