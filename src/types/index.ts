export type ProductVariant = {
  variantId: string,
  title: string,
  price: number,
  description?: string,
  selectedOptions?: {
    name: string,
    value: string,
    type?: string
  }[]
}

export type ProductOption = {
  id: string,
  name: string,
  values: {
    value: string
  }[]
}

export type Product = {
  id: string;
  slug: string;
  title: string;
  normalPrice: number;
  salePrice?: number;
  image?: {
    url: string;
    altText?: string;
  };
  gallery?: {
    url: string;
    altText?: string;
  }[];
  type?: string;
  description?: string;
  shortDescription?: string;
  options?: ProductOption[] | null;
  isVariable: boolean;
  variants?: ProductVariant[] | null;
  collections?: MenuCollection[];
};

export type ItemCart = Product & {
  quantity: number;
  selectedOptions?: {
    name: string,
    value: string,
  }[]
};


export type MenuCollection = {
  id: string,
  title: string,
  handle: string,
  hasSubitems?: boolean
}