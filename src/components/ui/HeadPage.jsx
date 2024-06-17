import Back from "@/components/ui/Back";

export default function HeadPage({title}) {
  return (
      <div className="page-blank__head">
        <Back/>
        <h2 className="page-blank__title">
          {title}
        </h2>
      </div>
  )
}