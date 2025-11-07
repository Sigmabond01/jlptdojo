import LevelPage from "@/components/layout/LevelPage";

export default function MainPage({ params }: { params: { category: string } }) {
  return (
    <div>
      <LevelPage params={params} /> 
    </div>
  )
}