export default function FileUpload({ label, ...props }) {
  return (
    <div>
      {label ? (
        <label className="mb-1 block text-sm font-medium">{label}</label>
      ) : null}
      <input
        type="file"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 file:mr-3 file:rounded file:border-0 file:bg-sky-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-sky-700"
        {...props}
      />
    </div>
  );
}
