import type { Project } from "@/data/projects";

export function getProjectImageUrl(project: Project): string {
  return project.image ?? `/projects/${project.slug}.png`;
}

export function getAvatarUrl(size = 800): string {
  return `https://avatars.githubusercontent.com/u/146840606?s=${size}&v=4`;
}
