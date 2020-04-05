import { Component, OnInit, Input } from "@angular/core";
import { AppService } from 'app/service/app.service';
import { Router } from '@angular/router';
@Component({
  selector: "app-search-list",
  templateUrl: "./search-list.component.html",
  styleUrls: ["./search-list.component.scss"]
})

export class SearchListComponent implements OnInit {
  
  options: any[];
  @Input() searchType: string;
  constructor(
    private _appService: AppService,
    private _router: Router,
  ) { 
   
  }

  ngOnInit() {

    this.options = [];
    for (let list = 1 ; list < 15; list++){
        this.options.push(list.toString());  
    }
  }
  onRestauant(): void{
    this._router.navigate(['/index']);
  }
}
