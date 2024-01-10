<template>
    <div>
        <div v-if="isLoading" class="p-4">
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
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Albums</span>
            </div>
            <div v-if="userAlbums.length > 0">
                <div class="p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
                    <div v-for="album in userAlbums" :key="album.id"
                        class="p-4 rounded overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                        <div class="font-bold text-xl mb-2">{{ album.title }}</div>
                        <div class="px-6 py-4">
                            <div v-if="album.photos.length > 0" :id="'carouselExampleCaptions_' + album.id" class="relative"
                                data-te-carousel-init data-te-ride="carousel">

                                <div
                                    class="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                                    <div v-for="(photo, index) in album.photos" :key="photo.id"
                                        :class="{ 'relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none': index === album.activePhotoIndex, 'relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none': index !== album.activePhotoIndex }"
                                        data-te-carousel-item :data-te-carousel-active="index === album.activePhotoIndex">
                                        <img :src="photo.url" class="block w-full" :alt="photo.title" />
                                    </div>
                                </div>

                                <button @click="prevSlide(album)"
                                    class="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                                    type="button" :data-te-target="'#carouselExampleCaptions_' + album.id"
                                    data-te-slide="prev">
                                    <span class="inline-block h-8 w-8">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M15.75 19.5L8.25 12l7.5-7.5" />
                                        </svg>
                                    </span>
                                    <span
                                        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span>
                                </button>

                                <button @click="nextSlide(album)"
                                    class="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                                    type="button" :data-te-target="'#carouselExampleCaptions_' + album.id"
                                    data-te-slide="next">
                                    <span class="inline-block h-8 w-8">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </span>
                                    <span
                                        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span>
                                </button>
                            </div>
                            <div v-else>
                                No photos available for this album!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="flex mt-4 items-center justify-center">
                    No albums are available for this user!
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
    name: 'Albums',
    setup() {
        const store = useStore();
        const route = useRoute();

        const userAlbums = computed(() => store.getters.getUserAlbums);
        const isLoading = computed(() => store.getters.isAlbumsLoading);

        onMounted(() => {
            const userId = route.params.userId;
            store.dispatch('fetchUserAlbums', userId);
        });

        return {
            userAlbums,
            isLoading,
        };
    },
    methods: {
        prevSlide(album) {
            if (album.activePhotoIndex > 0) {
                album.activePhotoIndex--;
            }
        },
        nextSlide(album) {
            if (album.activePhotoIndex < album.photos.length - 1) {
                album.activePhotoIndex++;
            }
        },
    }
};
</script>
  
<style scoped></style>