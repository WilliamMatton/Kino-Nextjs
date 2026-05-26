'use client'

import { FC } from "react"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type Props = {
  page: number;
  maxPages: number;
}

const ReviewPagination: FC<Props> = ({ page, maxPages }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  function nextPage() {
    const params = new URLSearchParams(searchParams);
    if(page < maxPages) {
      params.set('page', (++page).toString());
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function previousPage() {
    const params = new URLSearchParams(searchParams);
    if(page > 1) {
      params.set('page', (--page).toString());
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

 return (
  <div className="movieReviewButtons">
    <button className="previousReviewPageBtn" onClick={previousPage}>Föregående sida</button>
    <button className="nextReviewPageBtn" onClick={nextPage}>Nästa sida</button>
  </div>
 );
}

export default ReviewPagination;