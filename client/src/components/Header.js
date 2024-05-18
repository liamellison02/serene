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
            <a href="/authorize/twitter"><div className="w-[50px] h-[50px] rounded-full bg-black"></div></a>
        </header>
    );
}

export default Header;