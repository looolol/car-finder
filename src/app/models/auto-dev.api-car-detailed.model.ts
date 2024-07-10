


export interface AutoDevApiCarDetailed {
  categories: {
    vehicleType: string;
    vehicleStyle: string;
    vehicleSize: string;
    primaryBodyType: string;
    market: string;
    epaClass: string;
  };
  colors: {
    options: {
      name: string;
      id: string;
      equipmentType: string;
      availability: string;
    }[];
    category: string;
  }[];
  drivenWheels: string;
  engine: {
    valve: {
      timing: string;
      gear: string;
    };
    type: string;
    totalValves: number;
    torque: number;
    size: number;
    rpm: {
      torque: number;
      horsepower: number;
    };
    name: string;
    id: string;
    horsepower: number;
    fuelType: string;
    equipmentType: string;
    displacement: number;
    cylinder: number;
    configuration: string;
    compressionRatio: number;
    code: string;
    availability: string;
  };
  make: {
    niceName: string;
    name: string;
    id: number;
  };
  manufacturerCode: string;
  matchingType: string;
  model: {
    niceName: string;
    name: string;
    id: string;
  };
  mpg: {
    highway: string;
    city: string;
  };
  numOfDoors: string;
  options: {
    options: {
      name: string;
      id: string;
      equipmentType: string;
      description: string;
      availability: string;
    }[];
    category: string;
  }[];
  squishVin: string;
  transmission: {
    transmissionType: string;
    numberOfSpeeds: string;
    name: string;
    id: string;
    equipmentType: string;
    availability: string;
  };
  years: {
    year: number;
    styles: {
      trim: string;
      submodel: {
        niceName: string;
        modelName: string;
        body: string;
      };
      name: string;
      id: number;
    }[];
    id: number;
  }[];
}
