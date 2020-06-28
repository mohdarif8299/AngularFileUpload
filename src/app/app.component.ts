import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private httpClient:HttpClient) {
  }
    selectedFile: File;
    retrievedImage: any;
    message: string;
    error:string;
    isUploading:string;
    imageName: any;
    
    //Gets called when the user selects an image
    public onFileChanged(event) {
      //Select File
      this.selectedFile = event.target.files[0];
    }
    //Gets called when the user clicks on submit to upload the image
    onUpload() {
      console.log(this.selectedFile);
      //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
      this.isUploading = "true";
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      //Make a call to the Spring Boot Application to save the image
      this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, {responseType: 'text'})
        .subscribe((response) => {
          if (response === 'success') {
            this.isUploading = '';
            this.message = 'Image uploaded successfully';
          } else {
            this.error = 'Image not uploaded successfully';
          }
        }
        );
    }
      //Gets called when the user clicks on retieve image button to get the image from back end
      getImage() {
      //Make a call to Sprinf Boot to get the Image Bytes.
      this.httpClient.get('http://localhost:8080/image/get/' + this.imageName,{responseType: 'text'})
        .subscribe(
          res => {
            console.log(res);
          //  let response = JSON.parse(res);
       //     console.log(res)
         //  let imageURL = window.URL.createObjectURL(res);
       //this.retrievedImage = this.sanitizer.bypassSecurityTrustUrl(imageURL);
     //  console.log(JSON.parse(res.toString()));
     this.retrievedImage= res;
     // this.base64Data = this.retrieveResonse.picByte;
         //   this.retrievedImage = 'data:image/jpeg;base64,' + res;
            //  let imageURL = 'data:image/jpg' + res;
            //  this.retrievedImage = this.sanitizer.bypassSecurityTrustUrl(imageURL);

          }
        ); 
    }
  title = 'FileUploadApp';
}
