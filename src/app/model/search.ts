export class KSSearchItemModel {

    name: string;
    item: any[];
    constructor(data) {
        this.name = data.name;
        this.item = data.item;
    }
    toJSON(): {} {
        const dicObject = Object.assign({}, this);
        return JSON.parse(JSON.stringify(dicObject));
    }
}