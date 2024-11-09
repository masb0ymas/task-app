import { List } from "~/ui/home/List"
import { FormAdd } from "~/ui/home/partials/Form"
import Title from "~/ui/home/Title"

export default function Home() {
  return (
    <main className="flex flex-col gap-[40px] w-screen my-40 items-center justify-center">
      <Title />

      <div className="w-[837px] bg-[#fafafa] p-[8px] rounded-[24px]">
        <FormAdd />

        <List />
      </div>
    </main>
  )
}
