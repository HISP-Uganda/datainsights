import { action, computed, makeObservable, observable } from "mobx";

export class Store {
  d2 = undefined;
  indicatorGroups = [];
  districts = [];
  correctionPolicy = "Keep outliers";
  indicatorGroup = "";
  indicator = "";
  period = undefined;
  district = undefined;

  constructor(d2) {
    this.d2 = d2;
    makeObservable(this, {
      d2: observable,
      indicatorGroups: observable,
      districts: observable,
      correctionPolicy: observable,
      indicatorGroup: observable,
      indicator: observable,
      period: observable,
      district: observable,

      loadIndicators: action,
      setIndicatorGroups: action,
      changeIndicatorGroup: action,
      changePeriod: action,
      changeDistrict: action,
      changeIndicator: action,
      setD2: action,

      currentIndicators: computed,
    });
  }

  loadIndicators = async () => {
    if (this.d2 !== undefined) {
      const api = this.d2.Api.getApi();
      const { indicatorGroups } = await api.get(
        "indicatorGroupSets/kO23KcpBwro.json",
        {
          fields: "indicatorGroups[id,name,indicators[id,name]]",
        }
      );
      this.setIndicatorGroups(indicatorGroups);
    }
  };

  changeIndicatorGroup = (val) => (this.indicatorGroup = val);
  setIndicatorGroups = (val) => (this.indicatorGroups = val);
  changePeriod = (val) => (this.period = val);
  changeDistrict = (val) => (this.district = val);
  changeIndicator = (val) => (this.indicator = val);
  setD2 = (val) => (this.d2 = val);

  get currentIndicators() {
    // const i = this.indicatorGroups.find((i) => (i.id = this.indicatorGroup));

    // if (i) {
    //   return i.indicators;
    // }

    return [];
  }
}
