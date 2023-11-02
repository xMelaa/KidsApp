// type AnimalType = {
//     name: string;
//     photo: any;
//     sound: string;
//     ciekawostki: string[];
//   };
  
//   type AnimalsType = {
//     [key: string]: AnimalType;
//   };

export let Animals = {
    Dog:{
        name: 'Pies',
        photo: require('../img/example.jpg'),
        sound: 'hau hau.mp3',
        ciekawostki: [
            'pies ma 4 łapy',
            'mówi się, że pies to najlepszy przyjaciel człowieka',
            'istnieje wiele ras psów'
        ]
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