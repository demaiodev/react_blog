import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-slate-800">
          CiviBlog
        </Link>
        <nav className="flex items-center gap-3">
          <Link
            to="/"
            className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/create"
            className="bg-slate-600 text-white p-2 rounded-md hover:bg-slate-900"
          >
            New Post
          </Link>
        </nav>
      </div>
    </header>
  );
}
