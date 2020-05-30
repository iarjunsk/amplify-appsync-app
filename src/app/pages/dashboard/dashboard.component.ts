import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/graphql/API.service';
import * as Observable from "zen-observable";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private api: APIService) { }

  vehicleQueryResult: string; // Used in HTML for queried data
  vehicleSubscribeResult: string; // Used in HTML for subscribed data
  subscribedVehicleLocation: Observable; // Used to unsubscribe


  ngOnInit() {
    this.vehicleSubscribeResult = "";
    this.vehicleQuery();
    this.vehicleSubscribe();
  }

  async vehicleQuery() {
    let result = await this.api.GetVehicle("CAR4");
    this.vehicleQueryResult = JSON.stringify(result);
  }

  async vehicleSubscribe() {
    this.subscribedVehicleLocation = this.api.SubscribeToVehicleLocation("CAR4").subscribe({
      next: (newVehicle: any) => {
        this.vehicleSubscribeResult = JSON.stringify(newVehicle.value.data.subscribeToVehicleLocation);
      }
    })
  }

  unsubscribe() {
    this.subscribedVehicleLocation.unsubscribe();
  }

}
