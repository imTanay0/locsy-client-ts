import { useParams } from "react-router-dom";

const ProductInfoPage = () => {
  const { productId } = useParams();

  console.log(productId);

  return <div>ProductInfoPage of Product ID: {productId}</div>;
};

export default ProductInfoPage;
