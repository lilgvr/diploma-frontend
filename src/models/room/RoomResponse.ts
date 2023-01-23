import { Room } from "./Room";
import { RoomQueue } from "./RoomQueue";
import { Movie } from "../movie/Movie";
import { User } from "../user";
import { RoomUser } from "./RoomUser";

export type RoomResponse = {
    room: Room,
    room_queue: Pick<RoomQueue, "id" | "order"> & Pick<Movie, "title">,
    room_users: (Pick<User, "id" | "name" | "avatar_id"> & Pick<RoomUser, "is_creator">)[]
}
