import { SetMetadata } from "@nestjs/common";
import { METADATA } from "../../share/api-metadata";

export const Public = () => {
  return SetMetadata(METADATA.PUBLIC, true);
}
