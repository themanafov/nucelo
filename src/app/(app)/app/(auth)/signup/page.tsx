import { redirect } from "next/navigation";

export default async function Signup() {
  return redirect("/login");
}
