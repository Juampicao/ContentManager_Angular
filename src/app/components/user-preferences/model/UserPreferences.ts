export class UserPreferences {
  public cardNumberColumns: number;
  public viewPrefered: string;

  constructor(cardNumberColumns: number, viewPrefered: string) {
    this.cardNumberColumns = cardNumberColumns;
    this.viewPrefered = viewPrefered;
  }

  get optionsCardNumber() {
    return [1, 2, 3, 4];
  }

  get optionsViewPrefered() {
    return ['table', 'cards'];
  }
}
