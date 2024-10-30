"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Header from "@/components/header/header";
import HomePage from "./(client)/home/home";
import Footer from "@/components/footer/footer";
import Listing from "./(client)/product/page";
import DetailsPage from "./(client)/product/[id]/page";

export default function Home() {

  const router = useRouter();

  return (
    <div>
      <Header/>
      {/* <HomePage/> */}
      {/* <Listing/> */}
      <DetailsPage/>
      <Footer/>
    </div>
  );
}
