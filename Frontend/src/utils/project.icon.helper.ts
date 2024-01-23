export type IconMeta = {
  icon: string;
  color: string;
};

class IconHelper {
  static empty(): IconMeta {
    return { icon: "mdi-circle-outline", color: "blue" };
  }
  static halfway(): IconMeta {
    return { icon: "mdi-circle-half-full", color: "amber" };
  }
  static lastFew(): IconMeta {
    return { icon: "mdi-circle-half-full", color: "deep-orange" };
  }
  static full(): IconMeta {
    return { icon: "mdi-circle", color: "red" };
  }
}

export default IconHelper;
