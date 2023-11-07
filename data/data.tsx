type AnimalType = {
    name: string;
    photo: any;
    sound: string;
    ciekawostki: string[];
  };
  
  type AnimalsType = {
    [key: string]: AnimalType;
  };

export let Animals: AnimalsType = {
    Dog:{
        name: 'Pies',
        photo: require('../img/example.jpg'),
        sound: require('../sounds/dog_barking.mp3'),
        ciekawostki: [
            'pies ma 4 łapy',
            'mówi się, że pies to najlepszy przyjaciel człowieka',
            'istnieje wiele ras psów'
        ]
    },
    Car: {
        name: 'Samochód',
        photo: require('../img/example.jpg'),
        sound: 'brum brum',
        ciekawostki: []
    }
}

export let Vehicles = {
    Car: {
        name: 'Samochód',
        photo: require('../img/example.jpg'),
        sound: 'brum brum',
        ciekawostki: []
    }
}