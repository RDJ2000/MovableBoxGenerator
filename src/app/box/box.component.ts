import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {

  status: any;
  boxid: any = 0;
  //  boxPosition: any=[]
  // boxTopPosition:Number=0;
  // boxLeftPosition: Number=0;
  isKeyboardControl: Boolean = true;

  constructor() {}

  ngOnInit(): void {}



  //Keyboard Toggle
  keyboardControlToggle() {
    if (this.isKeyboardControl == true) {
      this.isKeyboardControl = false;
    } else if (this.isKeyboardControl == false) {
      this.isKeyboardControl = true;
    }
  }


  //Dynamic Box Creation
  onCreateBox() {
    if (this.isKeyboardControl) {
      const el = document.createElement('button');
      this.boxid++
      el.id = "box" + this.boxid;
      el.className = "box";
      el.innerText = "box" + this.boxid
      el.style.position = 'absolute'

      // el.addEventListener("click",function(id){console.log("Box is selected ",this.id);})
      el.addEventListener("click", this.onSelectBox)
      el.style["padding"] = "1rem"
      el.style["backgroundColor"] = "white"
      el.style["height"] = "200px"
      el.style["width"] = "200px"

      // el.style['z-index']=this.boxid
      let root = document.getElementById("root");
      root?.appendChild(el);

    }
  }

  //Event Handling for selected Box
  onSelectBox(this: HTMLElement, ev: Event, ) {
    let isKey = document.getElementById("keyControl")
    console.log(isKey?.innerHTML);
    if (isKey?.innerHTML === "Keyboard On") {

      // console.log("Box is selected "+this.id +" "+ev.type);
      this.style["backgroundColor"] = "blue"
      // this.style.position = 'absolute'
      let top = 103
      let left = 2
      let bottom = 0
      let right = 0
      this.style["top"] = top + "px"
      this.style["left"] = left + "px"
      this.style["bottom"] = bottom + "px"
      this.style["right"] = right + "px"
      if (isKey?.innerHTML === "Keyboard On") {
      this.addEventListener('keydown', (event) => {
        var name = event.key;
        // console.log(name);
        //Action for w
        if (name == "w" && top >= 103) {
          console.log(name);
          top = top - 1
          this.style["top"] = top + "px"
        }
        //Action for s
        if (name == "s" && top <= 702) {
          console.log(name);

          top = top + 1
          this.style["top"] = top + "px"
        }
        //Action for a
        if (name == "a" && left >= 2) {
          console.log(name);
          left = left - 1
          this.style["left"] = left + "px"
        }
        //Action for d
        if (name == "d" && left <= 600) {
          console.log(name);
          left = left + 1
          this.style["left"] = left + "px"

        }
        if (name == "Delete") {
          console.log(name);
          this.remove()

        }
      }, false);
      this.addEventListener('focusout', () => {
        this.style["backgroundColor"] = "white"

      })
    }
    }
    else{
      alert("Turn On Keyboard Controls")
    }
  }


}
