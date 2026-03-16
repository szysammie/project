<script setup lang="ts">
import { SLIDE_IDS, SLIDE_POSITIONS } from '../../constants/slideIds';
import { USER_CONFIG } from '../../constants/userConfig';
import BlurFade from '../ui/BlurFade.vue';

const handleSocialClick = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

const handleNext = () => {
  if ((window as any).impress) {
    (window as any).impress().next();
  }
};
</script>

<template>
  <div
    :id="SLIDE_IDS.TITLE"
    class="step title-slide"
    :data-x="SLIDE_POSITIONS.TITLE.x"
    :data-y="SLIDE_POSITIONS.TITLE.y"
    :data-z="SLIDE_POSITIONS.TITLE.z"
  >
    <div class="profile-container">
      <div class="header-section">
        <BlurFade :delay="0.2" :in-view="true">
          <div class="greeting-section">
            <h1 class="profile-name">
              Hey 👋, I'm <span class="cursor-target">{{ USER_CONFIG.NAME }}</span>!
            </h1>
          </div>
        </BlurFade>
        <BlurFade :delay="0.1" :in-view="true">
          <div class="avatar-section">
            <img
              :src="USER_CONFIG.AVATAR_URL"
              :alt="`${USER_CONFIG.NAME} Avatar`"
              class="profile-avatar cursor-target"
            />
            <div class="status-indicator"></div>
          </div>
        </BlurFade>
      </div>

      <div class="bio-section">
        <BlurFade
          v-for="(line, index) in USER_CONFIG.BIO"
          :key="index"
          :delay="0.4 + index * 0.1"
          :in-view="true"
        >
          <p class="bio-line">{{ line }}</p>
        </BlurFade>
      </div>

      <BlurFade :delay="0.7" :in-view="true">
        <div class="social-links">
          <button
            v-for="(link, index) in USER_CONFIG.CONTACT_LINKS"
            :key="index"
            @click="handleSocialClick(link.url || '')"
            class="social-link cursor-target"
            :class="{ wechat: link.type === 'wechat' }"
          >
            <i :class="link.icon"></i>
            <div v-if="link.type === 'wechat'" class="wechat-popup">
              <img src="../../assets/wechat.png" alt="WeChat QR Code" class="wechat-qr" />
              <p class="wechat-hint">Scan to add me</p>
            </div>
          </button>
        </div>
      </BlurFade>

      <BlurFade :delay="0.9" :in-view="true">
        <div class="scroll-hint cursor-target" @click="handleNext">
          <i class="fas fa-chevron-down"></i>
          <span>Explore my works</span>
        </div>
      </BlurFade>
    </div>
  </div>
</template>

<style>
/* Global-ish styles but specific to this component's needs */
@import './TitleSlide.css';
</style>
