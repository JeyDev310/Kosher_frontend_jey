

export class RUserModel{
    uid?: string;
    // firstName?: string;
    // lastName?: string;
    email: string;
    createdAt: number;
    token: string;
    constructor(uid: string, data: any){
        data = data || {};
        this.uid = data.uid || '';
        // this.firstName = data.firstName || '';
        // this.lastName = data.lastName || '';
        this.email = data.email;
        this.token = data.token;
        this.createdAt = Date.now();
        // this.cards = data.cards || [];
    }

    toJSON(): {} {
        const dicObject = Object.assign({}, this);
        return JSON.parse(JSON.stringify(dicObject));
    }
}
