import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByName'
})
export class SearchByNamePipe implements PipeTransform {


  transform(value: any, args? : any ): any {

    if (!args) {
      return value;
    }
    return value.filter((val)=>{
      let rval = (val.userid.name.toLocaleLowerCase().includes(args)) || (val.filename.toLocaleLowerCase().includes(args));
      return rval
    })
  }
}
