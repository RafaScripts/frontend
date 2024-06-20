import {NextResponse} from "next/server";
import {createClient} from "@/app/supabase_client/server";

export async function POST(req: Request){
    const supabase = createClient();

    const { username, password, email, name, phone } = await req.json();

    try{

        const {data, error}:any = await supabase
        .schema('public')
        .from('users')
        .select('*')
        .eq('phone', phone);

        if(data?.length > 0){
          throw new Error('User already exists');
        }

        await supabase
        .schema('public')
        .from('users')
        .insert([
            {username, password, email, name, phone}
        ]);

        return NextResponse.json({data, error});
    }catch (err:any){
        return NextResponse.json({
            ok: false,
            error: err.message
        }, {
            status: 400
        });
    }
}

