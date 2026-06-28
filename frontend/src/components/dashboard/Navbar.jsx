function Navbar() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-8">
      <div>
        <h1 className="text-xl font-semibold">
          Document Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
          P
        </div>
      </div>
    </header>
  );
}

export default Navbar;