"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import StoryPrologue from "@/components/StoryPrologue";
import Farm360Tour from "@/components/Farm360Tour";
import FarmDirectionsSection from "@/components/FarmDirectionsSection";
import StoryAct1_Mud from "@/components/StoryAct1_Mud";
import StoryAct2_Water from "@/components/StoryAct2_Water";
import StoryAct3_Kinship from "@/components/StoryAct3_Kinship";
import StoryAct4_ClayFire from "@/components/StoryAct4_ClayFire";
import SchoolsSection from "@/components/SchoolsSection";
import GallerySection from "@/components/GallerySection";
import VideoTestimonials from "@/components/VideoTestimonials";
import ExpeditionPlanner from "@/components/ExpeditionPlanner";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import MobileTabBar from "@/components/MobileTabBar";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedActivity, setPreselectedActivity] = useState<string | undefined>(undefined);

  const handleOpenBooking = (activity?: string) => {
    setPreselectedActivity(activity);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPreselectedActivity(undefined);
  };

  return (
    <main className="relative min-h-screen bg-[#faf7f0] text-[#1e2617] overflow-hidden pb-24 lg:pb-0">
      {/* Floating Warm Editorial Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Hero / Prologue: Give your children the childhood you had */}
      <StoryPrologue onOpenBooking={() => handleOpenBooking()} />

      {/* Visual Feature: 360° Interactive Virtual Farm Tour (Immediately after Hero) */}
      <Farm360Tour />

      {/* Interactive Directions & Campus Comparison for Both Farms */}
      <FarmDirectionsSection />

      {/* Act I: Morning Mist & Barefoot Soil (09:30 AM) */}
      <StoryAct1_Mud onOpenBooking={() => handleOpenBooking("Paddy Sowing & Mud Arena")} />

      {/* Act II: The Symphony of Ancient Water (11:30 AM) */}
      <StoryAct2_Water onOpenBooking={() => handleOpenBooking("Ancient Water Systems")} />

      {/* Act III: Kinship with the Gentle Creatures & Farm Lunch (01:30 PM) */}
      <StoryAct3_Kinship onOpenBooking={() => handleOpenBooking("Walk-in Aviary & Dairy")} />

      {/* Act IV: Fire, Clay & Twilight Joy (03:30 PM) */}
      <StoryAct4_ClayFire onOpenBooking={() => handleOpenBooking("Pottery & Farm Celebration")} />

      {/* Dedicated Academic Partner Program: Schools & Colleges Field Trips */}
      <SchoolsSection onOpenBooking={() => handleOpenBooking("School Field Trip Batch")} />

      {/* Curated Authentic Photo Archive with 'Explore More' Toggle + Fullscreen Lightbox */}
      <GallerySection />

      {/* Video Reviews with 'Watch More' Toggle & Player Modal */}
      <VideoTestimonials />

      {/* Epilogue: The Expedition Desk (Packages, Safety Guarantees, FAQs & WhatsApp Concierge) */}
      <ExpeditionPlanner onOpenBooking={() => handleOpenBooking()} />

      {/* Footer */}
      <Footer />

      {/* Native-Style Mobile App Bottom Bar (Mobile/Tablet Only) */}
      <MobileTabBar onOpenBooking={() => handleOpenBooking()} />

      {/* Booking Concierge Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedActivity={preselectedActivity}
      />
    </main>
  );
}
