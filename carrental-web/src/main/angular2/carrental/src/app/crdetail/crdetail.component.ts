/**
 *    Copyright 2016 Sven Loesekann

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ISubscription} from 'rxjs/Subscription';
import {CrRestService} from '../crrest.service';
import {CrDetail, CrPeriod} from '../crTypes';
import {CrValuesComponent} from '../crvalues/crvalues.component';

@Component({  
  selector: 'app-crdetail',
  templateUrl: './crdetail.component.html',
  styleUrls: ['./crdetail.component.css'],
})
export class CrdetailComponent  implements OnInit, OnDestroy {
  errorMsg: string;
  crDetail: CrDetail;
  crPeriods: CrPeriod[];
  crEditmode: boolean;
  private mnr: string;
  private jahr: string;
  private routeSub: ISubscription;  
    
  constructor(private route: ActivatedRoute, private router: Router, private service: CrRestService) {
      this.crEditmode = false;
  }

  ngOnInit(): void {
      this.routeSub = this.route.params.subscribe(params => {
        this.mnr = params['mnr'];
        this.jahr = params['jahr'];
        this.service.getCrDetail(this.mnr, this.jahr).subscribe(lsdD => {this.crDetail = <CrDetail> lsdD; this.crPeriods = (<CrDetail> lsdD).crPeriods;}, error => this.errorMsg = error);
      });      
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
  
  toggleEditmode(): void {
      this.crEditmode = !this.crEditmode;
  }
  
  update(): void {
      this.service.putCrDetail(this.mnr, this.jahr, this.crDetail).subscribe(lsdD => {this.crDetail = <CrDetail> lsdD; this.crPeriods = (<CrDetail> lsdD).crPeriods;}, error => this.errorMsg = error);      
  }
  
  create(): void {
      this.service.createCrDetail(this.mnr, this.jahr, this.crDetail).subscribe(lsdD => {this.crDetail = <CrDetail> lsdD; this.crPeriods = (<CrDetail> lsdD).crPeriods;}, error => this.errorMsg = error);
  }
}
