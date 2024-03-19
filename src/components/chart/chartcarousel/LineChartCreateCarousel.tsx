import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"


interface LineChartCreateCarouselProps {
    components: {
        children: React.ReactNode
    }[]
}
export function LineChartCreateCarousel({ components }: LineChartCreateCarouselProps) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {components?.map((component, index) => (
                        <CarouselItem key={index}>
                            <div>
                                {component?.children}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
    )
}
