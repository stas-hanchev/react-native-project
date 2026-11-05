// import { getAuth, signOut } from '@react-native-firebase/auth';
import {
    collection,
    getDocs,
    getFirestore,
} from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import PetsList from './components/PetsList';

export interface Pet {
    id: string,
    age: number,
    type: string,
    location: string,
    name: string,
    description: string,
    size: string,
    isVaccinated: boolean,
    images: string[],
    sex: string,
    isDog: boolean,
    color: string,
    timeStamp: number
}

export default function Home() {
    const [pets, setPets] = useState<Pet[]>([]);

    const getPets = async () => {
        try {
            const result = await getDocs(collection(getFirestore(), 'animals'));
            const petsList: Pet[] = result.docs.map(item => ({
                id: item.id,
                ...(item.data() as Omit<Pet, 'id'>),
            }));
            setPets(petsList);
        } catch (error) {
            console.error(error);
        }
    };
    
    // <TouchableOpacity onPress={() => signOut(getAuth())}>
    // </TouchableOpacity>

    useEffect(() => {
        getPets();
    }, []);

    return <PetsList pets={pets} />;
}
