import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SubmitForm from "@/app/submit/SubmitForm";

export default async function SubmitPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="container bg-black w-full py-6 lg:py-10">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl text-white font-bold md:text-4xl">
            Submit Your AI Tool
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Share your favorite AI application or model with the community. Your
            submission will be reviewed by our admins.
          </p>
        </div>
        <SubmitForm />
      </div>
    </div>
  );
}
