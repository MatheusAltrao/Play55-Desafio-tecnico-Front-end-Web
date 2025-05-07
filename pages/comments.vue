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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'


const router = useRouter();

const comments = ref([]);
const anonymousName = ref('');
const userData = JSON.parse(window.localStorage.getItem("userData") || "{}");
const selectedFilter = ref<"recent" | "oldest" | "own">("recent");

const filteredComments = computed(() => {
  switch (selectedFilter.value) {
    case "recent":
      return [...comments.value].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    case "oldest":
      return [...comments.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    case "own":
      return comments.value.filter((comment) => comment.ownComment);
    default:
      return comments.value;
  }
});



const loadComments = () => {
  comments.value = JSON.parse(localStorage.getItem("comments") || "[]");
};

const handleAnonymousNameUpdate = () => {
  anonymousName.value = localStorage.getItem("anonymousName") || "Anônimo";
};

onMounted(() => {

  if (!userData || Object.keys(userData).length === 0) {
    router.push("/");
    return;
  }

  loadComments();
  handleAnonymousNameUpdate();
  window.addEventListener("comment-added", loadComments);
  window.addEventListener("anonymous-name-updated", handleAnonymousNameUpdate);
});

onBeforeUnmount(() => {
  window.removeEventListener("comment-added", loadComments);
  window.removeEventListener("anonymous-name-updated", handleAnonymousNameUpdate);
});


const handleDeleteComment = (id: string) => {
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  const newComments = comments.filter((comment) => comment.id !== id);
  localStorage.setItem("comments", JSON.stringify(newComments));
  loadComments();
}

const handleEditComment = (id: string, newComment: string) => {
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  const commentToEdit = comments.find((comment: { id: string }) => comment.id === id);
  if (commentToEdit) {
    commentToEdit.content = newComment;
    localStorage.setItem("comments", JSON.stringify(comments));
    loadComments();
  }
}

</script>

<template>
  <div class="grid grid-rows-[auto_auto_1fr_auto] h-screen">
    <Header />

    <div class="flex items-center gap-2 w-full max-w-[1200px] mx-auto p-2">
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
      <p v-if="filteredComments.length === 0">Nenhum comentário encontrado</p>

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
