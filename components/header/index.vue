<script setup lang="ts">
import { signOut } from "firebase/auth";
import { User, Menu } from "lucide-vue-next";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const auth = useFirebaseAuth();
const user = useCurrentUser();
function handleSignOut() {
  if (auth) {
    signOut(auth);
  }
}
</script>

<template>
  <header class="border-b">
    <div class="w-full flex items-center justify-between max-w-[1200px] mx-auto p-2">
      <h1 class="font-bold text-lg">Comments</h1>

      <Sheet>
        <SheetTrigger class="lg:hidden block">
          <Menu :size="20" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              Faça login ou cadastre-se para comentar.
            </SheetDescription>
          </SheetHeader>
          <div class="flex items-center flex-col gap-1 p-4">
            <HeaderTalkWithUsButton />
            <Button class="w-full" variant="outline" @click="handleSignOut">
              <User :size="20" /> {{ user?.displayName }}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <div class="lg:flex  hidden items-center gap-1">
        <div class="w-max">
          <HeaderTalkWithUsButton />
        </div>
        <Button variant="outline" @click="handleSignOut">
          <User :size="20" /> {{ user?.displayName }}
        </Button>
      </div>
    </div>
  </header>
</template>
