import api from '@/app/api/api';

class Backend {
    private session: string;

    async setSession(token: string){

       this.session = token;
    }

    async signin(email: string, password: string){
        try {
            const response = await api.post('/users/login', {
                email: email,
                password: password
            });

            return {success: true, data: response.data};
        }catch (e: any){
            console.log(e);
            return {success: false, message: e.message};
        }
    }

    async signup(name: string, email: string, password: string){
        try {
            const response = await api.post('/users/create', {
                name: name,
                email: email,
                password: password
            });

            return {success: true, data: response.data};
        }catch (e: any){
            console.log(e);
            return {success: false, message: e.message};
        }
    }

    async indexGamesFavorites(userId: string){
        try {
            const response = await api.get(`/games/listbyid/${userId}`, {
                headers: {
                    'authorization': 'Bearer ' + this.session
                }
            });

            return response.data;
        }catch (e){
            return e;
        }
    }

    async searchGames(name: string, token: string){
        try {
            await this.setSession(token);

            const response = await api.get(`/games/search?game=${encodeURIComponent(name)}`, {
                headers: {
                    'authorization': 'Bearer ' + this.session
                }
            });

            return response.data;
        }catch (e: any){
            return e.message;
        }
    }

    async createGameAndAddFavorite(name: string, platform: string, thumbnail: string, rate: number, idUser: string){
        try{

            const responseGame = await api.post('/games/create', {
                name,
                thumbnail,
                rate
            }, {
                headers:{
                    'authorization': 'Bearer ' + this.session
                }
            });

            const data = responseGame.data;
            const {id} = data;

            const responseFavorite = await api.post('/users/favorite/create', {
                idGame: id,
                idUser: idUser,
                platform: platform
            }, {
                headers: {
                    'authorization': 'Bearer ' + this.session
                }
            });

            const dataFavorite:any = responseFavorite.data;

            return dataFavorite;

        }catch (e) {
            return e;
        }
    }
}

export default new Backend;