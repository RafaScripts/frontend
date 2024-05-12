"use client";
import Image from "next/image";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm, SubmitHandler} from "react-hook-form";
import z from 'zod';
import Link from "next/link";
import {ModeToggle} from "@/components/theme/themeSwitch";
import { useToast } from "@/components/ui/use-toast";
import Backend from '@/app/api/controllers';

type Inputs = {
    name: string
    email: string
    password: string
}

const signupSchema = z.object({
    name: z.string().min(3, "Nome Completo"),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must have at least 8 characters')
});

export default function Home() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const { toast } = useToast();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const isValid = signupSchema.safeParse(data);

        if (!isValid.success) {

            //map all isValid, and toast all messages of erros
            isValid.error.errors.map((err) => {
                toast({
                    title: "Error",
                    description: err.message,
                    variant: "destructive",
                });
            });

            return;
        }

        const res = await Backend.signup(data.name, data.email, data.password);

        if(res.success){
            toast({
                title: 'sucesso',
                description: 'conta criada com sucesso, logue e participe da comunidade.'
            });
        }else {
            console.log(res);
        }
    }


    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">


            <div className="w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>Bem Vindo</CardTitle>
                        <CardDescription>cadastre-se</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                className='mb-3'
                                label="Nome Completo"
                                placeholder='Nome Completo'
                                type="text"
                                {...register("name")}
                            />
                            <Input
                                className='mb-3'
                                label="Email"
                                placeholder='Email'
                                type="email"
                                {...register("email")}
                            />
                            <Input
                                className='mb-3'
                                label="Senha"
                                placeholder='Senha'
                                type="password"
                                {...register('password')}
                            />
                            <Button className='w-full' type="submit">cadastrar</Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <div className='w-full flex flex-row justify-between'>
                            <Link href={'/signin'}>
                                <CardDescription>Já possui conta? entre agora!</CardDescription>
                            </Link>
                            <CardDescription>
                                <ModeToggle/>
                            </CardDescription>
                        </div>
                    </CardFooter>
                </Card>
            </div>


        </main>
    );
}
