"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import StoryPrologue from "@/components/StoryPrologue";
import StoryAct1_Mud from "@/components/StoryAct1_Mud";
import StoryAct2_Water from "@/components/StoryAct2_Water";
import Farm360Tour from "@/components/Farm360Tour";
import StoryAct3_Kinship from "@/components/StoryAct3_Kinship";
import StoryAct4_ClayFire from "@/components/StoryAct4_ClayFire";
import SchoolsSection from "@/components/SchoolsSection";
import GallerySection from "@/components/GallerySection";
import VideoTestimonials from "@/components/VideoTestimonials";
import ExpeditionPlanner from "@/components/ExpeditionPlanner";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

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
    <main className="relative min-h-screen bg-[#faf7f0] text-[#1e2617] overflow-hidden">
      {/* Floating Warm Editorial Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Prologue: The Concrete Disconnect & The Nostalgic Call */}
      <StoryPrologue onOpenBooking={() => handleOpenBooking()} />

      {/* Act I: Morning Mist & Barefoot Soil (09:30 AM) */}
      <StoryAct1_Mud onOpenBooking={() => handleOpenBooking("Paddy Sowing & Mud Arena")} />

      {/* Act II: The Symphony of Ancient Water (11:30 AM) */}
      <StoryAct2_Water onOpenBooking={() => handleOpenBooking("Ancient Water Systems")} />

      {/* Visual Interlude: The 360° Living Horizon Pavilion (Bhongir & Moinabad) */}
      <Farm360Tour />

      {/* Act III: Kinship with the Gentle Creatures & Farm Lunch (01:30 PM) */}
      <StoryAct3_Kinship onOpenBooking={() => handleOpenBooking("Walk-in Aviary & Dairy")} />

      {/* Act IV: Fire, Clay & Twilight Joy (03:30 PM) */}
      <StoryAct4_ClayFire onOpenBooking={() => handleOpenBooking("Pottery & Farm Celebration")} />

      {/* Dedicated Academic Partner Program: Schools & Colleges Field Trips */}
      <SchoolsSection onOpenBooking={() => handleOpenBooking("School Field Trip Batch")} />

      {/* Authentic Photo Archive: 58 Real Photographs + Fullscreen Lightbox */}
      <GallerySection />

      {/* All 19 Real Video Reviews from Teachers, Principals & Corporates */}
      <VideoTestimonials />

      {/* Epilogue: The Expedition Desk (Programs, Safety Guarantees, Directions, FAQs & WhatsApp Concierge) */}
      <ExpeditionPlanner onOpenBooking={() => handleOpenBooking()} />

      {/* Footer */}
      <Footer />

      {/* Booking Concierge Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedActivity={preselectedActivity}
      />
    </main>
  );
}
