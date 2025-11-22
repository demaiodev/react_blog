import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white sm:shadow-md shadow-none mx-auto">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-semibold text-slate-800 flex items-center gap-2 shrink-0"
        >
          <span className="bg-slate-800 text-white p-2 rounded text-sm font-bold">
            CB
          </span>
          <span>CiviBlog</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-3">
          <Link
            to="/"
            className="text-slate-800 hover:text-slate-600 px-3 py-2 rounded-md text-sm"
          >
            Home
          </Link>
          <Link
            to="/moderation"
            className="text-slate-800 hover:text-slate-600 px-3 py-2 rounded-md text-sm"
          >
            Moderation
          </Link>
          <Link
            to="/create"
            className="bg-slate-800 text-white px-3 py-2 rounded-md hover:bg-slate-700 text-sm whitespace-nowrap"
          >
            New Post
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden p-2 text-slate-800 hover:bg-slate-100 rounded-md shrink-0"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <nav className="sm:hidden bg-slate-200 p-2 border border-slate-300 rounded-xl">
          <div className="max-w-5xl mx-auto px-4 py-2 space-y-1">
            <Link
              to="/"
              className="block text-slate-800 hover:bg-slate-100 px-3 py-2 rounded-md text-sm"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/moderation"
              className="block text-slate-800 hover:bg-slate-100 px-3 py-2 rounded-md text-sm"
              onClick={() => setIsOpen(false)}
            >
              Moderation
            </Link>
            <Link
              to="/create"
              className="block bg-slate-800 text-white px-3 py-2 rounded-md hover:bg-slate-700 text-sm"
              onClick={() => setIsOpen(false)}
            >
              + New Post
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
