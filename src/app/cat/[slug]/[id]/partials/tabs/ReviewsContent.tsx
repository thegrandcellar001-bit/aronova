"use client";

import { Button } from "@/components/ui/button";
import React, { Fragment, useEffect, useState } from "react";
import ReviewCard from "@/components/common/review-card";
import { useAuthStore } from "@/lib/stores/auth";
import { Review } from "@/types/review.types";
import ApiLoader from "@/components/common/api-loader";
import { useProduct } from "@/app/providers/product-provider";

const ReviewsContent = ({ productId }: { productId: string }) => {
  const { user } = useAuthStore();
  const userId = user?.id;

  const { fetchProductReviews, loading } = useProduct();
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [reviews, setReviews] = useState<Review[]>([]);

  const handleLoadMore = async () => {
    setOffset((prevOffset) => prevOffset + limit);
    await fetchProductReviews(productId, { limit, offset });
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await fetchProductReviews(productId, { limit, offset });
      if (data && data.reviews) {
        if (offset === 0) {
          setReviews(data.reviews);
        } else {
          setReviews((prevReviews) => [...prevReviews, ...data.reviews]);
        }
      }
    };

    fetchReviews();
  }, [productId, limit, offset]);

  return (
    <section>
      <div className="flex items-center justify-between flex-col sm:flex-row mb-8 sm:mb-10">
        <div className="flex items-center mb-4 sm:mb-0">
          <h3 className="text-xl sm:text-2xl font-bold text-black mr-2">
            Product reviews
          </h3>
          <span className="text-sm sm:text-base text-black/60">
            ({reviews.length})
          </span>
        </div>
      </div>

      {loading.reviews ? (
        <ApiLoader message="Loading product reviews..." />
      ) : (
        <Fragment>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5 sm:mb-9">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  data={review}
                  isAction={userId === review.user_id}
                  isDate
                />
              ))
            ) : (
              <p className="text-black/60 text-center col-span-2 flex flex-col items-center justify-center gap-2">
                <i className="fal fa-star text-5xl text-gray-400 mb-2"></i>
                No reviews for this product yet.
              </p>
            )}
          </div>
          {reviews.length >= limit && (
            <div className="w-full px-4 sm:px-0 text-center">
              <Button
                variant={"outline"}
                className="h-15 w-[230px] px-11 py-4 border rounded-full hover:bg-black hover:text-white text-black transition-all font-medium text-sm sm:text-base border-black/10 cursor-pointer"
                onClick={handleLoadMore}
              >
                Load More Reviews
              </Button>
            </div>
          )}
        </Fragment>
      )}
    </section>
  );
};

export default ReviewsContent;
