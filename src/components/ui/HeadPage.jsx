import Back from "@/components/ui/Back";
import {Skeleton} from "@/components/ui/skeleton";

export default function HeadPage({title, isDesc = false, description}) {
    return (
        <div className="page-blank__head">
            <Back/>
            {
                !isDesc && <h2 className="page-blank__title">
                    {title}
                </h2>
            }
            {
                isDesc && <div className="page-blank__text">
                    <h2 className="page-blank__title">
                        {title}
                    </h2>
                    {
                        description ? <h2 className="page-blank__desc">
                            {description}
                        </h2> : <Skeleton className="h-4 w-full bg-white"/>
                    }
                </div>
            }
        </div>
    )
}