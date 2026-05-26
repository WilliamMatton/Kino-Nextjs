import ReviewContainer from "@/components/movieIntro/ReviewContainer";

import "@/styles/movieIntro.scss";

export default async function Page(props: {
  searchParams?: Promise<{
    movieID: string;
    page: string;
  }>
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const movieID = Number(searchParams?.movieID);
  
  return (
    <ReviewContainer movieID={movieID} page={currentPage} />
  );
}