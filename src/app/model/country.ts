
export class KSCountryModel {

    uid?: string;
    name: string;
    key: string;
    avatar: string;
    
    constructor(data) {
        this.uid = data.uid || '';
        this.name = data.name;
        this.key = data.key;
        this.avatar = data.avatar;
       
    }
    toJSON(): {} {
        const dicObject = Object.assign({}, this);
        return JSON.parse(JSON.stringify(dicObject));
    }
}

export class KSRegionsModel {
    
    uid?: string;
    name: string;
    avatar?: string;
    countryId: string;
    center: {
        lat: any;
        lng: any;
    }
    constructor(data) {
        this.uid = data.uid||'';
        this.name = data.name;
        this.avatar = data.avatar;
        this.countryId = data.center;
        this.center = data.center;
    }
    toJSON(): {} {
        const dicObject = Object.assign({}, this);
        return JSON.parse(JSON.stringify(dicObject));
    }
}