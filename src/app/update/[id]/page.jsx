import { getSubById, patchSub } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import Link from "next/link";

async function page({ params }) {
  /*TODO:
    - Hent subscriber med id fra params
    - Lav en formular med input for name og email med "defaultValue" sat til subscriberens nuværende værdier
    - Lav en funktion med "use server" som køres fra en action på formen
    - Funktionen modtager automatisk "formData" som argument
    - Opret et objekt med name og email fra formData; fx 'email: formData.get("email")'
    importer din PATCH-funktion fra supabase og kør den med objektet som argument
    - Brug revalidatePath("/") til at genindlæse siden, hvor du viser alle subscribers
    - Brug redirect("/") til at sende brugeren tilbage til forsiden
    */

  const { id } = await params;
  const subscriber = await getSubById(id);
  console.log("subscriber", subscriber);

  async function update(formData) {
    "use server";
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
    };
    await patchSub(id, data);

    // Sikre at de nye input bliver vist uden at man skal lave refresh
    revalidatePath("/");
    redirect("/");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 row-start-2 items-center sm:items-start">
        <Link href="/">Go back</Link>
        <form action={update}>
          <div className="mb-4">
            <label htmlFor="id-name" className="font-bold block">
              Name
            </label>
            <input type="text" name="name" id="id-name" defaultValue={subscriber[0].name} className="px-3 py-2 border-2 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="id-email" className="font-bold block">
              Email
            </label>
            <input type="text" name="email" id="id-email" defaultValue={subscriber[0].email} className=" px-3 py-2 border-2 rounded-md" />
          </div>
          <div className="flex gap-2">
            {/* <button className="bg-gray-400 hover:bg-gray-500 text-white rounded-md block py-1 px-6">Delete</button> */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md block py-1 px-6">Update</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default page;
