export class Shop{
  private static open: Boolean = false;

  public static setOpen(open:Boolean):void{
    this.open = open;
  }

  public static getOpen(){
     return this.open;
  }

}