<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { Send } from "lucide-vue-next";
import { Checkbox } from "~/components/ui/checkbox";
import Button from "../ui/button/Button.vue";
import { v4 as uuid } from "uuid";
import AnonymousMode from "./anonymousMode.vue";
import type { IMessage } from "~/@types/message";

const props = defineProps({
  anonymousName: {
    type: String,
    default: "",
  },
  comments: {
    type: Array as PropType<IMessage[]>,
    default: () => [],
  },
});


const emit = defineEmits(["update-comments"]);

const comment = ref("");
const isOwnComment = ref(true);
const userData = JSON.parse(window.localStorage.getItem("userData") || "{}");

const handleSendComment = () => {
  if (!comment.value) return;

  const newComment: IMessage = {
    id: uuid(),
    senderName: isOwnComment.value ? userData.name : props.anonymousName,
    date: new Date().toISOString(),
    likes: 0,
    ownComment: isOwnComment.value,
    content: comment.value,
  };


  emit("update-comments", newComment);

  comment.value = "";
  window.dispatchEvent(new Event("comment-added"));
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleSendComment();
  }
};

const handleCheckboxChange = () => {
  isOwnComment.value = !isOwnComment.value;
};
</script>

<template>
  <div class="max-w-[800px] mx-auto py-4 rounded-md w-full">
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