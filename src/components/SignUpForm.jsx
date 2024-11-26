import { postSub } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

async function SignUpForm() {
  async function send(formData) {
    "use server";
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
    };
    await postSub(data);

    // Sikre at de nye input bliver vist uden at man skal lave refresh
    revalidatePath("/");
  }

  return (
    <form action={send} className="max-w-md mb-8 bg-slate-50 p-4 rounded-md drop-shadow-md">
      <div className="mb-4">
        <label htmlFor="id-name" className="font-bold block">
          Name
        </label>
        <input type="text" name="name" id="id-name" required className="px-3 py-2 border-2 rounded-md" />
      </div>
      <div className="mb-4">
        <label htmlFor="id-email" className="font-bold block">
          Email
        </label>
        <input type="text" name="email" id="id-email" required className="px-3 py-2 border-2 rounded-md" />
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md w-full py-1 px-6">Subscribe</button>
    </form>
  );
}

export default SignUpForm;
