import { List } from "~/ui/home/List"
import { FormAdd } from "~/ui/home/partials/Form"
import Title from "~/ui/home/Title"

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-[40px] h-screen w-screen items-center justify-center">
        <Title />

        <div className="w-[837px] bg-[#fafafa] p-[8px] rounded-[24px]">
          <FormAdd />

          <List />
        </div>
      </div>
    </main>
  )
}
