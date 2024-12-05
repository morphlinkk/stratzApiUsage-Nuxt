<script setup lang="ts">
defineProps({
  bgColor: { type: String, default: '#693EFE' },
  topBarColor: { type: String, default: '#D3FE3E' },
  bottomBarColor: { type: String, default: '#D3FE3E' },
  fullHeight: { type: Boolean, default: true }
});
</script>

<template>
    <div :class="`max-w-full ${fullHeight ? 'h-screen' : ''}`" :style="{ backgroundColor: bgColor }" class="relative z-10 flex flex-col justify-center items-center overflow-hidden p-4">
        <!-- Top bar -->
        <div class="h-[10%] w-full absolute top-0 z-20" :style="{ backgroundColor: topBarColor }"></div>
        <!-- Main content -->
        <div class="container relative z-30 text-center text-white max-w-4xl">
            <h1 class="font-bold text-6xl">
                <slot name="title">Статистики больше не осталось... Или возможно что-то пошло не так?</slot>
            </h1>
            <div class="mt-4">
                <div class="icon"></div>
                <div class="font-bold">
                    <slot name="link">
                        <RouterLink to="/apiPanel" class="hover:text-[#D3FE3E]">cовершить запрос можно здесь</RouterLink>
                    </slot>
                </div>
            </div>
        </div>
        <!-- Bottom bar -->
        <div class="h-[10%] w-full absolute bottom-0 z-20" :style="{ backgroundColor: bottomBarColor }"></div>
    </div>
</template>
