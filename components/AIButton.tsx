import { Button } from "@/components/ui/button"

export default function AIButton({ label, onClick, disabled }: any) {
  return (
    <Button className="cursor-pointer" variant="default" onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  )
}
