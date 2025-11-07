import LevelPage from "@/components/layout/LevelPage";

export default async function MainPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  return (
    <div>
      <LevelPage params={params} /> 
    </div>
  )
}