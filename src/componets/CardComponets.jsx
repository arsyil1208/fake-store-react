import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

export default function CardComponets({ CategoryPrtoduct }) {
  return (
    <Link to={`/products/category/${CategoryPrtoduct.id}`}>
      <Card
        className="w-auto h-auto "
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={CategoryPrtoduct.image}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {CategoryPrtoduct.name}
        </h5>
      </Card>
    </Link>
  );
}
