import {logo} from "../assets";
function GradientBall() {

    const gradient = {
        background: 'linear-gradient(45deg, #6DC543 0%, #F37C7C 150%)'
    };

    return (
        <div id="Emotions" className="flex justify-center items-center">
            <div id="circle" className="w-[50px] h-[50px] rounded-full" style={gradient}>
            </div>
            <p className="ml-4 hidden md:block text-[20px]">Looking Good 😎</p>
        </div>
    );
}

function Header() {
    return (
        <header className="w-full h-[60px] px-8 flex justify-between items-center text-[40px] md:text-64px relative">
      <a href="/" className="font-serif">Serene</a>
      <a href="/dashboard"><GradientBall /></a>
      <div className="relative group">
        <a href="/authorize/twitter" className="relative">
          <img src={logo} alt="logo" className="w-[50px] h-[50px] rounded-full border-black border-[3px]" />
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-max bg-black text-white text-center text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Login with Twitter
          </span>
        </a>
      </div>
    </header>
    );
}

export default Header;