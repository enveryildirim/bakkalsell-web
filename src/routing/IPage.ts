export interface IPage{
   isRequiredAuth:boolean;
   render:()=>string;
   mount:()=>void;
 
}