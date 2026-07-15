import type { Project } from "@/data/projects";

export function getProjectImageUrl(project: Project): string {
  if (project.image) return project.image;

  if (project.live) {
    const params = new URLSearchParams({
      url: project.live,
      screenshot: "true",
      "viewport.width": "1280",
      "viewport.height": "720",
    });
    return `https://api.microlink.io/?${params.toString()}`;
  }

  const repoPath = project.github
    .replace("https://github.com/", "")
    .replace(/\/$/, "");
  return `https://opengraph.githubassets.com/1/${repoPath}`;
}

export function getAvatarUrl(size = 800): string {
  return `https://avatars.githubusercontent.com/u/146840606?s=${size}&v=4`;
}
