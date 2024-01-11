import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import { useLocation } from "react-router-dom";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const { pathname } = useLocation();

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<Hero />
			{pathname.startsWith("/login") ? (
				<></>
			) : pathname.startsWith("/register") ? (
				<></>
			) : (
				<div className="max-w-[1280px] px-4 mx-auto">
					<SearchBar />
				</div>
			)}
			<div className="mt-10 max-w-[1280px] px-4 mx-auto flex-1 w-full">{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
