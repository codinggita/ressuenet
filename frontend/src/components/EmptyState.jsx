export default function EmptyState({ title, message, action, icon = '•' }) {
  return (
    <div className="rounded-2xl border border-dashed border-outline-variant/30 bg-white p-8 text-center shadow-sm">
      <div className="mb-3 text-3xl">{icon}</div>
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      <p className="mx-auto max-w-md text-sm text-on-surface-variant">{message}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
