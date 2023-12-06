import { Component } from '@angular/core';
import { SharedService, SvgService } from './shared/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DEFAULT_SNACK_BAR_CONFIG } from './shared/constants/base.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // State Variables
  showLoader = false;

  snackBarSubscriber$: any;
  loaderSubscriber$: any;

  constructor(
    private svgService: SvgService,
    private sharedService: SharedService,
    private snackBar: MatSnackBar
  ) {}

  //  Life cycle methods
  ngOnInit() {
    this.initialize();
  }

  /**
   * Unsubscribes to login status, snackbar & loader changes on destroy.
   */
  ngOnDestroy(): void {
    if (this.snackBarSubscriber$) {
      this.snackBarSubscriber$.unsubscribe();
    }
    if (this.loaderSubscriber$) {
      this.loaderSubscriber$.unsubscribe();
    }
  }

  /**
   * Registers SVG icons, subscribes to  snackbar & loader changes.
   */
  initialize = async () => {
    this.svgService.Init();
    this.subscribeLoader();
    this.subscribeSnackbar();
  };

  /**
   * Subscribes to snackbar message changes
   */
  subscribeSnackbar = () => {
    this.snackBarSubscriber$ = this.sharedService
      .getSnackBar()
      .subscribe((message) => {
        if (message) {
          this.openSnackBar(message);
        }
      });
  };

  /**
   * Subscribes to loader visibility changes
   */
  subscribeLoader = () => {
    this.loaderSubscriber$ = this.sharedService
      .getLoader()
      .subscribe((flag) => {
        this.showLoader = flag;
      });
  };

  // Helpers
  /**
   * Shows snack bar
   * @param message The message to show in snack bar
   */
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', DEFAULT_SNACK_BAR_CONFIG);
  }
}
