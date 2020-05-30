
/* tslint:disable */
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import * as Observable from "zen-observable";

// Request DTO
export type GetVehicleQuery = {
  __typename: string;
  vin: string;
  name: string;
  lat: number | null;
  lng: number | null;
};

// Response DTO or Entity
export type Vehicle = {
  __typename: string;
  vin: string;
  name: string;
  lat: number | null;
  lng: number | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {

  // QUERY
  async GetVehicle(vin: string): Promise<GetVehicleQuery> {

    // Grapql Query statement
    const statement = `query getVehicle($vin: ID!) {
      getVehicle(vin: $vin) {
              vin
              name
              lat
              lng
            }
    }`;

    // Grapql Query variables
    const gqlAPIServiceArguments: any = {
      vin
    };
    
    // Combining statement and variable for execution
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    
    return <GetVehicleQuery>response.data.getVehicle;
  }


  SubscribeToVehicleLocation(vin: string): Observable<Vehicle> {

    // Grapql Subscribe statement
    const statement = `subscription subscribeToVehicleLocation($vin: String!) {
      subscribeToVehicleLocation(vin: $vin){
        vin
        name
        lat
        lng
      }
    }`;

    // Grapql Subscribe variables
    const gqlAPIServiceArguments: any = {
      vin
    };

    // Combining statement and variable for execution
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<Vehicle>;

  }

}