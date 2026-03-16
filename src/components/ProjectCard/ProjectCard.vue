<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { GITHUB_TOKEN } from '../../constants/userConfig';
import type { GitHubRepoInfo, Project } from '../../types/project';

const props = defineProps<{
  project: Project;
}>();

const repoInfo = ref<GitHubRepoInfo | null>(null);
const loading = ref(true);

const isReverse = computed(() => props.project.layout === 'reverse');

const githubRepo = computed(() =>
  props.project.links.find((link) => link.type === 'code' && link.githubRepo)?.githubRepo
);

const formatCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

onMounted(async () => {
  if (!githubRepo.value) {
    loading.value = false;
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${githubRepo.value}`, {
      headers: {
        Authorization: `bearer ${GITHUB_TOKEN.replaceAll('?', '')}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    repoInfo.value = {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      issues: data.open_issues_count || 0,
      language: data.language || '',
      license: data.license?.name || null,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Failed to fetch GitHub repo info:', error);
    repoInfo.value = {
      stars: 0,
      forks: 0,
      issues: 0,
      language: '',
      license: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="project-card" :class="{ 'layout-reverse': isReverse }">
    <template v-if="isReverse">
      <div class="project-preview cursor-target" :class="{ animate: loading }">
        <img
          class="project-image"
          :src="project.preview"
          :alt="project.title"
          loading="lazy"
        />
      </div>
      <div class="project-info">
        <h2 class="cursor-target" :class="{ animate: loading }">{{ project.title }}</h2>
        <p class="project-description" :class="{ animate: loading }">{{ project.description }}</p>
        <div class="project-tech" :class="{ animate: loading }">
          <span v-for="(tech, index) in project.tech" :key="index" class="tech-tag cursor-target">
            {{ tech }}
          </span>
        </div>

        <div v-if="githubRepo" class="github-stats" :class="{ animate: loading }">
          <div v-if="loading" class="loading-stats">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Loading repository info...</span>
          </div>
          <div v-else-if="repoInfo" class="repo-meta">
            <div v-if="repoInfo.language" class="meta-item cursor-target">
              <span>{{ repoInfo.language }}</span>
            </div>
            <div class="meta-item cursor-target">
              <span>Created {{ formatDate(repoInfo.createdAt) }}</span>
            </div>
          </div>
          <div v-else class="no-repo-info">
            <i class="fas fa-info-circle"></i>
            <span>GitHub repository info unavailable</span>
          </div>
        </div>

        <div class="project-links" :class="{ animate: loading }">
          <a
            v-for="(link, index) in project.links"
            :key="index"
            :href="link.url"
            class="project-link cursor-target"
            :class="{ secondary: link.type !== 'demo' }"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i :class="link.type === 'demo' ? 'fas fa-external-link-alt' : 'fab fa-github'"></i>
            {{ link.text }}
            <span v-if="repoInfo && link.type === 'code'" class="star-count">
              <i class="fas fa-star"></i>
              {{ formatCount(repoInfo.stars) }}
            </span>
          </a>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="project-info">
        <h2 class="cursor-target" :class="{ animate: loading }">{{ project.title }}</h2>
        <p class="project-description" :class="{ animate: loading }">{{ project.description }}</p>
        <div class="project-tech" :class="{ animate: loading }">
          <span v-for="(tech, index) in project.tech" :key="index" class="tech-tag cursor-target">
            {{ tech }}
          </span>
        </div>

        <div v-if="githubRepo" class="github-stats" :class="{ animate: loading }">
          <div v-if="loading" class="loading-stats">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Loading repository info...</span>
          </div>
          <div v-else-if="repoInfo" class="repo-meta">
            <div v-if="repoInfo.language" class="meta-item cursor-target">
              <span>{{ repoInfo.language }}</span>
            </div>
            <div class="meta-item cursor-target">
              <span>Created {{ formatDate(repoInfo.createdAt) }}</span>
            </div>
          </div>
          <div v-else class="no-repo-info">
            <i class="fas fa-info-circle"></i>
            <span>GitHub repository info unavailable</span>
          </div>
        </div>

        <div class="project-links" :class="{ animate: loading }">
          <a
            v-for="(link, index) in project.links"
            :key="index"
            :href="link.url"
            class="project-link cursor-target"
            :class="{ secondary: link.type !== 'demo' }"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i :class="link.type === 'demo' ? 'fas fa-external-link-alt' : 'fab fa-github'"></i>
            {{ link.text }}
            <span v-if="repoInfo && link.type === 'code'" class="star-count">
              <i class="fas fa-star"></i>
              {{ formatCount(repoInfo.stars) }}
            </span>
          </a>
        </div>
      </div>
      <div class="project-preview cursor-target" :class="{ animate: loading }">
        <img
          class="project-image"
          :src="project.preview"
          :alt="project.title"
          loading="lazy"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
@import './ProjectCard.css';
</style>
