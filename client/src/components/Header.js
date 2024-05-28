import Twitter from "../assets/Twitter.png";

function TwitterIcon() {
  return (
      <div className="relative group">
          <img src={Twitter} alt="twitter" className="w-[50px] h-[50px] rounded-full border-black border-[3px]" />
          <span className="absolute top-full left-[-16px] transform -translate-x-1/2 mt-2 w-max bg-black text-white text-center text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Login with Twitter
          </span>
      </div>
  )
}

function Header() {
  return (
    <header className="w-full h-[60px] px-8 flex justify-center items-center text-[40px] md:text-64px absolute top-0 left-0">
      <a href="/" className="font-serif">Serene</a>
      <a href="/authorize/twitter" className="absolute right-[32px] top-1/2 transform -translate-y-1/2"><TwitterIcon /></a>
    </header>
  );
}

export default Header;
