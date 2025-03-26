import { useQuery } from "@tanstack/react-query";
import { fetchAirMaxTrainers } from "../../api";
import { TrainersProps } from "../../types";

const Trainers = () => {
    const { data: trainers, isLoading, isError, error } = useQuery(
        { queryKey: ["airMaxTrainers"], queryFn: fetchAirMaxTrainers }
    );

    return (
        <div>
            {trainers?.map(({ title, subtitle, price, url }: TrainersProps) => {
                const urlSplit = url.split("/")
                return (
                <ul key={urlSplit[urlSplit.length - 1]}>
                    <li>{title}</li>
                    <li>{subtitle}</li>
                    <li>{price}</li>
                </ul>
            )})}
        </div>
    )
}

export default Trainers;