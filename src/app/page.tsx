import { List } from "~/ui/home/List"
import Title from "~/ui/home/Title"

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-[40px] h-screen w-screen items-center justify-center">
        <Title />

        <div className="w-[837px] bg-[#fafafa] p-[8px] rounded-[24px]">
          <div className="flex flex-row gap-[12px] px-[12px] py-[16px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-[7.5rem] border-1 border-input bg-background px-[24px] py-[15px] outline-none text-sm placeholder:text-muted-foreground focus:border-[#601feb] focus:ring-[#601feb]"
            />
            <button className="rounded-[20px] bg-[#601feb] px-[32px] text-sm font-semibold text-primary-foreground">
              Add
            </button>
          </div>

          <List />
        </div>
      </div>
    </main>
  )
}
