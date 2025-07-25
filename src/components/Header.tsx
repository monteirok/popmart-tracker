export default function Header() {
  return (
    <header className="bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🧸</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Popmart Tracker</h1>
              <p className="text-pink-100 text-sm">Track your collectible orders</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-pink-100">Welcome back!</p>
          </div>
        </div>
      </div>
    </header>
  );
}