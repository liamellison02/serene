import Twitter from "../assets/Twitter.jpg";

function EmotionPreview() {

  const gradient = {
    background: 'linear-gradient(45deg, #6DC543 0%, #F37C7C 150%)'
  };

  return (
    <div id="Emotions" className="flex justify-center items-center">
      <div id="circle" className="w-[50px] h-[50px] rounded-full" style={gradient}>
      </div>
      <p className="ml-4 hidden md:block text-[20px]">Happy 😄</p>
    </div>
  );
}

function TwitterIcon() {
  return (
    <div className="relative group">
      <img src={Twitter} alt="twitter" className="w-[50px] h-[50px] rounded-full border-black border-[3px]"/>
      <span className="absolute top-full left-[-16px] transform -translate-x-1/2 mt-2 w-max bg-black text-white text-center text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Login with Twitter
      </span>
    </div>
  )
}


function Header() {
  return (
    <header className="w-full h-[60px] px-8 flex justify-between items-center text-[40px] md:text-64px absolute top-0 left-0">
      <a href="/" className="font-serif">Serene</a>
      <a href="/dashboard" className="flex items-center"><EmotionPreview /></a>
      <a href="/authorize/twitter"><TwitterIcon /></a>
    </header>
  );
}

export default Header;
