import { ErrorExternoAlPasarParams } from '../error/ErrorExternoAlPasarParams';

export class Duration {
  private _hh: number;
  private _mm: number;
  private _ss: number;

  constructor(hh: number = 0, mm: number = 0, ss: number = 0) {
    this._hh = hh;
    this._mm = mm;
    this._ss = ss;
    // this._hh = 0
    // this._mm = 0;
    // this._ss = 0;
  }

  /**
   * Crear la duracion.
   * ! Ningun param puede ser negativo
   * @param hh number
   * @param mm number
   * @param ss number
   */
  setDuration(hh: number = 0, mm: number = 0, ss: number = 0) {
    if (hh < 0 || mm < 0 || ss < 0) {
      throw new ErrorExternoAlPasarParams(
        `No puede ser negativa la duracion hh:${hh}, mm:${mm}, ss:${ss}`
      );
    }

    this._hh = hh;
    this._mm = mm;
    this._ss = ss;
  }

  /**
   *
   * @returns la duración en digitos 00:00:00
   */
  getDuration() {
    let response = `${
      this.padTo2Digits(this._hh) +
      `:` +
      this.padTo2Digits(this._mm) +
      `:` +
      this.padTo2Digits(this._ss)
    }`;
    return response;
  }

  /**
   *
   * @returns la duracion en estilo hh:00mm:00:ss:00
   */
  getDurationWithLetter() {
    let response = `${
      this.padTo2Digits(this._hh) +
      `hh` +
      `:` +
      this.padTo2Digits(this._mm) +
      `mm` +
      `:` +
      this.padTo2Digits(this._ss) +
      `ss`
    }`;
    return response;
  }

  /**
   *
   * @returns la duration en estilo hours: 00 minutes: 00 seconds:00
   */
  getDurationWithDescription() {
    return `${this.padTo2Digits(this._hh)} hours: ${this.padTo2Digits(
      this._mm
    )} minutes: ${this.padTo2Digits(this._ss)} seconds`;
  }

  /**
   *
   * @param duration Duration
   * @returns la duration pasada a segundos.
   */
  getDurationTotalInSeconds(duration: Duration): number {
    let response = duration.getDuration();
    let hours = response.slice(0, 2);
    let minutes = response.slice(3, 5);
    let seconds = response.slice(6, 8);

    let totalSecondsDuration =
      Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

    return totalSecondsDuration;
  }

  /**
   *
   * @param duration Duration
   * @returns la duracion pasada a minutos.
   */
  getDurationTotalInMinutes(duration: Duration): number {
    let newDuration;
    if (typeof duration === 'number') {
      newDuration = { _hh: 0, _mm: duration, _ss: 0 };
    } else {
      newDuration = duration;
    }

    let response = duration.getDuration();
    let hours = response.slice(0, 2);
    let minutes = response.slice(3, 5);
    let seconds = response.slice(6, 8);

    let totalSecondsDuration =
      Number(hours) * 60 + Number(minutes) * 1 + Number(seconds) * 0.0166667;

    return totalSecondsDuration;
  }

  /**
   * TODO PROBANDO
   * @param minutes
   */
  setDurationWithMinutes(minutes: number) {
    this._hh = Math.floor(minutes / 60);
    this._mm = minutes % 60;
    this._ss = 0;
  }

  get seconds() {
    return this._ss;
  }

  get minutes() {
    return this._mm;
  }

  get hours() {
    return this._hh;
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
}
