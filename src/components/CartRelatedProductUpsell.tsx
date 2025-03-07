import * as React from 'react';
import { useState, useEffect } from 'react';

interface Recommendation {
  id: string;
  title: string;
  featured_image: string;
  url: string;
  price: number;
  variants: {
    id: string;
  }[];
}

interface CartRelatedProductUpsellProps {
  productId?: string;
}

const CartRelatedProductUpsell: React.FC<CartRelatedProductUpsellProps> = ({ productId }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [recommendationAdded, setRecommendationAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        const recUrl = `/recommendations/products.json?product_id=${productId}&intent=related&limit=1`;
        const recResponse = await fetch(recUrl);
        const recData = await recResponse.json();
        console.log('recommendations data', recUrl, recData);
        setRecommendations(recData?.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [productId]);

  if (loading || !recommendations?.length || recommendationAdded) {
    return null;
  }

  return (
    <div className="p-5 border-t border-grey-200">
      {recommendations.slice(0, 1).map((product) => (
        <div key={product.id} className="flex items-start gap-4 justify-between">
          <div className="block font-serif text-dark-grey space-y-[15px] grow">
            <h3 className="text-grey-50 uppercase font-sans tracking-[0.15em] text-sm">You may also like...</h3>
            <div>
              <h4 className="">{product.title}</h4>
              <p className="italic">${(product.price / 100).toFixed(2)}</p>
            </div>
            <button
              onClick={async () => {
                try {
                  const response = await fetch('/cart/add.js', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      id: product.variants?.[0]?.id,
                      quantity: 1,
                    }),
                  });
                  const data = await response.json();
                  console.log('Successfully added product to cart:', data);
                  document.dispatchEvent(new Event('product:added'));
                  setRecommendationAdded(true);
                } catch (error) {
                  console.error('Error adding to cart:', error);
                }
              }}
              className="text-dark-grey text-sm uppercase tracking-[0.15em] underline font-serif"
              data-ph-capture-attribute-product-name={product.title}
              data-ph-capture-attribute-product-price={product.price / 100}
            >
              Add to Cart
            </button>
          </div>
          <div className="relative w-20 max-w-full h-full shrink-0 flex items-center justify-center">
            <img
              src={product.featured_image}
              alt={product.title}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartRelatedProductUpsell;
