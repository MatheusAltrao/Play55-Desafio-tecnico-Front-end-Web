<script setup>
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from "vue-sonner";
import { z } from "zod";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-vue-next";

const anonymousName = ref(localStorage.getItem("anonymousName") || "Anônimo");
const isDialogOpen = ref(false);

const formSchema = toTypedSchema(
    z.object({
        name: z
            .string({ required_error: "O nome é obrigatório." })
            .trim()
            .min(2, { message: "O nome deve ter pelo menos 2 caracteres." })
            .max(50, { message: "O nome deve ter no máximo 50 caracteres." }),
    })
);

const { handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {
        name: anonymousName.value,
    },
});


const onSubmit = handleSubmit((values) => {
    localStorage.setItem("anonymousName", values.name);
    toast.success("Nome no modo anônimo atualizado com sucesso");
    window.dispatchEvent(new Event("anonymous-name-updated"));
    isDialogOpen.value = false
});

</script>
<template>
    <Dialog v-model:open="isDialogOpen">
        <DialogTrigger asChild>
            <button class=" text-blue-600 underline">ver mais sobre o modo
                anônimo</button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Nome no modo anônimo</DialogTitle>
                <DialogDescription>
                    Esse será o nome que aparecerá quando você estiver no modo anônimo.
                </DialogDescription>
            </DialogHeader>


            <form @submit="(onSubmit)" class="space-y-4">
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Nome" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <Button class="w-full">
                    <Plus /> Adicionar
                </Button>
            </form>

        </DialogContent>
    </Dialog>
</template>