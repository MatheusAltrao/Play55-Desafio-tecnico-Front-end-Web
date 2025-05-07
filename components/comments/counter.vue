<script setup lang="ts">
import { ref, defineProps } from "vue";
import { Plus, Minus } from "lucide-vue-next";

const props = defineProps({
  commentId: {
    type: String,
    required: true,
  },
  initialLikes: {
    type: Number,
    default: 0,
  },
});

const likes = ref(props.initialLikes);

const updateLocalStorage = (newLikes: number) => {
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  const updated = comments.map((comment: any) =>
    comment.id === props.commentId ? { ...comment, likes: newLikes } : comment
  );
  localStorage.setItem("comments", JSON.stringify(updated));

  window.dispatchEvent(new Event("comment-added"));
};

const increment = () => {
  if (likes.value >= 99) {
    return;
  }
  likes.value++;
  updateLocalStorage(likes.value);
};

const decrement = () => {
  if (likes.value > 0) {
    likes.value--;
    updateLocalStorage(likes.value);
  }
};
</script>

<template>
  <div class="flex flex-col items-center gap-2 p-1">
    <Button size="sm" variant="ghost" @click="increment">
      <Plus :size="16" />
    </Button>
    <span class="text-sm font-medium">{{ likes }}</span>
    <Button size="sm" variant="ghost" @click="decrement">
      <Minus :size="16" />
    </Button>
  </div>
</template>
