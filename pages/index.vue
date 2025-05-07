<script setup lang="ts">
import { Header } from "#components";
import { signOut } from "firebase/auth";

const auth = useFirebaseAuth();
const user = useCurrentUser();

function handleSignOut() {
  if (auth) {
    signOut(auth);
  }
}

</script>

<template>
  <Header />
  <div class="flex flex-col items-center justify-center gap-8 mt-12">
    <div class="text-center">
      <h1 class="text-3xl font-semibold">Bem-vindo ao Comments</h1>
      <p class="text-muted-foreground">Comente, responda seus amigos e curta as interações</p>
    </div>

    <div class="lg:flex  hidden items-center gap-1">
      <div class="w-max">
        <HeaderTalkWithUsButton />
      </div>
      <Button variant="outline" @click="handleSignOut">
        <User :size="20" /> {{ user?.displayName }}
      </Button>
    </div>

    <div class="w-full max-w-md h-auto overflow-hidden rounded-lg shadow-lg">
      <img class="w-full h-full object-cover" src="../assets/images/banners/banner.svg" alt="Balloons" />
    </div>
  </div>
</template>
