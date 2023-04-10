import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgConstants } from '../constants/svg-icons.constant';

@Injectable({
  providedIn: 'root'
})

export class SvgService {
  BASE_DIR_PATH = '../../../assets/images/svg_files/';
  IMAGE_FORMAT = '.svg';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  Init() {
    for(let i = 0 ; i <SvgConstants.length ; i++)
    this.setSvgImage(SvgConstants[i]);
  }

  setSvgImage(image_name: string): void {
    this.matIconRegistry.addSvgIcon(
        image_name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
            `${this.BASE_DIR_PATH + image_name + this.IMAGE_FORMAT}`
        )
    );
}
}







