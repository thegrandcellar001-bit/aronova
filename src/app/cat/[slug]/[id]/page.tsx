"use client";

import ProductListSec from "@/components/common/product-slider";
import BreadcrumbProduct from "./partials/product-breadcrumb";
import ProductContent from "./partials/content";
import Tabs from "./partials/tabs";
import { Product } from "@/types/product.types";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { Fragment, useEffect, useState } from "react";
import ApiLoader from "@/components/common/api-loader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const productId = params.id;

  const { toastError } = useToast();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products/${productId}`);
      setProduct(res.data);
      await fetchRelatedProducts(res.data.category_slug, res.data.id);
    } catch (e) {
      toastError("An error occurred while fetching product.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (slug: string, productId: string) => {
    try {
      const res = await api.get(`/categories/${slug}`, {
        params: { limit: 8 },
      });

      const related = res.data.products.filter(
        (item: Product) => item.id !== productId
      );

      setRelatedProducts(related);
    } catch (e) {}
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return (
    <main className="py-26 bg-white">
      {loading ? (
        <ApiLoader message="Loading product..." />
      ) : (
        <Fragment>
          {product ? (
            <Fragment>
              <div className="max-w-frame mx-auto px-4 xl:px-0">
                <BreadcrumbProduct
                  title={product?.name ?? "product"}
                  category={{
                    name: product?.category_name,
                    slug: product?.category_slug,
                  }}
                />
                <section className="mb-11">
                  <ProductContent data={product} />
                </section>
                <Tabs product={product} />
              </div>
              <div>
                <ProductListSec
                  title="You may also like"
                  data={relatedProducts}
                />
              </div>
            </Fragment>
          ) : (
            <div className="max-w-frame mx-auto px-4 xl:px-0">
              <div className="flex items-center flex-col gap-y-6 text-gray-500 mt-32">
                <i className="fal fa-box-open text-6xl" />
                <span className="block mb-4">
                  The product you are looking for does not exist.
                </span>
                <Button className="rounded-full" asChild>
                  <Link href="/shop">Shop</Link>
                </Button>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </main>
  );
}
