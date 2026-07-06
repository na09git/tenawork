export default function Radio({ label, ...props }) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-700">
      <input type="radio" className="h-4 w-4 border-slate-300" {...props} />
      <span>{label}</span>
    </label>
  );
}
