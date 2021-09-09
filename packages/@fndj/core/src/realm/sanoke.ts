import * as Realm from "realm-web";
import { loginAnonymous } from './auth';
import { MongoTrack } from './models';


const [app, user] = await loginAnonymous();
const mongodb = app.currentUser?.mongoClient("mongodb-atlas");
const tracks = mongodb!.db("fndj").collection<MongoTrack>("tracks");

// type InsertOneResult = Realm.Services.MongoDB.InsertOneResult<
//   BSON.ObjectId
// >;
export function insertTrack(track: MongoTrack) {
  return tracks.insertOne(track);
}
