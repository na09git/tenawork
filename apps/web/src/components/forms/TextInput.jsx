export default function TextInput({ label, error, ...props }) {
  return (
    <div>
      {label ? (
        <label className="mb-1 block text-sm font-medium">{label}</label>
      ) : null}
      <input
        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-sky-500"
        {...props}
      />
      {error ? <p className="mt-1 text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}
