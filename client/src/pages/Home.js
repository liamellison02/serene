import Twitter from "../assets/Twitter.png"
import Logo from "../assets/logo.png"

function TwitterIcon() {
	return(
		<div className="w-[100px] h-[100px] bg-[#1A3652] m-4 flex items-center justify-center rounded-full">
			<img src={Twitter} className="h-[64px]" alt="Twitter"/>
		</div>
	);
}

function Home() {
	return (
		<div id="HomePage" className="w-full h-full flex justify-center items-center bg-[#1ba9e11A]">
				<div id="header" className="fixed top-0 left-0 flex items-center p-[30px]" >
					<img src={Logo} className="w-[82px] h-[82px] p-2" alt="Serene"/>
					<h1 className="text-[48px] text-[#1A3652]">SERENE</h1>
				</div>
				<TwitterIcon />
				<a href='/authorize/twitter' className="text-[64px] font-sans underline text-[#1A3652]">Login with twitter</a>
		</div>
	);
}

export default Home;
