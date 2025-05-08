<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { parseDate } from "@internationalized/date";
import { toTypedSchema } from "@vee-validate/zod";
import { MessageCircle, Plus } from "lucide-vue-next";
import { DateFieldInput, DateFieldRoot } from "reka-ui";
import { useForm } from "vee-validate";
import { computed, ref, watch } from "vue";
import { toast } from "vue-sonner";
import { z } from "zod";
const { NUXT_PUBLIC_RECAPTCHA_KEY } = useRuntimeConfig().public

const recaptchaKey = NUXT_PUBLIC_RECAPTCHA_KEY
const endpointUrl = "<>"; // substitua pelo domínio real

useHead({
  script: [
    {
      src: `https://www.google.com/recaptcha/api.js?render=${recaptchaKey}`,
      async: true,
      defer: true,
    },
  ],
});

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string({ required_error: "O nome é obrigatório." })
      .trim()
      .min(2, { message: "O nome deve ter pelo menos 2 caracteres." })
      .max(50, { message: "O nome deve ter no máximo 50 caracteres." }),
    email: z.string({ required_error: "O e-mail é obrigatório." }).email({ message: "Por favor, insira um e-mail válido." }),
    phone: z.string({ required_error: "O número de celular é obrigatório." }).regex(/^(\(\d{2}\)\s?\d{8,9}|\d{2}\s?\d{8,9}|\d{10,11})$/, {
      message: "Insira um número de celular válido, como 67999999999 ou 67 999999999.",
    }),
    dob: z.string({ required_error: "A data de nascimento é obrigatória." }),
  })
);

const userData = JSON.parse(window.localStorage.getItem("userData") || "{}");
const isDialogOpen = ref(false);
const router = useRouter();

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: userData.name || "",
    email: userData.email || "",
    phone: userData.phone || "",
    dob: userData.dob || "",
  },
});

watch(isDialogOpen, (open) => {
  if (open) {
    const data = JSON.parse(localStorage.getItem("userData") || "{}");
    if (data) {
      setFieldValue("name", data.name || "");
      setFieldValue("email", data.email || "");
      setFieldValue("phone", data.phone || "");
      setFieldValue("dob", data.dob || "");
    }
  }
});

const onSubmit = handleSubmit(async (values) => {
  if (typeof window !== "undefined" && window.grecaptcha) {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(recaptchaKey, { action: "form_submit" })
        .then(async (token: string) => {
          console.log('token', token)
          try {
            const response = await fetch(endpointUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...values,
                token,
              }),
            });

            if (!response.ok) {
              throw new Error("Erro na requisição");
            }

            localStorage.setItem("userData", JSON.stringify(values));
            isDialogOpen.value = false;
            toast.success("Perfil Criado com sucesso");
            router.push("/comments");
          } catch (err) {
            console.error(err);
            toast.error("Erro ao enviar formulário");
          }
        })
        .catch((err: string) => {
          console.error("Erro ao executar reCAPTCHA:", err);
          toast.error("Erro ao executar reCAPTCHA");
        });
    });
  } else {
    toast.error("reCAPTCHA não carregado");
  }
});

const value = computed({
  get: () => (values.dob ? parseDate(values.dob) : undefined),
  set: (val) => {
    setFieldValue("dob", val?.toString() ?? "");
  },
});

</script>

<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger :as-child="true">
      <Button class="w-full">
        <MessageCircle :size="20" /> Fale conosco
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Compartilhe suas informações</DialogTitle>
        <DialogDescription>Essas informações serão usadas para criar seu perfil.</DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit" class="space-y-8">
        <div class="space-y-4">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Nome" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="E-mail" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="phone">
            <FormItem>
              <FormLabel>Celular com DDD</FormLabel>
              <FormControl>
                <Input type="text" placeholder="(67) 99999-9999" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="dob">
            <FormItem class="flex flex-col">
              <FormLabel>Data de nascimento</FormLabel>

              <DateFieldRoot v-model="value" v-slot="{ segments }" :is-date-unavailable="(date) => date.day === 19"
                locale="pt-BR" @update:model-value="
                  (v) => {
                    if (v) {
                      setFieldValue('dob', v.toString());
                    } else {
                      setFieldValue('dob', undefined);
                    }
                  }
                "
                class="w-full flex select-none bg-white items-center rounded-lg shadow-sm text-center text-green10 border p-1 data-[invalid]:border-red-500">
                <template v-for="item in segments" :key="item.part">
                  <DateFieldInput v-if="item.part === 'literal'" :part="item.part">
                    {{ item.value }}
                  </DateFieldInput>
                  <DateFieldInput v-else :part="item.part"
                    class="rounded p-0.5 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9">
                    {{ item.value }}
                  </DateFieldInput>
                </template>
              </DateFieldRoot>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <Button class="w-full">
          <Plus /> Criar Perfil
        </Button>
      </form>
    </DialogContent>
  </Dialog>
</template>
