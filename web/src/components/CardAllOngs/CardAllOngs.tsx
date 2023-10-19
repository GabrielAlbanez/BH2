import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function CardAllOngs() {
 
    type dataOng = {
        'Logo' : string;
    }
    
  
  
  const [dataOng, setDataOng] = useState<dataOng[]>([]);

  useEffect(() => {
    const url = "http://localhost:8080/allOngs";
    axios.get(url).then((response) => {
      const data = response.data;
      setDataOng([data.ongs[0]]);
    });
  }, []);

console.log(dataOng);
  return (
    <>
      {dataOng.map((ong, index) => (
        <div key={index}>
          <Card className="w-96">
            <CardHeader shadow={false} floated={false} className="h-80">
              <img
                src={`http://localhost:3000/${ong.Logo}`}
                alt="card-image"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody className="text-black">
              <div className="mb-2 flex items-center justify-between">
                <Typography color="blue-gray" className="font-medium">
                  Apple AirPods
                </Typography>
                <Typography color="blue-gray" className="font-medium">
                  $95.00
                </Typography>
              </div>
              <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75"
              >
                With plenty of talk and listen time, voice-activated Siri
                access, and an available wireless charging case.
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                ripple={false}
                fullWidth={true}
                className="bg-blue-gray-900/10 text-black shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </>
  );
}
