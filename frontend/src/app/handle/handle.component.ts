import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { City } from "../models/city.model";
import { State } from "../models/state.model";
import { CityService } from "../services/city.service";
import { StateService } from "../services/state.service";

@Component({
  selector: "app-handle",
  templateUrl: "./handle.component.html",
  styleUrls: ["./handle.component.css"],
})
export class HandleComponent implements OnInit {
  private states$: Observable<any>;
  private citys$: Observable<any>;
  private qtdStates: number = 0;
  private qtdCitys: number = 0;
  private isUpdateStateActived = false;
  private isUpdateCityActived = false;
  private isAddStateActived = false;
  private isAddCityActived = false;
  private stateToBeAdd: State;
  private stateToBeUpdate: State;
  private cityToBeAdd: any;
  private cityToBeUpdate: any;

  constructor(
    private stateService: StateService,
    private cityService: CityService,
    private router: Router
  ) {}

  ngOnInit() {
    this.states$ = this.stateService.load();

    this.citys$ = this.cityService.load();
  }

  showUpdateStateForm(state: State) {
    this.isAddCityActived = false;
    this.isAddStateActived = false;
    this.isUpdateCityActived = false;
    this.isUpdateStateActived = true;

    this.stateToBeUpdate = { ...state };
  }

  showUpdateCityForm(cityId: string) {
    this.isAddCityActived = false;
    this.isAddStateActived = false;
    this.isUpdateStateActived = false;
    this.isUpdateCityActived = true;

    this.cityToBeUpdate = { cityId };
  }

  showAddCityForm(stateId: string) {
    this.isUpdateStateActived = false;
    this.isAddStateActived = false;
    this.isUpdateCityActived = false;
    this.isAddCityActived = true;

    this.cityToBeAdd = { stateId };
  }

  showAddStateForm() {
    this.isUpdateStateActived = false;
    this.isAddCityActived = false;
    this.isUpdateCityActived = false;
    this.isAddStateActived = true;
  }

  updateState(updateStateForm) {
    if (updateStateForm.invalid) return;

    const { id } = this.stateToBeUpdate;

    this.stateService.update(updateStateForm.value, id).subscribe(console.log);

    this.isUpdateStateActived = false;
    this.stateToBeUpdate = null;
  }

  updateCity(updateCityForm) {
    if (updateCityForm.invalid) return;

    const { cityId } = this.cityToBeUpdate;

    this.cityService.update(updateCityForm.value, cityId).toPromise().then();

    this.isUpdateCityActived = false;
    this.cityToBeUpdate = null;
  }

  deleteState(stateId: string) {
    this.stateService.delete(stateId).toPromise().then();
  }

  deleteCity(cityId: string) {
    this.cityService.delete(cityId).toPromise().then();
  }

  addCity(addCityForm) {
    if (addCityForm.invalid) return;

    const { stateId } = this.cityToBeAdd;

    this.cityService.create(addCityForm.value, stateId).toPromise().then();

    this.isAddCityActived = false;
  }

  addState(addStateForm) {
    if (addStateForm.invalid) return;

    this.stateService.create(addStateForm.value).toPromise().then();

    this.isAddStateActived = false;
  }
}
