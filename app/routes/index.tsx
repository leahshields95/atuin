import { getParts } from "~/models/part.server";
import SelectPart from "../select-part/select-part";

export const loader = async () => {
  return await getParts();
};

export default function Index() {
  return (
    <main className="relative min-h-screen bg-[#282c34]">
      <SelectPart />
    </main>
  );
}
