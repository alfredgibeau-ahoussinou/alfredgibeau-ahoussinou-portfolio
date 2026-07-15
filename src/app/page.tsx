import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Hero } from "@/components/Hero";
import { HomeCTA } from "@/components/HomeCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProjects />
      <HomeCTA />
    </main>
  );
}
