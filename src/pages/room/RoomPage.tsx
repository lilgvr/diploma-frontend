import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { $api } from "../../api";
import { RoomResponse } from "../../models/room";

const RoomPage: FC = () => {
    const { id } = useParams();
    const [roomData, setRoomData] = useState<RoomResponse>();

    useLayoutEffect(() => {
        $api.get<RoomResponse>(`/rooms/room/${ id }`).then(res => {
            setRoomData(res.data);
        });
    }, [id]);

    useEffect(() => {
        roomData && console.log(roomData);
    }, [roomData]);

    return (
        <div>

        </div>
    );
};

export default RoomPage;
