"use client";

import {
  newArrivalsData,
  relatedProductData,
  topSellingData,
} from "@/lib/data/products";
import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "./partials/product-breadcrumb";
import ProductContent from "./partials/content";
import Tabs from "./partials/tabs";
import { Product } from "@/types/product.types";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import ApiLoader from "@/components/common/api-loader";

const data: Product[] = [
  ...newArrivalsData,
  ...topSellingData,
  ...relatedProductData,
];

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const productId = params.id;

  const { toastError } = useToast();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>();

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products/${productId}`);
      setProduct(res.data);
    } catch (e) {
      toastError("An error occurred while fetching product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return (
    <main>
      {loading ? (
        <ApiLoader message="Loading product..." />
      ) : (
        <>
          {product ? (
            <>
              <div className="max-w-frame mx-auto px-4 xl:px-0">
                <hr className="h-px border-t-black/10 mb-5 sm:mb-6" />
                <BreadcrumbProduct title={product?.name ?? "product"} />
                <section className="mb-11">
                  <ProductContent data={product} />
                </section>
                <Tabs productId={productId} />
              </div>
              <div className="mb-[50px] sm:mb-20">
                <ProductListSec
                  title="You might also like"
                  data={relatedProductData}
                />
              </div>
            </>
          ) : (
            <div className="max-w-frame mx-auto px-4 xl:px-0">
              <div className="flex flex-col items-center justify-center gap-y-3 w-full py-12">
                <i className="fal fa-box text-4xl"></i>
                <p className="text-black/40">
                  The product you are lookig for does not exist.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
