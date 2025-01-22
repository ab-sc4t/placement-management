import LinkButton from "@/components/LinkButton";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-center gap-4">
        <LinkButton text="Job-Details" href="/jobdetails" />
        <LinkButton text="Sign-In" href="/signin" />
      </div>
    </div>
  );
}
