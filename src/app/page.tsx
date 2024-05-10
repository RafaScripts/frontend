import Image from "next/image";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm, SubmitHandler} from "react-hook-form";

type Inputs = {
  example: string
  exampleRequired: string
}


export default function Home() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">


      <div className="w-1/5">
        <Card>
          <CardHeader>
            <CardTitle>Bem Vindo</CardTitle>
            <CardDescription>Faça login com seu email e senha</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <Input className='mb-3' label="Email" placeholder='Email' type="email" {...register("example")} />
              <Input className='mb-3' label="Senha" placeholder='Senha' type="password" />
              <Button className='w-full' type="submit">Entrar</Button>
            </form>
          </CardContent>
        </Card>
      </div>


    </main>
  );
}
