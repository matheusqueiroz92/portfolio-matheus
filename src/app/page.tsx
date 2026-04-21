import { getFeaturedProjects } from "@/lib/content";

import { HomeShell } from "./home-shell";

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();
  return <HomeShell featuredProjects={featuredProjects} />;
}
