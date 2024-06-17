import { getProfile } from "@/utils/api-calls";
import { ProfileResponseDTO } from "@/types/endpoint-types-incoming";

type Props = {
  readonly sellerId: string;
};

async function getSeller(sellerId: string) {
  const seller: ProfileResponseDTO = await getProfile(sellerId)
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });

  if (seller) {
    return seller;
  }

  return undefined;
}

export default async function ProductSeller(props: Props) {
  const seller = await getSeller(props.sellerId);

  return (
    <div>
      {seller && `${seller.firstName} ${seller.lastName} (${seller.username})`}
    </div>
  );
}
