import { useQuery } from "@tanstack/react-query";
import { fetchAirMaxTrainers } from "../../api";
import { TrainersProps } from "../../types";
import Container from "../../components/Container";
import classes from "./Trainers.module.css";
import ScraperCard from "../../components/ScraperCard";

const Trainers = () => {
  const {
    data: trainers,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["airMaxTrainers"], queryFn: fetchAirMaxTrainers });

  return (
    <div className={classes.wrapper}>
      <Container>
        <div className={classes.scraperList}>
          {trainers?.map(({ title, subtitle, price, url, image }: TrainersProps) => {
            return (
              <ScraperCard
                title={title}
                subtitle={subtitle}
                price={price}
                url={url}
                image={image}
              />
            )
          })}
        </div>
      </Container>
    </div>
  );
};

export default Trainers;
