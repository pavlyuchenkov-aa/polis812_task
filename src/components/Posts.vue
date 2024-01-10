<template>
    <div>
        <div v-if="isUserLoading" class="p-4">
            <div class="flex items-center justify-center">
                <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
            </div>
        </div>
        <div v-else class="p-4">
            <div class="p-4 flex items-center justify-center">
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Posts</span>
            </div>
            <div v-if="userPosts.length > 0">
                <div class="p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                    <div v-for="post in userPosts" :key="post.id"
                        class="rounded overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2">{{ post.title }}</div>
                            <p class="text-gray-700 text-base">{{ post.body }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="flex mt-4 items-center justify-center">
                    No posts are available for this user!
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
    name: 'Posts',
    setup() {
        const store = useStore();
        const route = useRoute();

        const userPosts = computed(() => store.getters.getUserPosts);
        const isUserLoading = computed(() => store.getters.isUserLoading);

        onMounted(() => {
            const userId = route.params.userId;
            store.dispatch('fetchUserPosts', userId);
        });

        return {
            userPosts,
            isUserLoading,
        };
    },
};
</script>
  
<style scoped></style>
