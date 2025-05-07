<script setup>
import { Toaster } from "vue-sonner";
import { onMounted, watch } from "vue";

const user = useCurrentUser();
const router = useRouter();

onMounted(() => {
  watch(user, (currentUser, prevUser) => {
    if (prevUser && !currentUser) {
      return router.replace("/login");
    }
  });
});
</script>

<template>
  <div>
    <Toaster />
    <NuxtPage />
  </div>
</template>
