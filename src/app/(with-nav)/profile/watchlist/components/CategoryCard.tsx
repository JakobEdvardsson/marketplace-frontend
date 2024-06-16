import {
  ProductCategoryDTO,
  WatchListResponseDTO,
} from "@/types/endpoint-types-incoming";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function CategoryCard(props: {
  readonly productInfo: WatchListResponseDTO;
  readonly handleCategoryUpdate: (_: ProductCategoryDTO) => void;
  readonly selected: string;
}) {
  return (
    <div>
      <div
        className={
          props.selected === props.productInfo.productCategory.name
            ? "flex flex-col bg-sky-100 p-4 "
            : "flex flex-col p-4"
        }
      >
        <Link
          className="first-letter:uppercase hover:font-bold"
          href="/profile/watchlist"
          onClick={() => {
            props.handleCategoryUpdate(props.productInfo.productCategory);
          }}
        >
          {props.productInfo.productCategory.name}
        </Link>
      </div>
      <Separator />
    </div>
  );
}
