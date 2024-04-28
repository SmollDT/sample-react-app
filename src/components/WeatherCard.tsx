import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { TiWeatherDownpour, TiWeatherSunny } from "react-icons/ti";
import { getAirplaneData } from "../api/actions";
import { CiPaperplane } from "react-icons/ci";
import { FaPaperPlane } from "react-icons/fa";

const WeatherCard: React.FC = () => {
  const [data, setData] = useState<AirplaneData>();
  const [loadingState, setLoadingState] = useState(false);
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    console.log("Fetching Airplane Data...");
    console.log(year);
    setLoadingState(true);
    getAirplaneData(year)
      .then((res) => {
        setError("");
        if (res) {
          console.log(res);
          setData(res);
          setLoadingState(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });
  };

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="year"
              type="text"
              label="Year"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
            <Button
              className=""
              color="primary"
              isLoading={loadingState}
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
          <div className="flex flex-col items-center">
            {data.height > 9000 ? (
              <div>
                <CiPaperplane className="w-36 h-36" />
              </div>
            ) : (
              <div>
                <FaPaperPlane className="w-36 h-36" />
              </div>
            )}
            <p className="text-3xl font-bold">Name: {data.name}</p>
            <p className="text-lg">Height: {data.height} Meters</p>
            <p className="text-lg">Width: {data.width} Meters</p>
            <p className="text-lg">Length: {data.length} Meters</p>
            <p className="text-lg">Max-Speed: {data.max_speed} Km/h</p>
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please enter a year</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {!data && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default WeatherCard;
