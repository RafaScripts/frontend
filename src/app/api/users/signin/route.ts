import {NextResponse} from "next/server";
import {createClient} from "@/app/supabase_client/server";

export async function POST(req: Request){
    const supabase = createClient();

    const { email, password } = await req.json();

    try{
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        console.log(
            error
        )

        if(error) throw new Error(JSON.stringify(error, null, 2));

        return NextResponse.json(data);
    }catch (err){
        return NextResponse.json({
            ok: false,
            error: err
        }, {
            status: 400
        });
    }
}

