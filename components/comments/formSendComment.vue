<script setup>
import { ref, defineProps } from "vue";
import { Send } from "lucide-vue-next";
import { Checkbox } from "~/components/ui/checkbox";
import Button from "../ui/button/Button.vue";
import { v4 as uuid } from "uuid";
import AnonymousMode from "./anonymousMode";

const props = defineProps({
  anonymousName: {
    type: String,
    default: "Anônimo",
  },
});

const comment = ref("");
const isOwnComment = ref(true);
const userData = JSON.parse(window.localStorage.getItem("userData") || "{}");

console.log(props.anonymousName)

const handleSendComment = () => {
  if (!comment.value) return;

  const newComment = {
    id: uuid(),
    senderName: isOwnComment.value ? userData.name : props.anonymousName,
    date: new Date().toISOString(),
    likes: 0,
    ownComment: isOwnComment.value,
    content: comment.value,
    actions: {
      edit: isOwnComment.value ? true : false,
      delete: isOwnComment.value ? true : false,
    },
  };

  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.push(newComment);
  localStorage.setItem("comments", JSON.stringify(comments));

  comment.value = "";
  window.dispatchEvent(new Event("comment-added"));
};

const handleKeyDown = (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleSendComment();
  }
};

const handleCheckboxChange = () => {
  isOwnComment.value = !isOwnComment.value;
  console.log(isOwnComment.value);
};

</script>

<template>
  <div class="max-w-[800px] mx-auto py-4  rounded-md w-full">
    <div class="flex items-start justify-between gap-2 w-full">
      <div class="w-full space-y-1">
        <div class="w-full flex items-end flex-col gap-1 border shadow-sm rounded-md p-2">
          <textarea placeholder="Escreva o seu comentário" v-model="comment" @keydown="handleKeyDown"
            class="w-full h-[100px] resize-none border-0 outline-0 text-sm" />
          <div>
            <Button @click="handleSendComment" size="sm">
              <Send :size="16" /> Enviar
            </Button>
          </div>
        </div>
        <div>
          <div class="flex items-center gap-1">
            <Checkbox @click="handleCheckboxChange" v-model="isOwnComment" />
            <span class="text-sm">Mensagem própria</span>
          </div>
          <div class="text-xs font-medium text-muted-foreground">
            <p>Se você desmarcar essa opção você estará no modo
              <span class="text-red-500">anônimo</span>
            </p>
            <AnonymousMode />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>