/* eslint-disable array-callback-return */
/* eslint-disable global-require */
import { find, orderBy } from 'lodash';

let instance: Country | null = null;

class Country {
  countryCodes: any[];

  countriesData: null;

  countries: any;

  static getInstance() {
    if (!instance) {
      instance = new Country();
    }
    return instance;
  }

  constructor() {
    this.countryCodes = [];

    this.countriesData = null;
  }

  setCustomCountriesData(json: null) {
    this.countriesData = json;
  }

  addCountryCode(iso2: any, dialCode: any, priority?: number | undefined) {
    if (!(dialCode in this.countryCodes)) {
      this.countryCodes[dialCode] = [];
    }

    // eslint-disable-next-line unicorn/prefer-default-parameters
    const index = priority || 0;
    this.countryCodes[dialCode][index] = iso2;
  }

  getAll() {
    if (!this.countries) {
      this.countries = orderBy(
        this.countriesData || require('./data/countries.json'),
        ['name'],
        ['asc'],
      );
    }

    return this.countries;
  }

  getCountryCodes() {
    if (Object.keys(this.countryCodes).length === 0) {
      this.getAll().map(
        (country: {
          iso2: any;
          dialCode: any;
          priority: any;
          areaCodes: any[];
        }) => {
          this.addCountryCode(country.iso2, country.dialCode, country.priority);
          if (country.areaCodes) {
            country.areaCodes.map((areaCode: any) => {
              this.addCountryCode(country.iso2, country.dialCode + areaCode);
            });
          }
        },
      );
    }
    return this.countryCodes;
  }

  getCountryDataByCode(iso2: string) {
    return find(this.getAll(), country => country.iso2 === iso2);
  }
}

export default Country.getInstance();
