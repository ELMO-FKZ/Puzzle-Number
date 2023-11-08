import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import { RecordType } from "../@types/types";

const useRecords = () => {

    const [records, setRecords] = useState<RecordType[]>([]);

    useEffect(() => {
        const getRecords = onSnapshot(
            collection(db, "record-holders"), 
            (snapshot) => {
                setRecords(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}) as RecordType));
            },
            (error) => {
                console.log(error);
            }
        )
        return () => {
            getRecords();
        }
    },[])

    return {records};
}

export default useRecords;