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
      <Link
        className={
          props.selected === props.productInfo.productCategory.name
            ? "flex bg-sky-100 p-4 hover:font-bold"
            : "flex p-4 hover:font-bold"
        }
        href="/profile/watchlist"
        onClick={() => {
          props.handleCategoryUpdate(props.productInfo.productCategory);
        }}
      >
        {props.productInfo.productCategory.name}
      </Link>
      <Separator />
    </div>
  );
}
