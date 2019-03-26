import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor() {}

  public alert(
    type: "error" | "warning" | "success",
    title: string,
    text: string
  ): void {
    Swal.fire({
      type: type,
      title: title,
      text: text,
      confirmButtonText: "ตกลง"
    });
  }

  public confirm(
    type: "error" | "warning" | "success",
    title: string,
    text: string
  ): Promise<any[]> {
    return new Promise((resolve: any) => {
      Swal.fire({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
        focusCancel: true
      }).then(result => {
        resolve(result);
      });
    });
  }
}
