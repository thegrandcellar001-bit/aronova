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
import * as motion from "framer-motion/client";

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
        params: { limit: 7 },
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
    <main className="min-h-screen py-26 bg-gradient-to-b from-white to-cream/20">
      {loading ? (
        <ApiLoader message="Loading product..." />
      ) : (
        <Fragment>
          {product ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-frame mx-auto px-4 xl:px-0">
                {/* Breadcrumb */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <BreadcrumbProduct
                    title={product?.name ?? "product"}
                    category={{
                      name: product?.category_name,
                      slug: product?.category_slug,
                    }}
                  />
                </motion.div>

                {/* Product Content */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-16"
                >
                  <ProductContent data={product} />
                </motion.section>

                {/* Tabs Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mb-16"
                >
                  <Tabs product={product} />
                </motion.div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-16"
                  >
                    <ProductListSec
                      title="You may also like"
                      data={relatedProducts}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-frame mx-auto px-4 xl:px-0"
            >
              <div className="flex items-center flex-col gap-y-6 text-center mt-32 mb-32">
                <div className="w-24 h-24 rounded-full bg-cream flex items-center justify-center mb-4">
                  <i className="fal fa-box-open text-5xl text-gold" />
                </div>
                <h2 className="text-2xl font-semibold text-black">
                  Product Not Found
                </h2>
                <p className="text-black/60 max-w-md">
                  The product you are looking for does not exist or may have
                  been removed from our collection.
                </p>
                <Button
                  className="rounded-full mt-4 px-8 py-6 text-base"
                  asChild
                >
                  <Link href="/shop">
                    <i className="far fa-shopping-bag mr-2"></i>
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </Fragment>
      )}
    </main>
  );
}
