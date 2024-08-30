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
  isVariable?: boolean;
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

export type ProductImage = {
  src: string;
  altText: string;
};

export type ProductVariantQL = {
  priceV2: {
    amount: string;
  };
};

export type ProductNode = {
  id: string;
  title: string;
  handle: string;
  createdAt: string;
  images: {
    edges: {
      node: ProductImage;
    }[];
  };
  variants: {
    edges: {
      node: ProductVariantQL;
    }[];
  };
};

export type ProductsResponse = {
  products: {
    edges: {
      node: ProductNode;
      cursor: string;
    }[];
    pageInfo: {
      hasNextPage: boolean;
    };
  };
};