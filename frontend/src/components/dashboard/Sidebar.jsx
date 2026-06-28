import { Link, useLocation } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Upload Documents",
    path: "/upload",
  },
  {
    name: "Review",
    path: "/review",
  },
];

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-2xl font-bold">
          Utility Bill AI
        </h2>
      </div>

      <nav className="flex-1 p-4">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block rounded-lg px-4 py-3 mb-2 transition

            ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;