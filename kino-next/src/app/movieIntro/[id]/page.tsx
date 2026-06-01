import ReviewContainer from "@/components/movieIntro/ReviewContainer";

import "@/styles/movieIntro.scss";

export default async function Page(props: {
  params: Promise<{ id: string; }>,
  searchParams?: Promise<{ page: string; }>
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const movieID = Number(params.id);
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <ReviewContainer movieID={movieID} page={currentPage} />
  );
}