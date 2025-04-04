import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AddJobPage from "@/components/AddJobForm";

export default async function AddJobPageWrapper() {
    const session = await getServerSession(authOptions);
    const adminId = session?.user?.isAdmin ? session.user.id : null;

    return <AddJobPage adminId={adminId} />;
}
