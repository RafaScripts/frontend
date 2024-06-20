import axios, {AxiosInstance, AxiosResponse} from 'axios';

class ApiCalls {
    private baseUrl:string;
    private api:AxiosInstance;

    constructor() {
        this.baseUrl = process.env.BASE_URL || '';
        this.api = axios.create({
            baseURL: this.baseUrl
        });
    }

    private async POST(path:string, data: any, params?: any):Promise<AxiosResponse>{
        if(params){
            return await this.api.post(path, data, {
                params
            })
        }else{
            return await this.api.post(path, data)
        }
    }

    private async GET(path:string, params?: any):Promise<AxiosResponse>{
        if(params){
            return await this.api.get(path, {
                params
            })
        }else{
            return await this.api.get(path)
        }
    }

    private async PUT(path:string, data: any, params?: any):Promise<AxiosResponse>{
        if(params){
            return await this.api.put(path, data, {
                params
            })
        }else{
            return await this.api.put(path, data)
        }
    }

    private async DELETE(path:string, params?: any):Promise<AxiosResponse>{
        if(params){
            return await this.api.delete(path, {
                params
            })
        }else{
            return await this.api.put(path)
        }
    }

    public async signIn(email: string, password: string){
        const response = await this.POST('/api/users/signin', {
            email: email,
            password: password
        });

        return {success: true, data: response.data};
    }

}

export default new ApiCalls();

