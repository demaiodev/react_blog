import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-slate-800">
          <span className="mr-2 bg-slate-800 text-white p-2 rounded">CB</span>
          <span>CiviBlog</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link
            to="/"
            className="text-slate-800 hover:text-slate-600 px-3 py-2 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/moderation"
            className="text-slate-800 hover:text-slate-600 px-3 py-2 rounded-md"
          >
            Moderation
          </Link>
          <Link
            to="/create"
            className="bg-slate-800 text-white p-2 rounded-md hover:bg-slate-600"
          >
            + New Post
          </Link>
        </nav>
      </div>
    </header>
  );
}
