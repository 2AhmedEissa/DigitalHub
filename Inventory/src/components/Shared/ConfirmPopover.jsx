import { Trash2 } from "lucide-react";
import Popover from "@mui/material/Popover";

export const ConfirmPopover = ({
  anchorEl,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  cancelLabel,
}) => {
  const open = Boolean(anchorEl);
  const id = open ? "confirm-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      slotProps={{
        paper: {
          className:
            "w-64 bg-white/80 backdrop-blur-2xl  shadow-2xl shadow-rose-900/20 border border-white/50 p-4 ring-1 ring-rose-100 dark:ring-rose-900/20 overflow-visible",
          style: {
            backgroundColor: "transparent",
            overflow: "visible",
          },
        },
      }}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="h-10 w-10 bg-rose-50 rounded-full flex items-center justify-center shrink-0">
          <Trash2 className="h-5 w-5 text-rose-500" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-gray-900">{title}</h4>
          <p className="text-xs text-gray-500 leading-relaxed px-2">
            {description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <button
          onClick={onClose}
          className="px-3 py-2 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all border border-gray-200/50 cursor-pointer"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          className="px-3 py-2 text-xs font-bold text-white bg-linear-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 shadow-lg shadow-rose-500/30 rounded-xl transition-all active:scale-95 cursor-pointer"
        >
          {confirmLabel}
        </button>
      </div>

      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-3 h-3 rotate-45 bg-white/80 backdrop-blur-2xl border-r border-b border-white/50 ring-1 ring-rose-100/50 clip-arrow"></div>
    </Popover>
  );
};
