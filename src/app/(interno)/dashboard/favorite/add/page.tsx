"use client";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardImage, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast"
import {useForm, SubmitHandler} from "react-hook-form";
import z from 'zod';
import Backend from '@/app/api/controllers'
import { useSession } from "next-auth/react";

type Inputs = {
    name: string,
    selected: string
}

const loginSchema = z.object({
    name: z.string().min(1, 'Nome do jogo')
});

export default function Home(){
    const [games, setGames] = useState([]);
    const [selected, setSelected] = useState('');
    const { toast } = useToast();
    const { data: session, status }:any = useSession();

    const addFavorite = async (item: any) => {
        const userId: any = session.sub;
        const token: any = session.token;
        console.log(session);




        const res = await Backend.createGameAndAddFavorite(item.name, selected, item.background_image, item.rating, userId);

        if(res){
            console.log(res);
            toast({
                title: 'Favorito adicionado com sucesso'
            });
        }
    }

    const newSearch = () => {
        setGames([]);
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const isValid = loginSchema.safeParse(data);
        const token:any = session.token;

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

        const response = await Backend.searchGames(data.name, token);

        console.log(response.results);

        toast({
            title: 'Sucesso',
            description: `${response.results.length} jogos encontrados`
        });

        setGames(response.results);

    };

    return(
        <div className={'flex flex-col min-h-screen'}>
            <Card>
                <CardHeader>
                    <CardTitle>Adicionar favorito</CardTitle>
                    <CardDescription>Pesquise o seu jogo favorito e adicione ele</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className={'mb-20'} onSubmit={handleSubmit(onSubmit)}>
                        <Input className={'mb-5'} placeholder={'Pesquise o seu jogo favorito'} {...register('name')} />
                        <Button className={'w-full'}>
                            Buscar
                        </Button>
                    </form>

                    {games.length > 0
                        &&
                    games.map((item:any, index:any) => (
                        <div key={index} className={'mb-5'}>
                            <Card>
                                <CardImage>
                                    <img
                                        className="h-54 w-auto rounded-t-lg shado"
                                        src={item.background_image}
                                        alt={'logo game'}
                                    />
                                </CardImage>
                                <CardHeader>
                                    <CardTitle>{item.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className={'flex flex-col w-full'}>
                                        <CardDescription className={'mb-5'}>Rate: {item.rating}</CardDescription>
                                        <Select value={selected} onValueChange={setSelected}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Plataforma"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {item.platforms.map((item, index) => (
                                                    <SelectItem key={index} value={item.platform.name}>{item.platform.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <div className={'flex flex-col w-full'}>
                                        <Button className={'w-full mb-5'} onClick={() => addFavorite({...item, selected})}>
                                            Adicionar
                                        </Button>
                                        <Button className={'w-full'} onClick={newSearch}>
                                            Nova Pesquisa
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}