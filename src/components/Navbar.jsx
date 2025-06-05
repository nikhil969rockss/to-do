const Navbar = () => {
  return (
    <nav className="flex items-center justify-around bg-gradient-to-r from-pink-400 via-indigo-500 to-emerald-600 ">
      <h2 className="text-2xl font-semibold cursor-pointer bg-gradient-to-r from-blue-500 via-green-400 to-black text-transparent bg-clip-text">iTask</h2>
      <ul className="flex gap-2 items-center">
        <li className="font-bold hover:scale-105 cursor-pointer">dummy</li>
        <li className="font-bold hover:scale-105 cursor-pointer">Nav</li>
      </ul>
    </nav>
  );
};
export default Navbar;
