"use client";

import { useFAlbumStore } from '@/store';

const Timeline = (): JSX.Element => {
  const fullDates = useFAlbumStore((state) => state.filterData.fullDates);
  if (fullDates) console.log("years >> ", fullDates);

  return (
    <div className="relative max-w-[600px] mx-auto py-5">
      {fullDates && fullDates.map((fullDate: string) => (
        <div  key={fullDate} className="relative my-5 pl-10">
          <div className="">{fullDate}</div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;