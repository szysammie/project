import { defineStore } from 'pinia';
import { projectsData, mapData } from '../constants/projectsData';
import type { Project } from '../types/project';

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: projectsData as Project[],
    mapData: mapData,
    githubStars: {} as Record<string, number>,
  }),

  actions: {
    async fetchGitHubStars() {
      for (const project of this.projects) {
        const githubLink = project.links.find((link) => link.type === 'code');
        if (githubLink?.githubRepo) {
          try {
            const response = await fetch(
              `https://api.github.com/repos/${githubLink.githubRepo}`
            );
            if (response.ok) {
              const data = await response.json();
              this.githubStars[project.id] = data.stargazers_count;
            }
          } catch (error) {
            console.error(`Failed to fetch stars for ${project.id}:`, error);
          }
        }
      }
    },
  },
});
