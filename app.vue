<script setup>
import { Toaster } from "vue-sonner";

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
