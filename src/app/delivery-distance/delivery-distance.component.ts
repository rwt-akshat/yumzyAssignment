import { Component, DoCheck, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delivery-distance',
  templateUrl: './delivery-distance.component.html',
  styleUrls: ['./delivery-distance.component.css']
})
export class DeliveryDistanceComponent implements OnInit,DoCheck {

  distanceForm: FormGroup;
  errMsg!:string;
  formValue!:Object

  constructor(private fb: FormBuilder) {

    this.distanceForm = this.fb.group({
      distances: this.fb.array([]),
    });
  }
  ngDoCheck(): void {
    this.distances().controls.forEach((element,index) => {
      if(index > 0){
        let prevElement = this.distances().at(index-1).value;
        let currElement = element.value;
        if(element.value.to == ''){
          this.errMsg = '';
        }
        else if ((currElement.from < prevElement.to) || (currElement.from > currElement.to)) {
          this.errMsg = 'To Value Should Be Greater Than Form Value';
        }
        else{
          this.errMsg = '';
        }
      }else{
        if(element.value.to == ""){
          this.errMsg = ''
        }
        else if(element.value.from > element.value.to){
          this.errMsg = 'To Value Should Be Greater Than Form Value';
        }else{
          this.errMsg = '';
        }
      }
    });
  }

  ngOnInit(): void {
    this.distances().push(this.newDistance());
  }

  distances(): FormArray {
    return this.distanceForm.get("distances") as FormArray
  }

  newDistance(): FormGroup {
    return this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      deliveryFees: ['', Validators.required]
    })
  }

  addDistance() {
    const length = this.distanceForm.get('distances')?.value.length - 1;
    const pd = (this.distanceForm.value.distances[length]);
    const pp = this.fb.group({
      from: pd.to,
      to: '',
      deliveryFees: ''
    })
    this.distances().push(pp);
  }

  removeDistance(i: number) {
    this.distances().removeAt(i);
  }

  onSubmit() { 
    console.log(this.distanceForm.value);
  }

}
