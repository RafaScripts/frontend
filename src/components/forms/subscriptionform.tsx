import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import {useForm, SubmitHandler} from "react-hook-form";
import z from 'zod';

type Inputs = {
  urlInterna: string
  urlExterna: string
}

export default function SubscriptionForm(title: string, description: string, mode: string) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder="Url Interna"/>
            <Input placeholder="Url Externa"/>
            {mode == 'edit' && <Input placeholder="Id do Cliente"/>}
            <Button>
              {mode == 'edit' ? 'Editar' : 'Cadastrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}