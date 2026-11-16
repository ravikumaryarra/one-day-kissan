import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "One Day Kissan — Farm-Based Edutainment Destination",
    short_name: "One Day Kissan",
    description: "Discover One Day Kissan, an immersive farm tourism experience offering authentic rural activities, agricultural experiences and memorable visits near Hyderabad, Telangana.",
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
