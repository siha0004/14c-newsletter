import SignUpForm from "@/components/SignUpForm";
import { getSubs } from "@/lib/supabase";

export default async function Home() {
  const subscribers = await getSubs();

  return (
    <main className="grid place-content-center h-screen">
      <h1 className="text-3xl mb-4">Newsletter</h1>
      <SignUpForm></SignUpForm>
      <ul>
        {subscribers.map((sub) => (
          <li key={sub.id} className="mb-4">
            <p>{sub.name}</p>
            <p>{sub.email}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
