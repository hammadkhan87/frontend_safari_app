import TanzaniaVacation from "@/_components/home/DreamVacationSection";
import GetInspiredSection from "@/_components/home/GetInspiredSection";
import HeroSection from "@/_components/home/Hero";
import TailorMadeTrip from "@/_components/home/TailorMadeTripEnhanced";
import TanzaniaWonders from "@/_components/home/TanzaniaWonders";
import TestimonialSection from "@/_components/home/TestimonialSection";
import WhyChooseUs from "@/_components/home/WhyChooseUs";
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
