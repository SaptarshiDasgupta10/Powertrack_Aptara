export class User {
    userDtls : {'userId':string,'clientId':string , 'defModule': string};
    constructor(public userId : string , public clientID : string, public defModule :string){}
    get_userID(){
        if(!this.userId || this.userId === null ){
            return null;
        }
        return this.userId;
    }
}