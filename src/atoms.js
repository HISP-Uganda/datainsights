import { atom, selector } from "recoil";
import moment from "moment";
import _ from "lodash";
export const periodAtom = atom({
  key: "periods",
  default: [moment("2018-01-01"), moment("2020-09-30")],
});

export const indicatorGroupAtom = atom({
  key: "indicatorGroup",
  default: "",
});

export const indicatorAtom = atom({
  key: "indicator",
  default: "",
});
export const policyAtom = atom({
  key: "policy",
  default: "Keep outliers",
});

export const organisationAtom = atom({
  key: "organisation",
  default: "O6uvpzGd5pu",
});

export const d2Atom = atom({
  key: "d2",
  default: null,
});

export const indicatorGroupsAtom = atom({
  key: "indicatorGroups",
  default: [],
});

export const fetchIndicatorGroupSetsAtom = selector({
  key: "userDetailsSelector",
  get: async ({ get }) => {
    const d2 = get(d2Atom);

    if (d2) {
      const api = d2.Api.getApi();
      try {
        const { indicatorGroups } = await api.get(
          "indicatorGroupSets/kO23KcpBwro.json",
          {
            fields: "id,name,indicatorGroups[id,name,indicators[id,name]]",
          }
        );
        return indicatorGroups;
      } catch (error) {
        console.log(error);
      }
    }
    return [];
  },
});

export const fetchOrganisations = selector({
  key: "organisations",
  get: async ({ get }) => {
    const d2 = get(d2Atom);
    if (d2) {
      const api = d2.Api.getApi();
      try {
        const { organisationUnits } = await api.get("organisationUnits.json", {
          fields: "id,name",
          paging: false,
          level: 2,
        });
        return organisationUnits;
      } catch (error) {
        console.log(error);
      }
    }
    return [];
  },
});

export const indicatorsAtom = selector({
  key: "indicators",
  get: async ({ get }) => {
    const indicatorGroups = get(fetchIndicatorGroupSetsAtom);
    const indicatorGroup = get(indicatorGroupAtom);
    const policy = get(policyAtom);

    const ig = indicatorGroups.find(
      (i) => i.id === indicatorGroup && !String(i.name).endsWith(policy)
    );

    if (ig) {
      return ig.indicators;
    }
    return [];
  },
});

export const titleAtom = selector({
  key: "title",
  get: async ({ get }) => {
    const indicators = get(indicatorsAtom);
    const indicator = get(indicatorAtom);

    const ig = indicators.find((i) => i.id === indicator);

    if (ig) {
      return ig.name;
    }
    return "";
  },
});

export const acrossCountry = selector({
  key: "across",
  get: async ({ get }) => {
    const indicator = get(indicatorAtom);
    const years = ["2018", "2019", "2020"];
    if (indicator) {
      const d2 = get(d2Atom);
      const months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];

      const api = d2.Api.getApi();

      const { organisationUnits } = await api.get("organisationUnits.json", {
        level: 1,
        fields: "id",
      });
      const orgUnit = organisationUnits[0].id;

      let req1 = new d2.analytics.request().withSkipData(false);
      let req2 = new d2.analytics.request().withSkipData(false);
      let req3 = new d2.analytics.request().withSkipData(false);

      req1.addDataFilter([indicator]);
      req1.addOrgUnitFilter([orgUnit]);
      req1.addPeriodDimension([...months.map((p) => `2018${p}`)]);

      req2.addDataFilter([indicator]);
      req2.addOrgUnitFilter([orgUnit]);
      req2.addPeriodDimension([...months.map((p) => `2019${p}`)]);

      req3.addDataFilter([indicator]);
      req3.addOrgUnitFilter([orgUnit]);
      req3.addPeriodDimension([...months.map((p) => `2020${p}`)]);

      const all = await Promise.all([
        d2.analytics.aggregate.get(req1),
        d2.analytics.aggregate.get(req2),
        d2.analytics.aggregate.get(req3),
      ]);

      return all.map((ind, i) => {
        const name = years[i];
        const x = ind.rows.map((r) => {
          return moment(r[0], "YYYYMM").format("MMM");
        });
        const y = ind.rows.map((r) => r[1]);
        return {
          name,
          x,
          y,
          mode: "scatter",
          // type: "scatter",
          marker: {
            size: 10,
            symbol: "square",
          },
          line: {
            width: 2,
          },
        };
      });
    }
    return [];
  },
});

export const acrossDistrict = selector({
  key: "acrossDistrict",
  get: async ({ get }) => {
    const indicator = get(indicatorAtom);
    const organisation = get(organisationAtom);
    const years = ["2018", "2019", "2020"];
    if (indicator && organisation) {
      const d2 = get(d2Atom);
      const months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];

      let req1 = new d2.analytics.request().withSkipData(false);
      let req2 = new d2.analytics.request().withSkipData(false);
      let req3 = new d2.analytics.request().withSkipData(false);

      req1.addDataFilter([indicator]);
      req1.addOrgUnitFilter([organisation]);
      req1.addPeriodDimension([...months.map((p) => `2018${p}`)]);

      req2.addDataFilter([indicator]);
      req2.addOrgUnitFilter([organisation]);
      req2.addPeriodDimension([...months.map((p) => `2019${p}`)]);

      req3.addDataFilter([indicator]);
      req3.addOrgUnitFilter([organisation]);
      req3.addPeriodDimension([...months.map((p) => `2020${p}`)]);

      const all = await Promise.all([
        d2.analytics.aggregate.get(req1),
        d2.analytics.aggregate.get(req2),
        d2.analytics.aggregate.get(req3),
      ]);

      return all.map((ind, i) => {
        const name = years[i];
        const x = ind.rows.map((r) => {
          return moment(r[0], "YYYYMM").format("MMM");
        });
        const y = ind.rows.map((r) => r[1]);
        return {
          name,
          x,
          y,
          mode: "lines",
          type: "scatter",
        };
      });
    }
    return [];
  },
});

export const byDistrict = selector({
  key: "byDistrict",
  get: async ({ get }) => {
    const indicator = get(indicatorAtom);
    const organisation = get(organisationAtom);
    const period = get(periodAtom);
    const pFilter = period[1].format("YYYYMM");
    if (indicator && organisation) {
      const d2 = get(d2Atom);
      const api = d2.Api.getApi();
      const { organisationUnits } = await api.get(
        `organisationUnits/${organisation}.json`,
        {
          fields: "id,name",
          paging: false,
          level: 2,
        }
      );

      const ous = organisationUnits.map((o) => o.id);

      let req1 = new d2.analytics.request().withSkipData(false);

      req1.addDataFilter([indicator]);
      req1.addOrgUnitDimension(ous);
      req1.addPeriodFilter([pFilter]);

      const { rows } = await d2.analytics.aggregate.get(req1);

      const labels = ["Eve", ...rows.map((r) => r[0])];
      const parents = ["", ...rows.map((r) => "Eve")];
      const totals = _.sum(rows.map((r) => Math.ceil(Number(r[1]))));
      return [
        {
          type: "treemap",
          labels,
          parents,
          values: [totals, ...rows.map((r) => Math.ceil(Number(r[1])))],
          textinfo: "label+value+percent parent+percent entry",
          domain: { x: [0, 0.48] },
          outsidetextfont: { size: 20, color: "#377eb8" },
          marker: { line: { width: 2 } },
          pathbar: { visible: false },
        },
      ];
    }
    return [];
  },
});
