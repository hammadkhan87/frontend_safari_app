import TanzaniaVacation from "@/app/_components/home/DreamVacationSection";
import GetInspiredSection from "@/app/_components/home/GetInspiredSection";
import HeroSection from "@/app/_components/home/Hero";
import TailorMadeTrip from "@/app/_components/home/TailorMadeTripEnhanced";
import TanzaniaWonders from "@/app/_components/home/TanzaniaWonders";
import TestimonialSection from "@/app/_components/home/TestimonialSection";
import WhyChooseUs from "@/app/_components/home/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
   <>
  
<HeroSection/>
<TanzaniaWonders/>
<TanzaniaVacation/>
<TestimonialSection/>
<WhyChooseUs/>
<GetInspiredSection/>
<TailorMadeTrip/>

   </>
  );
}
