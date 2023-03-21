import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyLocalStorageService } from 'src/app/services/local-storage/my-local-storage.service';
import { CustomLogger } from 'src/app/utils/CustomLogger';

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css'],
})
export class UserPreferencesComponent implements OnInit {
  public myForm!: FormGroup;

  optionsCardNumber: number[] = [1, 2, 3, 4];
  optionsViewPrefered: string[] = ['table', 'cards'];

  public cardNumberColumnsDefault = 1;
  public viewPreferedDefault = 'table';

  constructor(
    private _customLogger: CustomLogger,
    private _formBuilder: FormBuilder,
    private _localStorageService: MyLocalStorageService
  ) {}

  ngOnInit(): void {
    try {
      this.loadPreferences();
      this.initialForm();
    } catch (error) {
      this._customLogger.logError(`PreferencesUser ${error}}`);
    }
  }

  loadPreferences() {
    const cardNumberColumns = this._localStorageService.cardNumberColumns;
    const viewPrefered = this._localStorageService.viewPrefered;

    if (cardNumberColumns) {
      this.cardNumberColumnsDefault = cardNumberColumns;
    }
    if (viewPrefered) {
      this.viewPreferedDefault = viewPrefered;
    }
  }

  initialForm() {
    this.myForm = this._formBuilder.group({
      cardNumberColumns: [this.cardNumberColumnsDefault],
      viewPrefered: [this.viewPreferedDefault],
    });
  }

  onSubmit(form: FormGroup) {
    this._customLogger.logDebug('OnSubmitForm', this.myForm.value);
    const cardNumberColumns = form.controls['cardNumberColumns'].value;
    const viewPrefered = form.controls['viewPrefered'].value;

    try {
      this._localStorageService.cardNumberColumns = cardNumberColumns;
      this._localStorageService.viewPrefered = viewPrefered;
      location.reload();
    } catch (error) {
      this._customLogger.logError('PreferencesUser onSubmit()', error);
      throw new Error(`${error}`);
    }
  }
}
