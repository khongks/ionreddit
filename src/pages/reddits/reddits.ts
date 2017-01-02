import { DetailsPage } from './../details/details';
import { RedditsService } from './../../services/reddits.service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Reddits page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reddits',
  templateUrl: 'reddits.html'
})
export class RedditsPage implements OnInit {

  items: any;
  category: any;
  limit: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private redditsService: RedditsService) {
    //this.getDefaults(); 
  }
  
  ngOnInit() {
    console.log('onInit RedditsPage');
    this.getDefaults();
    this.getPosts(this.category, this.limit);
  }

  getDefaults() {
    if(localStorage.getItem('category') != null) {
      this.category = localStorage.getItem('category');
    } else {
      this.category = "sports";
    }
    if(localStorage.getItem('limit') != null) {
      this.limit = localStorage.getItem('limit');
    } else {
      this.limit = 10;
    }
  }

  getPosts(category, limit) {
    console.log('getPosts RedditsPage');
    this.redditsService.getPosts(category, limit)
      .subscribe(res => {
        //console.log('response: ');
        //console.log(res.data);
        this.items = res.data.children;
      })
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RedditsPage');
  }

  viewItem(item: any) {
    this.navCtrl.push(DetailsPage, {
      item: item
    });
  }

  changeCategory() {
    console.log('changeCategory RedditsPage: ' + this.category);
    this.getPosts(this.category, this.limit);
  }

  refresh(refreshEvent) {
    this.getPosts(this.category, this.limit);
    setTimeout(() => {
      refreshEvent.complete();
    }, 200);
  }

}
