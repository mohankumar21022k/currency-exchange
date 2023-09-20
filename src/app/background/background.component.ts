import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { OverlayComponent } from '../overlay/overlay.component';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {
  public backgroundImagePath: string = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    // Define an array of image filenames in the assets folder
    const imageFilenames = ['img1.jpg', 'img2.jpg', 'img3.jpg'];

    // Choose a random index from the array
    const randomIndex = Math.floor(Math.random() * imageFilenames.length);

    // Construct the path to the selected image
    this.backgroundImagePath = `assets/${imageFilenames[randomIndex]}`;
    this.openDialog()
  }

  openDialog(): void {
    this.dialog.open(OverlayComponent, {
      width: '800px', // Set the width as needed
      disableClose: true
    });
  }
}
