import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function ProtectedRoute() {
const session = await getServerSession();
if (!session || !session.user) {
  redirect("/api/auth/signin");
}

return (
  <main>
    <h1>Protected page</h1>
    <p>Welcome {session.user.name}</p>
  </main>
);
}