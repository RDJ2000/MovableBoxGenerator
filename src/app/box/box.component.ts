import {
  Component,
  OnInit,
  Renderer2, ElementRef, ViewChild, AfterViewInit 
} from '@angular/core';


@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {

  status: any;
  boxid: any = -1;

  isKeyboardControl: Boolean = true;
  boxes:any=[]
  top: number=127
  left: number=0


  constructor(private renderer:Renderer2) {}
  
@ViewChild('parentRoot', { static: false }) parentRoot!: ElementRef;
  ngOnInit(): void {}


  onCreateBox(){
    const boxbtn = this.renderer.createElement('button');
    if(this.isKeyboardControl){	
      this.boxid++
    
    const text = this.renderer.createText('Box'+this.boxid);
   
    this.CustomizeBox(this.boxid,boxbtn);
    
    this.renderer.appendChild(boxbtn, text);
    this.renderer.appendChild(this.parentRoot.nativeElement, boxbtn);

    this.onBoxClick(boxbtn)
    
       
  }
  
}



  CustomizeBox(boxId: any,boxbtnRef: any){
    console.log(boxId,boxbtnRef);
    this.renderer.setAttribute(boxbtnRef, 'id',boxId)
    this.renderer.setAttribute(boxbtnRef, 'class',"box")
    this.renderer.setStyle(boxbtnRef, 'position',"absolute")
    this.renderer.setStyle(boxbtnRef, 'background-color', "black");
    this.renderer.setStyle(boxbtnRef, 'color', "green");
  }
 

  onBoxClick(boxbtn: any){
    if(this.isKeyboardControl){
      this.renderer.listen(boxbtn, 'click',  () => {
        //console.log(evt);
      
        //I Element already exist
        // if(!this.boxes.includes(this.boxid)){
        //   this.createNewPositionForBox(this.boxid)
        // }
        // else{
        //     this.top=this.boxes.top
        //     this.left=this.boxes.left
        // }
        this.renderer.setStyle(boxbtn, 'background-color', "black");
        this.renderer.setStyle(boxbtn, 'color', "orange");
        this.renderer.setStyle(boxbtn, 'border', "5px dashed rgb(255, 115, 0)");
        
        this.boxEventHandler(boxbtn, this.boxid)
        
       })
      }
      
  }
  
   boxEventHandler(btnRef: any,btnId: any){
  
    let top= this.top
    let left=this.left  
   

      //Keyboard Handler
      
      if(this.isKeyboardControl){
        console.log(this.isKeyboardControl+" Kboard ctrl is");
        
            this.renderer.listen(btnRef, 'keydown', (event) => {
             
              


              if (event.key == "w" && top >= 127) {
                
                 top = top - 1
                 this.renderer.setStyle(btnRef, 'top', top+"px");
               }
               //Action for s
               if (event.key == "s" && top <= 715) {
              
                 top = top + 1
                 this.renderer.setStyle(btnRef, 'top', top+"px");
               
               }
               //Action for a
               if (event.key == "a" && left >= 6) {
                
                 left = left - 1
                 this.renderer.setStyle(btnRef, 'left', left+"px");
               }
               //Action for d
               if (event.key == "d" && left <= 595) {
                
                 left = left + 1
                 this.renderer.setStyle(btnRef, 'left', left+"px");
       
               }

               if (event.key == "Delete") {
                // console.log(name);
                btnRef.remove()
       
               }
               
            })


            //On Focus out of Element
              this.renderer.listen(btnRef, "focusout",()=>{
              this.renderer.setStyle(btnRef, 'background-color', "black");
              this.renderer.setStyle(btnRef, 'color', "green");
              this.renderer.setStyle(btnRef, 'border', "5px dashed  rgb(0, 255, 21)");

             //Remembering the Position of Boxes and storing it in array of ocjects
            //  if(this.boxes.includes(this.boxid)){
            //   this.updateNewPositionForBox(btnId,top,left)
            // }
              
             
           
            // console.log(this.boxes);
              
            })
   }
  }


   keyboardControlToggle(){
    if (this.isKeyboardControl == true) {
      this.isKeyboardControl = false;
      
    } else if (this.isKeyboardControl == false) {
      this.isKeyboardControl = true;
 
    }
  }


//  createNewPositionForBox(boxIndex: any){
 
  
//    console.log("index not exist, created new one");
    
//   let box={"btnId":boxIndex, "top":127,"left":0}
//   this.boxes.push(box);
//   return box.top
// }
 

// updateNewPositionForBox(boxIndex: string | number,top: number,left: number){
  
//     console.log("index  updated");
//     this.boxes[boxIndex].top= top
//     this.boxes[boxIndex].left= left
  
// }



}
