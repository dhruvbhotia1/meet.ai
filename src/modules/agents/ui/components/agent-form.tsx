import {useTRPC} from "@/trpc/client";
import {useRouter} from "next/navigation";
import {useQueryClient, useMutation} from "@tanstack/react-query";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {agentsInsertSchema} from "@/modules/agents/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {GeneratedAvatar} from "@/components/generated-avatar";
import {AgentGetOne} from "@/modules/agents/types";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Textarea} from "@/components/ui/textarea";
import {toast} from "sonner";

interface AgentFormProps {

    onSuccess?: () => void;
    onCancel?: () => void;
    initialValues? : AgentGetOne; // if we are editing an agent, and we have initial values, we pass the type from types.ts file.

}


export const AgentForm = ({
    onSuccess, onCancel, initialValues
}: AgentFormProps) => {

    const trpc = useTRPC(); // this is a custom hook that we created in the client.ts file, it will return the trpc object which we can use to call the procedures defined in the server.ts file.
    const router = useRouter();
    const queryClient = useQueryClient();

    const createAgent = useMutation(

        trpc.agents.create.mutationOptions({ // we already defined trpc - it is the createTRPCContext.
            // agents is the route we defined _app.ts, which is the agentsRouter, and create is the procedure we defined in the agentsRouter.
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions(), // getMany procedure does not require a parameter, so we can call it without any arguments (queryOptions)
                )

                if(initialValues?.id) {
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({id: initialValues.id})
                    )
                }

                onSuccess?.(); // if onSuccess is defined, we call it.
            },
            onError: (error) => {
                toast.error(error.message);
                //todo: check if error code is forbidden, then redirect to login page.
            }
        })

    )

    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.instructions ?? "",
        }
    });


    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending;

    const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {

        if(isEdit) {
            console.log("update agent", values);
        }else {
            createAgent.mutate(values);
        }

    }


    return (

        <Form {...form}>
            <form className={'space-y-4'} onSubmit={form.handleSubmit(onSubmit)}>
                <GeneratedAvatar seed={form.watch('name')} variant={"botttsNeutral"} className={'border size-16'}/>
                <FormField name={'name'} control={form.control} render={({field}) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder={'Agent Name'} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>

                <FormField name={'instructions'} control={form.control} render={({field}) => (
                    <FormItem>
                        <FormLabel>Instructions</FormLabel>
                        <FormControl>
                            <Textarea placeholder={'You will be assisting me with math assignments today...'} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>

                <div className={'flex justify-between gap-x-2'}>
                    {onCancel && (
                        <Button variant={'ghost'} disabled={isPending} type={"button"}  onClick={() => onCancel()}>
                            Cancel
                        </Button>

                    )}

                    <Button disabled={isPending} type={'submit'}>
                        {isEdit ? "Update Agent" : "Create Agent"}
                    </Button>
                </div>




            </form>


        </Form>
    )

}

