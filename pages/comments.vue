<script setup lang="ts">
import { Header } from "#components";
import FormSendComment from "~/components/comments/formSendComment.vue";
import Comment from "~/components/comments/comment.vue";
import { useRouter } from "vue-router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import type { IMessage } from "~/@types/message";

const router = useRouter();
const comments = ref<IMessage[]>([]);
const anonymousName = ref('');
const userData = JSON.parse(window.localStorage.getItem("userData") || "{}");
const selectedFilter = ref<"recent" | "oldest" | "own">("recent");

const filteredComments = computed(() => {
  if (selectedFilter.value === "recent") {
    return [...comments.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  if (selectedFilter.value === "oldest") {
    return [...comments.value].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  if (selectedFilter.value === "own") {
    return comments.value.filter((comment) => comment.ownComment);
  }
  return comments.value;
});

onMounted(() => {
  if (!userData || Object.keys(userData).length === 0) {
    router.push("/");
    return;
  }

  comments.value = JSON.parse(localStorage.getItem("comments") || "[]");
  anonymousName.value = localStorage.getItem("anonymousName") || "Anônimo";

  window.addEventListener("comment-added", () => {
    comments.value = JSON.parse(localStorage.getItem("comments") || "[]");
  });
  window.addEventListener("anonymous-name-updated", () => {
    anonymousName.value = localStorage.getItem("anonymousName") || "Anônimo";
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("comment-added", () => {
    comments.value = JSON.parse(localStorage.getItem("comments") || "[]");
  });
  window.removeEventListener("anonymous-name-updated", () => {
    anonymousName.value = localStorage.getItem("anonymousName") || "Anônimo";
  });
});

const handleDeleteComment = (id: string) => {
  comments.value = comments.value.filter((comment) => comment.id !== id);
  localStorage.setItem("comments", JSON.stringify(comments.value));
};

const handleEditComment = (id: string, newComment: string) => {
  const commentToEdit = comments.value.find((comment) => comment.id === id);
  if (commentToEdit) {
    commentToEdit.content = newComment;
    localStorage.setItem("comments", JSON.stringify(comments.value));
  }
};
</script>

<template>
  <div class="grid grid-rows-[auto_auto_1fr_auto] h-screen">
    <Header />

    <div class="flex items-center justify-end gap-2 w-full max-w-[800px] mx-auto p-2">
      <span> Filtrar por:</span>
      <Select v-model="selectedFilter">
        <SelectTrigger>
          <SelectValue placeholder="Selecione o Filtro" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="oldest">
              Mais Antigas
            </SelectItem>
            <SelectItem value="recent">
              Mais Recentes
            </SelectItem>
            <SelectItem value="own">
              Minhas Mensagens
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div class="space-y-2 overflow-y-auto w-full max-w-[800px] mx-auto p-2 ">
      <p class="text-sm text-zinc-500" v-if="filteredComments.length === 0">Nenhum comentário encontrado</p>

      <div v-for="comment in filteredComments" :key="comment.id">
        <div class=" rounded-md bg-zinc-50 border border-zinc-200 ">
          <div class="grid grid-cols-[auto_1fr] gap-4">
            <CommentsCounter :commentId="comment.id" :initialLikes="comment.likes" />
            <Comment :comment="comment" :onDelete="handleDeleteComment" :onEdit="handleEditComment" />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full p-2">
      <FormSendComment :anonymousName="anonymousName" />
    </div>
  </div>
</template>
