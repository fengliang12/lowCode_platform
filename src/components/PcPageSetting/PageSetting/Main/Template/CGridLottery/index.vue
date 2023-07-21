<template>
  <div class="grid-lottery">
    {{ setting?.blindBoxMode }}
    <div v-if="setting?.blindBoxMode" class="container">
      <div class="cube-wrap">
        <div class="cube">
          <div class="front">
            <img
              v-if="!!setting.images[0]"
              :src="setting.images[0]"
              alt=""
              class="block contain"
            />
            <div v-else>前(1)</div>
          </div>
          <div class="back">
            <img
              v-if="!!setting.images[2]"
              :src="setting.images[2]"
              alt=""
              class="block contain"
            />

            <div v-else>后(3)</div>
          </div>
          <div class="left">
            <img
              v-if="!!setting.images[1]"
              :src="setting.images[1]"
              alt=""
              class="block contain"
            />
            <div v-else>左(2)</div>
          </div>
          <div class="right">
            <img
              v-if="!!setting.images[3]"
              :src="setting.images[3]"
              alt=""
              class="block contain"
            />

            <div v-else>右(4)</div>
          </div>
          <div class="top">
            <img
              v-if="!!setting.images[4]"
              :src="setting.images[4]"
              alt=""
              class="block contain"
            />

            <div v-else>上(5)</div>
          </div>
          <div class="bottom">
            <img
              v-if="!!setting.images[5]"
              :src="setting.images[5]"
              alt=""
              class="block contain"
            />
            <div v-else>下(6)</div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="lottery-box grid grid-cols-3 grid-rows-3"
      :style="{
        gap: (setting.gap || 0) + 'px',
      }"
    >
      <div
        v-for="(item, index) in setting.images || []"
        :key="index"
        class="lottery-box-content"
      >
        <img v-if="!!item" :src="item" alt="" class="block contain" />
        <div v-else class="contain vhCenter bgColor">
          {{ index + 1 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const setting = computed(() => {
  return props.data
})
</script>

<style lang="scss" scoped>
.grid-lottery {
  width: 100%;
  padding-bottom: 100%;
  position: relative;

  .lottery-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
  }

  .lottery-box-content {
    width: 100%;
    height: 100%;
  }

  .bgColor {
    background-color: #eee;
  }

  .contain {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .container {
    width: 250px;
    height: 250px;
    margin: 50px auto;
  }
  .cube-wrap {
    perspective: 800px;
    perspective-origin: 50% 100px;
  }
  .cube {
    position: relative;
    width: 200px;
    margin: 0 auto;
    transform-style: preserve-3d;
    animation: cube-spin 10s infinite linear;
  }

  @keyframes cube-spin {
    from {
      transform: rotateY(0);
    }
    to {
      transform: rotateY(360deg);
    }
  }
  .cube div {
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: inset 0 0 30px rgba(125, 125, 125, 0.8);
    font-size: 20px;
    text-align: center;
    line-height: 200px;
    color: rgba(0, 0, 0, 0.5);
    text-transform: uppercase;
    overflow: hidden;
  }
  .front {
    transform: translateZ(100px);
  }

  .back {
    transform: rotateY(180deg) translateZ(100px);
  }

  .top {
    transform: rotateX(-90deg) translateY(-100px);
    transform-origin: top center;
  }

  .bottom {
    transform: rotateX(90deg) translateY(100px);
    transform-origin: bottom center;
  }

  .left {
    transform: rotateY(270deg) translateX(-100px);
    transform-origin: center left;
  }

  .right {
    transform: rotateY(-270deg) translateX(100px);
    transform-origin: top right;
  }
}

.grid {
  display: grid;
}

.grid-cols-3 {
  grid-template-columns: 1fr 1fr 1fr;
}

.grid-rows-3 {
  grid-template-rows: 1fr 1fr 1fr;
}
</style>
