// import { getServerSession } from 'next-auth';
import Filters from '@/components/Filters';
import { Gallery } from '@/components/Gallery';
// import { redirect } from 'next/navigation';

export default async function Home() {
  // try {
    // const session = await getServerSession();
    return (
      <main className=''>
        {/* {session?.user?.name ? ( */}
          <div>
            <div className="flex gap-4">
              <Filters />
            </div>
            <Gallery />
          </div>
        {/*// ) : (
        //   <div>
        //     <h1>Family Gallery</h1>
        //     <p>Sign in to see the gallery</p>
        //   </div>
        // )}*/}
      </main>
    );
  // } catch (error) { console.log("error", error); redirect("/api/auth/signin") }

}