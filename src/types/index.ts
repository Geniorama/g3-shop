export type ProductVariant = {
  variantId: string;
  title: string;
  price: number;
  description?: string;
  selectedOptions?: {
    name: string;
    value: string;
    type?: string;
  }[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: {
    value: string;
  }[];
};

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
    name: string;
    value: string;
  }[];
};

export type MenuCollection = {
  id: string;
  title: string;
  handle: string;
  hasSubitems?: boolean;
};

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
  priceRange: {
    minVariantPrice: {
      amount: number;
      currencyCode: string;
    };
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

export type ContactInfo = {
  whatsAppNumber?: string;
  whatsAppLink?: string;
  address?: string;
  locationFrame?: string;
  locationLink?: string;
  email?: string;
};

export type SocialMediaItem = {
  name: string;
  url: string;
};

export interface ShopifyImage {
  src: string;
  altText?: string;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  price: ShopifyPrice;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  priceRange: {
    minVariantPrice: ShopifyPrice;
  };
  variants: {
    edges: {
      node: ShopifyVariant;
    }[];
  };
}

export interface ShopifyProductsPageInfo {
  hasNextPage: boolean;
  endCursor: string;
}
export interface ShopifyCollection {
  title: string;
  handle: string;
  image?: {
    src: string;
    altText: string;
  }
  products: {
    edges: {
      node: ShopifyProduct;
    }[];
    pageInfo: ShopifyProductsPageInfo;
  };
}

export interface ShopifyCollectionResponse {
  collection: ShopifyCollection | null;
}

export type ShopifyProductNode = {
  id: string;
  title: string;
  description?: string;
  handle: string;
  images: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  priceRange: {
    minVariantPrice: ShopifyPrice;
  };
  variants: {
    edges: {
      node: ShopifyVariant;
    }[];
  };
};

export type ShopifyProductEdge = {
  node: ShopifyProductNode;
};

export type ShopifyPageInfo = {
  hasNextPage: boolean;
  endCursor: string;
};

export type ShopifyProductsResponse = {
  products: {
    edges: ShopifyProductEdge[];
    pageInfo: ShopifyPageInfo;
  };
};
