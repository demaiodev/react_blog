export default function ErrorBanner({ message }: { message?: string }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded">
      <strong className="block">Error</strong>
      <div className="text-sm mt-1">{message ?? "Something went wrong."}</div>
    </div>
  );
}
