"use client";
import {useState, useEffect} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardImage, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Button} from '@/components/ui/button';
import Backend from '@/app/api/controllers';
import { useSession } from "next-auth/react";
export default function Home(){
    const [allFavorites, setAllFavorites] = useState([]);
    const { data: session, status }:any = useSession();
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');

    async function setter() {
        const { sub, token } = session ?? {};
        if (sub && token) {
            setToken(token);
            setUserId(sub);
        }
    }



    async function getAll(){
        if(userId && token){

            await Backend.setSession(token);
            const response = await Backend.indexGamesFavorites(userId);

            console.log(response)

            setAllFavorites(response);
        }
    }

    useEffect(() => {
        setter();
        if (userId && token) {
            getAll();
        }
    }, [userId, token, session]);

    return(
        <div className={'flex flex-col min-h-screen'}>
            <h1 className={'font-bold'}>Dashboard</h1>
            <span>Meus Jogos Favoritos</span>
            <div className={'flex flex-row w-full mt-10'}>

                {allFavorites.length > 0 && (
                    <div className={'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full'}>
                        {allFavorites.map((item, index) =>
                            (<Card key={index} className={'shadow-lg'}>
                                    <CardImage>
                                        <img
                                            className="h:48 md:h-32 w-auto rounded-t-lg shado"
                                            src={item.game.thumbnail}
                                            alt={'logo game'}
                                        />
                                    </CardImage>
                                    <CardHeader>
                                        <CardTitle>{item.game.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>Rate: {item.game.rate}</CardDescription>
                                        <CardDescription>Plataforma: {item.platform}</CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                )}

            </div>
        </div>
    );
}