import { AppService } from "./../../app.service";
import { HttpService } from "./../../http.service";
import { Component, OnInit } from "@angular/core";
import { NgForm, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-building",
  templateUrl: "./building.component.html",
  styleUrls: ["./building.component.scss"]
})
export class BuildingComponent implements OnInit {
  public building: any = null;
  public searchData: string = "";
  public formsState: boolean = false;

  //------------------------------------
  public allRoom: any = null;
  public allBuilding: any = null;
  public allPersonnel: any = null;
  public allAddminBuilding: any = null;
  //------------------------------------
// กำหนดจำนวนข้อมูลที่จะแสดงในแต่ละหน้า
  public rowTable: number = 10;
  public pageTable: number = 1;

  public formBuilding = this.formBuilder.group({
    building: ["", Validators.required],
    personnel: ["", Validators.required],
    floor: ["", Validators.required],
    class: [""],
    room: [""],
    admin: ["", Validators.required]
  });

  constructor(
    private http: HttpService,
    private app: AppService,
    private formBuilder: FormBuilder
  ) {}
// เรียกใช้ฟังชั่นก์ rowTable
  public rowTableNumber(x: number): number {
    return this.pageTable * this.rowTable - this.rowTable + x;
  }

  public formState(x: null | any): void {
    // console.log(x);
    if (x) {
      this.formsState = true;
      this.formBuilding = this.formBuilder.group({
        building: [x.buildding_id, Validators.required],
        personnel: [x.personnel_id, Validators.required],
        floor: [x.floorOfBuilding, Validators.required],
        class: [x.class ? x.class : ""],
        room: [x.room_id ? x.room_id : ""],
        admin: [x.adminBuilding_id, Validators.required],
        id: [x.id]
      });
    } else {
      this.formsState = false;
      this.formBuilding = this.formBuilder.group({
        building: ["", Validators.required],
        personnel: ["", Validators.required],
        floor: ["", Validators.required],
        class: [""],
        room: [""],
        admin: ["", Validators.required]
      });
    }
  }

  public deleteBuilding(id: any): void {
    this.app
      .confirm("warning", "ยืนยันการลบข้อมูล", "")
      .then((confirm: any) => {
        if (confirm.value) {
          this.http
            .get("delete/buildingSystem.php", { id: id })
            .then((value: any) => {
              if (value.result) {
                this.getBuildingSystem();
                this.app.alert("success", "ลบข้อมูลสำเร็จ", "");
              }
            })
            .catch((reason: any) => {
              console.log(reason);
              this.app.alert("error", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้", "");
            });
        }
      });
  }

  public updateBuilding(data: NgForm): void {
    if (this.formsState) {
      // update
      this.app
        .confirm("warning", "ยืนยันการแก้ไขข้อมูล", "")
        .then((confirm: any) => {
          if (confirm.value) {
            this.http
              .post("update/buildingSystem.php", data.value)
              .then((value: any) => {
                // console.log(value);
                if (value.result) {
                  this.getBuildingSystem();
                  this.app.alert("success", "แก้ไขข้อมูลสำเร็จ", "");
                } else if (!value.result) {
                  this.app.alert("warning", "ไม่มีการแก้ไขข้อมูล", "");
                } else if (value.error) {
                  this.app.alert("error", "เกิดข้อผิดพลาดในการเพิ่มข้อมูล", "");
                }
              })
              .catch((reason: any) => {
                console.log(reason);
                this.app.alert("error", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้", "");
              });
          }
        });
    } else {
      // insert
      this.http
        .post("insert/buildingSystem.php", data.value)
        .then((value: any) => {
          console.log(value);
          if (value.result) {
            this.getBuildingSystem();
            this.app.alert("success", "เพิ่มข้อมูลสำเร็จ", "");
          } else if (value.error) {
            this.app.alert("error", "เกิดข้อผิดพลาดในการเพิ่มข้อมูล", "");
          }
        })
        .catch((reason: any) => {
          console.log(reason);
          this.app.alert("error", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้", "");
        });
    }
  }

  public getBuildingSystem(): void {
    this.http
      .get("get/buildingSystem.php", { search: this.searchData })
      .then((value: any) => {
        // console.log(value);
        if (value.length > 0) {
          this.building = value.data;
        } else {
          this.building = null;
        }
      })
      .catch((reason: any) => {
        console.log(reason);
        this.building = null;
        this.app.alert("error", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้", "");
      });
  }

  private getRoom(): void {
    this.http
      .get("get/room.php", {})
      .then((value: any) => {
        //console.log(value);
        if (value.length > 0) {
          this.allRoom = value.data;
        } else {
          this.allRoom = null;
        }
      })
      .catch((reason: any) => {
        console.log(reason);
        this.allRoom = null;
        this.app.alert("error", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้", "");
      });
  }

  private getAdminBuilding(): void {
    this.http
      .get("get/adminBuilding.php", {})
      .then((value: any) => {
        //console.log(value);
        if (value.length > 0) {
          this.allAddminBuilding = value.data;
        } else {
          this.allAddminBuilding = null;
        }
      })
      .catch((reason: any) => {
        console.log(reason);
        this.allAddminBuilding = null;
        this.app.alert("error", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้", "");
      });
  }

  private getBuilding(): void {
    this.http
      .get("get/building.php", {})
      .then((value: any) => {
        //console.log(value);
        if (value.length > 0) {
          this.allBuilding = value.data;
        } else {
          this.allBuilding = null;
        }
      })
      .catch((reason: any) => {
        console.log(reason);
        this.allBuilding = null;
        this.app.alert("error", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้", "");
      });
  }

  private getPersonnel(): void {
    this.http
      .get("get/personnel.php", {})
      .then((value: any) => {
        //console.log(value);
        if (value.length > 0) {
          this.allPersonnel = value.data;
        } else {
          this.allPersonnel = null;
        }
      })
      .catch((reason: any) => {
        console.log(reason);
        this.allPersonnel = null;
        this.app.alert("error", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้", "");
      });
  }



  ngOnInit(): void {
    this.getBuildingSystem();
    this.getRoom();
    this.getBuilding();
    this.getPersonnel();
    this.getAdminBuilding();

  }
}
