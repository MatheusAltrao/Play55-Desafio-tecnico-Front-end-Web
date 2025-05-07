<script setup lang="ts">
import { Check, Pen, Trash, X } from "lucide-vue-next";
import { defineProps } from "vue";
import { ref } from "vue";
import Button from "../ui/button/Button.vue";

interface IMessage {
  id: string;
  senderName: string;
  date: string;
  likes: number;
  content: string;
  ownComment: boolean;
}

const props = defineProps({
  comment: {
    type: Object as PropType<IMessage>,
    required: true,
  },
  onDelete: {
    type: Function as PropType<(id: string) => void>,
    required: true,
  },
  onEdit: {
    type: Function as PropType<(id: string, newComment: string) => void>,
    required: true,
  },
});

const date = (() => {
  const commentDate = new Date(props.comment.date);
  const today = new Date();
  const isToday =
    commentDate.getDate() === today.getDate() &&
    commentDate.getMonth() === today.getMonth() &&
    commentDate.getFullYear() === today.getFullYear();

  if (isToday) {
    return `Hoje, às ${commentDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  return commentDate.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
})();

const isEditing = ref(false);
const newComment = ref(props.comment.content);

const saveEdit = () => {
  if (newComment.value.trim()) {
    props.onEdit(props.comment.id, newComment.value.trim());
    isEditing.value = false;
  }
};

const cancelEdit = () => {
  newComment.value = props.comment.content;
  isEditing.value = false;
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    saveEdit();
  }
};

</script>

<template>
  <div class="flex flex-col gap-2 w-full overflow-hidden p-2">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <p class=" font-medium max-w-[120px]  truncate">{{ props.comment.senderName }}</p>
        <span class="text-xs opacity-80">{{ date }}</span>
      </div>

    </div>

    <div v-if="isEditing">
      <textarea @keydown="handleKeyDown" placeholder="Edite o comentário" v-model="newComment"
        class="w-full border border-zinc-300 rounded-md p-2 resize-none text-sm" rows="3"></textarea>
      <div class="flex items-center justify-end gap-2 ">
        <Button @click="saveEdit" size="sm">
          <Check :size="16" /> Enviar
        </Button>
        <Button @click="cancelEdit" size="sm" variant="secondary">
          <X :size="16" /> Cancelar
        </Button>
      </div>
    </div>


    <div>
      <p v-if="!isEditing" class="break-words text-sm">
        {{ props.comment.content }}
      </p>

      <div v-if="props.comment.ownComment">
        <div class="flex items-center justify-end gap-1">
          <Button @click="props.onDelete(props.comment.id)" variant="destructive" size="icon">
            <Trash :size="20" />
          </Button>

          <Button v-if="!isEditing" @click="isEditing = true" size="icon">
            <Pen :size="20" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
