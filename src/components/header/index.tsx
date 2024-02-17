import { useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

export function Header() {

  const { cartAmount } = useContext(CartContext)

  return (
    <header className="w-full px-1 bg-slate-200">
      <nav className="w-full flex items-center justify-between max-w-7xl h-14 px-5 mx-auto">
        <Link className="font-bold text-2xl" to={"/"}>
          Dev Shop
        </Link>
        <Link to={"/cart"} className="relative">
          <FiShoppingCart size={24} color="#121212" />
          {cartAmount > 0 && (
            <span className="absolute -right-4 -top-3 px-2.5 bg-sky-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs">
              {cartAmount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
