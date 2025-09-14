import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { UsersContext } from "@/Context/UsersContext";
import { createPostApi } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { Check } from "lucide-react";
import { z } from "zod";
import Error from "../Error";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface postBodyInterface {
  userId: string;
  title: string;
  body: string;
}

const FormSchema = z.object({
  title: z.string().min(1, { message: "Post title is required" }),
  body: z.string().min(1, { message: "Post Body is required" }),
  userId: z
    .string()
    .min(1, { message: "Please select an author for this post" }),
});

export default function CreatePostForm() {
  const { users } = useContext(UsersContext);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      body: "",
      userId: "",
    },
  });
  const {
    mutate: createPost,
    isPending,
    isError,
  } = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      toast.custom(() => (
        <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md shadow-lg w-[464px] h-[51px]">
          <Check className="w-4 h-4 text-green-500" />
          <span>A new post has been successfully created!</span>
        </div>
      ));
      form.reset();
    },
  });

  function onSubmit(data: postBodyInterface) {
    const idUser = users.find((user) => user.name === data.userId);
    createPost({ ...data, userId: idUser?.id ?? "" });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 bg-white rounded-2xl p-6 h-full max-sm:w-full"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter post title"
                  {...field}
                  className="bg-[#0000001A] border-0"
                />
              </FormControl>
              <FormMessage className="text-[#D80000] rounded px-2 py-1 mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter post body"
                  {...field}
                  className="bg-[#0000001A] !border-0 !outline-0 !focus:border-0 !focus:outline-0 !focus:ring-0 !h-[126px]"
                />
              </FormControl>
              <FormMessage className="text-[#D80000] rounded px-2 py-1 mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full bg-[#0000001A] border-0 !focus:outline-0 !focus:ring-0 !focus:ring-offset-0">
                    <SelectValue placeholder="Select Author" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-0">
                    <SelectGroup>
                      <SelectLabel>Users</SelectLabel>
                      {users.map((user) => (
                        <SelectItem key={user.email} value={user.name}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-[#D80000] rounded px-2 py-1 mt-1" />
            </FormItem>
          )}
        />
        {isError && <Error text="Internal Server Error" />}
        <Button
          type="submit"
          className="bg-[#333333] text-[#FFFFFF] w-[50%] max-sm:w-full cursor-pointer float-right"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Post"}
        </Button>
      </form>
      <Toaster className="!bg-[#1A1A1A]" />
    </Form>
  );
}
