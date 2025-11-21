import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import PostView from "./views/PostView";
import CreatePost from "./views/CreatePost";
import Moderation from "./views/Moderation";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/moderation" element={<Moderation />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
