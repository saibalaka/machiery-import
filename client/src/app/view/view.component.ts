import { Component,Input,OnChanges,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnChanges{

  @Input() products=[]

  ngOnChanges(changes: SimpleChanges) {
    changes['products']
  }

}
