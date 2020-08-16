import { Deserializable } from './deserializable';
import { User } from './user';

export class Embarcacao implements Deserializable{
    public id: number;
    public userId: number;
    public dataEmbarque: Date;
    public dataDesembarque: Date;
    public dataInicioFolga: Date;
    public dataFimFolga: Date;
    public usuario: User;
    
    deserialize(input: any): this {
        Object.assign(this, input);           
        return this;
      }
    formatDate(date): string {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [day, month, year].join('/');
  }
}
