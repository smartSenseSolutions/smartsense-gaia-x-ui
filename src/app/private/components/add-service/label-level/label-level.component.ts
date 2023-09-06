import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBaseComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-label-level',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label-level.component.html',
  styleUrls: ['./label-level.component.scss'],
})
export class LabelLevelComponent extends FormBaseComponent implements OnInit {
  @Output() onLabelLevelComplete = new EventEmitter<any>();

  constructor(private route: Router, fb: FormBuilder) {
    super(fb);
  }
  ngOnInit() {
    window.addEventListener(
      'message',
      ({ data, origin }: { data: string; origin: string }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access

        if (data && origin === 'https://label.gxfs.dev') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          this.generateLabelLevelVC(JSON.parse(data));
        }
      }
    );
  }

  generateLabelLevelVC = (data: { ui: { datagroup_s: any } }) => {
    const {
      ui: { datagroup_s },
    } = data;

    const labelLevelCS = this.extractLabelLevelData(datagroup_s);
    this.onLabelLevelComplete.emit(labelLevelCS);
  };

  extractLabelLevelData = (data: any) => {
    const labelLevelCS: any = {};
    for (const { dataset_s } of data) {
      for (const {
        form: { element_s },
      } of dataset_s) {
        const evidence = { website: '', pdf: '', vc: '' };
        const labelLevel = {
          evidence,
          response: '',
          reason: '',
        };
        let llKey = '';
        for (const element_key in element_s) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { type, value } = element_s[element_key];
          switch (type) {
            case 'label':
              // eslint-disable-next-line no-case-declarations
              const {
                options: { title },
              } = element_s[element_key];
              llKey = 'P' + title.split(' ')[0];
              break;

            case 'radio':
              labelLevel['response'] = value.trim();
              break;

            case 'textarea':
              labelLevel['reason'] = value;
              break;

            case 'advanceInput':
              labelLevel['evidence']['website'] = value;
              break;

            case 'advanceUpload':
              const {
                options: { uploadname },
              } = element_s[element_key];
              if (uploadname === 'Attestation PDF') {
                // TODO: Upload to S3 code here.
                evidence['pdf'] = value;
              } else if (uploadname === 'Verifiable Credential') {
                // TODO: Upload to S3 code here.
                evidence['vc'] = value;
              }
              break;

            case 'formSeparator':
              labelLevel['evidence'] = { ...evidence };
              labelLevelCS[llKey] = { ...labelLevel };
              break;

            default:
              break;
          }
        }
      }
    }
    return labelLevelCS;
  };
}
