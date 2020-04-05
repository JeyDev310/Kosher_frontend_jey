import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FuseConfigService } from '@fuse/services/config.service';
import { $ } from 'protractor';


declare var aboutscript: any;

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
  encapsulation: ViewEncapsulation.None,
})

export class AboutComponent implements OnInit {
  
  
  constructor(
    private _fuseConfigService: FuseConfigService,
  ) { 
    this._fuseConfigService.config = {
      layout: {
          navbar   : {
              hidden: true
          },
          toolbar  : {
              hidden: true
          },
          footer   : {
              hidden: true
          },
          sidepanel: {
              hidden: true
          }
      }
  };
  }
  ngAfterViewInit(){
    // aboutscript();
  }
  ngOnInit() {
  
    aboutscript();
    // $(window).load(
    //   function(){}
    // );

  }

  
  
}
