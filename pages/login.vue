<script setup>
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const auth = useFirebaseAuth();
const router = useRouter();

function signInWithGoogle() {
  signInWithPopup(auth, new GoogleAuthProvider()).then(() => router.replace("/"));
}
</script>

<template>
  <div class="flex justify-center mt-[10vh]">
    <Card>
      <CardHeader>
        <CardTitle>Bem-vindo de volta!</CardTitle>
        <CardDescription>Acesse sua conta usando o Google para continuar</CardDescription>
      </CardHeader>
      <CardContent>
        <Button class="w-full" @click="signInWithGoogle">Entrar com google</Button>
      </CardContent>
    </Card>
  </div>
</template>
