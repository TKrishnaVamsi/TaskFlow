function Navbar() {
    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <h1 className="text-2xl font-bold text-gray-900">
                    TaskFlow
                </h1>

                <div className="text-sm text-gray-500">
                    My Tasks
                </div>
            </div>
        </nav>
    );
}

export default Navbar;