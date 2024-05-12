"use client";
import Image from "next/image";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm, SubmitHandler} from "react-hook-form";
import z from 'zod';
import Link from "next/link";
import {ModeToggle} from "@/components/theme/themeSwitch";
import {useRouter} from "next/navigation";
import {signIn} from 'next-auth/react';
import { useToast } from "@/components/ui/use-toast";

type Inputs = {
  email: string
  password: string
}

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must have at least 8 characters')
});

export default function Home() {
  const route = useRouter();

  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const isValid = loginSchema.safeParse(data);
    console.log(JSON.stringify(isValid, null, 2));

    if(data.email !== "admin2@admin2.com"){
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
    }

    const res: any = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    });
    console.log(res);

    if(!res.error && res.ok){
      route.replace('/dashboard/home');
    }else if(res.error){
      toast({
        title: "Error",
        description: 'Email ou Senha invalidos',
        variant: 'destructive'
      })
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">


      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Bem Vindo</CardTitle>
            <CardDescription>Faça login com seu email e senha</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
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
              <Button className='w-full' type="submit">Entrar</Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className='w-full flex flex-row justify-between'>
                <Link href={'/signup'}>
                  <CardDescription>Cadastre-se agora!</CardDescription>
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
