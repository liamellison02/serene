import Logo from "../assets/logo.png"

function Home() {
	return (
		<div id="HomePage" className="w-full h-full flex justify-center items-center bg-[#1ba9e11A]">
				<div id="header" className="fixed top-0 left-0 flex items-center p-[30px]" >
					<img src={Logo} className="w-[82px] h-[82px] p-2" alt="Serene"/>
					<h1 className="text-[48px] text-[#1A3652]">SERENE</h1>
				</div>
				<h1 href='/authorize/twitter' className="text-[64px] font-sans text-[#1A3652]">Page not found</h1>
		</div>
	);
}

export default Home;
