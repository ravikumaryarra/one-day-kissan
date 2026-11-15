import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "One Day Kisan — Farm-Based Edutainment Destination",
    short_name: "One Day Kisan",
    description: "Experience authentic rural farming, ancient Persian wheel water systems, and 360° virtual farm tours near Hyderabad.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f0",
    theme_color: "#2b4c1c",
    icons: [
      {
        src: "/images/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
