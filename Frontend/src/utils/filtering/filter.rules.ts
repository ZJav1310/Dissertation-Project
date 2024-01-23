type TFilterRules = {
  name: string;
  execute: () => any;
};

/**
 * Array of filter rules.
 */

class FilterRules {
  public rules: TFilterRules[] = [];

  public addRule(rule: TFilterRules) {
    this.rules.push(rule);
  }

  public getRule(name: string) {
    return this.rules.find((rule) => rule.name === name);
  }
}

export default FilterRules;
