import SignUpForm from "@/components/SignUpForm";
import { getSubs } from "@/lib/supabase";
import Link from "next/link";

export default async function Home() {
  const subscribers = await getSubs();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold text-center sm:text-left">Newsletter Sign Up</h1>
        <SignUpForm></SignUpForm>
        <section className="rounded-lg bg-slate-100 p-4 ">
          <h2 className="text-xl mb-4">Signed up</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 ">
            {subscribers.map((sub) => (
              <li key={sub.id} className="bg-white p-4 rounded-md drop-shadow-md">
                <Link href={`/update/${sub.id}`}>
                  <p>{sub.name}</p>
                  <p className="text-stone-600">{sub.email}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
