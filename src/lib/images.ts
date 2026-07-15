import type { Project } from "@/data/projects";
import { profile } from "@/data/profile";

export function getProjectImageUrl(project: Project): string {
  return project.image ?? `/projects/${project.slug}.png`;
}

export function getPortraitPath(): string {
  return profile.avatar;
}
