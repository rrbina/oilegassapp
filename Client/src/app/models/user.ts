import { Deserializable } from './deserializable';


export class User implements Deserializable{
    id: number;
    name: string;
    email: string;
    password: string;
    funcao: string;
    empresa: string;
    deserialize(input: any): this {
        Object.assign(this, input);           
        //this.arrayObects = input.arrayObects.map(obj => new Objeto().deserialize(obj));
        return this;
      }
}
